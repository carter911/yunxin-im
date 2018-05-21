<!-- 添加新提醒 组件 -->

<template>

    <div class="content">
        <el-dialog title="新提醒" :visible.sync="dialogTableVisible" width="80%" >
            <el-form ref="form" :model="form" :rules="form_rules"   label-width="120px">

                <el-form-item hidden>
                         <el-input v-model="form.projectId" name="id"></el-input>
                </el-form-item>

                <el-form-item label="提醒时间">
                        <el-col :span="8">
                        <el-date-picker type="date" value-format="timestamp" placeholder="选择日期" v-model="form.startTime" style="width: 100%;"></el-date-picker>
                        </el-col>

                </el-form-item>

                <el-form-item label="被提醒人" prop="type">
                        <el-checkbox-group v-model="form.workId" style="text-align:left;">
                                <el-checkbox v-for="(item,index) in remindRoleList" :key="index" :label="item.work_id || item.role_id"> {{ item.name }}</el-checkbox> 
                        </el-checkbox-group>
                </el-form-item>

                <el-form-item label="提醒内容">
                        <el-input type="textarea" v-model="form.detail" rows="4"></el-input>
                </el-form-item>

                <el-form-item label="关联任务" style="text-align:left;">
                        <el-select v-model="form.taskId" placeholder="请选择关联任务" >

                             <el-option v-for="(item,index) in taskRelateList" :key ="index" v-bind:label="item.name" :value="item.id"></el-option>    

                        </el-select>
                </el-form-item>

                <el-form-item label="添加图片" style="text-align:left;" multiple="true">
                       <el-upload
                            action=""
                            :before-remove="this.onFileDelete"
                            :http-request="this.onFileUpload"
                            :file-list="this.upload_image_list"
                            list-type="picture-card">
                           
                            <i class="el-icon-plus"></i>
                        </el-upload> 
                </el-form-item>

                <el-form-item style="text-align:left;">
                        <el-button type="primary" @click="onSubmit">立即创建</el-button>
                        <el-button>取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>

</template>

<script>

import Log from '../../common/Log';

//引入qiniusdk
import * as qiniu from 'qiniu-js'

export default {

    props: {
        pid : {
            type : String,
            require :true
        }
    },

    data() {
        return {
            dialogTableVisible : false ,

            //提醒角色列表
            remindRoleList:[] ,

            //关联任务列表
            taskRelateList:[],

            form: {
                projectId: this.pid,
                startTime:"",
                workId:[],
                taskId:"",
                detail:"",
                image:"",       
                name:"",         
            },

            form_rules : {
                startTime : [
                    {require:true, message:'请填写提醒时间', trigger:'blur'} 
                ],

                workId : [
                    {type : 'array' , require : true , message:'请选择任务提醒人' , trigger:'change'}
                ],

                taskId : [
                    { require : true , message : '请选择关联任务' , trigger:'blur'}
                ],

                detail : [
                    { require : true , message : '请填写提醒详情' , trigger:'blur'}
                ],

                name : [
                    { require : true , message : '请填写提醒名称' , trigger:'blur'}
                ]
            } ,

            //上传图片 image:url / tempFile
            imageUploadMap: [],
            
            //图片上传Item
            imageToken:"",

            //上传图片集合
            upload_image_list:[],
        }
    },

    methods : {
        showMsg(type , msg){
            this.$message({
                message : msg,
                type : type
            })
        },


        onSubmit() {
            //检测表单完整性
            //TODO 
        
            //转换图片地址
            let imageList = "" ;
            this.imageUploadMap.forEach(item => {
                imageList += Log.getImageSuffix() +  item.url + ","
            })

            let url = "message" ;
            var params = {projectId : this.pid, 
                          startTime : this.form.startTime / 1000 ,
                          workId : this.form.workId.join(",") , 
                          image : imageList,
                          taskId : this.form.taskId ,
                          detail : this.form.detail};
                                    
            Log.L(params);
            this.$http.post(url , params).then(response => {
                Log.L(response);

                if(response.data.code == 200) {
                    this.showMsg("success","添加提醒成功");
                    
                }else {
                    this.showMsg("error","添加提醒失败，请稍后重试");
                }

            }, response => {
                Log.L("request data error");

                this.showMsg("error","添加提醒失败，请稍后重试");
            }) ;
        },


        parse_role_data(result) {
            let tempArray = [] ;
            if(result == undefined || result.length == 0) return;
            
            Log.L("parse_role_data:");
            Log.L(result);
            result.forEach(element => {
                 if(element.children != null && element.children.length) {
                     element.children.forEach(e => {
                         tempArray.push(e);
                     })
                 } else {
                        tempArray.push(element);
                 }
            });

            this.remindRoleList = tempArray;
        },

        //获取角色列表
        request_role_list() {
            let url = "getmessagerole";
            var params = {params:{ projectId:this.pid }};

            this.$http.get(url, params).then(response => {
                Log.L(response.data);

                let result = response.data ;
                if(result.code == 200) {

                    //parse data
                    this.parse_role_data(result.data);
                } else {
                    this.$message({ message: "暂无提醒人列表",type: 'error'});
                }
            }, response => {
                    this.$message({message: "提醒人列表请求失败",type: 'error'});
            });
        },

        //获取token
        request_qiniu_token() {
            this.$http.get("gettoken").then(response => {
                Log.L2("获取token中:" , response.data)

                let result = response.data;
                if(result.code == 200){
                    this.imageToken = result.data.token;
                } 
            } , response => {}) ;
        } ,

        //获取关联任务
        request_task_list() {
            let url = this.pid + "/projecttasks" ;
            var params = {params:{ type:"1"}};

            this.$http.get(url,params).
            then(response => {
                Log.L(response.data);

                let result = response.data;
                if(result.code == 200 ){
                    this.taskRelateList = result.data;
                } else {
                    //TODO
                }
            }, response => {});
        },

        //图片上传
        onFileUpload(obj) {
            let self = this;

            if(undefined == obj || null == obj) return;
            //check the imageToken;
            let url = Log.getRandomImageFileName();
            Log.L2("upload url : " , url) ;

            var observable = qiniu.upload(obj.file,  url, this.imageToken, null, null) ;
            observable.subscribe({
                next(res) {
                    Log.L2("next upload ", res);
                } ,

                error(err) {
                    Log.L2("upload error" , err);
                },

                complete(res) {
                    Log.L2("upload complete" , res);
                    let target = { url : url, obj : obj} ;

                    self.imageUploadMap[self.imageUploadMap.length] = target;
                }
            });
        },

        //移除删除的文件
        onFileDelete(file,fileList) {
           if(null == file || undefined == file) return ;

           this.imageUploadMap.forEach(ele => {
            
                if(null != ele && ele.obj.file == file.raw) {
                    this.imageUploadMap.splice(this.imageUploadMap.indexOf(ele),1);
                }
           }) ;
        }
    },

    mounted () {
        this.pid = "860";
        
        Log.L("-----get data-------1");
        this.request_role_list();
        this.request_task_list();
        this.request_qiniu_token();
        Log.L("-----get data-------2");
    }
}

</script>

<style scope>
    .content {
            line-height: 16px;
    }

    .el-upload--picture-card {
        background-color: #fbfdff;
        border: 1px dashed #c0ccda;
        border-radius: 6px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        width: 100px;
        height: 100px;
        line-height: 106px;
        vertical-align: top;
    }

 .el-upload-list--picture-card .el-upload-list__item {
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
</style>
