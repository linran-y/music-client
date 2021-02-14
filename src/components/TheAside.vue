<template>
  <transition name="slide-fade">
    <div class="the-aside" v-if="showAside">
      <h2 class="title">播放列表</h2>
      <ul class="menus">
        <li v-for="(item,index) in listOfSongs" :key="index" :class="{'is-play': id===item.id}"
            @click="toplay(item.id,item.url,item.pic,index,item.name,item.singername,item.lyric)">
          {{item.name}}
        </li>
      </ul>
    </div>
  </transition>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: 'TheAside',
    computed: {
      ...mapGetters([
        'showAside',    //是否显示
        'listOfSongs',   //播放列表
        'id',           //正在播放的歌曲id
      ])
    },
    methods:{
      //播放音乐
      toplay(id,url,pic,index,title,singername,lyric)
      {
        //console.log(id,url,pic,index,title,singername,lyric);
        this.$store.commit('setIsPlay',true);
        this.$store.commit('setPlayButtonUrl','#icon-zanting');
        this.$store.commit('setId',id);
        this.$store.commit('setUrl',this.$store.state.configure.HOST+url);
        this.$store.commit('setPicUrl',this.$store.state.configure.HOST+pic);
        this.$store.commit('setListIndex',index);
        this.$store.commit('setTitle',title);
        this.$store.commit('setArtist',singername);
        this.$store.commit('setLyric',this.parseLyric(lyric));
      },
      //解析歌词
      parseLyric(text){
        let lines = text.split("\n");                   //将歌词按行分解成数组
        let pattern = /\[\d{2}:\d{2}.(\d{3}|\d{2})\]/g; //时间格式的正则表达式
        let result = [];                                //返回值
        //对于歌词格式不对的直接返回
        if(!(/\[.+\]/.test(text))){
          return [[0,text]]
        }
        //去掉前面格式不正确的行
        while(!pattern.test(lines[0])){
          lines = lines.slice(1);
        }
        //遍历每一行，形成一个每行带着俩元素的数组，第一个元素是以秒为计算单位的时间，第二个元素是歌词
        for(let item of lines){
          let time = item.match(pattern);  //存前面的时间段
          let value = item.replace(pattern,'');//存后面的歌词
          for(let item1 of time){
            let t = item1.slice(1,-1).split(":");   //取出时间，换算成数组
            if(value!=''){
              result.push([parseInt(t[0],10)*60 + parseFloat(t[1]),value]);
            }
          }
        }
        //按照第一个元素--时间--排序
        result.sort(function(a,b){
          return a[0] - b[0];
        });
        return result;
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../assets/css/the-aside';
</style>
