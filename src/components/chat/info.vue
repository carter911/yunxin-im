<template>
<div>
    <el-tabs  v-model="this.defaultChat" @tab-click="chatSelect" type="border-card">
        <el-tab-pane v-bind:style="{height: heightData}" v-if="showWorker" label="施工群" name="worker">
            <Message/>
        </el-tab-pane>
        <el-tab-pane v-bind:style="{height: heightData}" v-if="showOwner" label="业主群" name="owner">
            <Message/>
        </el-tab-pane>
    </el-tabs>
</div>
</template>
<script>
import Message from '../../components/chat/message.vue'
export default {
    data(){
            return {
                heightData :(document.documentElement.clientHeight-110)+'px',
                showWorker:1,
                showOwner:1,
                defaultChat:'worker'
            }
    },  
    components: {
        Message
    },
    methods:{
        chatSelect(){

        }
    }
}
</script>
<style scoped>
    .el-tabs{
        padding: 0px;
    }
    .el-tab-pane{
        margin: 0px;
        padding:0px 0px;
        width:100%;
        text-align: left;
    }
    

    .el-tabs__item{
        padding: 0px;
    }
</style>
<style>
.el-tabs--border-card>.el-tabs__content{
        padding: 0px;
}
</style>
