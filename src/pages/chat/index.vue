
<template>
    <div >
        <el-container>
            <el-aside width="19rem" v-bind:style="{height: heightData}">
                <div class="grid-content bg-purple chatBar">
                    <el-menu  :default-active="this.defaultActive" class="el-menu-demo" mode="horizontal" @select="chatSelect">
                        <el-menu-item index="message">我的消息</el-menu-item>
                        <el-menu-item index="project">项目列表</el-menu-item>
                    </el-menu>
                </div>
                <el-col :span="24" class="pannel-left" v-bind:style="{height: heightData}">
                    <div>
                        <el-row v-if="this.defaultActive == 'message'">
                            <projectMessage v-for="(item,index) in sessionlist" :item='item' :key="index"
                                />
                        </el-row>
                        <el-row v-if="this.defaultActive == 'project'">
                            <projectList v-for="(item,index) in teamList" :item='item' :key="index" />
                        </el-row>
                    </div>
                </el-col>
                
            </el-aside>
        <el-main>
            <chatInfo/>
        </el-main>
        </el-container>
    </div>
</template>
<script>
/* eslint-disable */
import projectMessage from '../../components/chat/message_list'
import projectList  from '../../components/chat/project_list'
import chatInfo from '../../components/chat/info'
import util from '../../utils'
import config from '../../configs'

export default {
    data(){
        return {
            defaultActive:"message",
            defaultChat:'worker',
            teamType: 'advanced',
            heightData :(document.documentElement.clientHeight-70)+'px',
        }
    },
    components: {
        projectMessage,chatInfo,projectList
    },
      computed: {
    sysMsgUnread () {
      let temp = this.$store.state.sysMsgUnread
      let sysMsgUnread = temp.addFriend || 0
      sysMsgUnread += temp.team || 0
      let customSysMsgUnread = this.$store.state.customSysMsgUnread
      return sysMsgUnread + customSysMsgUnread
    },
    userInfos () {
      return this.$store.state.userInfos
    },
    myInfo () {
      return this.$store.state.myInfo
    },
    myPhoneId () {
      return `${this.$store.state.userUID}`
    },
    teamList: function () {
      return this.$store.state.teamlist && this.$store.state.teamlist.filter(team => {
        return team.type === this.teamType && team.validToCurrentUser
      })
    },
    sessionlist () {
      let sessionlist = this.$store.state.sessionlist.filter(item => {
        item.name = ''
        item.avatar = ''
        if (item.scene === 'p2p') {
          let userInfo = null
          if (item.to !== this.myPhoneId) {
            userInfo = this.userInfos[item.to]
          } else {
            // userInfo = this.myInfo
            // userInfo.alias = '我的手机'
            // userInfo.avatar = `${config.myPhoneIcon}`
            return false
          }
          if (userInfo) {
            item.name = util.getFriendAlias(userInfo)
            item.avatar = userInfo.avatar
          }
        } else if (item.scene === 'team') {
          let teamInfo = null
          teamInfo = this.$store.state.teamlist.find(team => {
            return team.teamId === item.to
          })
          if (teamInfo) {
            item.name = teamInfo.name
            item.avatar = teamInfo.avatar || (teamInfo.type === 'normal' ? this.myGroupIcon : this.myAdvancedIcon)
          } else {
            item.name = `群${item.to}`
            item.avatar = item.avatar || this.myGroupIcon
          }
        }
        let lastMsg = item.lastMsg || {}
        if (lastMsg.type === 'text') {
          item.lastMsgShow = lastMsg.text || ''
        } else if (lastMsg.type === 'custom') {
          item.lastMsgShow = util.parseCustomMsg(lastMsg)
        } else if (lastMsg.scene === 'team' && lastMsg.type === 'notification') {
          item.lastMsgShow = util.generateTeamSysmMsg(lastMsg)
        } else if (util.mapMsgType(lastMsg)) {
          item.lastMsgShow = `[${util.mapMsgType(lastMsg)}]`
        } else {
          item.lastMsgShow = ''
        }
        if (item.updateTime) {
          item.updateTimeShow = util.formatDate(item.updateTime, true)
        }
        return item
      })
      return sessionlist
    }
  },
    methods: {
        chatSelect(key, keyPath){
            this.defaultActive = key
            console.log(this.defaultActive )
            if(key == 'message'){
                this.get_message();
            }else if(key == 'project'){
                this.get_project_list();
            }
            
        },
        enterChat(item){
           // alert(item);
        },
        get_message(){
            console.log('获取聊天记录')
            //this.$store.state.currSessionId = item.id;
        },
        get_project_list(){
            console.log('获取项目列表')
        }
        
  },
  mounted:function(){
        //this.get_list();
  }
}
</script>
<style scoped>
    .el-main{
        background: #fff;
    }
    .el-aside{
        border-right: 1px solid #eee;
        background: #fff;
    }
    .pannel-left{
        overflow:auto;
    }
    .el-menu{
        height: 45px;
        line-height: 45px;
    }
    .el-menu-item{
        height: 45px;
        line-height: 45px;
        width: 50%;
    }
    .active{
        background: #ddd;
    }

    
    
</style>