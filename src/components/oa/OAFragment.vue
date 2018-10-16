<template>

    <div id="oa" class="oa-content">

        <el-container>
            <el-aside class="oa-left" width="270px"
                      v-bind:style="{height: (this.$store.state.windowClientHeight-60)+'px'}">
                <div v-on:click="this.hidePanel">

                    <div class="grid-content bg-purple chatBar">
                        <el-menu :default-active="this.defaultActive" class="el-menu-demo" mode="horizontal">
                            <el-menu-item index="project">{{this.oaTeamTitle}}</el-menu-item>
                        </el-menu>

                        <div class="keyword">
                            <el-input v-model="keyword" placeholder="请输入要查找的群组或者名称">
                                <i slot="prefix" class="el-input__icon el-icon-search"></i>
                            </el-input>
                        </div>
                    </div>

                    <el-col :span="24" class="pannel-left"
                            v-bind:style="{height: (this.$store.state.windowClientHeight-160)+'px'}">
                        <div>
                            <el-row>
                                <projectList
                                        v-for="(item,index) in oaTeamList"
                                        :item='item'
                                        :key="index"
                                        :isOAItem="true"
                                        :currSessionId="currSessionId"/>
                            </el-row>
                        </div>
                    </el-col>
                </div>
            </el-aside>


            <el-main>
                <el-container class="empty-chat" v-if="!isTeam"
                              v-bind:style="{height: (this.$store.state.windowClientHeight-60)+'px'}">
                    <div><img src="../../../static/nochat.png"/></div>
                </el-container>

                <el-container v-bind:style="{height: (this.$store.state.windowClientHeight-60)+'px'}">
                    <el-main>
                        <div id="chat_info1">
                            <ul class="chat_nav">
                                <li
                                        :class="{'active': 'owner'}"
                                        class="chat_nav_left">{{this.oaName}}
                                </li>
                            </ul>
                        </div>

                        <div style="chat_body" v-on:click="hidePanel">
                            <Message v-if="showOAChatFragment" :chatType="chatType"
                                     :sessionId="currSessionId"
                                     :isOAItem="true"
                                     :chatHeight="(this.$store.state.windowClientHeight-236)+'px'"/>

                        </div>
                    </el-main>

                </el-container>
            </el-main>
        </el-container>


    </div>

</template>

<script>

    import projectList from '../../components/chat/projectList.vue'
    import Message from '../../components/chat/message.vue'

    export default {

        name: "oa-fragment",

        components: {
            projectList,
            Message
        },

        data() {
            return {
                teamType: 'advanced',
                chatType: 'worker',
                defaultActive: 'project',

                isTeam: true,
                keyword: '',
                teamCount:0,
            }
        },

        computed: {
             oaTeamTitle() {
                 return this.teamCount > 0 ? "OA列表(" + this.teamCount + ")" : "OA列表";
             },

            oaName() {
                let oaSessionId = this.$store.state.OACurrentSessionId;
                if (null == oaSessionId) return "";

                oaSessionId = oaSessionId.replace("oa-", "");
                let teamInfo = this.$store.state.teamlist.find(team => {
                    return team.teamId === oaSessionId;
                });

                return teamInfo == null ? "" : teamInfo["name"];
            },

            //是否显示OA对话界面
            showOAChatFragment() {
                return this.$store.state.OACurrentSessionId !== null;
            },

            //显示当前OAsessionId
            currSessionId() {
                return this.$store.state.OACurrentSessionId;
            },

            oaTeamList: function () {
                //ignore

                let keyword = this.keyword;
                if(null == keyword) keyword = "";

                let totalResultList =  this.$store.state.teamlist && this.$store.state.teamlist.filter(team => {

                    let teamOwner = team.owner;
                    let result = null != teamOwner &&
                                 teamOwner.indexOf("sgb") > -1 &&
                                 team.validToCurrentUser &&
                                 team.name.indexOf(keyword) >= 0;

                    if (result && null == this.$store.state.OACurrentSessionId) { //默认加载第一个数据
                        this.$store.commit('updateOACurrentSession', {
                            type: 'init',
                            oaSessionId: "oa-" + team.teamId
                        })
                    }

                    return result;
                });

                this.teamCount = totalResultList === null ? 0 : totalResultList.length;

                return totalResultList;
            },
        },

        methods: {
            chatSelect(key) {},

            hidePanel() {
                console.log("click there...")
            }

        }

    }
</script>

<style scoped>

    .active {
        background: #f0f2f7;
    }

    .el-main {
        background: #fff;
    }

    .el-aside {
        border-right: 1px solid #ddd;
        background: #fff;
    }

    .oa-content {

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

    .pannel-left {
        overflow: auto;
    }

    .pannel-left::-webkit-scrollbar { /*滚动条整体样式*/
        width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
        height: 1px;
    }

    .chat_nav {
        margin: 0px;
        padding: 0px;
        height: 45px;
        border-bottom: 1px solid #e9e9e9;
    }

    .chat_nav li {
        text-align: center;
        width: 120px;
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

</style>

<style>

    #oa .el-menu-item {
        height: 45px;
        line-height: 43px;
        width: 100%;
    }


</style>