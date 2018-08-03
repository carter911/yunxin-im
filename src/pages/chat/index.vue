<template>
    <div id="chat">
        <el-container>
            <el-aside class="chat-left" width="270px"
                      v-bind:style="{height: (this.$store.state.windowClientHeight-60)+'px'}">
                <div class="grid-content bg-purple chatBar">
                    <el-menu :default-active="this.defaultActive" class="el-menu-demo" mode="horizontal"
                             @select="chatSelect">
                        <el-menu-item index="message">我的消息</el-menu-item>
                        <el-menu-item index="project">项目列表</el-menu-item>
                    </el-menu>
                </div>
                <el-col :span="24" class="pannel-left"
                        v-bind:style="{height: (this.$store.state.windowClientHeight-107)+'px'}">
                    <div class="keyword">
                        <el-input v-model="keyword" placeholder="请输入要查找的群组或者名称">
                            <i slot="prefix" class="el-input__icon el-icon-search"></i>
                        </el-input>
                    </div>
                    <div>
                        <el-row v-if="this.defaultActive == 'message'">
                            <projectMessage
                                    v-for='(item,index) in sessionlist'
                                    :item='item'
                                    :key="index"
                                    :currSessionId="currSessionId"
                            />
                        </el-row>
                        <el-row v-if="this.defaultActive == 'project'">
                            <projectList
                                    v-for="(item,index) in teamList"
                                    :item='item'
                                    :key="index"
                                    :currSessionId="currSessionId"
                            />
                        </el-row>
                    </div>
                </el-col>
            </el-aside>
            <el-main v-if="isP2p">
                <el-container style="" v-if="isP2p"
                              v-bind:style="{height: (this.$store.state.windowClientHeight-60)+'px'}">
                    <el-main>
                        <div v-if="isP2p" id="chat_info">
                            <ul class="chat_nav" width="90px">
                                <li style="width:90px;" class="active" v-if="showOwner">{{this.p2pName}}</li>
                            </ul>
                        </div>
                        <div style="width:100%">
                            <Message style="width:100%" :sessionId="currSessionId"
                                     :chatHeight="(this.$store.state.windowClientHeight-236)+'px'"/>
                        </div>
                    </el-main>
                    <!-- <Message style="width:100%" :sessionId="currSessionId" /> -->
                </el-container>
                <el-container class="empty-chat" v-if="!isP2p" v-bind:style="{height: chatHeight}">
                    <div><img src="../../../static/nochat.png"/></div>
                </el-container>
            </el-main>
            <el-main v-if="isTeam">
                <el-container class="empty-chat" v-if="!isTeam"
                              v-bind:style="{height: (this.$store.state.windowClientHeight-60)+'px'}">
                    <div><img src="../../../static/nochat.png"/></div>
                </el-container>
                <el-container v-if="isTeam" v-bind:style="{height: (this.$store.state.windowClientHeight-60)+'px'}">
                    <el-main>
                        <div v-if="isTeam" id="chat_info">
                            <ul class="chat_nav">
                                <li
                                        @click="ownerSelect(owner)"
                                        :class="{
                                'active': this.defaultChat=='owner'
                            }"
                                        class="chat_nav_left" v-if="showOwner">{{this.ownerName}}
                                </li>
                                <li
                                        @click="ownerSelect(worker)"
                                        :class="{
                                'active': this.defaultChat=='worker'
                            }"
                                        class="chat_nav_left" v-if="showWorker">{{this.workName}}
                                </li>
                            </ul>
                        </div>
                        <div style="chat_body">
                            <Message :chatType="worker" v-if="currentChat=='worker'" :sessionId="currSessionId"
                                     :chatHeight="(this.$store.state.windowClientHeight-236)+'px'"/>
                            <Message :chatType="owner" v-if="currentChat=='owner'" :sessionId="currSessionId"
                                     :chatHeight="(this.$store.state.windowClientHeight-236)+'px'"/>
                        </div>
                    </el-main>
                    <el-aside class="project-option" width="150px"
                              v-bind:style="{height: (this.$store.state.windowClientHeight-60)+'px'}">
                        <div class="project-name">{{this.projectName}}</div>
                        <ul v-if="currSessionProjectInfo.auth" class="project-option-tab">
                            <li v-if="currSessionProjectInfo.auth.indexOf('402')>=0"><i class="el-icon-bell"></i><span
                                    @click="this.lookRemind">
                            查看提醒 <b style="color:red;" v-if="projectDetail.messageNum>0">({{this.projectDetail.messageNum}})</b>
                        </span></li>
                            <li v-if="currSessionProjectInfo.auth.indexOf('312')>=0"><i class="el-icon-date"></i><span
                                    @click="this.lookTask">查看任务<b style="color:red;" v-if="projectDetail.taskNum>0">({{this.projectDetail.taskNum}})</b></span>
                            </li>
                            <li v-if="currSessionProjectInfo.auth.indexOf('801')>=0"><i class="el-icon-goods"></i><span
                                    @click="this.lookSupplier">查看材料商</span></li>
                            <li v-if="currSessionProjectInfo.auth.indexOf('212')>=0"><i
                                    class="el-icon-tickets"></i><span @click="this.lookUserList">成员列表</span></li>
                            <li v-if="currSessionProjectInfo.auth.indexOf('704')>=0"><i
                                    class="el-icon-star-off"></i><span @click="this.lookCollection">我的收藏</span></li>
                            <li v-if="currSessionProjectInfo.auth.indexOf('401')>=0"><i
                                    class="el-icon-edit-outline"></i><span @click="this.addNewRemind">添加提醒</span></li>
                            <li v-if="currSessionProjectInfo.auth.indexOf('303')>=0"><i class="el-icon-edit"></i><span
                                    @click="this.addNewTask">添加任务</span></li>
                        </ul>
                    </el-aside>
                </el-container>
            </el-main>
        </el-container>

        <!-- 右侧显示提醒/任务/用户列表 -->
        <div id="right-popup-1" class="right-popup"
             :style="{'right' : show_right_pop ? '0px' : '-100%', 'height' : (this.$store.state.windowClientHeight - 61) + 'px' }">
            <RightPannel :projectId="this.projectId"
                         :showType="this.projectShowType"
                         @getRemindDetail="this.getRemindDetail"
                         @getTaskDetail="this.getTaskDetail"
                         @closeRightPannel="this.closeRightPannel">
            </RightPannel>
        </div>

        <!-- 右侧显示提醒/任务 详情 -->
        <div id="right-popup-2" class="right-popup"
             :style="{'right' : '0px' , 'height' : (this.$store.state.windowClientHeight - 61) + 'px'}"
             v-if="this.show_right_detail_pop">
            <RightDetailPannel
                    :showType="this.show_right_detail_type"
                    :remindId="this.currentRemindId"
                    :taskId="this.currentTaskId"
                    @closeDetailRightPannel="closeDetailRightPannel">
            </RightDetailPannel>
        </div>

        <div id="right-popup-3" class="right-popup"
             :style="{'right' : pannelLeft+'px' , 'height' : (this.$store.state.windowClientHeight - 61) + 'px'}"
             v-if="this.show_right_supplier_pop">
            <supplierList
                    :projectId="this.projectId"
                    @closeRightSupplier="closeRightSupplier"
            ></supplierList>
        </div>

        <!-- 显示我的收藏 -->
        <div id="right-popup-4" class="right-popup"
             :style="{'right' : pannelLeft+'px' , 'height' : (this.$store.state.windowClientHeight - 61) + 'px'}"
             v-if="this.show_collection_list">
            <collectionList
                    :companyId="this.currSessionProjectInfo.companyId"
                    :projectId="this.projectId"
                    @closeCollectionList="closeCollectionList"
            ></collectionList>
        </div>

        <!-- 添加新提醒 -->
        <div v-if="this.showAddNewRemind">
            <NewRemindAdd :pid="this.projectId"
                          @closeNewRemindAddDialog='closeNewRemindAddDialog'>
            </NewRemindAdd>
        </div>

        <div v-if="this.showAddNewTask">
            <NewTaskAdd :pid="this.projectId"
                        @closeTaskAddDialog="closeTaskAddDialog">
            </NewTaskAdd>
        </div>


    </div>
</template>
<script>
    /* eslint-disable */
    import util from '../../utils'
    import projectMessage from '../../components/chat/messageList'
    import projectList from '../../components/chat/projectList'
    import Message from '../../components/chat/message.vue'
    import Log from '../../common/Log';

    import RightPannel from "../project/RightPannel.vue"
    import RightDetailPannel from "../project/RightDetailPannel.vue"
    import NewRemindAdd from "../../components/remind/NewRemindAdd.vue"
    import NewTaskAdd from "../../components/task/NewTaskAdd.vue"
    import supplierList from "../../components/supplier/suplierList.vue"
    import collectionList from "../../components/supplier/collectionList.vue"

    export default {
        components: {
            projectMessage,
            projectList,
            Message,
            RightPannel,
            RightDetailPannel,
            NewRemindAdd,
            NewTaskAdd,
            supplierList,
            collectionList
        },

        created() {
            let projectInfo = localStorage.getItem('currSessionProjectInfo')
        },

        data() {
            return {
                keyword: '',
                worker: 'worker',
                owner: 'owner',
                defaultActive: "message",
                defaultChat: 'worker',
                teamType: 'advanced',
                heightData: (this.$store.state.windowClientHeight - 60) + 'px',
                p2pHeight: (this.$store.state.windowClientHeight - 60) + 'px',
                chatHeight: (this.$store.state.windowClientHeight - 160) + 'px',
                listHeight: (this.$store.state.windowClientHeight - 107) + 'px',
                showWorker: false,
                showOwner: false,
                currentChat: false,
                workName: "施工群",
                ownerName: "业主群",
                supplierName: "供应商",
                isLoad: true,
                //isChat : false,
                isTeam: false,
                isP2p: false,
                p2pName: '',
                projectName: '',
                pannelLeft: -540,
                //当前项目Id
                projectId: 0,
                //当前显示项目提醒&任务列表
                projectShowType: 0,
                //是否显示右侧面板
                show_right_pop: false,
                //显示详情类型
                //0 为提醒详情
                //1 为任务详情
                show_right_detail_type: 0,
                //是否显示提醒/任务 详情
                show_right_detail_pop: false,
                //当前提醒Id
                currentRemindId: 0,
                //当前任务Id
                currentTaskId: 0,
                //是否显示添加提醒
                showAddNewRemind: false,
                //是否显示添加任务
                showAddNewTask: false,
                // 是否显示供应商列表
                show_right_supplier_pop: false,
                // 是否显示商品列表
                show_chat_list: false,
                //是否显示收藏
                show_collection_list: false,
                projectDetail: {
                    messageNum: 0,
                    taskNum: 0,
                }

            }
        },

        watch: {
            getCurrentRemindId:function(newOne,oldOne){
                if(null === newOne || 0 === newOne) return ;
                this.projectDetail.messageNum = Math.max(0,this.projectDetail.messageNum -1)
            },

            getCurrentTaskId:function (newOne, oldOne) {
                if(null === newOne || 0 === newOne) return ;
                this.projectDetail.taskNum = Math.max(0,this.projectDetail.taskNum -1)
            }
        },
        computed: {
            getCurrentRemindId: function () {
                return this.$store.getters.getCurrentRemindId;
            },

            getCurrentTaskId: function () {
                return this.$store.getters.getCurrentTaskId
            },

            currSessionProjectInfo() {
                let currSessionProjectInfo = this.$store.state.currSessionProjectInfo
                console.log('调整项目', currSessionProjectInfo)
                if (currSessionProjectInfo == null) {
                    this.$message({
                        message: '你已经被移出当前项目,',
                        type: 'error'
                    });
                    // TODO 需要删除操作
                }
                return currSessionProjectInfo;
            },

            currSessionId() {
                let projectInfo = localStorage.getItem('currSessionProjectInfo')
                console.error('------------>', projectInfo)
                let sessionId = this.$store.state.currSessionId

                if (sessionId != null) {
                    if (sessionId.indexOf('p2p') >= 0) {
                        this.isP2p = true;
                        this.isTeam = false;
                        sessionId = sessionId.replace(/^p2p-/, '')
                        this.p2pName = this.userInfos[sessionId]['nick']
                        console.error('单聊', sessionId)
                    } else if (sessionId.indexOf('team') >= 0) {
                        this.isTeam = true;
                        this.isP2p = false;
                        console.error('群聊', this.$store.state.currSessionProjectInfo)
                        this.selectTeam(sessionId)
                    }
                }
                return this.$store.state.currSessionId
            },
            sysMsgUnread() {
                let temp = this.$store.state.sysMsgUnread
                let sysMsgUnread = temp.addFriend || 0
                sysMsgUnread += temp.team || 0
                let customSysMsgUnread = this.$store.state.customSysMsgUnread
                console.log(customSysMsgUnread, sysMsgUnread)
                return sysMsgUnread + customSysMsgUnread
            },
            userInfos() {
                return this.$store.state.userInfos
            },
            myInfo() {
                return this.$store.state.myInfo
            },
            myPhoneId() {
                return `${this.$store.state.userUID}`
            },
            teamList: function () {
                let keyword = this.keyword;
                return this.$store.state.teamlist && this.$store.state.teamlist.filter(team => {
                    if (this.defaultActive == 'project' && team.name.indexOf(keyword) == -1) {
                        return false;
                    }
                    return team.type === this.teamType && team.validToCurrentUser
                })
            },
            sessionlist() {
                let keyword = this.keyword;
                let sessionlist = this.$store.state.sessionlist.filter(item => {
                    item.name = ''
                    item.avatar = ''
                    //console.log('未读条数',item)
                    if (item.scene === 'p2p') {
                        //console.error('p2p用户信息',item.scene,this.userInfos[item.to])
                        let userInfo = null
                        if (item.to !== this.myPhoneId) {
                            userInfo = this.userInfos[item.to]
                        } else {
                            return false
                        }
                        if (userInfo) {
                            item.name = userInfo.nick//util.getFriendAlias(userInfo)
                            item.avatar = userInfo.avatar
                            // console.error('p2p',item)
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

                    if (this.defaultActive == 'message' && item.name.indexOf(keyword) == -1) {
                        return false;
                    }
                    return item
                })
                this.isLoad = false
                // console.error('历史聊天',sessionlist)
                return sessionlist
            }
        },

        methods: {
            //是否可以添加任务
            canAddNewTask() {
                let projectInfo = this.$store.state.currSessionProjectInfo

                return projectInfo != null &&
                    projectInfo.auth != null &&
                    projectInfo.auth.indexOf(Log.CREATE_NEW_TASK()) >= 0 &&
                    projectInfo.statusCode != Log.PROJECT_TYPE_COMPLETED();
            },
            addNewTask() {
                this.showAddNewTask = true;
            },

            closeTaskAddDialog() {
                this.showAddNewTask = false;
            },

            addNewRemind() {
                this.showAddNewRemind = true;
            },

            closeNewRemindAddDialog() {
                this.showAddNewRemind = false;
            },

            lookRemind() {
                this.show_right_pop = true;
                this.projectShowType = 0;
            },

            lookTask() {
                this.show_right_pop = true;
                this.projectShowType = 1;
            },

            lookSupplier() {
                let self = this
                let x = 0
                let timer = setInterval(function () {
                    if (self.pannelLeft >= 0) {
                        clearInterval(timer);
                    }
                    else {
                        let size = (x - 10) * (x - 10)
                        x = x + 1;
                        console.log(self.pannelLeft)
                        var currLeft = self.pannelLeft + size * 1.5;
                        if (currLeft > 0) {
                            currLeft = 0;
                        }
                        self.pannelLeft = currLeft;
                    }
                }, 30);
                this.show_right_supplier_pop = true;
            },

            lookCollection() {
                console.log(this.pannelLeft)
                let self = this
                let x = 0
                let timer = setInterval(function () {
                    if (self.pannelLeft >= 0) {
                        clearInterval(timer);
                    }
                    else {
                        let size = (x - 10) * (x - 10)
                        x = x + 1;
                        console.log(self.pannelLeft)
                        var currLeft = self.pannelLeft + size * 1.5;
                        if (currLeft > 0) {
                            currLeft = 0;
                        }
                        self.pannelLeft = currLeft;
                    }
                }, 30);
                this.show_collection_list = true;
            },


            lookUserList() {
                this.show_right_pop = true;
                this.projectShowType = 2;
            },

            //获取提醒详情
            getRemindDetail(remindId) {
                this.show_right_detail_type = 0;
                this.currentRemindId = remindId;
                this.show_right_detail_pop = true;
            },

            //获取任务详情
            getTaskDetail(taskId) {
                this.show_right_detail_type = 1;
                this.currentTaskId = taskId;
                this.show_right_detail_pop = true;
            },

            //关闭详情pannel
            closeDetailRightPannel() {
                this.show_right_detail_pop = false;
            },

            //关闭供应商列表
            closeRightSupplier() {
                console.log('父组件关闭')
                this.pannelLeft = -540
                this.show_right_supplier_pop = false;
            },
            //关闭我的收藏
            closeCollectionList() {
                console.log('父组件关闭')
                this.pannelLeft = -540
                this.show_collection_list = false;
            },

            closeRightPannel() {
                this.show_right_pop = false;
                this.projectShowType = 0;
            },

            chatSelect(key, keyPath) {
                this.defaultActive = key
                this.keyword = ""
            },
            ownerSelect(tab) {
                let currSessionProjectInfo = this.currSessionProjectInfo
                console.log('当前项目详情', currSessionProjectInfo)
                let sessionId = ""
                if (tab == 'worker') {
                    sessionId = 'team-' + currSessionProjectInfo.chat1Id
                } else if (tab == 'owner') {
                    sessionId = 'team-' + currSessionProjectInfo.chat2Id
                }
                if (sessionId) {
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
            selectTeam(sessionId) {
                var projectInfo = this.currSessionProjectInfo
                this.projectId = projectInfo.id;

                this.projectDetail.messageNum = projectInfo.messageNum
                this.projectDetail.taskNum = projectInfo.taskNum
                console.log('项目详情', projectInfo);
                var auth = this.currSessionProjectInfo.auth;
                var door = this.currSessionProjectInfo.door == null ? "" : this.currSessionProjectInfo.door
                var workname = '施工群'
                var ownerName = '业主群'
                this.projectName = this.currSessionProjectInfo.name + door
                if (auth == null) {
                    return true;
                }
                if (auth.indexOf("100") >= 0) {
                    if (sessionId == "team-" + this.currSessionProjectInfo.chat1Id) {
                        this.defaultChat = 'worker';
                        this.currentChat = 'worker'
                    } else if (sessionId == "team-" + this.currSessionProjectInfo.chat2Id) {
                        this.defaultChat = 'owner';
                        this.currentChat = 'owner'
                    }
                    this.showWorker = true;
                    this.showOwner = true;
                    this.workName = workname;
                    this.ownerName = ownerName;
                } else if (auth.indexOf("101") >= 0) {
                    //客户群
                    if (sessionId == "team-" + this.currSessionProjectInfo.chat2Id) {
                        this.defaultChat = 'owner';
                    }
                    this.currentChat = 'owner'

                    this.showWorker = false;
                    this.showOwner = true;
                    this.ownerName = ownerName;
                } else if (auth.indexOf("102") >= 0) {
                    //施工群
                    if (sessionId == "team-" + this.currSessionProjectInfo.chat1Id) {
                        this.defaultChat = 'worker';
                    }
                    this.currentChat = 'worker'

                    this.showOwner = 0;
                    this.showWorker = 1;
                    this.workName = workname;
                }
            }

        },

    }
</script>
<style scoped>
    .el-main {
        background: #fff;
    }

    .el-aside {
        border-right: 1px solid #ddd;
        background: #fff;
    }

    .pannel-left {
        overflow: auto;
    }

    .el-menu {
        height: 45px;
        line-height: 45px;
    }

    .el-menu-item {
        height: 45px;
        line-height: 45px;
        width: 50%;
    }

    .active {

        background: #f0f2f7;
    }

    .el-tabs {
        padding: 0px;
    }

    .el-tab-pane {
        margin: 0px;
        padding: 0px 0px;
        width: 100%;
        text-align: left;
    }

    .el-tabs__item {
        padding: 0px;
    }

    .load {
        font-size: 11px;
    }

    .chat_nav {
        margin: 0px;
        padding: 0px;
        height: 45px;
        border-bottom: 1px solid #e9e9e9;
    }

    .chat_nav li {
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

    .chat_nav .active {
        /* background: rgb(74, 154, 251); */
        color: #000;
        background: url("../../../static/selected.png") no-repeat;
        background-size: 100%;
        border-bottom: 0px solid #ccc;
        /* background: none; */
        /* border-bottom: 1px solid rgb(74, 154, 251); */
    }

    .chat_nav .chat_nav_left {
        max-width: 180px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        float: left;
    }

    .chat_nav .chat_nav_right {
        float: right;
    }

    .chat_nav .chat_nav_right span {
        border: 1px solid #ccc;
        padding: 3px 3px;
        border-radius: 3px;
    }

    .chat_nav .chat_nav_right span:hover {
        background: #ddd;
    }

    .chat_body {
        background: red;
        width: 100%;
        text-align: left;
    }

    .project-option {
        background-color: #f9f9f9;
    }

    .project-option .project-name {
        font-size: 13px;
        height: 35px;
        padding: 5px;
        text-align: center;
        border-bottom: 1px solid #e9e9e9;
    }

    .project-option .project-option-tab {
        padding-left: 20px;
        text-align: left;
        list-style: none;
    }

    .project-option-tab li {
        width: 110px;
        cursor: pointer;
        height: 30px;
        margin: 0px;
        line-height: 30px;
        font-family: MicrosoftYaHei;
        font-size: 13px;
    }

    .project-option-tab li span {
        margin-left: 10px;
        display: inline-block;
        color: #333333;
        vertical-align: middle;
    }

    .project-option-tab li i {
        color: #6e6e6e;
        font-size: 20px;
        vertical-align: middle;

    }

    .empty-chat div {
        width: 100%;
        vertical-align: middle;
        margin-top: 30%;

    }

    .empty-chat div img {
        height: 150px;
        width: 150px;
    }

    .keyword {
        height: 40px;
        margin: 0 auto;
        line-height: 40px;
        margin-top: 10px;
        width: 90%;
    }
</style>

<style>
    #chat_info .el-tabs--border-card .el-tabs__content {
        padding: 0px;
    }

    #chat_info .el-tabs--border-card > .el-tabs__content {
        padding: 0px;
    }

    #chat .el-menu-item {
        height: 45px;
        line-height: 43px;
        width: 50%;
    }

    #chat .right-popup {
        position: fixed;
        z-index: 999;
        right: -100%;
        top: 0px;
        width: 500px;
        max-width: 100%;
        background: #fff;
        display: none;
        border: 1px solid #d2d2d2;
        border-right: none;
        top: 60px;
        height: 640px;
        display: block;
        overflow: auto;
        box-shadow: 0px 4px 16px #888888;
    }

</style>