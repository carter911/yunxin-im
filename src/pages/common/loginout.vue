<template>
  <div>
    
  </div>
</template>
<script>
export default {
  data() {
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
              sessionStorage.setItem('user',result.data.user);
              sessionStorage.setItem('isLogin',1);
              this.$store.commit('changeLogin','1')   
              //console.log(this.$store.state.isLogin);
              this.$router.push({path: '/project/list'});
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