<template>
    <div class="content">
        <div> 
                <el-row>
                        <el-col :span="20">
                            <div >
                                <el-menu :router="false"   :default-active="this.status"  class="el-menu-demo" mode="horizontal" @select="handleSelect">
                                            <el-menu-item index="-1">未读</el-menu-item>
                                            <el-menu-item index="0">全部</el-menu-item>
                                 </el-menu>
                            </div>
                       </el-col>

                    <el-col :span="2">
                        <div >
                            <img src="../../../static/ic_add_remind.png" /> 
                        </div>
                    </el-col>

                    <el-col :span="2">
                        <div v-on:click="action_close_pop()">
                             <img src="../../../static/ic_close.png" /> 
                        </div>
                    </el-col>
                  </el-row> 
        </div>

    <div>
         <el-main class='project_content_class' v-loading='request_data_loading' >
          <!-- <div v-for="item in project_list" class="project_list" v-if="!data_is_empty" @click="onItemClick(item)">
            <div>{{item.name}}</div>

            <el-progress :percentage="item.schedule" v-if="currentStatus <= 0" ></el-progress>
            <span class='project_statuc_desc' v-if="currentStatus >0 ">{{ find_status_msg() }}</span>
          </div> -->

          <div v-if="data_is_empty">
              暂无数据
          </div>

        </el-main>

    </div>

    </div>    

</template>


<script>
export default {

    props:{
            pid : {
                type:String,
                required:true
            },

            pType : {
                type : Number,
                required:false
            }
    },

    data()  {
        return {
            request_data_loading : false,
            data_is_empty : true ,
            status : "0" ,
        }

    },

    methods : {
        handleSelect() {
            //TODO
        } ,

        action_close_pop() {
            this.$emit("action_close_pop")
        }
    }

}
</script>


<style scope>
.content{
    line-height: 12px;
}

.img_operation {
    width: 60px;
    height:60px;


}

</style>
