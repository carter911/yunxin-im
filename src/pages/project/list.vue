<template>
    <div id="project">
        <el-container>
            <el-aside class="pannel-left" width="22rem"
                      v-bind:style="{'height' : (this.$store.state.windowClientHeight - 60) + 'px'}">
                <el-menu :router="false" :default-active="this.status" class="el-menu-demo" mode="horizontal"
                         @select="handleSelect">
                    <!--<el-menu-item index="-1">全部</el-menu-item>-->
                    <el-menu-item index="-1">{{this.allProjectNumStr}}</el-menu-item>
                    <el-menu-item index="0">{{this.goingProjectNumStr}}</el-menu-item>
                    <el-menu-item index="4">{{this.delayProjectNumStr}}</el-menu-item>
                    <el-menu-item index="5">{{this.overProjectNumStr}}</el-menu-item>
                </el-menu>

                <div class="block">
                    <!-- 主体展示container -->
                    <el-main class='project_content_class'
                             v-bind:style="{'height' : (this.$store.state.windowClientHeight - 121) + 'px'}"
                             v-loading='request_data_loading'>

                        <div v-for="item in this.getTargetArray()"
                             :style="{'background-color': current_pid === item.id ? '#f2f2f2' : '#fff'}"
                             class="project_list" :key="item.id"
                             v-if="!checkPageDataEmpty()"
                             @click="onItemClick(item)">

                            <div>{{item.name}}  <span class="span_message" v-if="item.messageNum>0">消息({{item.messageNum}})</span>
                                                <span class="task_message" v-if="item.taskNum> 0">任务({{item.taskNum}})</span></div>

                            <el-progress :percentage="item.schedule" v-if="item.status === 0"></el-progress>
                            <span class='project_statuc_desc' v-bind:style="{color: find_status_color(item.status)}"
                                  v-if="item.status > 0">{{ find_status_msg(item.status) }}</span>
                        </div>

                        <div v-if="checkPageDataEmpty()">
                            <img class="data-img-empty" src="../../../static/pic_content_empty.png"/>
                        </div>

                        <div v-if="this.shouldShowLoadMore()">
                            <BottomLoading :loadingType="this.buttomLoadingType"
                                           @loadingMore="loadingMore">
                            </BottomLoading>
                        </div>
                    </el-main>
                </div>
            </el-aside>

            <el-main class="pannel-right"
                     v-bind:style="{'height' : (this.$store.state.windowClientHeight - 60) + 'px'}">

                <ProjectDetail :pid="current_pid" v-show="this.current_pid > 0"></ProjectDetail>

            </el-main>
        </el-container>
    </div>

</template>

<script>

    import _project_detail from './project_detail.vue'
    import BottomLoading from "../../components/common/BottomLoading.vue"
    import http from "../../utils/http"
    import sgbLocalInfo from "../../utils/localInfo"

    export default {

        components: {
            "ProjectDetail": _project_detail,
            BottomLoading
        },

        data() {
            return {
                temp: true,

                status: "-1",
                currentStatus: -1,  //默认先加载全部
                pageShow: 0,
                pageSize: 15,
                projectTotal: 0,

                // 数据加载状态
                request_data_loading: true,

                current_pid: 0,

                buttomLoadingType: 0,  //底部加载更多状态

                buttomShowloadMore: false,  //底部加载是否显示

                allProject: new ProjectListEntity(), //全部

                projectGoing: new ProjectListEntity(), //进行中

                projectDealy: new ProjectListEntity(), //已延期

                projectOver: new ProjectListEntity(), //已结束

                allProjectNum: 0,
                goingProjectNum: 0,
                delayProjectNum: 0,
                overProjectNum: 0
            }
        },

        computed: {
            allProjectNumStr() {
                return this.allProjectNum > 0 ? "全部(" + this.allProjectNum + ")" : "全部";
            },
            goingProjectNumStr() {
                return this.goingProjectNum > 0 ? "进行中(" + this.goingProjectNum + ")" : "进行中";
            },
            delayProjectNumStr() {
                return this.delayProjectNum > 0 ? "延期(" + this.delayProjectNum + ")" : "延期";
            },
            overProjectNumStr() {
                return this.overProjectNum > 0 ? "结束(" + this.overProjectNum + ")" : "结束";
            }
        },

        methods: {

            getProjectLocalSaveKey() {
                switch (this.currentStatus) {
                    default:
                    case -1:
                        return "all_project";
                    case 0:
                        return "project_going";
                    case 4:
                        return "project_dealy";
                    case 5:
                        return "project_over";
                }
            },

            /**
             * 检查页面是否为空
             */
            checkPageDataEmpty() {
                switch (this.currentStatus) {
                    default:
                    case -1:
                        return this.allProject.dataIsEmpty;
                    case 0:
                        return this.projectGoing.dataIsEmpty;
                    case 4:
                        return this.projectDealy.dataIsEmpty;
                    case 5:
                        return this.projectOver.dataIsEmpty;
                }
            },

            shouldShowLoadMore() {
                switch (this.currentStatus) {
                    default:
                    case -1:
                        return this.allProject.canLoadMore;
                    case 0:
                        return this.projectGoing.canLoadMore;
                    case 4:
                        return this.projectDealy.canLoadMore;
                    case 5:
                        return this.projectOver.canLoadMore;
                }
            },

            getTargetArray() {
                switch (this.currentStatus) {
                    default:
                    case -1 :
                        return this.allProject.list;
                    case 0 :
                        return this.projectGoing.list;
                    case 4 :
                        return this.projectDealy.list;
                    case 5:
                        return this.projectOver.list;
                }
            },

            dataHasBeenLoaded() {
                switch (this.currentStatus) {
                    default:
                    case -1 :
                        return this.allProject.hasBeenLoading;
                    case 0 :
                        return this.projectGoing.hasBeenLoading;
                    case 4 :
                        return this.projectDealy.hasBeenLoading;
                    case 5:
                        return this.projectOver.hasBeenLoading;
                }
            },

            find_status_color(status){
                if (status === 2) return "#12bd83";
                if (status === 4 || status === 31 || status === 32) return "#f32234";
                if (status === 5) return "#464646";
                if (status === -2) return "#298092";
                return "#000";
            },

            find_status_msg(status) {
                if (status === 2) return "申请延期中";
                if (status === 4 || status === 31 || status === 32) return "已延期";
                if (status === 5) return "已结束";
                if (status === -2) return "意向项目[过时]";
                return "";
            },

            loadingMore() {
                //显示加载中
                this.get_list(this.currentStatus, false);
            },

            //获取项目内容
            get_project_number() {
                let _that = this;
                http.get("systemlist", {}).then(response => {
                    let projectNum = response.data.project_num;
                    _that.goingProjectNum = parseInt(projectNum["601"]);
                    _that.delayProjectNum = parseInt(projectNum["602"]);
                    _that.overProjectNum = parseInt(projectNum["603"]);
                    _that.allProjectNum = _that.goingProjectNum + _that.delayProjectNum + _that.overProjectNum;
                }, error => {
                    console.log(error);
                })
            },


            get_list(status = 0, isRefresh = true) {
                console.log("---3-->>" + status);
                if (this.dataHasBeenLoaded() && isRefresh) {
                    return;
                }

                let url = 'projectlists';
                let pageIndex = this.getCurrentPageIndex();
                if (pageIndex === 1) {
                    let tempData = sgbLocalInfo.getStorage(this.getProjectLocalSaveKey())
                    if (null != tempData && undefined == tempData) {
                        this.parseLocalProjectInfo(status, pageIndex);
                        return;
                    }

                    this.request_data_loading = true;
                }

                this.buttomLoadingType = 1;
                let params = {
                    status: status,
                    pageSize: this.pageSize,
                    pageIndex: pageIndex
                };

                http.get(url, params).then(response => {
                    var result = response
                    console.log(result)
                    //数据请求结束
                    this.request_data_loading = false;
                    if (result.code === 200) {
                        this.parseProjectInfo(status, pageIndex, result.data);
                    } else {
                        this.$message({
                            message: result.message,
                            type: 'error'
                        });
                    }

                    this.buttomLoadingType = 0;
                }, response => {
                    // error callback
                    this.buttomLoadingType = 0;
                })
            },

            parseProjectInfo(status, pageIndex, data) {
                switch (status) {

                    case -2 :  //意向
                        this.innerParseData(this.allProject, pageIndex, data);
                        break;

                    case -1 :  //全部
                        this.innerParseData(this.allProject, pageIndex, data);
                        break;

                    case 0 :
                        this.innerParseData(this.projectGoing, pageIndex, data);
                        break;

                    case 4:
                        this.innerParseData(this.projectDealy, pageIndex, data);
                        break;

                    case 5 :
                        this.innerParseData(this.projectOver, pageIndex, data);
                        break;
                }
            },

            /**
             * 加载本地数据
             */
            parseLocalProjectInfo(status, pageIndex) {
                switch (status) {
                    case -1 :  //全部
                        this.loadLocalData(this.allProject, pageIndex);
                        break;

                    case 0 :
                        this.loadLocalData(this.projectGoing, pageIndex);
                        break;

                    case 4:
                        this.loadLocalData(this.projectDealy, pageIndex);
                        break;

                    case 5 :
                        this.loadLocalData(this.projectOver, pageIndex);
                        break;
                }
            },

            /**
             * 加载本地数据
             */
            loadLocalData(obj, pageIndex) {
                let localData = sgb_storage.getStorage(this.getProjectLocalSaveKey());
                if (localData == null || localData == undefined) return false;

                obj.currentPageIndex = localData.length / this.pageSize + 1;
                obj.hasBeenLoading = true;
                obj.list = obj.list.concat(localData);
                obj.canLoadMore = localData.length >= this.pageSize * obj.currentPageIndex;

                //单独设置pid
                if (pageIndex == 1) {
                    this.current_pid = data[0].id;
                }

                obj.dataIsEmpty = !(obj.list != null && obj.list.length);
                return true;
            },


            innerParseData(obj, pageIndex, data) {
                if (pageIndex === 1) {
                    obj.list = [];
                }

                obj.currentPageIndex = pageIndex + 1;
                obj.hasBeenLoading = true;
                if (data != null && data !== undefined) {
                    obj.list = obj.list.concat(data);

                    console.dir(obj);

                    obj.canLoadMore = data.length >= this.pageSize;

                    //单独设置pid
                    if (pageIndex === 1) {
                        this.current_pid = data[0].id;
                    }

                } else {
                    obj.canLoadMore = false;
                }

                obj.dataIsEmpty = !(obj.list != null && obj.list.length);
            },

            getCurrentPageIndex() {
                switch (this.currentStatus) {
                    case -1:
                        return this.allProject.currentPageIndex;
                    case 0:
                        return this.projectGoing.currentPageIndex;
                    case 4:
                        return this.projectDealy.currentPageIndex;
                    case 5:
                        return this.projectOver.currentPageIndex;
                }
                return 1;
            },


            handleSelect(key, keyPath) {
                console.log("-----handleSelect---",key);

                this.status = key;
                this.currentStatus = parseInt(key);
                this.get_list(this.currentStatus);
            },

            handleSizeChange(val) {
                //alert(val)
                this.get_list(this.currentStatus, val);
            },

            handleCurrentChange(val) {
                this.get_list(this.currentStatus, val);
            },

            onItemClick(item) {
                this.current_pid = item.id;
                console.log("----the current_pid-----" + this.current_pid);
            }

        },

        created() {
            this.get_list(-1);  //先加载全部数据
            this.get_project_number();  //获取项目内容

        },

        beforeDestroy() {
            sgbLocalInfo.setStorage("all_project", this.allProject);
            sgbLocalInfo.setStorage("project_going", this.projectGoing);
            sgbLocalInfo.setStorage("project_dealy", this.projectDealy);
            sgbLocalInfo.setStorage("project_over", this.projectOver);
        },


    }


    //创建
    class ProjectListEntity {
        constructor() {
            this.list = [],  //数组集合
            this.canLoadMore = false,       //是否可加载更多
            this.currentPageIndex = 1,      //当前加载页面
            this.hasBeenLoading = false,    //是否加载过
            this.dataIsEmpty = false        //数据是否为null
        }
    }


</script>

<style scoped>

    .span_message{
        background-color: #12bd83;
        padding: 4px;
        border-radius: 2px;
        font-size: 10px;
        color: #FFF;
    }

    .task_message{
        background-color: #ff4d51;
        padding: 4px;
        border-radius: 2px;
        font-size: 10px;
        color: #FFF;
    }


    .data-img-empty {
        width: 160px;
        height: 160px;
        margin-top: 80px;
    }

    .pannel-left {
        cursor: pointer;
        margin: 0px;
        background: white;
        border-right: rgb(237, 237, 237) 1px solid;
        height: 100%;
    }

    .pannel-right {
        background: #f0f2f7;
        float: right;
        height: 100%;
        width: 100%;
        min-width: 200px;
    }

    .project {
        padding: 0px;
        margin: 0px;
        font-size: 12px;
        text-align: left;
        height: 80%;
    }

    .project_list {
        font-size: 14px;
        height: 60px;
        margin-bottom: .2rem;
        line-height: 30px;
        text-align: left;
        padding-left: .7rem;
        padding-right: .7rem;
        border-bottom: 1px solid #f2f2f2;
    }

    .project_content_class {
        height: 500px;
        overflow: auto;
        background-color: #ffffff;
    }

    .project_statuc_desc {
        color: #464646;
        font-size: 12px;
    }

</style>
<style>
    #project .el-menu-item {
        line-height: 58px;
        padding: 0 12px;
    }

    #project .el-progress__text {
        font-size: 12px;
        color: #999999;
        display: inline-block;
        vertical-align: middle;
        margin-left: 10px;
        line-height: 1;
    }


</style>

