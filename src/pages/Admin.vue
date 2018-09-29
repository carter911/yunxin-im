<template>
  <div id="sgb-main">
  <el-container>
    <Navagate></Navagate>

    <el-container>
      <Header></Header>
      <el-main><router-view/></el-main>
      <el-footer>上海奇已信息科技有限公司-施公宝</el-footer>
    </el-container>


    <el-dialog 
      title="更新提示"
      :visible.sync="isUpdate"
      width="40%">
      <p v-if="this.downloadPercent>0">更新进度 <el-progress :percentage="1"></el-progress></p>
      <p style="text-align:left">1 优化mac最小化问题</p>
      <p style="text-align:left">2 优化材料商聊天</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="nowUpdate">立即更新</el-button>
      </span>
    </el-dialog>


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
    isUpdate:false,
    downloadPercent:0
  }},
  components:{
    Navagate,Header,Footers
  },
  created(){
        var current_version = 20180601;
        var that = this;
        if(window.require) {
          var ipc = window.require('electron').ipcRenderer
          ipc.send('resizeWindow',1000,700);
          ipc.send('get-app-version')
          ipc.on('got-app-version', function (event, version) {
            console.log(current_version,version)
            if(current_version>version){
                //console.error('更新当前版本',current_version)

                that.isUpdate = true;
            }
          })
        } 
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
    },
    nowUpdate(){
      if(window.require) {
        console.error('------开始检查更新------')
        var ipcRenderer = window.require('electron').ipcRenderer
        ipcRenderer.send('checkForUpdate')
        ipcRenderer.on('message', (event, text) => {
          console.log('---->', event)
          console.log('返回消息', text)
          this.tips = text
        })
        ipcRenderer.on('downloadProgress', (event, progressObj) => {
          console.log('下载', progressObj)
          //this.progress = progressObj.percent
          this.downloadPercent = parseInt(progressObj.percent) || 0
        })
        ipcRenderer.on('isUpdateNow', () => {
          console.log('是否现在更新')
          //ipcRenderer.send('isUpdateNow')
        })
      }
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


.el-badge__content.is-fixed {
  position: absolute;
  top: 0;
  right: 24px;
  -webkit-transform: translateY(-50%) translateX(100%);
  transform: translateY(-50%) translateX(100%);
}



::-webkit-scrollbar {/*滚动条整体样式*/
  width: 5px;     /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}

::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px #1ab6ff;
  background: #1ab6ff;
}
::-webkit-scrollbar-track {/*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  border-radius: 5px;
  background: #f2f2f2;
}
</style>

<style scoped>
 .el-footer{
    display:none;
    height: 0px;
    line-height: 0px;
  }
  
  
</style>

