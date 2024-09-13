import { defineStore } from "pinia";
import { getMapInfo, getMarkList,getMapList } from "@/api";


const useStore = defineStore('wukong',() => {

  let mapInfo = ref()
  let marker = ref()
  let mapList = ref()
  let selectMarkerId = ref<Map<number,Set<number>>>(new Map())


  function changeStore() {
    getMapListAction()
    getMarkListAction()  
  }
 
  function addMarker(id:number) {
    if (!selectMarkerId.value?.has(mapInfo.value.id)) {
      selectMarkerId.value?.set(mapInfo.value.id,new Set())
    }
    selectMarkerId.value?.get(mapInfo.value.id)?.add(id)
    getMarkListAction()
  }

  function removeMarker(id:number) {
    if (!selectMarkerId.value?.has(mapInfo.value.id))  return
    selectMarkerId.value?.get(mapInfo.value.id)?.delete(id)
    getMarkListAction()
  }

  function hasId(id:number) {
    return selectMarkerId.value?.get(mapInfo.value.id)?.has(id)
  }

 function handleMarker(id:number) {
  hasId(id) ? removeMarker(id) : addMarker(id)
 }

  async function getMapInfoAction(id?:number) {
    const res = await getMapInfo(id)
    mapInfo.value = res
    console.log('mapInfo')
  }
  
  async function getMarkListAction() {    
    const res = await getMarkList([...selectMarkerId.value?.get(mapInfo.value.id) ?? []])
    marker.value = res
    console.log('marker');
    
  }

  async function getMapListAction() {
    const res = await getMapList()
    mapList.value = res
    console.log('mapList')
  }


  return {
    mapInfo,
    marker,
    mapList,
    selectMarkerId,
    getMapInfoAction,
    getMarkListAction,
    getMapListAction,
    changeStore,
    addMarker,
    removeMarker,
    handleMarker,
    hasId
  }

}
 
)

export default useStore
