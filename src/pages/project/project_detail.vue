<template>
    <!-- 中间显示具体项目 -->
    <div> 
         <div class="content"  v-loading='data_request_loading'>
            
            <!-- 项目详情 开始 -->
            <el-card class="content-box-card">
                   <el-row>
                        <el-col :span="16">
                            <div class="project-detail">
                            <span class="project-title">{{(project.name || '') + " " + (project.door || '')}}</span><br/>
                            <span class="project-detail">施工时间：{{project.startTime | formatDate }} &nbsp;至&nbsp;
                                                         {{ project.endTime | formatDate}}</span><br/>
                            <span class="project-detail">施工单位：{{project.company}}</span><br/>
                            <span class="project-detail">当前角色：{{getCurrentRoleName()}}</span>
                        </div>
                       </el-col>

                        <el-col :span="8">
                        <div class="project-status">
                            <span class="project-status-span" v-bind:style="{'background-color': getProjectStatusColor()}"> {{ project.statusMessage }}</span>
                        </div>
                    </el-col>
                  </el-row> 

                  <hr/>

                  <el-row>
                    <el-col :span="18">
                        <div class="product-remind-title">
                            <span>提醒</span>
                        </div>
                            
                    </el-col>

                    <el-col :span="6" class="product-remind-right">    
                           <span class="project-remind-add" v-on:click="this.addNewRemind">添加</span>
                           <span v-on:click="getMore(0)">更多</span>
                    </el-col>
                    
                  </el-row>
                  <hr/>

                  <div>

                    <RemindItem :remindList="this.remindList"
                                @getRemindDetail="this.getRemindDetail"
                    ></RemindItem>
    
                 </div>

            </el-card>
            <!-- 项目详情 结束 -->

             <!-- 任务 开始 -->
            <el-card class="content-box-card">
                <div>
                    <el-row>
                            <el-col :span="18">
                                <div class="product-remind-title">
                                        <span> 任务</span>
                                </div>
                                    
                            </el-col>

                            <el-col :span="6" class="product-remind-right">    
                                   <span v-if="checkNewTaskAddAuth()" class="project-remind-add" v-on:click="this.addNewTask">添加</span> 
                                   <span v-on:click="getMore(1)">更多</span>
                            </el-col>
                    </el-row>
                    <hr/>

                    <div>
                        <TaskItem :taskList="this.taskList" 
                                  @getTaskDetail="this.getTaskDetail"
                        ></TaskItem>
                  </div>
               </div>

            </el-card>
            <!-- 任务 结束 -->
                
            <!-- 材料商 开始 -->
                <!-- <el-card class="content-box-card"></el-card> -->
            <!-- 材料商 结束 -->
        </div>

        <!-- 右侧显示详情界面 -->
        <div id="left-popup" class="left-popup" 
            :style="{'right' : show_right_pop ? '0px' : '-100%', 'height' : (this.$store.state.windowClientHeight - 61) + 'px' }"> 
                <RightPannel :projectId="this.pid"  
                            :remindId="this.currentRemindId"
                            :taskId="this.currentTaskId"
                            :showType="this.rightPannelShowType"
                            @getRemindDetail="this.getRemindDetail"
                            @getTaskDetail="this.getTaskDetail"
                            @closeRightPannel="this.closeRightPannel">
                </RightPannel>
        </div>

        <div id="left-popup" class="left-popup" 
            :style="{'right' : '0px' , 'height' : (this.$store.state.windowClientHeight - 61) + 'px'}" v-if="this.show_right_detail_pop"> 
                <RightDetailPannel :showType="this.show_right_detail_type" 
                                :remindId="this.currentRemindId"
                                :taskId="this.currentTaskId"
                                @closeDetailRightPannel="closeDetailRightPannel">

                </RightDetailPannel>
        </div>

        <!-- 添加新提醒 -->
        <div v-if="this.showAddNewRemind">
            <NewRemindAdd :pid="this.pid" 
                        @closeNewRemindAddDialog='closeNewRemindAddDialog'>
            </NewRemindAdd>

        </div>

        <div v-if="this.showAddNewTask">
            <NewTaskAdd :pid="this.pid"
                        @closeTaskAddDialog="closeTaskAddDialog">
            </NewTaskAdd>
        </div>
        
        </div>
       
</template>

<script>
    /* eslint-disable key-spacing */
    import Log from '../../common/Log';

    import RemindItem from "../../components/project/RemindItem.vue"
    import TaskItem from "../../components/project/TaskItem.vue"
    import NewRemindAdd from "../../components/remind/NewRemindAdd.vue"
    import NewTaskAdd from "../../components/task/NewTaskAdd.vue"

    import RightPannel from "./RightPannel.vue"
    import RightDetailPannel from "./RightDetailPannel.vue"
    import http from "../../utils/http"
    import sgbUtils from "../../utils/sgbUtils"

    let date = new Date();
    export default {
        components : {
            RemindItem,
            TaskItem,
            NewRemindAdd,
            NewTaskAdd,
            RightPannel,
            RightDetailPannel
        },

        computed: {
            getWindowClientHeight(){       
                return this.$store.state.windowClientHeight;
            }
        },

        props:{
            pid : {
                type:Number,
                required:true
            }
        },

        data(){
            return {
                project: {
                   startTime : 0,  //这里主要是为了避免时间显示 NAN-NAN
                   endTime : 0 
                },

                remindList :[] ,
                taskList : [],
                user_id : 530,

                show_right_pop : false,

                //当前点击提醒的id
                currentRemindId : 0 ,

                //当前点击的任务Id
                currentTaskId : 0 ,

                show_pop_type : 0 ,

                //又面板显示类型
                rightPannelShowType : 0 ,

                //显示提醒&任务 详情
                show_right_detail_pop: false ,

                show_right_detail_type : 0 ,

                //是否显示当前添加提醒
                showAddNewRemind: false,
                
                //是否显示当前新增任务
                showAddNewTask:false ,

                //数据请求中
                data_request_loading : true ,
            }      
        },
    
    mounted() {
        console.log("this log is " + this.pid)
    },

    methods: {
        getCurrentRoleName() {
            if(null == this.project || undefined == this.project) return "";
            return sgbUtils.getRoleNameById(this.project.roleId);         
        },

        closeNewRemindAddDialog(){
            this.showAddNewRemind = false;
        },

        closeTaskAddDialog(){
              this.showAddNewTask = false ;
        },

        //检查是否存在创建人物权限
        checkNewTaskAddAuth() {
            if(this.project == null || this.project == undefined || null == this.project.auth) return false;
            let auth = this.project.auth.indexOf(Log.CREATE_NEW_TASK()) >= 0;
            let operationId = this.project.optionRoleId == this.project.roleId;
            let projectStatus = this.project.statusCode != Log.PROJECT_TYPE_COMPLETED();
            return auth && operationId && projectStatus;
        },

        getProjectStatusColor(){
            if(this.project == null) return '#FFF';
            if(this.project.statusCode == 0) return "#12bd83" ;
            if(this.project.statusCode == 3) return "#f32234" ;
            if(this.project.statusCode == 5) return "#464646";
        },

        addNewRemind() {
            if(this.project == null) {
                this.$message({
                     message: "暂无项目",
                     type: 'error'
                   });
                return;
            }
            this.showAddNewRemind = true;
        },

        addNewTask(){
            this.showAddNewTask = true ;
        },
        
        getMore(type) {
            this.show_right_detail_pop = false ;
            this.rightPannelShowType = type;
            this.show_right_pop = true;
        },

        //获取提醒详情
        getRemindDetail(remindId) {
            this.show_right_detail_type = 0 ;
            this.currentRemindId = remindId;
            this.show_right_detail_pop = true ;
        },

        //获取任务详情
        getTaskDetail(taskId) {
            this.show_right_detail_type = 1;
            this.currentTaskId = taskId;
            this.show_right_detail_pop = true ;
        },

        closeDetailRightPannel(){
            this.show_right_detail_pop = false;
        },
        
        action_close_pop() {
            this.show_right_pop = false;
        },

        //关闭外层面板
        closeRightPannel(){
            this.show_right_pop = false;
        },

        //获取产品详情
        require_project_detail() {
               this.data_request_loading = true;

               let url = this.pid + "/projects";
               http.get(url).then(response => {
                   this.data_request_loading = false;
                   Log.L(response);

                   let newResult = response; 
                   let result = newResult.code;
                   if(result == 200 ) {
                       this.project = newResult.data ;
                   }else {
                       this.project = {}
                   }
               }, response => {
                    this.data_request_loading = false;
                    this.project = {}
                    Log.success_msg("请求失败，稍后重试")
               });
        },

        //获取提醒信息
        require_remind_list() {
            let url = this.user_id +  "/usermessage";
            var params = {
                              projectId:this.pid,
                              pageSize: 2,
                              isActive:"-1",
                              pageIndex: 1}

            http.get(url, params).then(response => {
                Log.L2("good",response);

                let result = response;
                if(result.code == 200) {
                    this.remindList = result.data || [] ;
                }else {
                    this.remindList = [];
                }
             },response => {
                //TODO 
        });
    },

    //获取任务信息
    require_task_list() {
          let url = this.pid + "/projecttask" ;
          var params = 
          {
            projectId:this.pid,
            pageSize: 2,
            isActive:"0",
            pageIndex:1
         }

         http.get(url,params).then(response => {
             Log.L(response) ;

             let result = response;
             if(result.code == 200 ){
                 this.taskList =  result.data || [] ;
              } else {
                 this.taskList = [];
             }
        
         }, response => {
             //TODO 
            
         })             
      },
    },

    //事件监听
    watch : {
        pid : function(val , oldVal) {
            console.log("--xxxx--->>" + val + "---" + oldVal)
            if(val == undefined || val == '' || val.length == 0) return;

            this.require_project_detail();
            this.require_remind_list();
            this.require_task_list();
        }
    }

}
</script>

<style scoped>

 .content-box-card {
     margin-left: 5%;
     margin-right: 5%;
     margin-top: 12px;
     margin-bottom: 12px;
     width: 90%;
 }

 hr {
    height:2px;
    border:none;
    border-top:1px dotted #185598;
 }

 .project-remind-add{
     color: #F92309;
     cursor: hand;
     padding-left: 8px;
     padding-right: 8px;
 }

 .product-remind-title {
     text-align:left;
     font-size:15px;
     padding:2px;
     cursor:hand;
 }
 .product-remind-right{
     text-align:right;
     font-size:13px;
     color:#464646;
     padding-right:4px;
 }

  .content {
      line-height: 16px;
      width: 100%;
      background-color: #ffffff;
  }

 .project-detail{
     padding: 0px;
     /* width: 80%; */
     min-width: 240px;
     line-height: 20px;
     text-align: left;
 }

 .project-title {
     font-size: 15px;
     color: #494949;
 }

 .project-detail {
     font-size: 12px;
     color: #464646;
     line-height: 24px;
 }

 .project-status {
     text-align: right;
     padding-top: 30px;
     padding-bottom: 30px;
     height: 100%;
 }

.project-status-span{
    padding-left: 12px;
    padding-right: 12px;
    padding-top: 4px;
    padding-bottom: 4px;
    background-color: #12bd83;
    font-size: 12px;
    border-radius: 6px;
    color: #ffffff;
}

  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 480px;
  }

  .left-popup {
    position: fixed;
    z-index: 999;
    right: -100%;
    top: 0px;
    width: 540px;
    max-width: 100%;
    background: #fff;
    display: none;
    border: 1px solid #d2d2d2;
    border-right: none;
    top: 60px; 
    height: 640px; 
    display: block;
    overflow:auto;
}

</style>


