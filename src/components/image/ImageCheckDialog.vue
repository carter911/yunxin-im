<!-- 图片审核对话框 -->

<template>
        <div id="image_check_dialog">
                <el-dialog
                    title="照片说明"
                    width="90%"
                    top="8vh"
                    :modal="false"
                    :visible.sync="this.dialogVisible"
                    :before-close="handleClose" >

                    <!-- 使用轮播图 -->
                        <el-carousel :autoplay="false" 
                                     :arrow="'always'"
                                     :initial-index="this.imageIndex"
                                     :indicator-position="'none'"> 
                            <el-carousel-item v-for="(item,index) in imageList" :key="index">

                            <div class="image-content">
                                <img preview="2" :preview-text="getRoleName(item)" :src="item.image" class="image"/>
                            </div>

                            <span>{{ getRoleName(item) }} {{ getUserName(item)}} 拍摄于 {{item.time}} </span>

                            <div v-if="hasCheckAuth"> 
                                <div class="bottom_button_class">

                                        <div v-if="item.status == '1'"> 
                                            <el-button type="primary" @click="handleClose">确定</el-button>   
                                        </div>

                                        <div v-else>
                                            <el-button type="success" @click="checkImage(true,item)">审核通过</el-button>
                                            <el-button type="danger"  @click="checkImage(false,item)">审核不通过</el-button> 
                                        </div>
                               </div>
                            </div>

                            <div v-else> 
                                <div class="bottom_button_class">  
                                    <el-button type="primary" @click="handleClose">确定</el-button> 
                                </div>
                            </div>

                            </el-carousel-item>

                        </el-carousel>

                 <!-- 使用轮播图结束 -->

                </el-dialog>
        </div>
</template>

<script>
import http from "../../utils/http"

export default {
    props : {
       imageList: {
           type:Array,
           required:true 
       } ,

      imageIndex: {
          type:Number,
          required:false
      },

      //是否有审核权限
      hasCheckAuth:{
          type:Boolean,
          required : true,
      },

      taskId : {
         type: Number,
         required:true 
      }
    },

    data() {
        return  {
            dialogVisible:true ,
            checkImageNum:0,   //审核图片的数据
        }
    }, 

    methods : {
        getRoleName(imageItem){
            if(null == imageItem || null == imageItem.user) return "" ;
            return imageItem.user.roleName;
        },

        getUserName(imageItem){
            if(null == imageItem || null == imageItem.user) return "";
            return imageItem.user.name; 
        },

        showMsg(type , message) {
            this.$message({
                message: message,
                type: type
            });
        },

        handleClose() {
            this.dialogVisible = false;
            this.$emit("imageCheckDialogClose", this.checkImageNum)
        },

        //审核图片
        checkImage(isCheck, imageItem) {
            this.checkImageNum ++ ;
            let self = this;
            let url = this.taskId + "/optiontaskimage";
            let params = {
                id : imageItem.id ,
                status : isCheck ? '1' : '2' 
            }

            http.post(url,params).then(response => {
                let result = response;
                if(result.code == 200) {
                    imageItem.status =  '1';  //审核之后 数据都变为'1'
                }else {
                    this.showMsg("error",result.message);
                }

            } ,response => {
                    this.showMsg("error","审核图片失败，请稍后重试");
            });
        },        
    }
}
</script>


<style>

#image_check_dialog .el-carousel__container {
    position: relative;
    height: 500px;
  }

</style>

<style scoped>

 

  .image-content{
      text-align: center;
  }

 .image {
    width: auto;
    height: 400px;
 }

 .el-dialog__wrapper {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
    margin: 0;
    z-index: 1000;
    background-color:rgba(0,0,0,0.5);
}

.bottom_button_class{
    margin-top:12px;
    text-align: center;
}




</style>
