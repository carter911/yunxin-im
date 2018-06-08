<template>

    <div>
        <div style="height:400px;text-align:center">
            <img id="id_img_source" :src="imageUrl"/>
        </div>

        <div style="text-align:center;margin-top:12px;">
            <el-button type="primary" @click="rotate()">旋转图片</el-button>
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
            deg : 0 ,
        }
    },

    methods : {
        rotate() {
            let img = document.getElementById("id_img_source");
            if(null == img) return ;

            this.deg = (this.deg + 90) % 360 ;
    		img.style.webkitTransform="rotate("+this.deg+"deg)"
			img.style.MozTransform="rotate("+this.deg+"deg)"
			img.style.msTransform="rotate("+this.deg+"deg)"
			img.style.OTransform="rotate("+this.deg+"deg)"
			img.style.transform="rotate("+this.deg+"deg)";
        }
    }
}
</script>

<style>
#id_img_source {
    max-width: 400px;
    max-height: 400px;
    width:100%;
    height:auto ;
}


</style>
