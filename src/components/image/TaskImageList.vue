<!-- 任务图片列表 -->
import Log from '../../common/Log';


<template>
    <div class="content"> 
            <div v-for="(item,index) in items" :key="index" class="image-content-task-list" @click="onImageItemClick(item,index)">
                    <img :src="item.image + '?imageslim'" class="task_image_list"/>
                     <img :src='get_image_status(item)' class="img_status_dot"/>      
            </div>
    </div>

</template>

<script>

import Log from '../../common/Log';

export default {

    props : {
        items : {
            type : Array,
            required : true 
        }
    },

    data() {
        return {

        }
    },

    methods : {
        get_image_status(item) {
            if(null == item || undefined == item) return '../../../static/ic_not_check.png' ;
            if(item.status === 0) return '../../../static/ic_question.png'
            if(item.status === 1) return '../../../static/ic_check.png'

            return "../../../static/ic_not_check.png" ;
        },

        onImageItemClick(item,index) {
            this.$emit('onImageItemClick', item,index);
        }
    }
}

</script>

<style scope>

.content {
    display: flex;
    flex-wrap: wrap;
}

.image-content-task-list {
   width:90px;
   height:90px;
   margin-right: 12px;
   margin-top: 12px;
   display:flex;
   position: relative;
}

.task_image_list {
    width:100%;
    height: auto;
    display:block;
}

.img_status_dot{
    position: absolute;
    width: 20px;
    height: 20px;
    top: -4px;
    left: 80px;
    z-index: 1;
}

</style>
