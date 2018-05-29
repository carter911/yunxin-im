<template>
  <el-col 
        
        :class="{
        'active': item.teamId == this.sessionId,
        'message-info' : 1===1,
        } "
         :span="24" >
    <el-col :span="3">
        <img class="avatar" v-bind:src="this.avatar"/>
    </el-col>
    <el-col :span="17">
        <div @click='projectInfo(item)'  class="project-list grid-content bg-purple-dark ">
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
            avatar : "../../../static/chat.png"
        }
    },
    props: ['item'],
    computed: {
        sessionId() {
            let sessionId = this.$store.state.currSessionId
            if(sessionId !== null){
                sessionId = sessionId.slice(5)
            }
            //console.log('------当前sessionid-----（'+sessionId)
            return sessionId;
        }
    },
    methods:{
        projectInfo(item){
            console.log('项目 列表 -----------------', item);
            //alert(item.id);
            let sessionId = "team-" + item.teamId;
            this.$store.commit('updateCurrSessionId', {
                type: 'init',
                sessionId: sessionId
            });
            this.$store.commit('updateCurrSessionMsgs', {
                type: 'init',
                sessionId: sessionId
            });
        }
    }

}
</script>
<style scoped>
  .message-info{
        cursor:pointer ;
        text-align: left;
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
    .time{
        margin-top: 14px;
        font-size: 11px;
    }
    .message-info .active{
        background: #f0f2f7;
    }

    .project-list {
        width: 100%;
        height: 30px
    }
</style>