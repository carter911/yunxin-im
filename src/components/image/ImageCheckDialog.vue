<!-- 图片审核对话框 -->

<template>
        <div>
                <el-dialog
                    title="照片说明"
                    width="60%"
                    :modal="false"
                    :visible.sync="this.dialogVisible"
                    :before-close="handleClose">

                    <div class="image-content">
                            <img :src="this.imageItem.image" class="image"/>
                    </div>

                    <span>{{this.getRoleName() }} {{ this.getUserName()}} 拍摄于 {{this.imageItem.time}} </span>

                    <span slot="footer" class="dialog-footer">

                        <div v-if="this.hasCheckAuth"> 
                                <div v-if="this.imageItem.status == '1'"> 
                                     <el-button type="primary" @click="handleClose">确定</el-button>   
                                </div>

                                <div v-else>
                                    <el-button type="success" @click="checkImage(true)">审核</el-button>
                                    <el-button type="danger"  @click="checkImage(false)">取消审核</el-button> 
                                </div>
                        </div>

                        <div v-else> 
                            <el-button type="primary" @click="handleClose">确定</el-button>    
                        </div>

                    </span>
                </el-dialog>
        </div>
</template>

<script>
import http from "../../utils/http"

export default {
    props : {
       imageItem : {
           type : Object,
           required : true 
       }, 

      //对话框是否显示
       dialogVisible : {
           type : Boolean,
           required:true
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
            dialogRealShow:false,
        }
    }, 

    methods : {
        getRoleName(){
            if(null == this.imageItem || null == this.imageItem.user) return "" ;
            return this.imageItem.user.roleName;
        },

        getUserName(){
            if(null == this.imageItem || null == this.imageItem.user) return "";
            return this.imageItem.user.name; 
        },

        showMsg(type , message) {
            this.$message({
                message: message,
                type: type
            });
        },

        handleClose() {
            this.dialogVisible = false;
        },

        //审核图片
        checkImage(isCheck) {
            let self = this;
            let url = this.taskId + "/optiontaskimage";
            let params = {
                id : this.imageItem.id ,
                status : isCheck ? 1 : 2 
            }

            http.post(url,params).then(response => {
                let result = response;
                if(result.code == 200) {
                    self.imageItem.status = isCheck ? 1 : 2;
                    //TODO
                    this.dialogVisible = false; 

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

<style scoped>

  .image-content{
      text-align: center;
  }

 .image {
        width: 100%;
        height: 300px;
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




</style>
