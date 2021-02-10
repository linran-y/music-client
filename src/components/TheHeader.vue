<template>
  <div class="the-header">
    <div class="header-logo" @click="goHome">
      <svg class="icon">
        <use xlink:href = "#icon-erji"></use>
      </svg>
      <span>music</span>
    </div>
    <ul class="navbar">
      <li :class="{active: item.name === activeName}" v-for="item in navMsg" :key="item.path" @click="goPage(item.path,item.name)">
        {{item.name}}
      </li>
      <li>

      </li>
    </ul>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {navMsg} from "../assets/data/header"
  export default {
    name: 'the-header',
    data(){
      return{
        navMsg:[],//导航栏
      }
    },
    created(){
      this.navMsg=navMsg;
    },
    computed:{
      ...mapGetters(['activeName']),
    },
    methods: {
      goHome(){
        this.$router.push({path: '/',})
      },
      goPage(path,name){
        this.$router.push({path: path,});
        this.$store.commit('setActiveName',name);
      },
    }
  }
</script>

<style  lang="scss" scoped>
  @import '../assets/css/the-header.scss';
</style>
