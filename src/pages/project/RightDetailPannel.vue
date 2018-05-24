<!-- 右侧详情 
    1. 提醒详情 type : 0 
    2. 任务详情 type : 1
-->

<template>

    <div>

        <div v-if="this.showType === 0">
                <RemindDetail :pid="this.remindId" @closeRightPannel="this.closeDetailRightPannel"></RemindDetail>
        </div>

        <div v-if="this.showType == 1"> 
                <TaskDetail :pid="this.taskId" @closeRightPannel="this.closeDetailRightPannel"></TaskDetail>
        </div>

    </div>

</template>

<script>

import RemindDetail  from  "../../components/remind/RemindDetail.vue"
import TaskDetail    from  "../../components/task/TaskDetail.vue"

export default {
    components : {
        RemindDetail ,
        TaskDetail
    },

    props : {
        showType : {
            type :Number ,
            required : true 
        },

        remindId : {
            type : Number,
            required : true 
        },

        taskId: {
            type : Number,
            required : true
        }
    },

    data() {
        return {
        }
    },

    methods : {    
         closeDetailRightPannel(){
            this.$emit("closeDetailRightPannel");
        }
    },
    
    mounted () {
        console.log("----rightDetailPannel----start");
        console.log(this.showType + "---" + this.remindId + "----" + this.taskId);
        console.log("----rightDetailPannel----end");
    }   

}
</script>

<style>

</style>
