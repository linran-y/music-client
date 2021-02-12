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
        <div style="font-size:0">
          <el-input type="text" placeholder="搜索音乐" @keyup.enter.native="goSearch()" v-model="keywords"></el-input>
          <el-button type="primary" icon="el-icon-search" @click="goSearch()">搜索</el-button>
        </div>
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
        keywords:'',//搜索关键字
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
        this.keywords='';
        this.$store.commit('setActiveName',name);
      },
      goSearch(){
        this.$router.push({path:'/search',query:{keywords: this.keywords}})
        this.$store.commit('setActiveName','');//消除高亮
      }
    }
  }
</script>

<style  lang="scss" scoped>
  @import '../assets/css/the-header.scss';
</style>
