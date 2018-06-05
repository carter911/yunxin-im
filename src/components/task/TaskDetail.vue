<!-- 任务详情  -->

<template>
    <div id="id_task_detail" class="task_content">

        <div class="task-detail-title">
            <div class="task-detail-desc">
                任务详情
            </div>

            <img src="../../../static/ic_close.png" style="width:20px;height:20px;" @click="this.closeRightPannel"/>
        </div>

        <hr class="task-detail-hr"/>


        <div class="task_detail_content"
            :style="{height : (this.$store.state.windowClientHeight - 122 - 26) + 'px'}"  
            v-loading='loadingData'>

        <div class="task-title">{{taskDetail.name}}</div>
        <div class="task-time">{{ taskDetail.startTime | formatDate }}</div>

        <hr class="task-detail-hr"/>

        <el-row class="el-row-task">
                <el-col :span="4">
                    <div class="product-remind-title">
                            <span> 描述： </span>
                    </div>                
                </el-col>
                
                <el-col :span="20">    
                    <p v-html="this.showTaskDetail(taskDetail.detail)"> </p>
                </el-col>

            </el-row>

            <el-row class="el-row-task" v-if="this.imageList.length">
                <el-col :span="4">
                    <div class="product-remind-title">
                            <span> 照片:</span>
                    </div>                
                </el-col>
                
                <el-col :span="20">    
                        <TaskImageList :items="this.imageList" 
                                        @onImageItemClick="onImageItemClick"></TaskImageList>
                </el-col>

            </el-row>

            <el-row class="el-row-task" v-if="this.checkRolePicAuth()">
                <el-col :span="4">
                    <span>新增照片</span>
                </el-col>

                <el-col :span="20">
                    <div>
                        <el-upload 
                                ref="upload"
                                class="el-upload-class"
                                action=""
                                list-type="picture-card"
                                :limit="9"
                                :auto-upload="false"
                                :multiple="true"
                                :on-change="onFileChange"
                                :file-list="uploadFileList"
                                :on-preview="handlePictureCardPreview"
                                :on-remove="handleRemove">
                                
                            <i class="el-icon-plus"></i>
                        </el-upload>

                        <el-button type="primary" @click="handle2upload"> 确定上传 </el-button>
                    </div>
                </el-col>

            </el-row>

            <el-row class="el-row-task">
                <el-col :span="4">
                    <div class="product-remind-title">
                            <span> 任务状态:</span>
                    </div>                
                </el-col>
                
                <el-col :span="20">    
                <span> {{ taskDetail.statusMessage }}</span>
                </el-col>
            </el-row>

            <!-- <el-row class="el-row-task">
                <el-col :span="4">
                    <div class="product-remind-title">
                            <span> 产品评论:</span>
                    </div>                
                </el-col>     
            </el-row> -->

            <el-row class="el-row-task">
                <el-col :span="4">
                    <div class="product-remind-title">
                            <span> 操作状态:</span>
                    </div>                
                </el-col>
                
                <el-col :span="20">    

                        <div v-if="checkOptionTask()">
                            <el-button type="primary" @click="this.commitTask"> 提交任务</el-button>
                        </div>

                        <div v-if="checkCheckTask()">
                            <el-button type="success" @click="checkTask(1)"> 审核通过</el-button>
                            <el-button type="danger" @click="checkTask(0)"> 审核不通过</el-button> 
                        </div>
                </el-col>
            </el-row>

    </div>

    <div v-if="showImageDialog">
         <ImageCheckDialog 
                    :imageIndex="this.imageIndex"
                    :imageList="this.imageList"
                    :taskId="this.taskId"
                    :hasCheckAuth="this.hasCheckPicAuth()"
                    @imageCheckDialogClose="imageCheckDialogClose">
          </ImageCheckDialog>
    </div>

    <loading ref="Loading"></loading>

    </div>
    
    
</template>

<script>
import Log from '../../common/Log';
import http from "../../utils/http"
import ImageCheckDialog from '../image/ImageCheckDialog.vue'
import TaskImageList from '../image/TaskImageList.vue'
import Loading from "../common/Loading.vue";

import * as qiniu from 'qiniu-js'

export default {
    components : {
      ImageCheckDialog  ,
      TaskImageList,
      Loading
    },

    props: {
        pid : {
            type:Number,
            require:true
        }
    },

    data() {
        return {
            taskDetail : {},
            imageList : [],
            imageIndex:0,

            showImageDialog : false,
            taskId:0,
            imageToken:"",

            //上传图片文件集合
            uploadFileList : [] ,

            //上传图片地址字符串
            uploadFilePathUrlArray :[],

            //是否加载数据
            loadingData:false 
        }
    },

    methods : {

        showTaskDetail(detail) {
            if(null == detail || undefined == detail) return '';
            let targetValue = detail.replace(/[\n\r]/g,"<br/>");
            console.log(targetValue)


            return targetValue;
        },

        //显示对话框    
        startLoading(){
            this.$refs.Loading.$emit("bridge",true);
        },

        //关闭对话框
        endLoading(){
            this.$refs.Loading.$emit("bridge",false);
        },

        //查看单张图片详情
        onImageItemClick(item,index){
            this.showImageDialog = true ;
            this.imageIndex = index ;
            Log.L("----onImageItemClick------>>" + this.showImageDialog + "," + this.imageIndex); 
        },

        /**
         * 图片浏览对话框关闭
         */
        imageCheckDialogClose(checkImageCount){
            this.showImageDialog = false
            if(checkImageCount) {
                //重新请求数据
                this.request_task_detail();
            }
        },

        handlePictureCardPreview(){
            Log.L("handlePictureCardPreview");
        },

        //检查是否存在图片审核权限
        hasCheckPicAuth(){
            if(null == this.taskDetail || undefined == this.taskDetail.optionRoleId) return false;
            return this.taskDetail.optionRoleId == this.taskDetail.roleId;
        },

        //检查是否可以上传图片
        checkRolePicAuth(){
            if(null == this.taskDetail || undefined == this.taskDetail.auth) return false;
            
            return this.taskDetail.auth.indexOf(Log.TASK_UPLOAD_PICTURE()) >= 0
                   &&
                   this.taskDetail.statusCode != Log.TASK_COMPLETED();
        },

        //检查是否存在提交任务提交权限
        checkOptionTask() {
            if(null == this.taskDetail || undefined == this.taskDetail.auth) return false;

            let taskOperation = this.taskDetail.optionRoleId == this.taskDetail.roleId;
            let taskAuth = this.taskDetail.auth.indexOf(Log.TASK_UP_LOAD()) >= 0;
            let taskStatus = this.taskDetail.statusCode === 0 || this.taskDetail.statusCode === 3 ;

            console.log("checkOptionTask",taskOperation , taskAuth , taskStatus);

            return taskOperation && taskAuth && taskStatus; 
        },

        //检查是否存在审核任务权限
        checkCheckTask(){
            if(null == this.taskDetail || undefined == this.taskDetail.auth) return false;
            Log.L("--Log---");

            //内部审核权限
            if(this.taskDetail.statusCode === 1) {
                let taskInnerCheckAuth          = this.taskDetail.auth.indexOf(Log.TASK_INNER_TASK_CHECK()) >= 0;
                let taskCheckStatus             = this.taskDetail.checkRoleId == this.taskDetail.roleId;
                let innerAuth                   = taskInnerCheckAuth && taskCheckStatus;

                //业主权限
                let taskOuterCheckStatus = this.taskDetail.auth.indexOf(Log.TASK_CHECK_OUTER_CHECK()) >= 0;
                console.log("taskOuterCheckStatus" , innerAuth , taskOuterCheckStatus);

                return innerAuth || taskOuterCheckStatus;
            }

            return false;
        },

        showMsg(type , message) {
            this.$message({
                message: message,
                type: type
            });
        },

        //审核任务
        checkTask(sta) {
            let url = this.taskId + "/optiontask";
            let params = { status : sta } ;

            this.startLoading();
            http.post(url,params).then(response => {
                this.endLoading();
                let result = response;
                if(result.code == 200){
                    this.showMsg("success","审核成功");
                    this.request_task_detail();

                }else {
                    this.showMsg("error",result.message);
                }
            }, error => {
                this.showMsg("error","审核任务失败，请刷新重试");
            })
        },

        //提交任务
        commitTask() {
            this.startLoading();

            let url = this.taskId + "/puttask";
            http.post(url).then(response => {
                let data = response;
                
                this.endLoading();
                if(data.code == 200){
                    this.showMsg("success","任务提交成功");
                    this.request_task_detail();
                }else {
                    this.showMsg("error",data.message);
                }
            }, error => {
                    this.showMsg('error','提交任务失败，请稍后重试');
            }) ;
        },

        //请求任务详情
        request_task_detail (needDialog=false) {
            if(needDialog) this.loadingData = true;

            let url = this.pid + "/task";
            http.get(url).then(response => {
                this.loadingData = false;
                let result = response;
                Log.L(result);

                if(result.code == 200) {
                    this.taskDetail = result.data;

                    //任务Id
                    this.taskId = this.taskDetail.id;
                    //图片集合
                    this.imageList = result.data.image || [] ;
                     
                } else {
                    this.showMsg("error","请求任务详情失败，请稍后重试");
                }
            }, error => {
                this.loadingData = false;
                this.showMsg("error","请求任务详情失败，请稍后重试");

            }) ;
        },

         //获取token
        request_qiniu_token() {
            http.get("gettoken").then(response => {
                let result = response;
                if(result.code == 200){
                    this.imageToken = result.data.token;
                } 
            } , response => {}) ;
        } ,

        onFileChange(file, fileList) {
            Log.L2("file", file);
            Log.L2("fileList" , fileList);

            this.uploadFileList = fileList;
        },  

        handleRemove(file , fileList) {
            Log.L("handleRemove")
            this.uploadFileList = fileList;
        },

        handle2upload(){   
            if(!this.uploadFileList.length){
                this.$message({
                     message: '暂无图片',
                     type: 'warn'
                   });
                return;
            }

            this.startLoading();            
            this.uploadFilePathUrl = [] ;
            this.realUploadFile();
        },
        
        realUploadFile() {
            if(this.uploadFileList.length) {
                    this.onFileUpload(this.uploadFileList[0])
            } else { //上传图片到服务器
                Log.L("upload file finished  ");
                Log.L(this.uploadFilePathUrl);
                
                this.uploadTaskImage();
            }
        },

        //上传到网页端
        uploadTaskImage(){
            if(this.uploadFilePathUrlArray.length){
                let url = this.taskId + "/taskimage";
                let params = {image : JSON.stringify(this.uploadFilePathUrlArray) };

                Log.L(params);
                http.post(url,params).then(response => {
                    let result = response;
                    Log.L(result);

                    this.endLoading();
                    if(result.code == 200) {
                        this.showMsg("success","图片上传成功");

                        //文件清空
                        this.uploadFileList = [];
                        //上传文件清空
                        this.$refs.upload.clearFiles();
                        //图片集合清空
                        this.uploadFilePathUrlArray = [];

                        //重新请求任务数据
                        this.request_task_detail();

                    }else{
                        this.showMsg("error", result.message);
                    }
                }, response => {
                        this.endLoading();
                        this.showMsg("error", "上传图片失败，请稍后重试！");
                }) ;

            }else {
                //TODO
                this.endLoading();
            }
        },

        //关闭右侧pannel
        closeRightPannel(){
            this.$emit("closeRightPannel");
        },

        //图片上传
        onFileUpload(obj) {
            let self = this;

            if(undefined == obj || null == obj) return;
            //check the imageToken;
            let url = Log.getRandomImageFileName();
            Log.L2("upload url : " , url) ;

            var observable = qiniu.upload(obj.raw,  url, this.imageToken, null, null) ;
            observable.subscribe({
                next(res) {
                    Log.L2("next upload ", res);
                } ,

                error(err) {
                    Log.L2("upload error" , err);
                    if(self.uploadFileList){
                        self.uploadFileList.splice(0, 1);
                    }
                     self.realUploadFile();     
                },

                complete(res) {
                    Log.L2("upload complete" , res);
                    let targetUrl = Log.getImageSuffix() + url ;

                    self.uploadFilePathUrlArray[ self.uploadFilePathUrlArray.length ] = targetUrl ;
                    //移除uploadFileList第一位file
                    if(self.uploadFileList) {
                         self.uploadFileList.splice(0, 1);
                    }
                   
                    self.realUploadFile();

                    //TODO 
                    Log.L2("url" , targetUrl);
                }
            });
        },
    },

    created() {
        this.request_task_detail(true);
        this.request_qiniu_token();
    }

}
</script>

<style>

#id_task_detail .el-upload-class{
    margin-top: 12px;
}

#id_task_detail .el-row-task{
    padding: 12px;
    font-size: 14px;
    color: #494949;
}

#id_task_detail .el-upload--picture-card {
    background-color: #fbfdff;
    border: 1px dashed #c0ccda;
    border-radius: 6px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 100px;
    margin: 0 8px 8px 0;
    height: 100px;
    line-height: 120px;
    vertical-align: top;
}

#id_task_detail .el-upload-list__item {
    overflow: hidden;
    background-color: #fff;
    border: 1px solid #c0ccda;
    border-radius: 6px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 100px;
    height: 100px;
    margin: 0 8px 8px 0;
    display: inline-block;
}

#id_task_detail .el-upload-list--picture-card .el-upload-list__item-thumbnail {
    width: 100px;
    height: 100px;    
}

#id_task_detail .el-textarea__inner{
    border-radius:1px;
    border: 1px solid #ccc;
    border-top :1px solid #dcdfe6;
}

#id_task_detail .task_detail_content {
     overflow:auto
}

</style>

<style scope>

.task_content{
    padding: 12px;
    background-color: #FFF;
    text-align: left;
}

.task-detail-hr {
        background-color: #e9e9e9;
        height: 1px;
        border:none;
    }

.task-detail-title{
    display: flex;
    align-content: center;
    justify-content: center; 
    align-items: center;
    padding-left: 6px;
    padding-right: 6px;
}

.task-detail-desc{
    flex-grow:1;
    padding:12px;
    text-align: left;
    color: #363636;
    font-size: 16px;
}

.task-title {
    font-size: 15px;
    color: #494949;
    padding-top: 6px;
    padding-bottom: 6px;
    text-align: center;
}

.task-time {
    text-align: right;
    color: #797979;
    font-size: 13px;
}

</style>
