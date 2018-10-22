<template>
  <el-col
    :class="{
        'active':item.id == this.currSessionId,
        'message-info' : 1===1,
        } "
        :span="24" >

    <el-col :span="4">
        <img class="avatar" :onerror="avatar(item.avatar)" v-bind:src="item.avatar"/>
    </el-col>
    <el-col :span="16">
        <div
         @click.stop='chatInfo(item)'
         class="grid-content bg-purple-dark">
            <h2>{{item.name}}</h2>
            <p>{{item.lastMsgShow}}</p>
        </div>
    </el-col>
    <el-col class='time' :span="4">
       
       <p>{{item.updateTimeShow}}</p>
       <p v-if="item.unread>0"><span class="badge">{{item.unread}}</span></p>
    </el-col>
  </el-col>
</template>
<script>
import util from '../../utils'
import store from '../../store';
export default {
    props: ['item','currSessionId'],
    // computed: {
    //     sessionId() {
    //         return this.$store.state.currSessionId
    //     },
    // },
    methods:{
        chatInfo(item){
            let sessionId = item.id
            // let sessionId ='p2p-sgb1693'
            // console.error('--------->sessionid',sessionId)
            this.$store.commit('updateCurrSessionId', {
                type: 'init',
                sessionId:sessionId
            });
            this.$store.commit('updateCurrSessionMsgs', {
                type: 'init',
                sessionId: sessionId
            });
        },

        avatar(avatar){
            this.item.avatar = "../../../static/chat.png"
        }
    }
}
</script>
<style scoped>
  .message-info{
        cursor:pointer ;
        text-align: left;
        border-bottom: 1px solid #ddd;
        padding:3px 10px 3px 10px;
        height:60px;
    }
    .message-info .avatar{
        height:35px;
        width: 35px;
        margin-top: 8px;
    }
    .message-info h2{
        color: #000;
        font-size: 14px;
        margin-top: 6px;
        font-weight: normal;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
    }
    .message-info p{
        margin-top: -10px;
        font-size: 13px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
        color: #999;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;

    }
    .time{
        margin-top: 16px;
        font-size: 11px;
        color: #999;
    }
    .message-info .active{
        background: #f0f2f7;
        pointer-events: none;
    }

    .badge{
        background:#f13f37;
        text-align: center;
        border-radius: 15px;
        color: #fff;
        padding: 0px 5px;
        margin-left: 6px;
        font-size: 9px;
    }
</style>