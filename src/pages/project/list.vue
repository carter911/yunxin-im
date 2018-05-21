<template>
  <div>
    <el-container>
      <el-aside v-bind:style="{height: heightData}"  class="pannel-left" width="21rem">

      <el-menu :router="false"   :default-active="this.status"  class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="-1">全部</el-menu-item>
          <el-menu-item index="0">进行中</el-menu-item>
          <el-menu-item index="3">已延期</el-menu-item>
          <el-menu-item index="5">已结束</el-menu-item>
      </el-menu>

      <div class="block">

        <!-- 主体展示container -->
        <el-main class='project_content_class' v-loading='request_data_loading' >
          <div v-for="item in project_list" class="project_list" :key="item.id" v-if="!data_is_empty" @click="onItemClick(item)">
            <div>{{item.name}}</div>

            <el-progress :percentage="item.schedule" v-if="currentStatus <= 0" ></el-progress>
            <span class='project_statuc_desc' v-if="currentStatus >0 ">{{ find_status_msg() }}</span>
          </div>

          <div v-if="data_is_empty">
              暂无数据
          </div>

        </el-main>

        <div v-if="pageShow == 1">
            <el-pagination
              :current-page="this.currentIndex"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :page-size="this.pageSize"
              small
              layout="prev, pager, next"
              background
              :total="this.projectTotal">
            </el-pagination>
          </div>
         
        </div>
      </el-aside>

      <el-main v-bind:style="{height: heightData}" class="pannel-right">
        
       <ProjectDetail :pid="current_pid"></ProjectDetail>
        
      </el-main>
    </el-container>
  </div>
</template>
<script>

import _project_detail from './project_detail.vue'

export default {

  components : {
    "ProjectDetail" : _project_detail
  },

  data(){
      return {
        status:'-1',
        heightData :(document.documentElement.clientHeight)+'px',
        project_list : [],
        currentIndex:1,
        currentStatus:0,
        pageShow :0,
        pageSize:15,
        projectTotal:0,

        // 数据加载状态
        request_data_loading:true,
        
        //加载数据是否为空
        data_is_empty:false,

        current_pid : ""
      }
  },

  methods: {
      find_status_msg() {
          if (this.currentStatus == 3) return "已延期";
          if (this.currentStatus == 5) return "已结束" ;
          return "" ;
      } ,

      get_list(status =0 ,pageIndex = 1){
        console.log("----->>" + status)
        var url = 'projectlists';
        
        if(pageIndex == 1) {
          this.project_list = [] ;
          this.request_data_loading = true;
        }

        var params = {params:{status:status,
                              pageSize:this.pageSize,
                              pageIndex:this.currentIndex}}

        var user = JSON.parse(sessionStorage.getItem('user'));
        this.$http.get(url, params).then(response => {
            var result = response.data
            console.log(result)

            //数据请求结束
            this.request_data_loading = false;

            if(result.code == 200){
              this.project_list = result.data;
              if(result.data != null){
                //获取当前pid
                this.current_pid = "" + result.data[0].id;

                this.projectTotal = parseInt(result.data[0]['count']);
              }
              
              if(result.data != null && result.data.length == this.pageSize){
                this.pageShow = 1
              }else{
                this.pageShow = 0
              }

              //判断数据是否为空
              this.data_is_empty = this.project_list == null || this.project_list.length == 0;

              this.$message({
                message: result.message,
                type: 'success'
              });

            }else{
              this.project_list = [];
              this.$message({
                message: result.message,
                type: 'error'
              });
            }
        }, response => {
            // error callback
        })
      },
      
      handleSelect(key, keyPath){
        this.currentIndex = 1 ;
        this.currentStatus = key;
        this.get_list(key,1);
        // alert(key)
      },
      handleSizeChange(val){
        alert(val)
        this.get_list(this.currentStatus,val);
      },
      
      handleCurrentChange(val){
       this.currentIndex = val;
        this.get_list(this.currentStatus,val);
      },

      onItemClick(item) {
          this.current_pid = "" + item.id ;
          console.log("----the current_pid-----" + this.current_pid);
      }
  },

  created() {
    this.get_list();
  },

  // mounted:function(){
    
  // }


}
</script>
<style scoped>
.pannel-left
{
  margin: 0px;
  background: white;
  border-right: rgb(237, 237, 237) 1px solid;
  height: 100%;
}

.pannel-right
{
  background: #ffffff;
  float: right;
  height: 100%;
  width: 100%;
}
.project{
  padding: 0px;
  margin: 0px;
  font-size: 12px;
  text-align: left;
  height:80%;
}
.project_list{
  font-size: 14px;
  height: 60px;
  margin-bottom: .2rem;
  line-height: 30px;
  text-align: left;
  margin-left:.7rem;
  margin-right:.7rem;
  border-bottom: 1px solid #f2f2f2;
}

.project_content_class {
  height: 500px;
  overflow:auto;
  background-color: #ffffff;
}

.project_statuc_desc {
  color: #464646;
  font-size: 12px;
}

</style>
