<template>
  <div>
    <el-card class="box-card">
      <el-form ref="loginForm" :model="form" label-width="80px" :rules="rules">
        <div class="logo"><img src="../../../static/logo_400_400_gaitubao_com_100x100.png"/></div>
        <el-form-item label="" label-width='0px' prop="mobile">
        <el-input  class="input"  prefix-icon="el-icon-mobile-phone" v-model="form.mobile" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item label="" label-width='0px' prop="code">
        <el-col :span="14">
          <el-input class="input" style="width:100%"  prefix-icon="el-icon-view" v-model="form.code" placeholder="请输入验证码"></el-input>
        </el-col>
        <el-col :span="6" style='margin-top:4px;margin-left:20px;'>
          <el-button v-show="show"  :disabled="disabled" style="margin:20px 0px 20px;text-aligin:center;width:100%" size="small" type="primary" @click="getCode">验证码</el-button>
          <el-button v-show="!show"  :disabled="disabled" style="margin:20px 0px 20px;text-aligin:center;width:100%" size="small" type="primary" @click="getCode">{{count}}</el-button>
          
        </el-col>
        </el-form-item>
        <el-button style="margin:20px 0px 20px;text-aligin:center;width:100%" size="small" type="primary" @click="onSubmit('loginForm')">登录</el-button>
        <div class="login-outher">
          <div>其他登陆方式 </div>
          <div>
            <span><img src='../../../static/qq.png' /></span>
            <span><img src='../../../static/weichat.png' /></span>
          </div>
        </div>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
      return {
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
            { min: 11, max: 11, message: '手机长度不对', trigger: 'blur' }
          ],
          code: [
            { required: true, message: '请输入4位数字验证码', trigger: 'blur' },
            { min: 4, max: 4, message: '请输入4位数字验证码', trigger: 'blur' }
          ] 
        }
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

      getCode() {
        if(this.form.mobile == "" || this.form.mobile == undefined || this.form.mobile == null ){
          this.$message({message: '请输入手机号码',type: 'error'});
            return false;
        }
        this.disabled = true;
        
        var url = 'getcode?mobile='+this.form.mobile
        this.$http.get(url).then(response => {
            // success callback
            var result = response.data
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
        var param = {'mobile':this.form.mobile,'code':this.form.code}
        this.$http.post(loginUrl,param).then(response => {
            var result = response.data
            console.log(result)
            if(result.code == 200){
              sessionStorage.setItem('teoken',result.data.token);
              sessionStorage.setItem('user_id',result.data.user.id);
              sessionStorage.setItem('user',JSON.stringify(result.data.user));
              sessionStorage.setItem('isLogin',1);
              this.$store.commit('changeLogin','1')   
              //console.log(this.$store.state.isLogin);
              this.$router.push({path: 'admin/project'});
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
  .box-card{
    width: 300px;
    margin: 200px auto 0 ;
    height: 400px;

  }

  .logo img{
    width: 50px;
    height: 50px;
    border-radius: 6px;
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