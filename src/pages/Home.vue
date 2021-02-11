<template>
  <div class="home">
    <Swiper></Swiper>
    <div class="section" v-for="(item,index) in songsList">
      <div class="section-title">{{item.name}}</div>
      <ContentList :content-list="item.list"></ContentList>
    </div>
  </div>
</template>

<script>
import Swiper from "../components/Swiper"
import {querySinger,querysonglist} from '../api'
import ContentList from '../components/ContentList'
export default {
  name: 'home',
  components: {
    Swiper,
    ContentList,
  },
  data () {
    return {
      songsList:[
        {name:'歌手',list:[]},
        {name:'歌单',list:[]},
        ]
    }
  },
  created () {
    this.queryallsonglist();
    this.queryallSinger();
  },
  methods: {
    queryallSinger()//查询所有歌手
    {
      querySinger().then(res=>{
        //console.log(res);
        this.songsList[0].list=res.data.slice(0,10);
      }).catch(err=>{console.log(err)});
    },
    queryallsonglist()//查询所有歌单
    {
      querysonglist().then(res=>{
        //console.log(res);
        this.songsList[1].list=res.data.slice(0,10);
      }).catch(err=>{console.log(err)});
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/home.scss';
</style>
