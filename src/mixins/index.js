export const mixin = {
  methods: {
    //获取图片地址
    attachImageUrl (srcUrl) {
      return srcUrl? this.$store.state.configure.HOST+srcUrl : '../assets/img/user.jpg';
    }
  }
}
