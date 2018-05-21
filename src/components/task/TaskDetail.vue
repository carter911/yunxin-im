<!-- 任务详情  -->

<template>
    <div class="task_content">
        <h1 class="title">{{taskDetail.name}}</h1>

        <h3 class="task_time">{{ taskDetail.startTime | formatDate }}</h3>

       <hr/>

        <el-row>
            <el-col :span="6">
                 <div class="product-remind-title">
                        <span> 描述： </span>
                 </div>                
            </el-col>
            
            <el-col :span="18">    
                <span v-html="taskDetail.detail"> </span>
            </el-col>

        </el-row>

        <el-row>
            <el-col :span="6">
                 <div class="product-remind-title">
                        <span> 照片:</span>
                 </div>                
            </el-col>
            
            <el-col :span="18">    
               <span> .... </span>
            </el-col>

        </el-row>

        <el-row>
            <el-col :span="6">
                 <div class="product-remind-title">
                        <span> 任务状态:</span>
                 </div>                
            </el-col>
            
            <el-col :span="18">    
               <span> {{ taskDetail.statusMessage }}</span>
            </el-col>
        </el-row>

        <div class="comment">
            产品评论
        </div>


    </div>

    
</template>

<script>
import Log from '../../common/Log';

export default {
    data() {
        return {
            pid : this.$route.params.id,
            taskDetail : {}
        }
    },

    methods : {
        showMsg(type , message) {
            this.$message({
                message: message,
                type: type
            });
        },

        //请求任务详情
        request_task_detail () {
            let url = this.pid + "/task";

            this.$http.get(url).then(response => {
                let result = response.data;
                Log.L(result);

                if(result.code == 200) {
                    this.taskDetail = result.data;
                } else {
                    this.showMsg("error","请求任务详情失败，请稍后重试");
                }
            }, error => {
                    this.showMsg("error","请求任务详情失败，请稍后重试");
            }) ;
        }
    },

    created() {
        this.request_task_detail();
    }

}
</script>

<style scope>

.task_content{
    padding: 8px;
    color: #494949;
     text-align: left;
}



.title {
    font-size: 15px;
    color: #494949;
  
}

.task_time {
    text-align: right;

}



</style>
