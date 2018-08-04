<template>

    <div>
        <div style="width:200px; height:auto; text-align:center">
            <img id="id_img_source" :src="imageUrl"/>
        </div>
        
        <div style="text-align:center;margin-top:12px;">
            <el-button type="primary" @click="sendImage()">确认发送</el-button>
        </div>
    </div>


</template>

<script>
export default {
    props : {
        imageUrl : {
            type:String,
            required:true 
        }
    },

    data() {
        return {

        }
    },

    methods : {
        sendImage(){
            this.$emit("sendImage",this.imageUrl);
        }
    }
}

</script>

<style>
    #id_img_source {
        max-height: 400px;
        width:auto ;
    }
</style>

