<template>
    <div class="content">
        <div> 
                <el-row>
                        <el-col :span="20">
                            <div >
                                <el-menu :router="false"   :default-active="this.status"  class="el-menu-demo" mode="horizontal" @select="handleSelect">
                                            <el-menu-item index="0">未读</el-menu-item>
                                            <el-menu-item index="1">全部</el-menu-item>
                                 </el-menu>
                            </div>
                       </el-col>

                    <el-col :span="2">
                        <div  v-on:click="action_add_new()">
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

    <div id="mescroll" class="mescroll">

        <div v-if="this.status == '0'" >
                <RemindItem :remindList="this.un_finish_array"></RemindItem>
        </div>

        <div v-if="this.status == '1'" >
                <RemindItem :remindList="this.all_data_array"></RemindItem>
        </div>

    </div>

    </div>    

</template>


<script>
// import MeScroll from "../../common/mescroll.m.js";

//import  "@src/common/mescroll.m.js";

import Log from '../../common/Log';
import RemindItem from "../../components/project/RemindItem.vue"
import TaskItem from "../../components/project/TaskItem.vue"

//const UNFINSH_TYPE = 0 ;
//const FINISH_TYPE = 1 ;

export default {
     components : {
            RemindItem,
            TaskItem
      },

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

            un_finish_array : [] ,
            all_data_array :[] ,

            //创建上下拉加载对象
            meScroll : null ,

            //当前页数
            current_page : 1 
        }

    },

    methods : {
        action_add_new() {
            //进入添加任务
            this.$router.push('/project/task/add/' + this.pid);
        },

        handleSelect(type) {
            //TODO
            this.status = type;
        } ,

        //关闭
        action_close_pop() {
            console.log("------>>>----")
            this.$emit("action_close_pop")
        } ,

        upCallback(page) {
            this.request_net_work_data(page)
        },

        //请求 未完成 & 完成 数据
        request_net_work_data(page) {
            if(pType == 0) {  // 提醒
                this.request_remind_data(page);
            } else { //任务
                this.request_task_data(page);
            }
        }, 

        //请求任务数目
        request_task_data(page) {
          let url = this.pid + "/projecttask" ;
          var params = {
              params:{projectId: this.pid,
                      pageSize:  page.size,
                      isActive:  this.status,
                      pageIndex: page.num}}

         this.$http.get(url,params).then(response => {
             Log.L(response.data) ;

             let result = response.data;
             if (this.status == "0") {  //未读
                if(result.code == 200) {

                    let newRemindList = result.data || [];
                        
                    if(page.num == 1) {
                            this.un_finish_array = [];
                    }

                    this.un_finish_array = this.un_finish_array.concat(newRemindList)

                    //判断是否存在下一页
                    this.meScroll.endSuccess(this.un_finish_array.length, newRemindList.length >= page.size);

                } else {
                     if(page.num > 1) {
                            this.meScroll.endError();
                        }
                }

             } else { //全部数据
                if(result.code == 200) {
                        let newRemindList = result.data || [] ;
                        
                        if(page.num == 1) {
                            this.all_data_array = [] ;
                        }

                        this.all_data_array = this.all_data_array.concat(newRemindList);

                        //判断是否存在下一页
                        this.meScroll.endSuccess(this.all_data_array.length, newRemindList.length >= page.size);
                
                    }else {
                        if(page.num > 1) {
                            this.meScroll.endError();
                        }
                    }
             }
             
         }, response => {
            //TODO 
            if(this.status == "0" ) {
                if(page.num > 1) {
                   this.meScroll.endError();
                 }
            }else {
                if(page.num > 1) {
                    this.meScroll.endError();
                }
            }
         })     
        },

        //请求提醒数据
        request_remind_data(page) {

            let url = this.user_id +  "/usermessage";
            var params = {params:{
                              projectId:  this.pid,
                              pageSize:   page.size,
                              isActive:   this.status,
                              pageIndex:  page.num}}

            this.$http.get(url, params).then(response => {
                Log.L(response.data);
                let result = response.data;

                if (this.status == "0") {  //未读List
                    if(result.code == 200) {
                        let newRemindList = result.data || [];
                        
                        if(page.num == 1) {
                            this.un_finish_array = [];
                        }

                        this.un_finish_array = this.un_finish_array.concat(newRemindList)

                        //判断是否存在下一页
                        this.meScroll.endSuccess(this.un_finish_array.length, newRemindList.length >= page.size);
                    
                    }else {
                        if(page.num > 1) {
                            this.meScroll.endError();
                        }
                    }

                }else  { //全部List
                    if(result.code == 200) {
                        let newRemindList = result.data || [] ;
                        
                        if(page.num == 1) {
                            this.all_data_array = [] ;
                        }

                        this.all_data_array = this.all_data_array.concat(newRemindList);

                        //判断是否存在下一页
                        this.meScroll.endSuccess(this.all_data_array.length, newRemindList.length >= page.size);
                
                    }else {
                        if(page.num > 1) {
                            this.meScroll.endError();
                        }
                    }
                }

             },response => {
                //TODO 
                if(this.status == "0" ) {
                        if(page.num > 1) {
                            this.meScroll.endError();
                        }
                }else {
                    if(page.num > 1) {
                        this.meScroll.endError();
                    }
                }
            });
        }
    },

    mounted : function(){
        // this.meScroll = new MeScroll("mescroll", {
        //     up : {
        //         callback : this.upCallback,
        //         page : {
        //             size : Log.PAGE_SIZE()
        //         },
        //     }
        // })
    }

}
</script>


<style scope>

 @import "../../common/mescroll.min.css"; 

.content{
    line-height: 12px;
}

.img_operation {
    width: 60px;
    height:60px;
}

/**TODO 长度高度 都固定**/
.mescroll {
	height: 580px;
}

</style>
