<template>
        <div>
            <div class="remind-item" v-for="(item,index) in this.remindList" :key="index" v-if="index < 2"  @click="getRemindDetail(item.id)">
                <el-row >
                    <el-col :span="1"> 
                        <div style="text-align: center; height:40px;">
                                                <div class="product-remind-dot"/>
                        </div>
                    </el-col>

                    <el-col :span="2">
                        <img :src='get_remind_avatar(item)' class="project-remind-avatar"/>
                    </el-col>

                    <el-col :span="15">
                        <div class="product-remind-item">
                            <div class="product-remind-item-title">{{ item.from }}</div>
                            <div class="product-remind-item-content"> {{ parse_remind_detail(item.detail) }}</div>
                        </div>
                    </el-col>

                    <el-col :span="6">
                        <div class="product-remind-item-time">
                            <span class="product-remind-time-content"> {{ item.startTime | formatDate}}</span>
                        </div>
                    </el-col>
                </el-row>
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
        getRemindDetail(id) {
            this.$router.push("/project/remind/detail/" + id)
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
    padding-bottom: 8px;
    padding-top: 8px;
}

.product-remind-dot {
	width: 6px;
	height: 6px;
	background-color: #f23131;
	border-radius: 3px;
    text-align: center;
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
.product-remind-item-content {
    font-size: 12px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 14px;
	letter-spacing: 0px;
	color: #666666;
}

</style>
