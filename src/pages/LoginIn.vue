<template>
  <div>
    <LoginLogo></LoginLogo>
    <div class="signUp">
      <div class="signUp-head">
        <span>用户登录</span>
      </div>
      <el-form :model="registerForm" ref="registerForm" label-width="70px" class="demo-ruleForm" :rules="rules">
        <el-form-item prop="username" label="用户名">
          <el-input v-model="registerForm.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input type="password" v-model="registerForm.password" placeholder="密码"></el-input>
        </el-form-item>
      </el-form>
      <div style="margin-left: 70px" >
        <el-button type="primary" @click="login" style="width:100px">登录</el-button>
        <el-button @click="gorigister()"  style="width:100px">注册</el-button>
      </div>
    </div>
  </div>

</template>

<script>
  import LoginLogo from '../components/LoginLogo'
  import {mixin} from '../mixins'
  import {login} from '../api/index'
  export default {
    name: 'SignUp',
    components:{
      LoginLogo,
    },
    mixins:[mixin],
    data () {
      return{
        registerForm: {
          username: 'lin_rany',       //用户名
          password: '123456',       //密码
        },
        rules: {
          username: [
            { required: true, trigger: 'blur',message:'请输入用户名'}
          ],
          password: [
            { required: true, trigger: 'blur',message:'请输入密码' }
          ],
        }               //表单提交的规则
      }
    },
    methods:{
      login()//登录操作
      {
        let _this = this;
        login(this.registerForm.username,this.registerForm.password).then(res=>{
          //console.log(res);
          if(res.code===200)
          {
            _this.notify('登录成功','success');
            _this.$store.commit('setLoginIn',true);
            _this.$store.commit('setUserId',res.data.id);
            _this.$store.commit('setUsername',res.data.username);
            _this.$store.commit('setAvator',res.data.avator);
            _this.$router.push({path:'/'});
            _this.$store.commit('setActiveName','首页');
          }
        }).catch(err=>{console.log(err)})
      },
      gorigister(){
        this.$router.push({path:'/sign-up'});
        this.$store.commit('setActiveName','注册');
      }
    },

  }
</script>

<style lang="scss" scoped>
  @import '../assets/css/sign-up.scss';
</style>
