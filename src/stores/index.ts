import { defineStore } from "pinia";
import { getMapInfo, getMarkList,getMapList } from "@/api";


const useStore = defineStore('wukong',() => {

  let mapInfo = ref()
  let marker = ref()
  let mapList = ref()
  let selectMarkerId = ref<Set<number>>(new Set())
   function changeStore() {
    getMapListAction()
    getMarkListAction()  
  }
 
  function addMarker(id:number) {
    selectMarkerId.value.add(id)
    getMarkListAction()
  }
  function removeMarker(id:number) {
    selectMarkerId.value.delete(id)
    getMarkListAction()
  }

  async function getMapInfoAction(id?:number) {
    const res = await getMapInfo(id)
    mapInfo.value = res
  }
  async function getMarkListAction() {
    const res = await getMarkList([...selectMarkerId.value])
    console.log(res);
    
    marker.value = res
  }
  async function getMapListAction() {
    const res = await getMapList()
    mapList.value = res
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
    removeMarker
  }

}
 
)

export default useStore
