<template>

  <el-container>
  <el-aside width="21rem" v-bind:style="{height: heightData}">
    <el-col :span="24" class="pannel-left" v-bind:style="{height: heightData}">
        <div class="grid-content bg-purple">
          <el-menu router='true'  :default-active="admin/project/0" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="/admin/project/0">全部</el-menu-item>
            <el-menu-item index="/admin/project/1">进行中</el-menu-item>
            <el-menu-item index="/admin/project/4">已延期</el-menu-item>
            <el-menu-item index="/admin/project/5">已结束</el-menu-item>
          </el-menu>
        </div>
        <div>
          <router-view/>
        </div>
    </el-col>
    
  </el-aside>
  <el-main>Main</el-main>
</el-container>
  <!-- <el-row :gutter="20">
      <el-col :span="10" class="pannel-left" v-bind:style="{height: heightData}">
        <div class="grid-content bg-purple">
          <el-menu  :default-active="1" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1">全部</el-menu-item>
            <el-menu-item index="2">进行中</el-menu-item>
            <el-menu-item index="3">已延期</el-menu-item>
            <el-menu-item index="4">已结束</el-menu-item>
          </el-menu>
        </div>
      </el-col>
    <el-col :span="13" class="pannel-right" v-bind:style="{height: heightData}">
      <div class="grid-content bg-purple">
        111111111
      </div>
      </el-col>
    
  </el-row> -->
</template>
<script>
export default {
  data(){
      return {
        heightData :(document.documentElement.clientHeight-60)+'px',
      }
  },
  created:{
    //get_list()
  },

  methods: {
  }
}
</script>
<style scoped>
.pannel-left
{
  margin: 0px;
  padding: 9px;
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
</style>
