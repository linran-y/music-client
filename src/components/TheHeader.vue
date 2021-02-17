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
            <el-input type="text" clearable placeholder="搜索音乐" @keyup.enter.native="goSearch()" v-model="keywords"
            style="width:300px"  prefix-icon="el-icon-search"></el-input>
            <el-button type="primary" icon="el-icon-search" @click="goSearch()" >搜索</el-button>
          </div>
      </li>

      <li v-show="!loginIn" :class="{active: item.name === activeName}" v-for="item in loginMsg" :key="item.path" @click="goPage(item.path,item.name)">
        {{item.name}}
      </li>
    </ul>
    <div class="header-right" v-show="loginIn">
      <div id='user'>
        <img :src='attachImageUrl(avator)'>
      </div>
      <ul class="menu">
        <li v-for="(item,index) in menuList" :key="index" @click="goMenuList(item.path)">{{item.name}}</li>
      </ul>
    </div>
  </div>

</template>

<script>
  import {mapGetters} from 'vuex'
  import {navMsg,loginMsg,menuList} from "../assets/data/header"
  export default {
    name: 'the-header',
    data(){
      return{
        navMsg:[],//左侧导航栏
        keywords:'',//搜索关键字
        loginMsg:[],//右侧导航栏
        menuList:[],
      }
    },
    created(){
      this.navMsg=navMsg;
      this.loginMsg=loginMsg;
      this.menuList=menuList;
    },
    computed:{
      ...mapGetters([
        'activeName',    //高亮
        'loginIn',     //是否登录了
        'avator',    //用户头像
      ]),
    },
    mounted(){
      document.querySelector('#user').addEventListener('click',function(e){
        document.querySelector('.menu').classList.add("show");
        e.stopPropagation()           //关键在于阻止冒泡
      },false);
      document.querySelector('.menu').addEventListener('click',function(e){
        e.stopPropagation()           //点击菜单内部时，阻止时间冒泡，这样，点击内部时，菜单不会关闭
      },false);
      document.addEventListener('click',function(){
        document.querySelector('.menu').classList.remove('show');
      },false);
    },
    methods: {
      attachImageUrl (srcUrl) {
        return srcUrl? this.$store.state.configure.HOST+srcUrl : '../assets/img/user.jpg';
      },
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
      },
      goMenuList(path){
        if(path ===0){
          this.$store.commit('setLoginIn',false);
          this.$router.push('/');
          this.$store.commit('setActiveName','首页');//消除高亮
        }else{
          this.$router.push({path:path});
        }
      }
    }
  }
</script>

<style  lang="scss" scoped>
  @import '../assets/css/the-header.scss';
</style>
