const configure = {
    state:{
        HOST: 'http://127.0.0.1:8888',  //后台访问地址根目录
        activeName: '',                  //当前选中的菜单名
        showAside:false,                //显示右边播放列表
        loginIn:false,                  //用户是否已经登录了
    },
    getters: {
        loginIn: state => {
          let loginIn = state.loginIn
          if(!loginIn){
            loginIn = JSON.parse(window.sessionStorage.getItem('loginIn'))
          }
          return loginIn;
        },
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
        setLoginIn: (state,loginIn) => {
          state.loginIn = loginIn
          window.sessionStorage.setItem('loginIn',JSON.stringify(loginIn));
        },
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
