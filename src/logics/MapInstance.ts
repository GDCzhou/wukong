
import 'leaflet/dist/leaflet.css'
import L, { icon } from "leaflet";
import { getMarkerTmpl, getPopupTmpl } from '@/api';
import ejs from 'ejs';


const MAP_TEMPLATE = `maps/{id}/{z}/{x}/{y}.webp` as const
const MAP_DEFAULT_ID = 48 as const
const ZOOM_LIMIT = {
  maxZoom: 12,
  minZoom: 9,
} as const
class MapInstance {
  map: L.Map | void = void 0;
  tileLayer: L.TileLayer | void = void 0;
  layerGroup: L.LayerGroup | void = void 0;
  popupTmpl: string | void = void 0;
  markerTmpl: string | void = void 0;
  constructor(){
    this.createTemplate()
  }
  async createTemplate() {
    this.popupTmpl = await getPopupTmpl()
    this.markerTmpl =  await getMarkerTmpl()
  }
  creatMap(el:HTMLElement) {
    this.map = L.map(el,{
      ...ZOOM_LIMIT,
      preferCanvas: true,
      zoomControl: false,
      crs: L.CRS.Simple,
      center: L.latLng(0, 0),
      // maxBounds: L.latLngBounds(L.latLng(0, 0), L.latLng(-1, 1)),
    })

    this.map.setView([-0.5,0.5], 10)
    this.map.on('click', (e)=>{
     console.log("You clicked the map at " + e.latlng);
    
    })
  }
  createTileLayer(id: number = MAP_DEFAULT_ID) {
    if (!this.map) return;
    this.tileLayer?.remove()
    this.tileLayer = L.tileLayer(MAP_TEMPLATE,{
      id: String(id),
      ...ZOOM_LIMIT
    })

    this.tileLayer.addTo(this.map)
  }
  createZoomControl() {
    if (!this.map) return;
   L.control.zoom({
      zoomInText: '',
      zoomOutText: '',
      position: 'bottomright',
      zoomInTitle: '放大',
      zoomOutTitle: '缩小',
    })
   .addTo(this.map)
  }
  createMarker(markers: any[]) {
    if (!this.map) return;
    this.layerGroup?.clearLayers()
    const markerPonits = markers.map((marker) => {
      const {x,y,name,description,iconUrl} = marker
      const html = ejs.render(this.markerTmpl ?? '', {
        name,
        iconUrl
      })

      const mark = L.marker(L.latLng(x,y),{
        icon: L.divIcon({
          className: 'marker-icon',
          html: html,
        })
      })

      mark.bindPopup(ejs.render(this.popupTmpl ?? '', {
        name,
        description,
        iconUrl
      }))
      return mark
    })

    this.layerGroup = L.layerGroup(markerPonits).addTo(this.map)
  }
}


export default MapInstance;
