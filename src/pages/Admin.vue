<template>
  <div>
  <el-container>
    <Navagate></Navagate>
    <el-container>
      <Header></Header>
      <el-main><router-view/></el-main>
      <el-footer>上海奇已信息科技有限公司-施公宝</el-footer>
    </el-container>
  </el-container>
  </div>
</template>

<script>
import Header from '@/components/common/header.vue'
import Navagate from '@/components/common/navagate.vue'
import Footers from '@/components/common/footer.vue'
export default {
  data:function(){
    return {
      isLogin: this.$store.state.isLogin
    }
  },
  components:{
    Navagate,Header,Footers
  }
}
</script>

<style>
#app {
  font-family: 'PingFang SC', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body,{
  padding: 0px;
  margin: 0px;
  background: #f0f2f7;
}
.el-main{
  padding: 0px;
  margin: 0px;
  background: #f0f2f7;
  background: red;
}



</style>
