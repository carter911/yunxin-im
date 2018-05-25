<template>
        <div>
             <div class="task-item-class" v-for="(item,index) in taskList" :key="index"  @click="gotoDetail(item.id)" >

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
        gotoDetail(id) {
           // this.$router.push("/project/task/detail/" + id);
           this.$emit("getTaskDetail",id);
        },

        get_task_avatar(item ) {
            return Log.DEFAULT_IMAGE();
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
}

.task-img-dot{
    width:10px;
    height:10px;
    background-color:#F00;
    border-radius:5px;
}

.task-list-desc{
    flex-grow:1;
    padding-left:12px;
    padding-right:12px;
    text-align:left;
}

.project-task-avatar{
    width: 40px;
	height: 40px;
	border-radius: 20px;
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
	color: #666666;
}

</style>
