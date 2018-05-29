
<template>
    <div id="chat">
        <el-container>
            <el-aside width="19rem" v-bind:style="{height: heightData}">
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
                                v-for = 'item in sessionlist'
                                :item ='item'
                                />
                        </el-row>
                        <el-row v-if="this.defaultActive == 'project'">
                            <projectList ref="projectList"
                                v-for="item in teamList"
                                :item='item'
                                />
                        </el-row>
                    </div>
                </el-col>
            </el-aside>
        <el-main>
            <div v-if="isChat" id="chat_info">
                <el-tabs  v-model="defaultChat" @tab-click="ownerSelect" type="border-card">
                    <el-tab-pane v-bind:style="{height: chatHeight}" v-if="showWorker" v-bind:label="workName" name="worker">
                        <Message :chatType="worker" />
                    </el-tab-pane>
                    <el-tab-pane v-bind:style="{height: chatHeight}" v-if="showOwner" v-bind:label="ownerName" name="owner">
                        <Message :chatType="owner" />
                    </el-tab-pane>
                </el-tabs>
            </div>
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
export default {
    components: {
        projectMessage,projectList,Message
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
            listHeight : (document.documentElement.clientHeight-150)+'px',
            showWorker:0,
            showOwner:0,
            workName:"施工群",
            ownerName:"业主群",
            isLoad : true,
            isChat : false,
        }
    },
    updated(){
        console.log('我更新了');
    },
    watch:{
        currSessionProjectInfo (){
            let sessionId = this.$store.state.currSessionId
            var auth = this.currSessionProjectInfo.auth;
            let workname = this.currSessionProjectInfo.name + this.currSessionProjectInfo.door +'(施工群)'
            let ownerName = this.currSessionProjectInfo.name + this.currSessionProjectInfo.door +'(业主群)'
            for(var i in auth) {
                if(auth[i] == 100){
                    if(sessionId == "team-" + this.currSessionProjectInfo.chat1Id){
                        this.defaultChat = 'owner';
                    }else if(sessionId == "team-" + this.currSessionProjectInfo.chat2Id){
                        this.defaultChat = 'worker';
                    }
                    this.isChat = true;
                    this.showWorker = 1;
                    this.showOwner = 1;
                    this.workName = workname;
                    this.ownerName = ownerName;
                }else if(auth[i] == 101){
                    console.log(11111111111111111111);
                    if(sessionId == "team-" + this.currSessionProjectInfo.chat1Id){
                        this.defaultChat = 'worker';
                    }
                    this.isChat = true;
                    this.showWorker = 1;
                    this.workName = workname;
                }else if(auth[i] == 102){
                    console.log(102);
                    if(sessionId == "team-" + this.currSessionProjectInfo.chat2Id){
                        this.defaultChat = 'owner';
                    }
                    this.isChat = true;
                    this.showOwner = 1;
                    this.ownerName = ownerName;
                }
            }
            //／／console.log('实时监听', this.currSessionProjectInfo.auth)
        },
        currSessionId(){
        }
    },
    computed: {
        currSessionProjectInfo() {
            let currSessionProjectInfo = this.$store.state.currSessionProjectInfo
            //console.log('切换聊天1111', currSessionProjectInfo)
            return currSessionProjectInfo;
        },
        currSessionId() {
            let currSessionId = this.$store.state.currSessionId
            if(this.sessionlist.length>0 && currSessionId == null){
                let session = this.sessionlist.shift( )
                let sessionId = session.id
                this.$store.commit('updateCurrSessionId', {
                type: 'init',
                sessionId:sessionId
                });
                this.$store.commit('updateCurrSessionMsgs', {
                    type: 'init',
                    sessionId: sessionId
                });
            }
            
            return currSessionId;
        },
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
        defaultChatInfo(){
        },
        selectProject(){
            
        },
        chatSelect(key, keyPath){
            this.defaultActive = key
            console.log(this.defaultActive )
            if(key == 'message'){
                this.get_message();
            }else if(key == 'project'){
                this.get_project_list();
            }
        },
        ownerSelect(tab, event){
            let currSessionProjectInfo = this.$store.state.currSessionProjectInfo
            console.log(currSessionProjectInfo)
            let sessionId = ""
            if(tab.name == 'worker'){
                sessionId = 'team-' + currSessionProjectInfo.chat1Id
            }else if(tab.name == 'owner'){
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

        },
        get_message(){
            console.log('获取聊天记录')
        },
        get_project_list(){
            console.log('获取项目列表')
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
        background: #ddd;
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
        line-height: 45px;
        width: 50%;
    }
</style>