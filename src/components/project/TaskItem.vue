<template>
        <div>
             <div class="task-item-class" v-for="(item,index) in taskList" :key="index"  @click="gotoDetail(item)" >

                   <div class="task-item-img">
                        <img :src='get_task_avatar(item)' class="project-task-avatar"/>
                        
                        <div class="task-img-dot" v-if="item.isActive == 1"></div>
                    </div>

                    <div class="task-list-desc">
                         <div class="product-task-item-title">{{ item.name }}</div>
                         <div class="product-task-item-content"> {{ parse_task_detail(item.detail) }}</div>
                    </div>

                    <div class="product-task-time-content">
                        <span > {{ item.startTime | formatDate}}</span>
                    </div>   

             </div>
        </div>

</template>

<script>
import Log from '../../common/Log';

export default {

    props : {
        taskList :  {
            type : Array,
            required:true ,
        }, 
    },

    methods : {
        gotoDetail(item) {
           item.isActive = 0 ;
           this.$emit("getTaskDetail",item.id);
        },

        get_task_avatar(item) {
            if(null == item || null == item.taskUserImage) return Log.DEFAULT_IMAGE();
            let avatar = item.taskUserImage;
            return avatar.length > 0 ? avatar : Log.DEFAULT_IMAGE();
        },

        parse_task_detail(detail) {
        if(detail == null || detail == undefined) return "" ;
        return detail.length >= 50 ? detail.substring(0,50) + "..." : detail;
        }
    }


}
</script>

<style scope> 

.task-item-class {
    border-bottom: #f2f2f2 1px solid;
    padding: 2px;
    text-align:center;
    display:flex;  
    justify-content:space-between;
}

.task-item-img{
    display: flex;
    padding-left: 8px;
    padding-top: 4px;
    padding-bottom: 4px;
}

.task-img-dot{
    width:10px;
    height:10px;
    background-color:#F00;
    border-radius:5px;
    margin-top: 4px;
}

.task-list-desc{
    flex-grow:1;
    padding-left:12px;
    padding-right:12px;
    text-align:left;
}

.project-task-avatar{
     width: 36px;
	height: 36px;  
    border-radius: 50%;
}

.product-task-item{
    text-align: left;   
}

.product-task-item-title{
    font-size: 14px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 30px;
	letter-spacing: 0px;
	color: #333333;
}

.product-task-time-content{
    margin: auto;
    font-size: 12px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 48px;
	letter-spacing: 0px;
	color: #999999;
    min-width: 100px;
}

.product-task-item-content {
    font-size: 12px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 14px;
	letter-spacing: 0px;
    padding-bottom: 4px;
	color: #666666;
}

</style>
