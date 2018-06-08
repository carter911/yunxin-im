<template>

    <div id="user_list_content">

        <div class="user-detail-title">
                <div class="user-detail-desc">
                    用户列表
                </div>

                <img src="../../../static/ic_close.png" style="width:20px;height:20px;margin-right:12px;" @click="closePannel"/>
        </div>

        <hr class="user-detail-hr"/>

        <div :style="{height : (this.$store.state.windowClientHeight - 122 - 26) + 'px'}">

            <div class="user-item" v-for="(item,index) in this.userList" :key="index" 
                onmouseover="this.style.backgroundColor='#F4F9FD'"  
                onmouseout="this.style.backgroundColor='#FFFFFF'"
                @click="getRemindDetail(item)">
                
                    <div class="user-img"> 
                        <img :src='get_user_avatar(item)' class="project-user-avatar"/>
                    </div>

                    <div class="user-list-desc">
                         <div class="product-user-item-title">{{ item.name }}</div>
                         <div class="product-user-item-content"> {{ item.mobile }}</div>
                    </div>

                    <div class="user-item-time">
                        <span> {{ item.roleName}}</span>
                    </div>   
            </div>
    </div>
        
    </div>

</template>

<script>

import Log from '../../common/Log';
import http from "../../utils/http"

export default {
    props: {
        pid : {
            type:Number,
            require:true
        }
    },

    data() {
        return {
            userList:{} ,
        }
    },

    methods : {
        closePannel() {
            this.$emit("closeRightPannel");
        },

        get_user_avatar(item) {
            if(null == item || null == item.avatar || !item.avatar.length) return Log.DEFAULT_IMAGE();
            return item.avatar ;
        },
        
        //获取用户列表
        load_user_list() {
            let url = this.pid + "/projectuser";
            http.get(url).then(data => {
                Log.L(data);
                if(data.code == 200) {
                    this.userList = data.data
                }else {
                    this.showMessageInfo(data.message)
                }
            }, error => {
                 Log.L(error)
                 this.showMessageInfo("获取用户数据失败，请稍后重试","error");
            })
        },

        showMessageInfo(msg,type="warning") {
            this.$message({
                message : msg,
                type : type
            })
        }        
    },

    mounted()  {
        this.load_user_list()
    }
    
}
</script>

<style>
#user_list_content {
    background-color: #ffffff;
}

#user_list_content .user-item {
    border-bottom: #f2f2f2 1px solid;
    padding: 4px;
    text-align:center;
    display:flex;  
    justify-content:space-between;
}

#user_list_content .user-detail-title {
    display: flex;
    align-content: center;
    justify-content: center; 
    align-items: center;
    padding-left: 6px;
    padding-right: 6px;
    height: 60px;
}

#user_list_content .user-detail-hr {
    background-color: #e9e9e9;
    height: 1px;
    border:none;
    margin: 1px;
}

#user_list_content .user-detail-desc {
    flex-grow:1;
    padding:12px;
    text-align: left;
    color: #363636;
    font-size: 16px;
}

#user_list_content .user-img {
    display: flex;
    padding-left: 8px;
    padding-top: 4px;
    padding-bottom: 4px;
}

#user_list_content .project-user-avatar{
    width: 40px;
	height: 40px;
    border-radius: 50%;
}

#user_list_content .user-list-desc {
    flex-grow:1;
    padding-left:12px;
    padding-right:12px;
    padding-top: 4px;
    text-align:left;
}

#user_list_content .product-user-item-title {
    font-size: 14px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 30px;
	letter-spacing: 0px;
	color: #333333;
}

#user_list_content .product-user-item-content {
    font-size: 12px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 14px;
	letter-spacing: 0px;
	color: #666666;
    padding-bottom: 8px;
}

#user_list_content .user-item-time {
    margin: auto;
    font-size: 12px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 48px;
	letter-spacing: 0px;
	color: #999999;
    min-width: 100px;
}


</style>
