<template>
  <el-col class="message-info" :span="24" >
    <el-col :span="3">
        <img class="avatar" v-bind:src="this.avatar"/>
    </el-col>
    <el-col :span="17">
        <div  @click='chatInfo(item)' class="grid-content bg-purple-dark ">
            <h2>{{item.name}}</h2>
        </div>
    </el-col>
  </el-col>
</template>
<script>
import util from '../../utils'
export default {
    data(){
        return {
            avatar : "http://images.e-shigong.com/ic_home_head.png"
        }
    },
    props: ['item'],
    methods:{
        chatInfo(item){
            console.log('提醒 列表 -----------------', item);
            //alert(item.id);
        }
    }

}
</script>
<style scoped>
  .message-info{
        cursor:pointer ;
        text-align: left;
        margin-bottom: 5px;
        border-bottom: 1px solid #ddd;
        padding:3px 10px 3px 20px;
        height:50px;
    }
    .message-info .avatar{
        height:28px;
        width: 28px;
        margin-top: 4px;
    }
    .message-info h2{
        font-size: 13px;
        margin-top: 12px;
        font-weight: normal;
    }
    .message-info p{
        margin-top: -10px;
        font-size: 11px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
    }
    .time{
        margin-top: 14px;
        font-size: 11px;
    }
</style>