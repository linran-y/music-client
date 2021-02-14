const configure = {
    state:{
        HOST: 'http://127.0.0.1:8888',  //后台访问地址根目录
        activeName: '',                  //当前选中的菜单名
        showAside:false,                //显示右边播放列表
    },
    getters: {
        activeName: state => {
            let activeName = state.activeName
            if(!activeName){
                activeName = JSON.parse(window.sessionStorage.getItem('activeName'))
            }
            return activeName;
        },
        showAside: state => {
          let showAside = state.showAside
          if(!showAside){
            showAside = JSON.parse(window.sessionStorage.getItem('showAside'))
          }
          return showAside;
        },

    },
    mutations: {
        setActiveName: (state,activeName) => {
            state.activeName = activeName
            window.sessionStorage.setItem('activeName',JSON.stringify(activeName));
        },
        setShowAside: (state,showAside) => {
          state.showAside = showAside;
          window.sessionStorage.setItem('showAside',JSON.stringify(showAside));
        }
    }
}

export default configure
