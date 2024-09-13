<script lang='ts' setup>
import MapInstance from '@/logics/mapInstance';
import { useTemplateRef } from 'vue'
import useStore from '@/stores';


const store = useStore();

const mapEl = useTemplateRef<HTMLElement>('map');



onMounted(() => {
  MapInstance.creatMap(mapEl.value as HTMLElement);
  MapInstance.createTileLayer()
  MapInstance.createZoomControl()
});

watch(() => store.marker, (newVal) => {
  console.log({ newVal });

  MapInstance.createMarker(newVal as any[])

})

watch(() => store.mapInfo, (newVal) => {
  if (newVal.id === 61) {
    MapInstance.createTileLayer(newVal.id, true)
  } else {
    MapInstance.createTileLayer(newVal.id)
  }
  if (store.selectMarkerId.get(newVal.id)?.size) {
    store.getMarkListAction()
    MapInstance.createMarker(store.marker)

  }
})



</script>
<template>
  <div id="map" ref="map"></div>
</template>

<style scoped lang="scss">
#map {
  height: 100%;
  width: 100%;
  backface-visibility: hidden;
  // position: relative;
  z-index: 99;
}
</style>
