<template>
  <div class="song-list-album">
    <div class="album-slide">
      <div class="album-img">
        <img :src="attachImageUrl(tempList.pic)">
      </div>
      <div class="album-info">
        <h2>简介：</h2>
        <span>
          {{tempList.introduction}}
        </span>
      </div>
    </div>
    <div class="album-content">
      <div class="album-title">
        <p>{{tempList.title}}</p>
      </div>
      <div class="album-score">
        <div>
          <h3>歌单评分：</h3>
          <div>
            <el-rate v-model="average" disabled></el-rate>
          </div>
        </div>
        <span>{{average*2}}</span>
        <div>
          <h3>评价：</h3>
          <div @click="setscore">
            <el-rate v-model="rank" allow-half show-text></el-rate>
          </div>
        </div>
      </div>
      <div class="songs-body">
        <AlbumContent :songList="listOfSongs">
          <template slot="title">歌单</template>
        </AlbumContent>
      </div>
    </div>
  </div>
</template>

<script>
  import {mixin} from '../mixins'
  import {mapGetters} from 'vuex'
  import {querySingerbyid, querysongbysonglistid,Querysongbysongid,getScore,setScore} from '../api/index'
  import AlbumContent from '../components/AlbumContent'
  export default {
    name: 'songlistalbum',
    mixins:[mixin],
    computed: {
        ...mapGetters([
          'listOfSongs',      //当前播放列表
          'tempList',         //当前歌单对象
          'loginIn',          //用户是否已登录
          'userId',           //当前登录用户id
        ])
    },
    components:{
      AlbumContent,
    },
    created() {
      this.songListId = this.$route.query.id;
      this.getData();
      this.getscore();
    },
    data(){
      return {
        songLists: [],      //当前页面需要展示的歌曲列表
        songListId: '',    //前面传来的歌单id
        average: 0,         //平均分
        rank:  0            //提交评价的分数
      }
    },
    methods: {
      getscore(){
        getScore(this.songListId).then(res=>{
          console.log(res);
          this.average=(res.data/2);
        })
      },
      setscore()
      {
        if(!this.loginIn)
        {
          this.notify('请先登录','error');
          return;
        }
        let params={songListId:this.songListId,consumerId:this.userId,score:this.rank*2};
        setScore(params).then(res=>
        {
          if(res.code==200)
          {
            this.notify('评分成功','success');
            this.getscore(this.songListId);
          }
          else{
            this.notify('您已经评价过啦','error');
          }
        }).catch(err=>{console.log(err)})
      },
      getData()//通过歌单id来获取内容
      {
        querysongbysonglistid(this.songListId).then(res=>{
          //console.log(res);

          res.data.forEach(item=>{
            this.addSong(item.songId);
          });
          this.$store.commit('setListOfSongs',this.songLists);
        })
      },
      addSong(songid)
      {
        Querysongbysongid(songid).then(res=>{
          querySingerbyid(res.data.singerId).then(tes=>{
            //console.log(tes);
            this.$set(res.data,'singername',tes.data.name);
            this.songLists.push(res.data);
            //console.log(res);
          })

        })
      }

    }
  }
</script>

<style lang="scss" scoped>
  @import '../assets/css/song-list-album.scss';
</style>
