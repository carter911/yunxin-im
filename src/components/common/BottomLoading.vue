<!-- 底部加载更多

     加载更多
     加载中

 -->


<template>
    <div class="bottom-loading-class">
            <div v-if="this.loadingType == 0">
                 <el-button type="primary" @click="loadingMore">加载更多</el-button>    
            </div>

            <div v-if="this.loadingType == 1">
                    <el-button type="primary" :loading="true">加载中</el-button>                
            </div>
    </div>

</template>

<script>
export default {
    props : {
        loadingType : {
            type : Number,
            required : false
        }
    },

    methods : {
        loadingMore() {
            this.$emit("loadingMore");
        }
    }
}

</script>

<style scope>
.bottom-loading-class{
    margin-top: 6px;
    margin-bottom: 6px;

}

</style>
