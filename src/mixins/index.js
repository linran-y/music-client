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
    getSong(){//全局歌曲模糊搜索，将搜索结果放入缓存里面
      if(!this.$route.query.keywords) {
        this.$store.commit('setlistOfSongs',[]);
        this.notify('您输入的内容为空',"warning");
      }
      else{
        querySongByName(this.$route.query.keywords).then(res=>{
          if(!res.data.length) {
            this.$store.commit('setlistOfSongs',[]);
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
            this.$store.commit('setlistOfSongs',res.data);
          }
        }).catch(err=>{console.log(err);})
      }

    }
  }
}
