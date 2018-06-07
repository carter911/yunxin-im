<!-- 右面板 

    综合面板 
    1. 显示 提醒列表
    2. 显示 提醒详情
    3. 显示 用户列表
    
-->

<template>
    <div>
        <div v-if="this.showType === 0">
                <RemindList :pid="this.projectId" 
                @closeRightPannel="this.closeRightPannel"
                @getRemindDetail="this.getRemindDetail" ></RemindList>
        </div>

        <div v-if="this.showType == 1"> 
                <TaskList :pid="this.projectId"
                @getTaskDetail="this.getTaskDetail"
                @closeRightPannel="this.closeRightPannel"></TaskList>
        </div>

        <div v-if="this.showType == 2">
            <UserItemList :pid="this.projectId" 
                          @closeRightPannel="this.closeRightPannel">

            </UserItemList>

        </div>

    </div>

</template>

<script>

import RemindList    from  "../../components/remind/RemindList.vue"
import TaskList      from  "../../components/task/TaskList.vue"
import UserItemList  from  "../../components/user/UserItemList.vue"


export default {
    components : {
        RemindList,
        TaskList,
        UserItemList,
    },

    props: {
        projectId: {
            type :Number,
            required:true
        },

        showType : {
            type :Number,
            require:true      
        }
    },

    data() {
        return {
            type : 0 ,
        }
    },

    methods : {
        getRemindDetail(remindId){
            this.$emit("getRemindDetail", remindId);
        },

        getTaskDetail(taskId) {
            this.$emit("getTaskDetail",taskId);
        },

        closeRightPannel(){
            this.$emit("closeRightPannel");
        }
    }

}
</script>

<style>

</style>
