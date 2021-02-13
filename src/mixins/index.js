import {querySongByName,querySingerbyid} from '../api/index'
export const mixin = {
  methods: {
    //提示信息
    notify(title,type) {
      this.$notify({
        title: title,
        type: type
      })
    },
    //获取图片地址
    attachImageUrl (srcUrl) {
      return srcUrl? this.$store.state.configure.HOST+srcUrl : '../assets/img/user.jpg';
    },
    //全局歌曲模糊搜索，将搜索结果放入缓存里面
    getSong(){
      if(!this.$route.query.keywords) {
        this.$store.commit('setListOfSongs',[]);
        this.notify('您输入的内容为空',"warning");
      }
      else{
        querySongByName(this.$route.query.keywords).then(res=>{
          if(!res.data.length) {
            this.$store.commit('setListOfSongs',[]);
            this.notify('暂无搜索结果',"warning");
          }
          else {
            //console.log(res);
            res.data.forEach(item=>{
              querySingerbyid(item.singerId).then(res=>{//插入一个对象属性:singername(其实是数据库设计的锅，这里补一下)
                //console.log(res);
                this.$set(item,'singername',res.data.name);
              })
            })
            //console.log(res);
            this.$store.commit('setListOfSongs',res.data);
          }
        }).catch(err=>{console.log(err);})
      }

    },
    //播放音乐
    toplay(id,url,pic,index,title,singername,lyric)
    {
      //console.log(id,url,pic,index,title,singername,lyric);
      this.$store.commit('setId',id);
      this.$store.commit('setUrl',this.$store.state.configure.HOST+url);
      this.$store.commit('setPicUrl',this.$store.state.configure.HOST+pic);
      this.$store.commit('setListIndex',index);
      this.$store.commit('setTitle',title);
      this.$store.commit('setArtist',singername);
      this.$store.commit('setLyric',lyric);

    }
  }
}
