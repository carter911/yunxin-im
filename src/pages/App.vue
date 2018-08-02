<template>
  <div id="app">
    <router-view/>
    </div>
</template>

<script>
  export default {
    data(){
      return{
          centerDialogVisible:true,
          tips:0
      }
    }
  }
</script>

<style>
#app {
  /* font-family: 'PingFang SC', 'Microsoft YaHei', Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* text-align: center;
  width: 500px;
  margin: 0 auto;
  height: 400px;
  overflow: auto; */
}

body{
    -moz-user-select:none;/*火狐*/
    -webkit-user-select:none;/*webkit浏览器*/
    -ms-user-select:none;/*IE10*/
    -khtml-user-select:none;/*早期浏览器*/
    user-select:none;
}
body,.el-main{
  padding: 0px;
  margin: 0px;
  background: #f0f2f7;
}
</style>
