<template>
        <div>
             <div class="remind-item" v-for="(item,index) in taskList" v-if="index< 2" >
                   <el-row>
                        <el-col :span="1"> <div>
                                            <div class="product-remind-dot"/>
                                    </div>
                        </el-col>

                        <el-col :span="2">
                                    <img :src="get_task_avatar(item)" class="project-remind-avatar"/>
                                </el-col>

                                <el-col :span="15">
                                        <div class="product-remind-item">
                                            <div class="product-remind-item-title"> {{ item.name}}</div>
                                            <div class="product-remind-item-content"> {{ parse_task_detail(item.detail) }}</div>
                                        </div>
                                </el-col>

                                <el-col :span="6">
                                        <div class="product-remind-item-time">
                                            <span class="product-remind-time-content">2018-02-23</span>
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
        taskList :  {
            type : Array,
            required:true ,
        }
    },

    methods : {
        get_task_avatar(item ) {
            return Log.DEFAULT_IMAGE();
        },

        parse_task_detail(detail) {
        if(detail == null || detail == undefined) return "" ;
        return detail.length >= 50 ? detail.substring(0,50) + "..." : detail;
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
