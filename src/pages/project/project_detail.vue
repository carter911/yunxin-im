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
                            <span class="project-detail">施工时间：{{project_start_time}}&nbsp;至&nbsp;{{project_end_time}}</span><br/>
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
                                <span> 提醒</span>
                        </div>
                            
                    </el-col>

                    <el-col :span="6">    
                            <span v-on:click="getMore(0)">更多</span>
                    </el-col>

                  </el-row>

                  <hr/>

                  <div>

                    <RemindItem :remindList="this.remindList"></RemindItem>
    
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

                            <el-col :span="6" >    
                                    <span v-on:click="getMore(1)">更多</span>
                            </el-col>
                    </el-row>
                    <hr/>

                    <div>
                        <TaskItem :taskList="this.taskList"></TaskItem>
                  </div>
               </div>

            </el-card>
            <!-- 任务 结束 -->
                
             <!-- 材料商 开始 -->
            <el-card class="content-box-card">
                
            </el-card>
            <!-- 材料商 结束 -->
            
    </div>

    <!-- 右侧显示详情界面 -->
    <div id="left-popup" class="left-popup" :style="{'right' : show_right_pop ? '0px' : '-100%' }"> 
             <TaskAndRemindList :pid="this.pid" 
                                :pType="1"
                                @action_close_pop="action_close_pop"></TaskAndRemindList>
    </div>

    </div>
   
    

</template>

<script>
    /* eslint-disable key-spacing */
    import Log from '../../common/Log';

    import TaskAndRemindList from  './TaskAndRemindList.vue'
    import RemindItem from "../../components/project/RemindItem.vue"
    import TaskItem from "../../components/project/TaskItem.vue"


    let date = new Date();
    export default {
        components : {
            TaskAndRemindList,
            RemindItem,
            TaskItem
        },

        props:{
            pid : {
                type:String,
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

            }      
        },
    
        computed: {
            project_start_time() {
                if(null == this.project || undefined == this.project.startTime) return "" ;
                return Log.formatTime(this.project.startTime); 
            },

            project_end_time() {
                if(null == this.project || undefined == this.project.endTime) return "" ;
                return Log.formatTime(this.project.endTime); 
            }
        },

    mounted() {
        console.log("this log is " + this.pid)
    },

    methods: {
        getMore(type) {
            Log.L("----->>get More----->>" + type )

        
            this.show_right_pop = true;
        },

        action_close_pop() {
            this.show_right_pop = false;
        },

        //获取产品详情
        require_project_detail() {
               let url = this.pid + "/projects";
               this.$http.get(url).then(response => {
                   Log.L(response);
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
                              pageSize: Log.PAGE_SIZE(),
                              isActive:"-1",
                              pageIndex:1}}

            this.$http.get(url, params).then(response => {
                Log.L(response.data);

                let result = response.data;
                if(result.code == 200) {
                    this.remindList = result.data || [];
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
                      pageSize: Log.PAGE_SIZE(),
                      isActive:"0",
                      pageIndex:1}}

         this.$http.get(url,params).then(response => {
             Log.L(response.data) ;

             let result = response.data;
             if(result.code == 200 ){
                 this.taskList = result.data || [] ;
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
            console.log("--->>" + val + "---" + oldVal)

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
    width: 800px;
    max-width: 100%;
    background: #fff;
    display: none;
    border: 1px solid #d2d2d2;
    border-right: none;
    top: 60px; 
    height: 700px; 
    display: block;
}

</style>


