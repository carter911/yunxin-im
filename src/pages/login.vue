<style scoped>
  #window-option{
    text-align: left;
    margin-bottom: 50px;
  }
  #window-option .close{
    margin-top: -15px;
    margin-left: -15px;
    height: 15px;
    width: 15px;
    background-image: url('../../static/closeWindow.png');
    background-size: 100%;
    border: 0px;
  }
  #window-option .close:hover{
    background-image: url('../../static/closeWindowHover.png');
  }
</style>

<template>
  <div id="login">
    <el-card class="box-card">
      <div id="window-option">
        <div class="close" @click="closeWindow()" ></div>
      </div>
      <el-form ref="loginForm" :model="form" label-width="80px" :rules="rules">
        <div  class="logo"><img src="../../static/logo400.png"/></div>
        <el-form-item label="" label-width='0px' prop="mobile">
        <el-input  class="input" type="phone" maxlength="13"  prefix-icon="el-icon-mobile-phone" v-model="form.mobile" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item label="" label-width='0px' prop="code">
        <el-col :span="14">
          <el-input maxlength="4" class="input" style="width:100%"  prefix-icon="el-icon-view" v-model="form.code" placeholder="请输入验证码"></el-input>
        </el-col>
        <el-col :span="8" style='margin-top:10px;margin-left:20px;text-align:right'>
          <el-button v-show="show"  :disabled="disabled" style="margin:10px 0px 20px;text-aligin:center;width:100%" size="small" type="primary" @click="getCode">验证码</el-button>
          <el-button v-show="!show"  :disabled="disabled" style="margin:10px 0px 20px;text-aligin:center;width:100%" size="small" type="primary" @click="getCode">{{count}}</el-button>
        </el-col>
        </el-form-item>
        <el-button style="margin:20px 0px 20px;text-aligin:center;width:100%" size="small" type="primary" @click="onSubmit('loginForm')">登录</el-button>
        <div class="login-outher">
          <div>其他登录方式 </div>
          <div>
            <a style="margin-left:10px;" @click="wx_login()" ><img src='../../static/weichat.png' /></a>
          </div>
        </div>
      </el-form>
    </el-card>
    <el-dialog
      title="第三方登录"
      :visible.sync="isLogin"
      width="100%"
      top="0"
      :before-close="handleClose">
     <iframe width="100%" style="border:0px;height:90%;" :src="wx_url"></iframe>
    </el-dialog>
  </div>
</template>
<script>
import cookie from "../utils/cookie";
import pageUtil from "../utils/page";
import http from "../utils/http";
import sgb_storage from "../utils/localInfo.js"
//const {ipcRenderer} = require('electron')
import path  from 'path'
export default {
  data() {
      return {
        type: '',
        isLogin:false,
        form: {
          mobile: '',
          code: '',
          
        },
        show: true,
        count: '',
        timer: null,
        disabled:false,
        rules: {
          mobile: [
            { required: true, message: '请输入手机号码', trigger: 'blur' },
            { min: 13, max: 13, message: '手机长度不对', trigger: 'blur' }
          ],
          code: [
            { required: true, message: '请输入4位数字验证码', trigger: 'blur' },
            { min: 4, max: 4, message: '请输入4位数字验证码', trigger: 'blur' }
          ] 
        }
      }
    },
    mounted() {
      //移除localStorage缓存
      sgb_storage.removeAllProjectInfo();
    },

    beforeCreate(){
      let appid = this.$route.params.openid
      const token = '123456'
      if(appid != undefined){
        var loginUrl = 'loginApp';
        var param = {type:'wx',appid:appid,token:token}
        http.post(loginUrl,param).then(response => {
            var result = response
            if(result.code == 200){
              this.$store.commit('updateSgbUserInfo',result.data)
              localStorage.setItem('uid', "sgb"+result.data.user.id)
              localStorage.setItem('sdktoken', '123456')
              this.$router.push({path: '/admin'});
            }else{
              this.$message({
                message: result.message,
                type: 'error'
              });
            }
        }, response => {
            // error callback
        })
      }
    },
    created(){
      if(window.require) {
        
        //ipc.send('close');
      }
            // let myNotification = new Notification('通知', {
      //   body: '您有新的消息请注意查收'
      // })
      // window.moveTo(0, 0);
      window.resizeTo(402,502);//改变大小  
      //window.resizeTo(700, 800);//改变大小  
      // window.onresize=new Function("window.resizeTo(500,   400);")   
    },
    computed:{
        wx_url(){
          let callbackUrl = 'http%3a%2f%2fapi.e-shigong.com%2fcallback'
          return 'https://open.weixin.qq.com/connect/qrconnect?appid=wx68c972e31acbb4a0&redirect_uri='+callbackUrl+'&response_type=code&scope=snsapi_login&?state=123456#wechat_redirect'
        }
    },
    watch: {
      'form.mobile'(newValue, oldValue) { // 监听
        this.form.mobile = newValue.length > oldValue.length ? newValue.replace(/\s/g, '').replace(/(\d{3})(\d{0,4})(\d{0,4})/, '$1 $2 $3') : this.form.mobile.trim()
      },
      'form.code'(newValue, oldValue) { // 监听

        //this.form.mobile = newValue.length >= 4?
      }
    },
    methods: {
      onSubmit(loginForm) {
        this.$refs[loginForm].validate((valid) => {
          if (valid) {
            this.loginApp();
          } else {
            this.$message({
              message: '登录信息不完整',
              type: 'error'
            });
            return false;
          }
        });
      },
      wx_login(){
        this.isLogin = true;
      },
      handleClose(){
        this.isLogin = false;
      },
      closeWindow(){
          if(window.require) {
            var ipc = window.require('electron').ipcRenderer
            ipc.send('close');
          }
      },
      getCode() {
        if(this.form.mobile == "" || this.form.mobile == undefined || this.form.mobile == null ){
          this.$message({message: '请输入手机号码',type: 'error'});
            return false;
        }
        this.disabled = true;
        let mobile = this.form.mobile.replace(/\s+/g, "");
        var url = 'getcode?mobile='+mobile
        http.get(url).then(response => {
            // success callback
            var result = response
            if(result.code == 200){
              const TIME_COUNT = 60;
              if (!this.timer) {
                this.count = TIME_COUNT;
                this.show = false;
                this.timer = setInterval(() => {
                if (this.count > 0 && this.count <= TIME_COUNT) {
                  this.count--;
                  } else {
                  this.disabled = false;
                  this.show = true;
                  clearInterval(this.timer);
                  this.timer = null;
                  
                  }
                }, 1000)
              }
            }else{
              this.disabled = false;
            }
            this.$message({
                message: result.message,
                type: 'success'
              });
        }, response => {
            // error callback
        })
    
      },

      loginApp(){
        var loginUrl = 'loginApp';
        let mobile = this.form.mobile.replace(/\s+/g, "");
        var param = {'mobile':mobile,'code':this.form.code}
        http.post(loginUrl,param).then(response => {
            var result = response
            console.log("login result : ", result);
            if(result.code == 200){
              this.$store.commit('updateSgbUserInfo',result.data)
              localStorage.setItem('uid', "sgb"+result.data.user.id)
              localStorage.setItem('sdktoken', '123456')
              this.$router.push({path: '/admin'});
            }else{
              this.$message({
                message: result.message,
                type: 'error'
              });
            }
        }, response => {
            // error callback
        })
      }
    }

    
}
</script>

<style scoped>
  .login{
    padding: 0px;
    margin: 0px;
    
  }
  .box-card{
    width: 400px;
    margin: 0px auto 0 ;
    height: 500px;
    text-align: center;
    padding: 0px;

  }

  .logo img{
    width: 50px;
    height: 50px;
    border-radius: 6px;
    margin-bottom: 20px;
  }

  .login-outher{
    margin-top: 20px;
    font-size: 12px;
    margin-top: 20px;
    text-align: left;
    height: 30px;
    
  }
  .input{
    margin-top:20px
  }
  .login-outher div{
    display: inline-block;
    float: left;
    height: 30px;
    margin-top: -20px;
    line-height: 30px;
  }
  .login-outher div img{
    padding: 0px;
    width: 25px;
    height: 25px;
  }
    .login-outher div span{
      margin-left: 10px;
    }
</style>