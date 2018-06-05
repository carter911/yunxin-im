
<template>
    <div id="chat">
        <el-container>
            <el-aside width="300px" v-bind:style="{height: heightData}">
                <div class="grid-content bg-purple chatBar">
                    <el-menu  :default-active="this.defaultActive" class="el-menu-demo" mode="horizontal" @select="chatSelect">
                        <el-menu-item index="message">我的消息</el-menu-item>
                        <el-menu-item index="project">项目列表</el-menu-item>
                    </el-menu>
                </div>
                <el-col  :span="24" class="pannel-left" v-bind:style="{height: listHeight}">
                    <div>
                        <el-row  v-if="this.defaultActive == 'message'">
                            <projectMessage
                                v-for = '(item,index) in sessionlist'
                                :item ='item'
                                :key="index"
                                :currSessionId = "currSessionId"
                                />
                        </el-row>
                        <el-row v-if="this.defaultActive == 'project'">
                            <projectList 
                                v-for="(item,index) in teamList"
                                :item='item'
                                :key="index"
                                :currSessionId = "currSessionId"
                                />
                        </el-row>
                    </div>
                </el-col>
            </el-aside>
            <el-main>
                <el-container>
                <el-main>
                    <div v-if="isChat" id="chat_info">
                        <ul class="chat_nav">
                            <li
                            @click="ownerSelect(owner)"
                            :class = "{
                                'active': this.defaultChat=='owner'
                            }"
                            class="chat_nav_left" v-if="showOwner">{{this.ownerName}}</li>
                            <li
                            @click="ownerSelect(worker)"
                            :class = "{
                                'active': this.defaultChat=='worker'
                            }"
                            class="chat_nav_left" v-if="showWorker">{{this.workName}}</li>
                        </ul>
                    </div>
                    <div style="chat_body">
                        <Message :chatType="worker" v-if="currentChat=='worker'" :sessionId="currSessionId" />
                        <Message :chatType="owner" v-if="currentChat=='owner'" :sessionId="currSessionId" />
                    </div>
                </el-main>
                <el-aside class="project-option" width="150px"  v-bind:style="{height: listHeight}">
                    
                    <div class="project-name">{{this.projectName}}</div>
                    <ul class="project-option-tab">
                        <li><i class="el-icon-bell"></i><span>查看提醒</span></li>
                        <li><i class="el-icon-date"></i><span>查看任务</span></li>
                        <li><i class="el-icon-goods"></i><span>查看材料商</span></li>
                        <li><i class="el-icon-tickets"></i><span>成员列表</span></li>
                        <li><i class="el-icon-edit-outline"></i><span>添加提醒</span></li>
                    </ul>
                </el-aside>
                </el-container>
            </el-main>
        </el-container>
    </div>
</template>
<script>
/* eslint-disable */
import util from '../../utils'
import config from '../../configs'
import projectMessage from '../../components/chat/messageList'
import projectList  from '../../components/chat/projectList'
import Message from '../../components/chat/message.vue'
import projectListVue from '../../components/chat/projectList.vue';
import Log from '../../common/Log';

export default {
    components: {
        projectMessage,projectList,Message
    },
    created(){
        if(this.currSessionId == null){
            //console.log('实例化1111111')
        }
    },
    data(){
        return {
            worker:'worker',
            owner:'owner',
            defaultActive:"message",
            defaultChat:'worker',
            teamType: 'advanced',
            heightData :(document.documentElement.clientHeight-60)+'px',
            chatHeight :(document.documentElement.clientHeight-102)+'px',
            listHeight : (document.documentElement.clientHeight-60)+'px',
            showWorker:false,
            showOwner:false,
            currentChat:false,
            workName:"施工群",
            ownerName:"业主群",
            supplierName:"供应商",
            isLoad : true,
            isChat : false,
            projectName:'',
        }
    },
    watch:{
        currSessionProjectInfo (news, old){
            var projectInfo = this.currSessionProjectInfo
            var sessionId = this.currSessionId
            var auth = this.currSessionProjectInfo.auth;
            var door = this.currSessionProjectInfo.door == null ? "":this.currSessionProjectInfo.door
            var workname = '施工群'
            var ownerName = '业主群'
            this.projectName = this.currSessionProjectInfo.name + door
            if(auth.indexOf("100")>=0){
                if(sessionId == "team-" + this.currSessionProjectInfo.chat1Id){
                    this.defaultChat = 'worker';
                    this.currentChat = 'worker'
                }else if(sessionId == "team-" + this.currSessionProjectInfo.chat2Id){
                    this.defaultChat = 'owner';
                    this.currentChat = 'owner'
                }
                this.isChat = true;
                this.showWorker = true;
                this.showOwner = true;
                this.workName = workname;
                this.ownerName = ownerName;
            }else if(auth.indexOf("101")>=0){
                //客户群 
                if(sessionId == "team-" + this.currSessionProjectInfo.chat2Id){
                    this.defaultChat = 'owner';
                }
                this.currentChat = 'owner'
                this.isChat = true;
                this.showWorker = false;
                this.showOwner = true;
                this.ownerName = ownerName;
            }else if(auth.indexOf("102")>=0){
                //施工群
                if(sessionId == "team-" + this.currSessionProjectInfo.chat1Id){
                    this.defaultChat = 'worker';
                }
                this.currentChat = 'worker'
                this.isChat = true;
                this.showOwner = 0;
                this.showWorker = 1;
                this.workName = workname;
            }
            return this.currSessionProjectInfo;
        }
    },
    computed: {
        currSessionProjectInfo() {
            let currSessionProjectInfo = this.$store.state.currSessionProjectInfo
            console.log('调整项目', currSessionProjectInfo)
            if(currSessionProjectInfo == null){
                this.$message({
                message: '你已经被移出当前项目,',
                type: 'error'
              });
              // TODO 需要删除操作
            }
            return currSessionProjectInfo;
        },
        currSessionId (){
            return this.$store.state.currSessionId
        },
        sysMsgUnread () {
            let temp = this.$store.state.sysMsgUnread
            let sysMsgUnread = temp.addFriend || 0
            sysMsgUnread += temp.team || 0
            let customSysMsgUnread = this.$store.state.customSysMsgUnread
            console.log(customSysMsgUnread, sysMsgUnread)
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
            //console.log('未读条数',item)
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
            this.isLoad = false
            return sessionlist
        }
    },
    methods: {
        chatSelect(key, keyPath){
            this.defaultActive = key
        },
        ownerSelect(tab){
            let currSessionProjectInfo = this.currSessionProjectInfo
            console.log('当前项目详情', currSessionProjectInfo)
            let sessionId = ""
            if(tab == 'worker'){
                sessionId = 'team-' + currSessionProjectInfo.chat1Id
            }else if(tab == 'owner'){
               sessionId = 'team-' + currSessionProjectInfo.chat2Id
            }
            if(sessionId){
                console.log(sessionId);
                this.$store.commit('updateCurrSessionId', {
                    type: 'init',
                    sessionId: sessionId
                });
                this.$store.commit('updateCurrSessionMsgs', {
                    type: 'init',
                    sessionId: sessionId
                });
            }
            this.defaultChat = tab.name
        }
        
  },
  
}
</script>
<style scoped>
    .el-main{
        background: #fff;
    }
    .el-aside{
        border-right: 1px solid #ddd;
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

        background:#f0f2f7;
    }

    .el-tabs{
        padding: 0px;
    }
    .el-tab-pane{
        margin: 0px;
        padding:0px 0px;
        width:100%;
        text-align: left;
    }
    

    .el-tabs__item{
        padding: 0px;
    }

    .load {
        font-size:11px;
    }


    .chat_nav{
        margin: 0px;
        padding: 0px;
        height:45px;
        border-bottom: 1px solid #e9e9e9;
    }

    .chat_nav li{
        text-align: center;
        width: 60px;
        border: 1px solid #e9e9e9;
        border-top: 0px solid #e9e9e9;
        height: 25px;
        line-height: 25px;
        font-size: 13px;
        cursor: pointer;
        padding: 10px;
        margin: 0px;
        /* background: red; */
        float: left;
    }
    .chat_nav .active{
        /* background: rgb(74, 154, 251); */
        color: #000;
        background: url("../../../static/selected.png") no-repeat;
        background-size:100%;
        border-bottom:0px solid #ccc;
        /* background: none; */
        /* border-bottom: 1px solid rgb(74, 154, 251); */
    }
    .chat_nav .chat_nav_left{
        max-width: 180px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        float: left;
    }
    .chat_nav .chat_nav_right{
        float: right;
    }

    .chat_nav .chat_nav_right span{
        border: 1px solid #ccc;
        padding: 3px 3px;
        border-radius: 3px;
    }
    .chat_nav .chat_nav_right span:hover{
        background: #ddd;
    }

    .chat_body{
        background: red;
        width: 100%;
        text-align: left;
    }
    .project-option{
        background-color: #f9f9f9;
    }
    .project-option .project-name{
        font-size: 13px;
        height: 35px;
        padding: 5px;
        text-align: center;
        border-bottom: 1px solid #e9e9e9;
    }
    .project-option .project-option-tab{
        padding-left: 30px;
        text-align: left;
        list-style: none;
    }
    .project-option-tab li{
        width: 100px;
        cursor: pointer;
        height: 30px;
        margin: 0px;
        line-height: 30px;
        font-family: MicrosoftYaHei;
        font-size: 13px;
    }
    .project-option-tab li span{
        margin-left: 10px;
        display: inline-block;
        color: #333333;
        vertical-align: middle;
    }
    .project-option-tab li i{
        color: #6e6e6e;
        font-size: 20px;
        vertical-align: middle;

    }
</style>

<style>
    #chat_info .el-tabs--border-card .el-tabs__content{
        padding: 0px;
    }
    #chat_info .el-tabs--border-card>.el-tabs__content{
        padding: 0px;
    }
    
    #chat .el-menu-item{
        height: 45px;
        line-height: 43px;
        width: 50%;
    }
</style>