<template>
<keep-alive>
  <div class="g-inherit m-article">
    <div class="m-chat-main">
      <div class='invalidHint' v-if='scene==="team" && teamInvalid'>
        {{`您已退出该${teamInfo && teamInfo.type==='normal' ? '讨论组':'群'}`}}
      </div>
      <div  id="chat_list" class="chat_list" v-bind:style="{height: chatHeight}">
        <ChatList type="session" :canLoadMore="msgCanLoadMore" :isOAItem="isOAItem" :msglist="msglist" :userInfos="userInfos" :myInfo="myInfo" :isRobot="isRobot" @msgs-loaded="msgsLoaded" @msgFileDetail="msgFileDetail"/>
      </div>
      <div>
        <ChatEditor type="session" :sessionId="sessionId" :scene="scene" :to="to" :isOAItem="isOAItem" :isRobot="isRobot" :invalid="teamInvalid || muteInTeam" :invalidHint="sendInvalidHint" :advancedTeam="teamInfo && teamInfo.type === 'advanced'"/>
      </div>
    </div>

    <div v-if="this.showFileDetailDialog">
      <FileDetailDialog :detailMessage="this.detailMessage" @closeFileDetailDialog="closeFileDetailDialog"></FileDetailDialog>
    </div>

  </div>
  </keep-alive>
</template>
<script>
    import ChatEditor from "../../components/chat/ChatEditor";
    import ChatList from "../../components/chat/ChatList";
    import util from "../../utils";
    import pageUtil from "../../utils/page";

    import FileDetailDialog from "./FileDetailDialog";

    export default {
    components: {
        ChatEditor,
        ChatList,
        FileDetailDialog
    },

    props: {
        isOAItem: {
            type: Boolean,
            required: false,
            default() {
                return false
            },
        },

        chatType: {
            type: String,
            required: false
        },

        sessionId: {
            type: String,
            required: true
        },

        chatHeight: {
            type: String,
            required: true
        }
    },


    // 进入该页面，文档被挂载
    mounted() {
        //#
        // this.$store.dispatch("setCurrSession", this.sessionId);
    },

    created() {

        console.log('更新当前数据',this.chatType);
        if(this.chatType === 'worker'){
            pageUtil.scrollChatListDown();
        }
        if(this.chatType === 'owner'){
            pageUtil.scrollChatOwnerDown()
        } 
    },

    // 离开该页面，此时重置当前会话
    data() {
        return {
            lastMsgCount:0,
            msgCanLoadMore:true ,

            showFileDetailDialog:false,
            detailMessage:{},

            chat_height:(this.$store.state.windowClientHeight-236)+'px',

            leftBtnOptions: {
                backText: " ",
                preventGoBack: true
            }
        };
    },
    watch:{
        sessionId(){
            pageUtil.scrollChatListDown();
            this.lastMsgCount = 0 ;
            console.log("sessionId has changed....", this.lastMsgCount);


            // if(this.chatType == 'worker'){
            // }
            // if(this.chatType == 'owner'){
            //     pageUtil.scrollChatOwnerDown()
            // }
        },

        chatHeight(){
            console.log(this.chatHeight);
            // let height =  this.$store.state.windowClientHeight
            // this.chat_height = (height-236)+'px';
            // console.error('聊天高度',height)
        }
    },

    computed: {
        sessionName() {
            let sessionId = this.sessionId;
            let user = null;

            if (/^p2p-/.test(sessionId)) {
                user = sessionId.replace(/^p2p-/, "");
                if (user === this.$store.state.userUID) {
                    return "我的手机";
                } else if (this.isRobot) {
                    return this.robotInfos[user].nick;
                } else {
                    let userInfo = this.userInfos[user] || {};
                    return util.getFriendAlias(userInfo);
                }

            } else if (/^team-/.test(sessionId)) {
                if (this.teamInfo) {
                    // teamInfo中的人数为初始获取的值，在人员增减后不会及时更新，而teamMembers在人员增减后同步维护的人员信息
                    var members =
                        this.$store.state.teamMembers &&
                        this.$store.state.teamMembers[this.teamInfo.teamId];
                    var memberCount = members && members.length;
                    return (
                        this.teamInfo.name +
                        (memberCount ? `(${memberCount})` : "")
                    );
                } else {
                    return "群";
                }
            }
        },

        scene() {
            if(this.sessionId == null){
                return null;
            }

            //在父组件出入的变量，子组件中修改会直接报错
            let newSessionId = this.sessionId;
            newSessionId = newSessionId.replace("oa-","team-");

            return util.parseSession(newSessionId).scene;
        },
        to() {
            if(this.sessionId == null){
                return null;
            }

            let newSessionId = this.sessionId;
            newSessionId = newSessionId.replace("oa-","team-");

            return util.parseSession(newSessionId).to;
        },

        // 判断是否是机器人
        isRobot() {
            let sessionId = this.sessionId;
            let user = null;
            if (/^p2p-/.test(sessionId)) {
                user = sessionId.replace(/^p2p-/, "");
                if (this.robotInfos[user]) {
                    return true;
                }
            }
            return false;
        },
        myInfo() {
            return this.$store.state.myInfo;
        },
        userInfos() {
            return this.$store.state.userInfos;
        },
        robotInfos() {
            return this.$store.state.robotInfos;
        },

        msglist() {
            console.log("---msglist----------");

            return this.isOAItem ? this.$store.state.OACurrentSessionMsg : this.$store.state.currSessionMsgs;

            // let currentLen = msgList.length ;
            // if(this.lastMsgCount <= 0) {
            //     this.msgCanLoadMore = true ;
            // }else {
            //     this.msgCanLoadMore = currentLen - this.lastMsgCount >= 20;
            // }
            //
            // //false 31 26 false
            // console.log("isOAItem","--->>" + this.isOAItem, this.lastMsgCount , currentLen, this.msgCanLoadMore);
            //
            // this.lastMsgCount = currentLen;
            //return msgList ;
        },


        teamInfo() {
            if (this.scene === "team") {
                var teamId = this.sessionId.replace("oa-","").replace("team-", "");
                return this.$store.state.teamlist.find(team => {
                    return team.teamId === teamId;
                });
            }
            return undefined;
        },
        muteInTeam() {
            if (this.scene !== "team") return false;
            var teamMembers = this.$store.state.teamMembers;
            var Members = teamMembers && teamMembers[this.teamInfo.teamId];
            var selfInTeam =
                Members &&
                Members.find(item => {
                    return item.account === this.$store.state.userUID;
                });
            return (selfInTeam && selfInTeam.mute) || false;
        },

        teamInvalid() {
            if (this.scene === "team") {
                return !(this.teamInfo && this.teamInfo.validToCurrentUser);
            }
            return false;
        },
        sendInvalidHint() {
            if (this.scene === "team" && this.teamInvalid) {
                return `您已不在该${
                    this.teamInfo && this.teamInfo.type === "normal"
                        ? "讨论组"
                        : "群"
                }，不能发送消息`;
            } else if (this.muteInTeam) {
                return "您已被禁言";
            }
            return "无权限发送消息";
        }
    },
    methods: {
        msgsLoaded() {
            //console.log("----msgLoaded--------");
            pageUtil.scrollChatListDown(5500 ,1);
        },

        msgFileDetail(message){
            this.detailMessage = message ;
            this.showFileDetailDialog = true ;
            console.dir(message);
        },

        closeFileDetailDialog() {
            this.showFileDetailDialog = false;

        }
    }
};
</script>
<style scoped>
.g-window .m-tab .m-tab-right {
    width: 5rem;
    right: -1rem;
}
.m-tab-right {
    display: flex;
    justify-content: flex-end;
    .icon-history,
    .icon-team {
        display: inline-block;
        margin-right: 0.8rem;
        width: 1.7rem;
        height: 1.7rem;
        background: url(http://yx-web.nos.netease.com/webdoc/h5/im/icons.png);
        background-size: 20rem;
        background-position: -5.8rem -11.3rem;
    }
    .icon-team {
        background-position: -7.9rem -11.3rem;
    }
}
.invalidHint {
    width: 100%;
    height: 2rem;
    line-height: 2rem;
    text-align: center;
    background-color: bisque;
    color: burlywood;
}

.chat_list {
    background: #fff;
    overflow: auto;
}


.chat_list::-webkit-scrollbar {/*滚动条整体样式*/
  width: 5px;     /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}

.chat_list::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  background: #888;
}
.chat_list::-webkit-scrollbar-track {/*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  border-radius: 5px;
  background: #ddd;
}
</style>
<style>
.g-window .vux-header .m-tab-top {
    width: 80%;
    margin: 0 10%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>