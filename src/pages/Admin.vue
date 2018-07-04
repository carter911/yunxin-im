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
  data:function(){return {
  }},
  components:{
    Navagate,Header,Footers
  },
  created(){
        window.moveTo(100,100);
        window.resizeTo(1000, 700);//改变大小  
        // 提交sdk连接请求
  },
  updated() {
      // 提交sdk连接请求
      this.$store.dispatch("connect");
      this.$store.dispatch("updateRefreshState");
  },

  mounted() {
    this.dynamicCalucatewindowHeight();
    this.$store.dispatch("connect");
    this.$store.dispatch("updateRefreshState");

  },
  methods : {
      dynamicCalucatewindowHeight() {
        this.windowHeightData = this.getClientHeight()
        const that = this;
        window.onresize = function temp() {
                that.windowHeightData = that.getClientHeight()
                console.log("-----onresize--->>" + typeof(`${document.documentElement.clientHeight}`) + "-----"+ that.windowHeightData);
                //that.windowHeightData = this.windowHeightData;    
                that.$store.commit("changeWindowClienHeight" , that.windowHeightData);
            };

        this.$store.commit("changeWindowClienHeight" , this.windowHeightData);
    }, 
    getClientHeight()
    {
        var clientHeight=0;
        if(document.body.clientHeight&&document.documentElement.clientHeight)
        {
        var clientHeight = (document.body.clientHeight<document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;
        }
        else
        {
        var clientHeight = (document.body.clientHeight>document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;
        }
        return clientHeight;
      } 
    }
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

