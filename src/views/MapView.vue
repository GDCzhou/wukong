<script lang='ts' setup>
  import MapInstance from '@/logics/mapInstance';
  import { useTemplateRef } from 'vue'
  import useStore from '@/stores';


  const store = useStore();

  const mapEl = useTemplateRef<HTMLElement>('map');
  const map = new MapInstance();


  onMounted(() => {
    map.creatMap(mapEl.value as HTMLElement);
    map.createTileLayer()
    map.createZoomControl()
  });

  watch(()=> store.marker,(newVal) =>{
    console.log('vaue changed', newVal);
    
    map.createMarker(newVal as any[])
  },{
    immediate: true
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
 }
</style>
