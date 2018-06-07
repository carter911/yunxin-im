<!--
    产品图片展示集合组件
 -->

<template>
    <div class="product_image_content">

            <div class="p_image_list_class">
                <img class="p_image" :src="this.imageList[this.currentIndex]"/>
            </div>

            <div class="p_image_operate">
                
                <!-- <div class="p_left_right_operation"><i class="el-icon-arrow-left"></i></div> -->

                <div style="float: left; width:320px; height:40px; margin: 9px 0; text-align:center;" class="p_image_small_list">
                        <img v-for="(item,index) in this.imageList" 
                        :key="index" 
                        :src="item"
                        @click="imageClick(index)" 
                        class="p_image_li" 
                        :style="{'border' : currentIndex == index ? '2px solid #F23423' : ''}"
                        />
                </div>

                <!-- <div class="p_left_right_operation"><i class="el-icon-arrow-right"></i></div> -->

            </div>

    </div>

</template>

<script>

import Log from '../../common/Log';

export default {
    props : {
        imageList : {
            type:Array,
            required:true 
        }

    },

    data() {
        return {
            currentIndex : 0 ,
        }
    },

    methods : {
        imageClick(index) {
            this.currentIndex = index; 
        }
    },

    created() {
        if(this.imageList) {
            this.currentImage = this.imageList[0]
        }else{
            this.currentImage = Log.DEFAULT_PRODUCT_IMAGE(); 
        }
    },


}
</script>

<style>
.product_image_content {
    width:320px;
    height:320px;
    text-align: center;
    background-color: #fff;
}

.p_image_list_class {
    width: 270px;
    text-align: center;
    margin-left: 25px;
    height: 270px;
}

.p_image{
    height: 250px;
    width: 90%;
}

.p_image_operate{
    width: 320px;
    height: 58px;
    /* display: flex;
    justify-content:space-between;
    align-items: center;*/
    /* overflow: hidden; */
}

.p_left_right_operation {
 float:left;
 width:12px; 
 height:58px; 
 text-align:center;
 margin-top: 20px;
}

.p_image_small_list{
    overflow-x:scroll;
    overflow-y: hidden;
    white-space: nowrap;
}

.p_image_li{
    display:inline-block;
    box-sizing: border-box;
    height: 40px;
    width: auto;
    /* float: left; */
    margin-right:12px;
}

</style>
