<template>
    <el-col
            :class="{
        'active': item.teamId == this.sessionId,
        'message-info' : 1===1,
        } "
            :span="24">

        <el-col :span="4">
            <img class="avatar" v-bind:src="this.avatar"/>
        </el-col>

        <el-col :span="16">
            <div @click='projectInfo(item)' class="project-list grid-content bg-purple-dark">
                <h2>{{item.name}}({{item.memberNum}})</h2>
            </div>
        </el-col>

        <el-col :span="2">
            <el-badge v-if="unReadNum()>0" :value="unReadNum()" class="item"></el-badge>
        </el-col>

    </el-col>
</template>
<script>
    import util from '../../utils'

    export default {
        data() {
            return {
                avatar: "../../../static/chat.png",
            }
        },

        props: {
            item: {
                type: Object,
                required: true,
            },

            isOAItem: {
                type: Boolean,
                required: false
            }
        },

        computed: {
            sessionId() {
                let sessionId = this.isOAItem ? this.$store.state.OACurrentSessionId : this.$store.state.currSessionId
                if (sessionId !== null) {
                    sessionId = sessionId.replace("team-", "").replace("oa-", "");
                }

                return sessionId;
            }
        },

        methods: {

            unReadNum() {
                if (!this.isOAItem) return 0;

                //只是为了每次消息
                let s = this.$store.state.sessionlist;
                console.log("--unReadNum--","----to refresh msg");


                let currentSession =  this.$store.state.sessionMap["team-"+ this.item.teamId];
                return null == currentSession ? 0 : currentSession.unread ;
            },


            projectInfo(item) {
                //console.log('项目 列表 -----------------', item);
                //console.dir(this.$store.state.sessionMap);

                //alert(item.id);

                if (this.isOAItem) {
                    //更新sessionId
                    let sessionId = "oa-" + item.teamId;
                    this.$store.commit("updateOASessionId", {
                        type: 'init',
                        oaSessionId: sessionId
                    });

                    //更新OA系统聊天记录
                    this.$store.commit('updateOASessionMsg', {
                        type: 'init',
                        oaSessionId: sessionId
                    });

                } else {
                    let sessionId = "team-" + item.teamId;
                    this.$store.commit('updateCurrSessionId', {
                        type: 'init',
                        sessionId: sessionId
                    });

                    this.$store.commit('updateCurrSessionMsgs', {
                        type: 'init',
                        sessionId: sessionId
                    });
                }
            }
        }

    }
</script>
<style scoped>
    .el-badge {
        position: relative;
        vertical-align: middle;
        display: inline-block;
        margin-top: 12px;
    }

    .message-info {
        cursor: pointer;
        text-align: left;
        border-bottom: 1px solid #ddd;
        padding: 3px 10px 3px 10px;
        height: 50px;
    }

    .message-info .avatar {
        height: 35px;
        width: 35px;
        margin-top: 4px;
    }

    .message-info h2 {
        font-size: 14px;
        margin-top: 11px;
        font-weight: normal;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .time {
        margin-top: 14px;
        font-size: 11px;
    }

    .message-info .active {
        background: #f0f2f7;
    }

    .project-list {
        width: 100%;
        height: 30px
    }
</style>