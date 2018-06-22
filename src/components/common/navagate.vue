<template>
<keep-alive>
 <el-aside class="nav" width="71px"  :style="{'height' : this.$store.state.windowClientHeight + 'px'}">
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
        home_url:'../../../static/tab_icon_home_selected.png',
        chat_url:'../../../static/tab_icon_chat_unselected.png',

        heightData :document.documentElement.clientHeight+'px',
      }
    },
    computed: {
        unreadNum(){
            console.error('1111111111',this.$store.state.unreadNum)
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
    width: 70px;
    min-height: 400px;
  }

  a{
    text-decoration: none;
    color: #000;
  }

  .nav{
    width: 70px;
    background: #4a98fb;
  }
  .el-menu{
    background: #4a98fb;
  }

  .logo{
    text-align: center;
    margin: 4px auto;
    width: 100%;
  }

  .logo img{
    width: 50px;
    height: 50px;
    border-radius: .2rem;
  }
  .menu{
    height: 28px;
    width: 28px;
    
  }
</style>