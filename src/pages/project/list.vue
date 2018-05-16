<template>
  <div>
    <el-container>
      <el-aside v-bind:style="{height: heightData}"  class="pannel-left" width="21rem">
        <el-menu :router="false" :default-active="this.status" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="-1">全部</el-menu-item>
          <el-menu-item index="0">进行中</el-menu-item>
          <el-menu-item index="3">已延期</el-menu-item>
          <el-menu-item index="5">以结束</el-menu-item>
        </el-menu>
        <div class="block">
          <div v-for="item in project_list" class="project_list">
            <div>{{item.name}}</div>
            <el-progress :percentage="10"></el-progress>
          </div>
          <div v-if="pageShow ==1">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :page-size="this.pageSize"
              layout="total, prev, pager, next, jumper"
              :total="this.projectTotal">
            </el-pagination>
          </div>
         
        </div>
      </el-aside>
      <el-main v-bind:style="{height: heightData}" class="pannel-right">Main</el-main>
    </el-container>
  </div>
</template>
<script>

export default {
  data(){
      return {
        status:'-1',
        heightData :(document.documentElement.clientHeight-60)+'px',
        project_list : [],
        currentIndex:1,
        currentStatus:1,
        pageShow :0,
        pageSize:15,
        projectTotal:0
      }
  },
  methods: {
      get_list(status =0 ,pageIndex = 1){
        var url = 'projectlists';
        
        var params = {params:{status:status,pageSize:this.pageSize,pageIndex:this.currentIndex}}
        var user = JSON.parse(sessionStorage.getItem('user'));
        this.$http.get(url, params).then(response => {
            var result = response.data
            console.log(result)
            if(result.code == 200){
              this.currentIndex = this.currentIndex+1;
              this.project_list = result.data;
              if(result.data != null){
                this.projectTotal = parseInt(result.data[0]['count']);
              }
              
              if(result.data != null && result.data.length == this.pageSize){
                this.pageShow = 1
              }else{
                this.pageShow = 0
              }
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
        this.currentStatus = key;
        this.get_list(key,1);
        //alert(key)
      },
      handleSizeChange(val){
        alert(val);
        this.get_list(this.currentStatus,val);
      },
      handleCurrentChange(val){
        alert(val);
        this.get_list(this.currentStatus,val);
      }
  },
  mounted:function(){
        this.get_list();
  }
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
  background: #ccc;
  float: right;
  height: 100%;
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
  height: 50px;
  margin-bottom: .2rem;
  line-height: 30px;
  text-align: left;
  margin-left:.7rem;
  margin-right:.7rem;
  border-bottom: 2px solid #ccc;
}
</style>
