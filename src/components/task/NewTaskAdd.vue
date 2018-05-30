<!-- 添加 新的任务 -->
<template>

    <div class="task-add">
          <el-dialog title="新任务" :visible.sync="dialogTableVisible" 
                                    width="80%"  
                                    :beforeClose="dialogBeforeClose"
                                    :closeOnClickModal="false">

            <el-form ref="form" :model="form" label-width="120px" :rules="this.form_rules">

                <el-form-item label="任务名称" prop="name">
                        <el-input v-model="form.name"></el-input>
                </el-form-item>

                <el-form-item label="任务时间" prop="startTime">
                        <el-col :span="8">
                        <el-date-picker type="date" v-model="form.startTime" value-format="timestamp" placeholder="选择日期"  style="width: 100%;"></el-date-picker>
                        </el-col>
                </el-form-item>

                <el-form-item label="参与人" prop="workId">
                        <el-checkbox-group  style="text-align:left;" v-model="form.workId">
                                <el-checkbox v-for="(item,index) in taskRoleList" :key="index" :label="item.work_id || item.role_id"> {{ item.name }}</el-checkbox> 
                        </el-checkbox-group>
                </el-form-item>

                <el-form-item label="关联阶段" style="text-align:left;" prop="circleId">
                        <el-select placeholder="请选择关联阶段" v-model="form.circleId">
                             <el-option v-for="(item,index) in taskRelateList" :key="index" v-bind:label="item.name" :value="item.id"></el-option>    
                        </el-select>
                </el-form-item>
        
                <el-form-item label="任务描述" prop="detail">
                        <el-input type="textarea" v-model="form.detail"  rows="4"></el-input>
                </el-form-item> 

                <el-form-item style="text-align:left;">
                        <el-button type="primary" @click="onSubmit">立即创建</el-button>
                        <el-button @click="resetFormAndClose">取消</el-button>
                </el-form-item>

            </el-form>
        </el-dialog>

    </div>

</template>

<script>

import Log from '../../common/Log';
import http from "../../utils/http"
export default {
    props : {
        pid : {
            type:Number,
            required:true
        }
    },

    data()  {
        return {
            dialogTableVisible: true ,

            taskRoleList : [] ,
            taskRelateList : [] ,

            form :{
                projectId : "",
                workId : [],
                startTime:"",
                name : "",
                circleId:"",
                detail:"",
            }, 
            
            form_rules: {
                name : [
                    { required :true,  message:'请输入任务名称', trigger:'blur'},
                    { min : 5,         message:'请输入至少5个字符', trigger:'blur'}
                ],

                startTime : [
                    { required : true , message:'请选择任务时间', trigger: 'change' }
                ],

                workId : [
                      { type : 'array' , required : true , message : '请选择参与人' , trigger:'change'}
                ],

                circleId : [
                     { required : true , message : '请选择关联阶段' , trigger:'change'}
                ],

                detail : [
                    { required : true , message : '请填写任务描述' , trigger : 'blur' }
                ]
            }
        }
    },

    methods : {
         showMsg(type , msg){
            this.$message({
                message : msg,
                type : type
            })
        },

        dialogBeforeClose(action, instance, done){
            console.log(action + "---" + instance + "---" + done);
            this.resetFormAndClose();
        },

        resetFormAndClose() {
            this.$refs["form"].resetFields();
            this.$emit("closeTaskAddDialog");
        },

        //表单验证
        doCheckForm(formName){

            this.$refs[formName].validate((valid) => {
                if(valid){
                    this.onSubmit();
                }else {
                    return false;                    
                }
            })
        } ,

        onSubmit() {
            let url = "task";
            let params = {
                projectId:this.pid,
                workId : this.form.workId.join(","),
                startTime : this.form.startTime / 1000 ,
                name : this.form.name,
                circleId : this.form.circleId,
                detail: this.form.detail
            }

            http.post(url,params).then(response => {
                let result = response;

                Log.L(result);
                if(result.code == 200) {
                    this.showMsg("success", result.message);
                    this.resetFormAndClose();
                }else {
                    this.showMsg("error", result.message)
                }
            });
        },

         //请求个阶段函数
         request_project_circleList() {
            let url = this.pid +  "/projectcircle"
            http.get(url).then(response => {
                    let result = response;
                    Log.L(result);
                    if(result.code === 200) {
                        this.taskRelateList = result.data;
                    }else {
                        this.showMsg("error","获取任务阶段失败");
                    }
            }, response => {
                     this.showMsg("error","获取任务阶段失败");
            }) ;
         },

        //请求任务参与人
        request_user_roleList() {
            let url = "getmessagerole";
            var params = {projectId:this.pid};

            http.get(url, params).then(response => {
                let result = response ;
                Log.L(result);
                
                if(result.code == 200) {
                    //parse data
                    this.parse_role_data(result.data);
                } else {
                    this.$message({ message: "暂无提醒人列表",type: 'error'});
                }
            }, response => {
                    this.$message({message: "提醒人列表请求失败",type: 'error'});
            });
        } ,

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

            this.taskRoleList = tempArray;
        },
      
    },

    created() {
        this.request_user_roleList();
        this.request_project_circleList();
    }

}
</script>

<style scoped>
.task-add {
  
}


</style>
