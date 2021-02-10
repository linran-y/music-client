<template>
  <div class="home">
    首页
    <Swiper></Swiper>
  </div>
</template>

<script>
import Swiper from "../components/Swiper"
export default {
  name: 'home',
  components: {
    Swiper,
  },
  data () {
    return {

    }
  },
  created () {

  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/home.scss';
</style>
