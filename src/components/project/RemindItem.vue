<template>
        <div>
            <div class="remind-item" v-for="(item,index) in this.remindList" :key="index"  @click="getRemindDetail(item)">
                
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

export default {
    props : {
        remindList  : {
            type : Array,
            required:true 
        }
    },
    
    data()  {
        return {

        }
    },

    methods : {
        getRemindDetail(item) {
            //this.$router.push("/project/remind/detail/" + id)
            item.isLike = 1 ;
            this.$emit("getRemindDetail",item.id);
        },

        get_remind_avatar(item) {
            if(item == null || item == undefined || item.createUser == null || item.createUser.avatar == undefined) 
                return Log.DEFAULT_IMAGE();
            return item.createUser.avatar ;
        },

        parse_remind_detail(detail) {
            if(detail == null || detail == undefined) return "";
    
            let dd= detail.replace(/<\/?.+?>/g,"");
            let dds= dd.replace(/ /g,"");//dds为得到后的内容
            return dds.length >= 50 ? dds.substring(0,50) + "..." : dds ;
        }
    }

}
</script>

<style scope>
.remind-item{
    border-bottom: #f2f2f2 1px solid;
    padding: 2px;
    text-align:center;
     display:flex;  
    justify-content:space-between;
}

.remind-img{
    display: flex;
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
    border-radius: 20px;
    
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
	color: #999999;
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
}

</style>
