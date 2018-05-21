<!-- 任务列表 -->

<template>
            <div>
                <div class="remind-title"> 
                    <el-row>
                            <el-col :span="20">
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

                            <el-col :span="2" class="remind-external">
                                <div v-on:click="action_add_new()">
                                    <img src="../../../static/ic_add_remind.png" /> 
                                </div>
                            </el-col>

                            <el-col :span="2" class="remind-external">
                                    <div v-on:click="action_close_pop()">
                                        <img src="../../../static/ic_close.png" /> 
                                    </div>
                            </el-col>
                    </el-row> 
                </div>

            <div class="block">

                <div v-show="this.currentType == '0'" >
                        <TaskItem :taskList="this.unReadList"></TaskItem>
                </div>

                <div v-show="this.currentType == '1'" >
                        <TaskItem :taskList="this.allList"></TaskItem>
                </div>

            </div>    
        </div>
</template>

<script>

import Log from '../../common/Log';
import TaskItem from "../../components/project/TaskItem.vue"

export default {

   components : {
        TaskItem
    },

    data() {
        return {
            pid : this.$route.params.id ,
            currentType : '0' ,

            unReadList : [] ,
            allList : [] ,

            unReadPageIndex : 1 ,
            allPageIndex : 1,
        }
    } ,

    methods : {
        handleSelect(type)  {
            this.currentType = type ;

        if(this.currentType === '0') {  //未读消息
            if(null == this.unReadList || this.unReadList.length == 0) {
                this.request_task_list();
            }
        } else {  //全部消息
            if(null == this.allList || this.allList.length == 0) {
                this.request_task_list();
            }
          }
        } ,
        

        action_add_new() {
            //TODO
        },

        action_close_pop() {

        },

        //请求提醒列表
         request_task_list(){
            let self = this;
            //uid = 530 ;
            let url =  this.pid + "/projecttask";

            let isUnRead = self.currentType === '0';
            let params = { params : {
                    pageSize  : Log.PAGE_SIZE(),
                    pageIndex : isUnRead ? self.unReadPageIndex : self.allPageIndex,
                    isActive :  isUnRead ? '1' : '0'  
            }}

            this.$http.get(url,params).then(response => {
                let result = response.data;
                Log.L(result);

                if(result.code == 200 && result.data != null) {
                    if(isUnRead) {
                        self.unReadList.push.apply(self.unReadList,result.data);
                        self.unReadPageIndex ++ ;

                    }else {
                        self.allList.push.apply(self.allList, result.data);
                        self.allPageIndex ++ ;
                    }
                }
            })
        }
    },

    created() {
        this.request_task_list();
    }

}
</script>

<style>

</style>
