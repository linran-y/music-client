<template>
  <div class="search-songs">
    <AlbumContent :songList="listOfSongs" ></AlbumContent>
  </div>
</template>

<script>
  import AlbumContent from '../AlbumContent'
  import {mapGetters} from 'vuex'
  import {mixin} from '../../mixins'
  export default {
    name: 'SearchSongs',
    mixins: [mixin],
    computed: {
      ...mapGetters(['listOfSongs'])
    },
    components:{
      AlbumContent,
    },
    watch:{
      '$route' (to, from) {//监控路由,查询关键字修改，就会重新查询
        this.getSong();
      }
    },
    mounted() {
      this.getSong();
    }

  }
</script>

<style lang="scss" scoped>
@import "../../assets/css/search-songs.scss";
</style>
