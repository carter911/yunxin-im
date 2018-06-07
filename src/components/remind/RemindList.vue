<!-- 提醒列表 未读&全部列表 -->

<template>
        <div id="id_remind_list" class="remind-list-content">
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
                                        <img src="../../../static/ic_close.png" style="width:20px;height:20px;"/> 
                                    </div>
                            </el-col>
                    </el-row> 
                </div>

            <div class="remind_list_block" 
                 :style="{height : (this.$store.state.windowClientHeight - 122 - 16) + 'px'}" 
                 v-loading='request_data_loading'>

                <RemindItem :remindList="get_current_remind_list()" 
                            @getRemindDetail="getRemindDetail"
                            v-if="!checkPageDataEmpty()"></RemindItem>

                  <div v-if="checkPageDataEmpty()">
                    <img class="data-img-empty" src="../../../static/pic_content_empty.png"/>
                  </div>

                  <div v-if="this.shouldShowLoadMore()">
                        <BottomLoading :loadingType="this.buttomLoadingType" 
                                        @loadingMore="loadingMore">
                        </BottomLoading>
                  </div>
            </div>    
        </div>

</template>

<script>

import Log from '../../common/Log';
import RemindItem from "../../components/project/RemindItem.vue"
import BottomLoading from '../common/BottomLoading.vue'
import http from "../../utils/http"
export default {

  components : {
        RemindItem,
        BottomLoading
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

            //提醒全部数据
            allRemindEntity : new RemindListEntity(),

            //提醒未读数据
            unReadRemindEntity : new RemindListEntity(),

            //加载动作
            buttomLoadingType : 0 ,

            pageSize : 20 ,

            request_data_loading : false
     }
 },

methods : {
    handleSelect(type){
        //TODO
        this.currentType = type;
        Log.L(this.currentType);
        
        this.request_remind_list();
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

    shouldShowLoadMore(){
        if(this.currentType == '0') return this.unReadRemindEntity.canLoadMore;
        return this.allRemindEntity.canLoadMore;
    },

    checkPageDataEmpty(){
        if(this.currentType == '0') return this.unReadRemindEntity.dataIsEmpty;
        return this.allRemindEntity.dataIsEmpty;
    },

    get_data_has_loaded(){
        if(this.currentType == '0') return this.unReadRemindEntity.hasBeenLoading;
        return this.allRemindEntity.hasBeenLoading;
    },

    get_current_remind_list(){
        if(this.currentType == '0') return this.unReadRemindEntity.list;
        return this.allRemindEntity.list;
    },

    get_current_page(){
        if(this.currentType == '0') return this.unReadRemindEntity.currentPageIndex;
        return this.allRemindEntity.currentPageIndex;
    },

    /**
     * 当前页面是否为空
     */
    get_current_page_is_empty(){
        if(this.currentType == '0') return this.unReadRemindEntity.dataIsEmpty;
        return this.allRemindEntity.dataIsEmpty;
    },

    loadingMore(){
        this.request_remind_list(false);
    },

    //请求提醒列表
    request_remind_list(refresh=true){
        if(this.get_data_has_loaded() && refresh) return;

        let self = this;        
        let url =  this.pid + "/usermessage";
        let isUnRead = self.currentType === '0';
        let pageIndex = this.get_current_page() ;

        if(pageIndex == 1) {
            this.request_data_loading = true ;
        }

        let params = {
                projectId : self.pid,
                pageSize  : self.pageSize,
                pageIndex : pageIndex,
                isActive :  isUnRead ? '1' : '-1'  
        }

        this.buttomLoadingType = 1 ;
        http.get(url,params).then(response => {
            this.request_data_loading = false ;
            this.buttomLoadingType = 0 ;
            let result = response;
            Log.L(result);

            if(result.code == 200) {
                this.parseRemindList(pageIndex, result.data);
            }else {
                //TODO ...
            }
        }, error => {
            this.request_data_loading = false ;
            this.buttomLoadingType = 0 ;
        })
    },

    parseRemindList(pageIndex,data){
        if(this.currentType == '0') {
            this.parseInnerList(this.unReadRemindEntity, pageIndex, data);
        }else {
            this.parseInnerList(this.allRemindEntity, pageIndex, data);
        }
    },

    parseInnerList(obj, pageIndex, data) {
         if(pageIndex == 1) {
              obj.list = [] ;
          }

          obj.currentPageIndex = pageIndex + 1 ;
          obj.hasBeenLoading = true ;
          if(data != null && data != undefined) {
            obj.list = obj.list.concat(data);
            obj.canLoadMore = data.length >= this.pageSize;
          }else{
               obj.canLoadMore = false;
          }
          
          obj.dataIsEmpty = !(obj.list != null && obj.list.length) ;
    }
},

watch : {
     pid : function(oldOne, newOne) {
         //TODO 
         if(oldOne !== newOne) {
             this.unReadRemindEntity.clear() ;
             this.allRemindEntity.clear();

             this.currentType = '0';
             this.request_remind_list();
         }
    }
},

created() {
    this.request_remind_list();
  }
}

class RemindListEntity {
    constructor() {
        this.clear();
    }

    clear(){
        this.list = [] //数组集合
        this.canLoadMore = false  //是否可加载更多
        this.currentPageIndex = 1  //当前加载页面
        this.hasBeenLoading = false   //是否加载过
        this.dataIsEmpty = false      //数据是否为null
    }
}

</script>


<style>
#id_remind_list .el-menu-item {
    height: 61px;
    line-height: 61px;
    width: 70px;
}

</style>

<style scoped>

.remind_list_block {
    overflow:auto
}

.remind-list-content {
    background-color:#fff;
}

.remind-title {
    margin:0 8px;
    text-align: center;
}

.remind-external {
    background-color:#fff;
    height: 60px;
    padding-top:20px;
    text-align: center;
    border-bottom:1px #f4f4f4 ;
}

.data-img-empty{
    width:180px;
    height: 180px;
    margin-top: 80px;
}


</style>
