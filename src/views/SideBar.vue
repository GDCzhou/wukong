<script lang='ts' setup>

import useStore from '@/stores';
import MapInstance from '@/logics/mapInstance'


const store = useStore();
onBeforeMount(() => {
  store.getMapListAction()
  store.getMapInfoAction()
})
const markerList = computed(() => {
  return store.mapInfo?.landmarkCatalogGroups || []
})

const isShow = ref(true)

const switchMap = async (id: number) => {
  await store.getMapInfoAction(id)
  // if (store.selectMarkerId.get(id)?.size) {
  //   store.getMarkListAction()
  
  //   MapInstance.createMarker(store.marker)
    
  // }
}

</script>
<template>
  <div class="sidebar" :class="{
    'close': !isShow
  }">
    <div class="sidebar-logo">
      <img src="@/assets/logo.png" alt="logo">
    </div>
    <div class="sidebar-select__map">
      <div class="map_item" v-for="item in store.mapList" :key="item.id" @click="switchMap(item.id)" :class="{
        'active': item.id === store.mapInfo?.id
      }">
        {{ item.regionName }}
      </div>
    </div>
    <div class="marker-group" v-for="item in markerList" :key="item.id">
      <div class="marker-title">{{ item.groupName }}</div>
      <div class="marker-item" v-for="i in item.landmarkCatalogs" :key="i.id" @click="store.handleMarker(i.id)" :class="{
        'active': store.hasId(i.id)
      }">
        <img :src="i.iconUrl" :alt="i.name">
        <div>{{ i.name }}</div>
        <div>{{ i.landmarksCount }}</div>
      </div>
    </div>
    <div class="isShow" @click="isShow = !isShow">{{ isShow ? '收起' : '展开' }}</div>
  </div>
</template>

<style scoped lang="scss">
.sidebar {
  width: 344px;
  height: 100%;
  background-color: #222226;
  position: absolute;
  top: 0;
  left: 0;
  padding: 20px 16px;
  z-index: 100;
  transition: transform .3s;

  &.close {
    transform: translateX(-100%);
  }

  &-logo {
    width: 100%;
    height: auto;

    img {
      width: 100%;
      height: 100%;
    }
  }

  &-select__map {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px 18px;
    margin-bottom: 20px;

    .map_item {
      background: #46464c;
      cursor: pointer;
      border-radius: 4px;
      color: #d7d7d9;
      font-size: 14px;
      line-height: 32px;
    }
  }

  .marker-group {
    display: grid;
    width: 100%;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px 17px;
    margin-bottom: 20px;

    .marker-title {
      background-color: #222226;
      grid-column: 1 / 3;
      font-size: 16px;
    }
  }

  .marker-item {
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;

    img {
      width: 20px;
      height: 20px;

    }
  }

  .isShow {
    font-size: 16px;
    text-align: center;
    cursor: pointer;
    line-height: 32px;
    background: #222226;
    position: absolute;
    right: -60px;
    border-radius: 5px;
    top: 20%;
    padding: 0 10px;
    z-index: 200;
  }

}
</style>
