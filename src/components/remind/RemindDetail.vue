 <!-- 提醒详情 -->

<template>
    <div class="remind-content">

        <div class="remind-detail-title">
            <div class="remind-detail-desc">
                提醒详情
            </div>

            <img src="../../../static/ic_close.png" style="width:20px;height:20px;" @click="this.closeRightPannel"/>
            
        </div>

        <hr class="remind-detail-hr"/>

        <div class="remind-detail-content"
             :style="{height : (this.$store.state.windowClientHeight - 122 - 26) + 'px'}">

            <div class="remind-detail-title2">
                {{ remind.projectName }}
            </div>

            <div class="detail-reminder"> {{ getReminder()}}</div>
            <div class="detail-reminder"> {{ remind.startTime | formatDate}}</div>

            <div class="detail-content" v-html="remind.detail"></div>

            <div class="detail-image" v-html="this.images"></div>
        </div>

        </div>
     
</template>

<script>
import Log      from '../../common/Log';
import http from "../../utils/http"

export default {
    
    props : {
        pid : {
            type:Number, 
            require:true
        }
    },

    data() {
        return {
            remind : {},
            images:''
        }
    },

    methods: {
        getReminder() {
            if(null == this.remind || undefined == this.remind.createUser) { return "" ; }

            let user = this.remind.createUser;
            return user.roleName + " " + user.name ;
        },

        request_remind_detail() {
            let self = this;
            let url = this.pid + '/message' ;
            http.get(url).then(response => {
                Log.L(response);

                if(response.code == 200) {
                    this.remind = response.data;
                    let imageResult = this.remind.images;

                    Log.L2("----imageResult-----",imageResult);
                    if(null != imageResult && imageResult.length) {
                        imageResult = imageResult.split(",");
                        imageResult.forEach(element => {
                            if(element == null || element.length <= '?imageslim'.length) return;
                            self.images += "<img style='width:100%;' src=" + element + "/>" ;
                        });
                    }
                }
            })
        },

        closeRightPannel(){
            this.$emit("closeRightPannel")
        }
    },

    created() {
        this.request_remind_detail();
    }


}
</script>

<style scope>
    .remind-content {
        padding: 8px;
        background-color: #ffffff;
    }

    .remind-detail-hr {
        background-color: #e9e9e9;
        height: 1px;
        border:none;
    }

    .remind-detail-title{
        display: flex;
        align-content: center;
        justify-content: center; 
        align-items: center;
        padding-left: 6px;
        padding-right: 6px;
    }

    .remind-detail-desc{
        flex-grow:1;
        padding-top:12px;
        padding-bottom: 12px;
        padding-left: 24px;
        text-align: left;
        color: #333333;
        font-size: 16px;
    }

    .remind-detail-title2{
        text-align: center;
        padding-top: 24px;
        padding-bottom: 12px;
        color: #333333;
    }

    .detail-reminder {
        text-align: right;
        font-size: 12px;
        color: #999999;
    }

    .remind-detail-content{
        overflow:auto;
      
    }

    .detail-content {
        padding-left: 24px;
        padding-right: 24px;
        text-align: left;
        color: #666666;
        font-size: 14px;
    }
    
    .detail-image{
        padding: 12px;
    }

</style>
