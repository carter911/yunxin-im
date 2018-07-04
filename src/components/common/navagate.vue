<style scoped>
  #window-option{
    text-align: left;
    margin-left: 5px;
    margin-top: 10px;
    display: flex;
    flex-direction:row;
    flex-wrap: nowrap;
    padding-bottom: 10px;
    height: 15px;
  }
  #window-option .btn{
    margin-right: 4px;
    height: 15px;
    width: 15px;
   
    background-size: 100%;
    border: 0px;
  }

  #window-option .close{
     background-image: url('../../../static/closeWindow.png');
  }
  #window-option .close:hover{
    background-image: url('../../../static/closeWindowHover.png');
  }

  #window-option .min{
     background-image: url('../../../static/minWindow.png');
  }
  #window-option .min:hover{
    background-image: url('../../../static/minWindowHover.png');
  }

  #window-option .max{
     background-image: url('../../../static/maxWindow.png');
  }
  #window-option .max:hover{
    background-image: url('../../../static/maxWindowHover.png');
  }



</style>
<template>
<keep-alive>
 <el-aside class="nav" width="65px"  :style="{'height' : (this.$store.state.windowClientHeight) + 'px'}">
    <div id="window-option">
        <div id="close" class="btn close" @click="closeWindow()" ></div>
        <div class="btn min" @click="minWindow()" ></div>
        <div class="btn max" @click="maxWindow()" ></div>
    </div>
    <div class="logo"><img src="../../../static/logo.png"/></div>   
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      @select="handleSelect"
      background-color="#4a98fb"
      text-color="#fff"
      :router=true
      active-text-color="#000">
        <el-menu-item index="/admin/project" >
          <img class="menu" :src="home_url"/>
        </el-menu-item>

        <el-menu-item index="/admin/chat">
          <el-badge v-if="unreadNum>0" :value="this.unreadNum" class="item">
            <img  class="menu" :src="chat_url"/>
          </el-badge>
          <img v-if="unreadNum<=0"  class="menu" :src="chat_url"/>
        </el-menu-item>
        
    </el-menu>
 </el-aside>
 </keep-alive>
</template>
<script>

export default {
    data(){
      return {
        closeWindows : false,
        home_url:'../../../static/tab_icon_home_selected.png',
        chat_url:'../../../static/tab_icon_chat_unselected.png',
        heightData :document.documentElement.clientHeight+'px',
      }
    },
    computed: {
        unreadNum(){
            //console.error('1111111111',this.$store.state.unreadNum)
            return this.$store.state.unreadNum;
        }
    },
    created(){
      console.log('当前路由', this.$route.path)
        let curr = localStorage.getItem('currentMenu')
        if(this.$route.path == '/admin/chat'){
            this.chat_url = "../../../static/tab_icon_chat_selected.png"
            this.home_url = "../../../static/tab_icon_home_unselected.png"
        }else if(this.$route.path == '/admin/project'){
            this.chat_url = "../../../static/tab_icon_chat_unselected.png"
            this.home_url = "../../../static/tab_icon_home_selected.png"
        }else{
            this.chat_url = "../../../static/tab_icon_chat_unselected.png"
            this.home_url = "../../../static/tab_icon_home_selected.png"
        }
        console.log('当前路由',this.$route.path)
    },
    methods: {
      handleResize (event) {
        this.heightData = (document.documentElement.clientHeight)+'px'
        console.log("heightData:" + this.heightData);
      },
      handleSelect(key, keyPath){
        console.log(key);
        localStorage.setItem('currentNav',key)
        if(key == '/admin/chat'){
          if(this.$store.state.sessionlist.length>0){
            this.chat_url = "../../../static/tab_icon_chat_selected.png"
            this.home_url = "../../../static/tab_icon_home_unselected.png"

            let sessionId = this.$store.state.currSessionId
            if(!sessionId){
                console.log("初始化",this.$store.state.sessionlist[0].id)
                let sessionId = this.$store.state.sessionlist[0].id;
                this.$store.commit('updateCurrSessionId', {
                    type: 'init',
                    sessionId:sessionId
                });
                this.$store.commit('updateCurrSessionMsgs', {
                    type: 'init',
                    sessionId: sessionId
                });
            }
          }
        }else{
              this.chat_url = "../../../static/tab_icon_chat_unselected.png"
              this.home_url = "../../../static/tab_icon_home_selected.png"
        }
        //console.log( keyPath);
      },
      closeWindow(){
        this.$confirm('确定退出将会退出程序,确定吗？', '退出', {
            confirmButtonText: '确认',
            cancelButtonText: '暂不退出',
            type: 'warning'
            }).then(() => {                
                var yunxinUser = {uid: 0, sdktoken: 123456}
                this.$store.commit('updateUserUID',yunxinUser)
                this.$store.commit('updateSgbUserInfo',{})
                this.$store.dispatch('logout')
                this.$router.push({path: '/login'});
                if(window.require) {
                    var ipc = window.require('electron').ipcRenderer
                    ipc.send('close');
                }
            }).catch(() => {      
            });
      },
      minWindow(){
        //alert('最小化窗口');
        if(window.require) {
            var ipc = window.require('electron').ipcRenderer
            ipc.send('min');
        }
      },
      maxWindow(){
        if(window.require) {
            var ipc = window.require('electron').ipcRenderer
            ipc.send('max');
        }
      }
    }
  }
</script>
<style scoped>
  .item {
    margin-top: 0px;
    margin-right: 0px;
  }
  .el-header{
      text-align: center;
      height: 4rem;
      background-color: #ffffff;
      box-shadow: 0rem 0rem 0rem 0rem 
        rgba(0, 0, 0, 0.04);
      border: solid 0rem #ededed;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 64px;
    border-right: 1px solid #4a98fb;
    min-height: 400px;
    overflow-x: hidden;
  }

  a{
    text-decoration: none;
    color: #000;
  }

  .nav{
    width: 65px;
    background: #4a98fb;
  }
  .el-menu{
    background: #4a98fb;
  }

  .logo{
    text-align: center;
    margin: 3px auto;
    width: 100%;
  }

  .logo img{
    width: 50px;
    height: 50px;
    /* border-radius: .2rem; */
  }
  .menu{
    height: 24px;
    width: 24px;
    
  }
</style>