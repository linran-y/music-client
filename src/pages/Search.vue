<template>
    <div class="search">
      <nav class="searchList-nav">
        <span :class="{isActive:toggle==='Songs'}" @click="handleChangeView('Songs')">歌曲</span>
        <span :class="{isActive:toggle==='Songlists'}" @click="handleChangeView('Songlists')">歌单</span>
      </nav>
      <component :is="currentView"></component>
    </div>
</template>

<script>
  import SearchSonglists from '../components/search/SearchSonglists'
  import SearchSongs from '../components/search/SearchSongs'
  export default {
    name: 'Search',
    components: {
      SearchSonglists,
      SearchSongs
    },
    data () {
      return {
        toggle: 'Songs',
        currentView: 'SearchSongs'
      }
    },
    methods: {
      handleChangeView(component)
      {
          this.currentView='Search'+component;
          this.toggle = component;
      }
    }
  }
</script>

<style lang="scss" scoped>
@import '../assets/css/search.scss';
</style>
