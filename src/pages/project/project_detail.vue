<template>

    <!-- 中间显示具体项目 -->
    <div> 
         <div class="content">
        
            <!-- 项目详情 开始 -->
            <el-card class="content-box-card">
                   <el-row>
                        <el-col :span="18">
                            <div class="project-detail">
                            <span class="project-title">{{project.name + " " + project.door}}</span><br/>
                            <span class="project-detail">施工时间：{{project.startTime | formatDate }}&nbsp;至&nbsp;
                                                        {{ project.endTime | formatDate}}</span><br/>
                            <span class="project-detail">施工单位：{{project.company}}</span>
                        </div>
                       </el-col>

                    <el-col :span="6">

                        <div class="project-status">
                            <span class="project-status-span"> {{ project.statusMessage }}</span>
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
                           <span v-on:click="this.addNewRemind">添加</span>
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
                                   <span v-on:click="this.addNewTask">添加</span> 
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
         :style="{'right' : show_right_pop ? '0px' : '-100%', 'height' : (this.$store.state.windowClientHeight - 60) + 'px' }"> 
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
         :style="{'right' : '0px' , 'height' : (this.$store.state.windowClientHeight - 60) + 'px'}" v-if="this.show_right_detail_pop"> 
            <RightDetailPannel :showType="this.show_right_detail_type" 
                               :remindId="this.currentRemindId"
                               :taskId="this.currentTaskId"
                               @closeDetailRightPannel="closeDetailRightPannel">

            </RightDetailPannel>
    </div>

    <!-- 添加新提醒 -->
    <div v-if="this.showAddNewRemind">
        <NewRemindAdd :pid="this.pid"></NewRemindAdd>
    </div>

    <div v-if="this.showAddNewTask">
        <NewTaskAdd :pid="this.pid"></NewTaskAdd>
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
                console.log("----getWindowClientheight-----" + this.$store.state.windowClientHeight);
                
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
                project: {},
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
                showAddNewTask:false
            }      
        },
    

    mounted() {
        console.log("this log is " + this.pid)
    },

    methods: {
        addNewRemind() {
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
               let url = this.pid + "/projects";
               this.$http.get(url).then(response => {
                   Log.L(response.data);

                   let newResult = response.data; 
                   let result = newResult.code;
                   if(result == 200 ) {
                       this.project = newResult.data ;
                   }else {
                       this.project = {}
                   }
               }, response => {
                    this.project = {}
                    Log.success_msg("请求失败，稍后重试")
               });
        },

        //获取提醒信息
        require_remind_list() {
            let url = this.user_id +  "/usermessage";
            var params = {params:{
                              projectId:this.pid,
                              pageSize: 2,
                              isActive:"-1",
                              pageIndex: 0}}

            this.$http.get(url, params).then(response => {
                Log.L2("good",response.data);

                let result = response.data;
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
          var params = {
              params:{projectId:this.pid,
                      pageSize: 2,
                      isActive:"0",
                      pageIndex:1}}

         this.$http.get(url,params).then(response => {
             Log.L(response.data) ;

             let result = response.data;
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

 .product-remind-title {
     text-align:left;
     font-size:15px;
     padding:2px;
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
     width: 80%;
     height: 80px;
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
     text-align: center;
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
    width: 600px;
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


