<template>
  <div id="app">
    <TheHeader></TheHeader>
    <ScrollTop></ScrollTop>
    <router-view class="music-content"/>
    <SongAudio></SongAudio>
    <TheAside></TheAside>
    <TheFooter></TheFooter>
    <PlayBar></PlayBar>
  </div>
</template>

<script>
  import TheHeader from './components/TheHeader'
  import ScrollTop from './components/ScrollTop'
  import TheFooter from './components/TheFooter'
  import SongAudio from './components/SongAudio'
  import PlayBar from './components/PlayBar'
  import TheAside from './components/TheAside'
export default {
  name: 'App',
  components: {
    PlayBar,
    SongAudio,
    TheHeader,
    ScrollTop,
    TheFooter,
    TheAside,
  }
}
</script>

<style  lang="scss" scoped>
@import './assets/css/app.scss';
</style>
