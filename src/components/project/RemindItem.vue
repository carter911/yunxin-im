<template>
        <div>
            <div class="remind-item" v-for="(item,index) in this.getSuitableTaskList()" 
                 :key="index"
                 onmouseover="this.style.backgroundColor='#F4F9FD'"  
                 onmouseout="this.style.backgroundColor='#FFFFFF'"
                 @click="getRemindDetail(item)">
                
                    <div class="remind-img"> 
                        <img :src='get_remind_avatar(item)' class="project-remind-avatar"/>
                        <div class="img-dot" v-if="item.isLike == 0"></div>
                    </div>

                    <div class="remind-list-desc">
                         <div class="product-remind-item-title">{{ item.from }}</div>
                         <div class="product-remind-item-content"> {{ parse_remind_detail(item.detail) }}</div>
                    </div>

                    <div class="remind-item-time">
                        <span> {{ item.startTime | formatDate}}</span>
                    </div>   
            </div>
        </div>
</template>

<script>

import Log from '../../common/Log';
import sgb from "../../common/sgbLogic"
import store from '../../store';


export default {
    props : {
        remindList  : {
            type : Array,
            required:true 
        },
        
        showUnRead: {
            type:Boolean,
            required:false
        }
    },
    
    data()  {
        return {
        }
    },

    methods : {
        getSuitableTaskList(){
            return sgb.getSuitableTaskList(this.showUnRead,this.remindList);
        },

        getRemindDetail(item) {
            //this.$router.push("/project/remind/detail/" + id)
            // 发送当前state值
            if(item.isLike === 0) {
                this.$store.commit("saveTempCurrentRemindId",item.id);
                item.isLike = 1 ;
            }

            this.$emit("getRemindDetail",item.id);
        },


        get_remind_avatar(item) {
            if(item == null || item == undefined || item.createUser == null || item.createUser.avatar == undefined) 
                return Log.DEFAULT_IMAGE();

            let avatar = item.createUser.avatar;
            return (avatar == null || avatar.length === 0 ) ? Log.DEFAULT_IMAGE() : avatar + Log.QINIU_PICTURE_SUFFIX();
        },

        parse_remind_detail(detail) {

            if(detail == null || detail === undefined) return "";
            let dd = detail.replace(/<\/?.+?>/g,"");
            let dds = dd.replace(/ /g,"");    //dds为得到后的内容
            let ddds = dds.replace("\s+","");

            return dds.length >= 30 ? ddds.substring(0,30) + "..." : ddds ;
        }
    }

}
</script>

<style scope>
.remind-item{
    cursor: pointer;
    border-bottom: #f2f2f2 1px solid;
    padding: 4px 10px;
    text-align:center;
    display:flex;  
    justify-content:space-between;
}

.remind-img{
    display: flex;
    padding-left: 8px;
    padding-top: 4px;
    padding-bottom: 4px;
}

.img-dot{
    width:10px;
    height:10px;
    background-color:#F00;
    border-radius:5px;
}


.remind-list-desc{
    flex-grow:1;
    padding-left:12px;
    padding-right:12px;
    padding-top: 4px;
    text-align:left;
}

.product-remind-dot {
	width: 6px;
	height: 6px;
	background-color: #f23131;
	border-radius: 3px;
    text-align: center;
    margin-top:16px;
}

.project-remind-avatar{
    width: 40px;
	height: 40px;
    border-radius: 50%;
}

.product-remind-item{
    text-align: left;   
}

.product-remind-item-title{
    font-size: 14px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 30px;
	letter-spacing: 0px;
	color: #333333;
}

.product-remind-time-content{
    margin: auto;
    font-size: 12px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 48px;
	letter-spacing: 0px;
	color: #666666;
}

.remind-item-time {
    margin: auto;
    font-size: 12px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 48px;
	letter-spacing: 0px;
	color: #999999;
    min-width: 100px;
}

.product-remind-item-content {
    font-size: 12px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 14px;
	letter-spacing: 0px;
	color: #666666;
    padding-bottom: 8px;
}

</style>
