const song = {
  state:{
    HOST: 'http://127.0.0.1:8888',  //后台访问地址根目录
    listOfSongs: '',                  //当前歌曲列表
    isPlay: false,          //是否播放中
    url: '',                //歌曲地址
    id: '',                  //歌曲id
  },
  getters: {
    listOfSongs: state => {
      let listOfSongs = state.listOfSongs
      if(!listOfSongs){
        listOfSongs = JSON.parse(window.sessionStorage.getItem('listOfSongs')||null);
      }
      return listOfSongs;
    },
    isPlay: state => {
      let isPlay = state.isPlay;
      if(!isPlay){
        isPlay = JSON.parse(window.sessionStorage.getItem('isPlay')||null);
      }
      return isPlay;
    },
    url: state => {
      let url = state.url;
      if(!url){
        url = JSON.parse(window.sessionStorage.getItem('url')||null);
      }
      return url;
    },
    id: state => {
      let id = state.id;
      if(!id){
        id = JSON.parse(window.sessionStorage.getItem('id')||null);
      }
      return id;
    },

  },
  mutations: {
    setlistOfSongs: (state,listOfSongs) => {
      state.listOfSongs = listOfSongs;
      window.sessionStorage.setItem('listOfSongs',JSON.stringify(listOfSongs));
    },
    setIsPlay: (state,isPlay) => {
      state.isPlay = isPlay;
      window.sessionStorage.setItem('isPlay',JSON.stringify(isPlay));
    },
    setUrl: (state,url) => {
      state.url = url;
      window.sessionStorage.setItem('url',JSON.stringify(url));
    },
    setId: (state,id) => {
      state.id = id;
      window.sessionStorage.setItem('id',JSON.stringify(id));
    },
  }
}

export default song
