<template>
  <div>
    <div class="swiper">
      <el-carousel trigger="click" height="280px" :interval="4000" type="card">
        <el-carousel-item v-for="(item,index) in swiperlist" :key="index">
          <img :src="item.picImg" alt="">
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>

</template>

<script>

  import {swiperList} from "../assets/data/swiper.js"
  export default {
    name: 'Swiper',
    data () {
      return {
        swiperlist:[],
      }
    },
    created(){
      this.swiperlist=swiperList;
    }
  }
</script>

<style scoped>
  @import "../assets/css/swiper.scss";
</style>
