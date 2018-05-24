<!-- 提醒列表 未读&全部列表 -->

<template>
        <div class="remind-list-content">
                <div class="remind-title"> 
                    <el-row>
                            <el-col :span="22">
                                <div >
                                    <el-menu :default-active="this.currentType"
                                             :router="false" 
                                             class="el-menu-demo" 
                                             @select="handleSelect"
                                             mode="horizontal">
                                                <el-menu-item index="0">未读</el-menu-item>
                                                <el-menu-item index="1">全部</el-menu-item>
                                    </el-menu>
                                </div>
                            </el-col>

                            <!-- <el-col :span="2" class="remind-external">
                            <div v-on:click="action_add_new()">
                                <img src="../../../static/ic_add_remind.png" /> 
                            </div>
                            </el-col> -->

                            <el-col :span="2" class="remind-external">
                                    <div v-on:click="action_close_pop()">
                                        <img src="../../../static/ic_close.png" /> 
                                    </div>
                            </el-col>
                    </el-row> 
                </div>

            <div class="block">

                <div v-if="this.currentType == '0'" >
                        <RemindItem :remindList="this.unReadList" @getRemindDetail="getRemindDetail"></RemindItem>
                </div>

                <div v-if="this.currentType == '1'" >
                        <RemindItem :remindList="this.allList" @getRemindDetail="getRemindDetail"></RemindItem>
                </div>
            </div>    

        </div>

</template>

<script>

import Log from '../../common/Log';
import RemindItem from "../../components/project/RemindItem.vue"

export default {

  components : {
        RemindItem,
   },

    props: {
        pid : {
            type: Number,
            require:true
        }
    },

    data() {
        return {
         
            //未读提醒
            unReadList:[],
            //全部提醒
            allList:[] ,

            //当前显示是否未读 & 已读消息
            currentType : '0',

            unReadPageIndex : 1 ,
            allPageIndex : 1,
     }
 },

methods : {
    handleSelect(type){
        //TODO
        this.currentType = type;

        Log.L(this.currentType);
 
        if(this.currentType === '0') {  //未读消息
            if(null == this.unReadList || this.unReadList.length == 0) {
                this.request_remind_list();
            }

        } else {  //全部消息
            if(null == this.allList || this.allList.length == 0) {
                this.request_remind_list();
            }
        }
    },

    getRemindDetail(remindId) {
        this.$emit("getRemindDetail", remindId);
    },


    action_add_new() {
        //进入添加任务
        //this.$router.push('/project/remind/add/' + this.pid);
        this.showNewRemind = true ;
    },

    action_close_pop() {
        this.$emit("closeRightPannel");
    },

    //请求提醒列表
    request_remind_list(){
        let self = this;
        //uid = 530 ;
        let url =  this.pid + "/usermessage";

        let isUnRead = self.currentType === '0';
        let params = { params : {
                projectId : self.pid,
                pageSize  : Log.PAGE_SIZE(),
                pageIndex : isUnRead ? self.unReadPageIndex : self.allPageIndex,
                isActive :  isUnRead ? '1' : '-1'  
        }}

        this.$http.get(url,params).then(response => {
            let result = response.data;
            Log.L(result);

            if(result.code == 200 && result.data != null) {
                if(isUnRead) {
                    self.unReadList.push.apply(self.unReadList,result.data);
                    self.unReadPageIndex ++ ;

                }else {
                    self.allList.push.apply(self.allList, result.data);
                    self.allPageIndex ++ ;

                }
            }
        })
    }
},

created() {
        this.request_remind_list();
    }

}
</script>

<style>
.remind-list-content {
    padding:8px;
    background-color:#fff;

}

.remind-title {
    text-align: center;
}

.remind-external {
    background-color:#fff;
    height: 61px;
    padding-top:19px;
    padding-bottom:19px;
    text-align: center;
}


</style>
