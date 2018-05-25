<!-- 任务图片列表 -->
import Log from '../../common/Log';


<template>
    <div class="content"> 
            <div v-for="(item,index) in items" :key="index" class="image-content-task-list" @click="onImageItemClick(item)">
                    <img :src="item.image + '?imageslim'" class="task_image_list"/>
                     <img :src='get_image_status(item)' class="dot"/>      
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

        onImageItemClick(item) {
            this.$emit('onImageItemClick', item);
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
   width:100px;
   height:100px;
   margin-right: 12px;
   display:flex;
}

.task_image_list {
    width:100%;
    height:100%;
}

.dot{
    width: 40px;
    height: 40px;
    z-index: 12;
}

</style>
