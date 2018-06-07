<!-- 任务列表 -->

<template>
        <div id="id_task_list" class="task-content">
                <div class="remind-title"> 
                    <el-row>
                            <el-col :span="22">
                                <div >
                                    <el-menu :default-active="this.currentType"
                                             :router="false" 
                                             class="el-menu-demo" 
                                             @select="handleSelect"
                                             mode="horizontal">
                                                <el-menu-item index="0">未读任务</el-menu-item>
                                                <el-menu-item index="1">全部任务</el-menu-item>
                                    </el-menu>
                                </div>
                            </el-col>

                            <!-- <el-col :span="2" class="remind-external">
                                <div v-on:click="action_add_new()">
                                    <img src="../../../static/ic_add_remind.png" /> 
                                </div>
                            </el-col> -->

                            <el-col :span="2" class="task-external">
                                    <div v-on:click="action_close_pop()">
                                        <img src="../../../static/ic_close.png"  style="width:20px;height:20px;"/> 
                                    </div>
                            </el-col>
                    </el-row> 
                </div>

            <div class="task_list_block" 
                 :style="{height : (this.$store.state.windowClientHeight - 122 - 16) + 'px'}"  
                 v-loading='request_data_loading'>

                <div>
                    <TaskItem :taskList="get_current_task_list()" @getTaskDetail="this.getTaskDetail"></TaskItem>
                </div>

                <div v-if="checkPageDataEmpty()">
                    <img class="data-img-empty" src="../../../static/pic_content_empty.png"/>
                  </div>

                  <div v-if="this.shouldShowLoadMore()">
                        <BottomLoading :loadingType="this.buttomLoadingType" 
                                        @loadingMore="loadingMore">
                        </BottomLoading>
                  </div>
            </div>    
        </div>

</template>

<script>

import Log from '../../common/Log';
import TaskItem from "../../components/project/TaskItem.vue"
import BottomLoading from '../common/BottomLoading.vue'
import http from "../../utils/http"
export default {
   components : {
        TaskItem,
        BottomLoading
    },

    props: {
        pid : {
            type:Number,
            require:true
        }
    },

    data() {
        return {
            currentType : '0' ,
            allTaskEntity : new TaskListEntity(),
            unReadTaskEntity : new TaskListEntity(),
            buttomLoadingType: 0 ,

            request_data_loading : false
        }
    } ,

    methods : {
        getTaskDetail(taskId){
            this.$emit("getTaskDetail",taskId);
        },

        handleSelect(type)  {
            this.currentType = type ;
            this.request_task_list();
        } ,
        
        action_add_new() {
            //TODO
            // this.$router.push('/project/task/add/' + this.pid);
        },

        action_close_pop() {
            this.$emit("closeRightPannel");
        },

        shouldShowLoadMore(){
             if(this.currentType == '0') return this.unReadTaskEntity.canLoadMore;
             return this.allTaskEntity.canLoadMore;
        },

        checkPageDataEmpty(){
            if(this.currentType == '0') return this.unReadTaskEntity.dataIsEmpty;
            return this.allTaskEntity.dataIsEmpty;
        },

        get_data_has_loaded(){
            if(this.currentType == '0') return this.unReadTaskEntity.hasBeenLoading;
            return this.allTaskEntity.hasBeenLoading;
        },

        get_current_task_list(){
            if(this.currentType == '0') return this.unReadTaskEntity.list;
            return this.allTaskEntity.list;
        },

        get_current_page(){
            if(this.currentType == '0') return this.unReadTaskEntity.currentPageIndex;
            return this.allTaskEntity.currentPageIndex;
        },

        loadingMore(){
            this.request_task_list(false);
        },

        //请求提醒列表
         request_task_list(refresh = true){
            if(this.get_data_has_loaded() && refresh) return;

            this.buttomLoadingType = 1 ;
            let self = this;
            let url =  this.pid + "/projecttask";
            let pageIndex = this.get_current_page();

            if(pageIndex == 1) {
                this.request_data_loading = true ;
            }

            let isUnRead = self.currentType === '0';
            let params =  {
                    pageSize  : Log.PAGE_SIZE(),
                    pageIndex : pageIndex,
                    isActive :  isUnRead ? '1' : '0'  
            }

            http.get(url,params).then(response => {
                this.buttomLoadingType = 0 ;
                this.request_data_loading = false ;

                let result = response;
                Log.L(result);
                if(result.code == 200){
                    this.parseTaskList(pageIndex, result.data);
                }else {
                    //TODO 
                }

        }, error => {
            this.buttomLoadingType = 0 ;
            //this.request_data_loading = false ;
            //TODO
        })
    },

    parseTaskList(pageIndex,data){
        if(this.currentType == '0') {
            this.parseInnerList(this.unReadTaskEntity, pageIndex, data);
        }else {
            this.parseInnerList(this.allTaskEntity, pageIndex, data);
        }
    },

    parseInnerList(obj, pageIndex, data) {
         if(pageIndex == 1) {
              obj.list = [] ;
          }

          obj.currentPageIndex = pageIndex + 1 ;
          obj.hasBeenLoading = true ;
          if(data != null && data != undefined) {
               obj.list = obj.list.concat(data);
               obj.canLoadMore = data.length >= Log.PAGE_SIZE();
          }else{
               obj.canLoadMore = false;
          }

          obj.dataIsEmpty = !(obj.list != null && obj.list.length) ;
    }
  },

created() {
        this.request_task_list();
},

watch : {
     pid : function(oldOne, newOne) {
         console.log("---tasklist---" + oldOne + "--" + newOne);

         //TODO 
         if(oldOne !== newOne) {
             this.unReadTaskEntity.clear() ;
             this.allTaskEntity.clear();

             this.currentType = '0';
             this.request_task_list();
        }
        }
    }
}

class TaskListEntity {
    constructor() {
        this.clear();
    }

    clear(){
        this.list = [] //数组集合
        this.canLoadMore = false  //是否可加载更多
        this.currentPageIndex = 1  //当前加载页面
        this.hasBeenLoading = false   //是否加载过
        this.dataIsEmpty = false      //数据是否为null
    }
}


</script>

<style>
#id_task_list .el-menu-item {
    height: 61px;
    line-height: 61px;
    width: 90px;
}

</style>


<style scoped>

.task-external{
    background-color:#fff;
    height: 60px;
    padding-top:20px;
    text-align: center;
    border-bottom:1px #f4f4f4 ;
}

.task_list_block {
    overflow:auto
}

.task-content {
    background-color: #FFF;
}

.data-img-empty{
    width:180px;
    height: 180px;
    margin-top: 80px;
}

</style>
