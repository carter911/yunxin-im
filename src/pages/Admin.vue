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

import cookie from "../utils/cookie";
import pageUtil from "../utils/page";

export default {
  data:function(){return {}},
  components:{
    Navagate,Header,Footers
  },

  created(){
        // 提交sdk连接请求
        this.$store.dispatch("connect");
        this.$store.dispatch("updateRefreshState");
  },
  updated() {
      // 提交sdk连接请求
      this.$store.dispatch("connect");
      this.$store.dispatch("updateRefreshState");
  },
}
</script>

<style >
#app {
  font-family: 'PingFang SC', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
body,{
  padding: 0px;
  margin: 0px;
  background: #f0f2f7;
  overflow:-Scroll;overflow-y:hidden
}
.el-main{
  padding: 0px;
  margin: 0px;
  background: #f0f2f7;
}
</style>
<style scoped>
 .el-footer{
    display:none;
    height: 0px;
    line-height: 0px;
  }
  
</style>

