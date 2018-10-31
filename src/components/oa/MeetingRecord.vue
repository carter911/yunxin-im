<template>

    <div class="meeting_layer_top">


        <div id="id_meeting_detail" class="meeting_detail">

            <el-container v-show="!this.showAddDialog">
                <el-aside class="panel-left" width="22rem" v-bind:style="{'height' : (this.$store.state.windowClientHeight - 61) + 'px'}">

                    <el-menu :router="false" :default-active="this.status" class="el-menu-demo" mode="horizontal">
                        <el-menu-item index="0">会议记录列表</el-menu-item>
                    </el-menu>

                    <el-button style="margin-top: 10px;width: 95%;text-align: center" type="primary" v-if="this.showCreateBtn" @click="addNewRecord">新增会议记录</el-button>

                    <div v-if="!this.checkPageDataEmpty"
                         class="meeting_list_item"
                         v-bind:style="{'height' : (this.$store.state.windowClientHeight -156) + 'px'}">
                        <MeetingRecordItem @onItemClick="onItemClick" v-for="(item,index) in this.getCurrentMeetingList"
                                           :key="index"
                                           :currentId="meetingId"
                                           :item="item">

                        </MeetingRecordItem>

                        <div v-if="this.shouldShowLoadMore">
                            <BottomLoading :loadingType="this.bottomLoadingType"
                                           @loadingMore="loadingMore">
                            </BottomLoading>
                        </div>

                    </div>

                    <div v-if="this.checkPageDataEmpty">
                        <img class="data-img-empty" src="../../../static/pic_content_empty.png"/>
                    </div>


                </el-aside>

                <el-main v-show="checkMeetingDetail" class="panel-right"
                         v-bind:style="{'height' : (this.$store.state.windowClientHeight - 106) + 'px'}">

                    <el-card>
                        <div class="add_meeting_btn" style="cursor: pointer">
                            <el-button type="primary" size="mini" v-if="this.showCanEditOrDeleteBtn" @click="openDialog">重新编辑</el-button>
                            <el-button type="danger" size="mini" v-if="this.showCanEditOrDeleteBtn" @click="deleteMeetingRecord">删除记录</el-button>
                        </div>

                        <div class="meeting_detail_html" v-html="meetingDetail"></div>

                    </el-card>
                </el-main>

            </el-container>

            <div class="meeting_edit" v-if="this.showAddDialog">

                <WangEditorRecord @closeMeetingAddDialog="closeMeetingAddDialog"
                    :oaGroupIds="this.oaGroupIds"
                    :meeting_title="this.meetingTitle"
                    :meeting_desc="this.meetingDesc"
                    :meeting_detail="this.meetingUpdateDetail"
                    :meeting_id="this.meetingId"></WangEditorRecord>
            </div>

        </div>

    </div>


</template>

<script>

    import WangEditorRecord from "./WangEditorRecord"
    import MeetingRecordItem from './MeetingRecordItem'
    import MeetingDetail from './MeetingDetail'


    import http from "../../utils/http"
    import Log from '../../common/Log';
    import ElAside from "element-ui/packages/aside/src/main";
    import ElMain from "element-ui/packages/main/src/main";

    import BottomLoading from "../../components/common/BottomLoading.vue"


    export default {
        name: "meeting-record",
        components: {
            ElMain,
            ElAside,
            MeetingRecordItem,
            MeetingDetail,
            BottomLoading,
            WangEditorRecord
        },


        data() {
            return {
                status: '0',

                dialogShow: false,
                showAddDialog: false,

                pageIndex: 1,
                pageSize: 10,

                meetingItemList: [],

                meetingDetail: "",
                meetingTitle:"",
                meetingDesc:"",
                meetingUpdateDetail:"",
                oaGroupIds:[],
                meetingCreatedUId:"0",

                meetingId: '',

                canCreateMeeting:false,

                bottomLoadingType : 0 ,
                bottomCanLoadMore : true,

            }
        },

        computed: {
            showCreateBtn(){
              return this.canCreateMeeting ;
            },

            showCanEditOrDeleteBtn(){
                let userInfo = JSON.parse(localStorage.getItem('userinfo'));
                console.log("---showEditOrDelete---", this.meetingCreatedUId  , userInfo.userId);

                return null != userInfo && (this.meetingCreatedUId === ""+userInfo.userId) ;
            },


            //获取当前会议列表
            getCurrentMeetingList() {
                return this.meetingItemList;
            },

            checkPageDataEmpty() {
                console.log("--empty--",this.meetingItemList.length);
                console.dir(this.meetingItemList);
                return this.meetingItemList.length === 0 ;
            },

            checkMeetingDetail(){
                return null != this.meetingDetail && this.meetingDetail.length > 0 ;
            },

            shouldShowLoadMore(){
                return this.bottomCanLoadMore ;
            }

        },

        methods: {

            deleteMeetingRecord () {
                this.$confirm('您将删除该会议记录？', '确定', {
                    confirmButtonText: '确认',
                    cancelButtonText: '暂不删除',
                    type: 'error'
                }).then(() => {
                    console.log("------>>>delete")
                    this.realDelete()

                }).catch(() => {
                });
            },

            realDelete() {
                let _that = this;

                let url = "meetingdel" ;
                http.post(url,{
                    id:this.meetingId
                }).then(response => {
                    if(response.code === 200){
                        this.showMsg("success","删除成功");

                        _that.pageIndex = 1 ;
                        _that.request_meeting_record();

                    }else{
                        this.showMsg("info","删除异常(" + response.code + ")");
                    }
                }, error => {
                    this.showMsg("error", "会议记录删除,请稍后重试")
                })
            },

            addNewRecord(){
                this.meetingId = "";
                this.meetingTitle = "";
                this.meetingDesc = "";
                this.meetingUpdateDetail = "";
                this.oaGroupIds = [] ;
                this.showAddDialog = true;
            },

            onItemClick(item) {
                console.log("onItemClick:" + item.id);

                if (this.meetingId !== item.id) {
                    this.meetingId = item.id;
                    this.meetingTitle = item.title;
                    this.meetingDesc = item.desc;
                    this.meetingUpdateDetail = item.content;
                    this.meetingCreatedUId = item.user_id;

                    this.get_meeting_detail();
                }

                if(null != item.look_list && item.look_list.length > 0){
                    this.oaGroupIds = [].concat(item.look_list.split(","));
                }

                console.log("oaGroupIds", this.oaGroupIds);
            },


            dialogBeforeClose(action, instance, done) {
                this.clearAndReset('remindForm');
            },

            openDialog() {
                this.showAddDialog = true;
            },

            closeMeetingAddDialog(hasCommitData) {
                this.showAddDialog = false;
                if(hasCommitData) {
                    this.pageIndex = 1 ;
                    this.request_meeting_record();
                }
            },

            showMsg(type, msg) {
                this.$message({
                    message: msg,
                    type: type
                })
            },

            //获取会议的详细内容
            get_meeting_detail() {
                if (null === this.meetingId || '' === this.meetingId) return;
                let url = 'Share/Meeting/index/id/' + this.meetingId;

                console.log("----url---",url);
                http.get(url).then(response => {

                    let regex = /<body[^>]*>([\s\S]*)<\/body>/;
                    let result = response.match(regex);

                    this.meetingDetail = result[0];
                })
            },

            loadingMore(){
              this.bottomLoadingType = 1 ;
              this.pageIndex++ ;
              this.request_meeting_record();
            },


            request_meeting_record() {
                let params = {
                    pageIndex: this.pageIndex,
                    pageSize: this.pageSize
                };

                let url = "meetingList";
                http.get(url, params).then(response => {
                    let result = response;
                    Log.L(result);

                    if (result.code === 200) {
                        this.parseData(result.data);

                    } else {
                        this.showMsg("error", "请求数据失败(" + result.code + ")")
                    }
                }, error => {
                    this.showMsg("error", "请求失败,请稍后重试")
                })
            },

            //查询用户权限
            request_user_auth(){
                let _that = this;

                let url = "oaAuth" ;
                http.get(url,{}).then(response => {
                    if(response.code === 200){
                        _that.canCreateMeeting = response.data.is_meeting_create === 1
                    }

                }, error => {
                    //ignore
                })

            },

            parseData(data) {
                if (this.pageIndex === 1) {
                    this.meetingItemList = [];
                }

                this.bottomCanLoadMore = null != data && data.length >= this.pageSize;

                if(null != data && data.length > 0) {
                    this.meetingItemList = this.meetingItemList.concat(data);
                }

                if(null != this.meetingItemList && this.meetingItemList.length > 0 && this.pageIndex === 1) {
                    let item = this.meetingItemList[0];

                    this.meetingId = item.id;
                    this.meetingTitle = item.title;
                    this.meetingDesc = item.desc;
                    this.meetingUpdateDetail = item.content;
                    this.meetingCreatedUId = item.user_id;

                    if(null != item.look_list && item.look_list.length > 0){
                        this.oaGroupIds = [].concat(item.look_list.split(","));
                    }

                    this.get_meeting_detail();
                }

                //更改底部加载状态
                this.bottomLoadingType = 0 ;

                console.dir(this.meetingItemList);
            }
        },

        created() {
            this.request_meeting_record();
            this.get_meeting_detail();
            this.request_user_auth();
        }
    }

</script>


<style scoped>

    #id_meeting_detail .el-menu-item {
        height: 45px;
        line-height: 43px;
        width:100%;
    }

    .meeting_edit{
        width: 100%;
    }

    .add_new_record{
        padding: 6px 8px;
        background-color: #1ab6ff;
        color: #FFF;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
    }

    .add_meeting_btn{
        text-align: right;
        font-size: 14px;
    }

    .meeting_list_item{
        overflow: auto;
    }

    .meeting_list_item::-webkit-scrollbar {/*滚动条整体样式*/
        width: 0px;     /*高宽分别对应横竖滚动条的尺寸*/
        height: 0px;
    }

    .meeting_list_item::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
        border-radius: 0px;
        -webkit-box-shadow: inset 0 0 0px #1ab6ff;
        background: #1ab6ff;
    }

    .meeting_list_item::-webkit-scrollbar-track {/*滚动条里面轨道*/
        -webkit-box-shadow: inset 0 0 0px rgba(0,0,0,0.2);
        border-radius: 0;
        background: rgba(0,0,0,0.1);
    }

    .meeting_detail_html {
        text-align: left;
    }

    .el-card__body p {
        text-align: left;
        font-size: 14px;
    }


    .add_btn{
        cursor: pointer;
        background-color: #5daf34;
        border-radius: 4px;
        padding:6px 12px;
        margin-right: 2%;
        color: #FFF;
    }

    .delete_btn {
        cursor: pointer;
        background-color: #ff4d51;
        border-radius: 4px;
        padding: 6px 12px;
        color: #FFF;
    }

    .meeting_layer_top {
        background-color: #FFF;
        display: block;

    }

    .meeting_detail {
        display: flex;
        margin-top: 0px;
        align-items: flex-start;
        padding-left: 6px;
        padding-right: 6px;
        border-bottom: solid 1px #e6e6e6;
    }

    .panel-left {
        cursor: pointer;
        margin: 0px;
        background: white;
        border-right: rgb(237, 237, 237) 1px solid;
        height: 100%;
    }

    .panel-right {
        background: #ffffff;
        float: right;
        margin: 2%;
        height: 100%;
        width: 96%;
        min-width: 200px;
    }

    .data-img-empty {
        width: 180px;
        height: 180px;
        margin-top: 12px;
    }


</style>