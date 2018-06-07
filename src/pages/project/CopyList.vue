<!-- 主页面测试 
     主页面重新规划
-->

<template>
    <div class="content">
        <div class="left-content">
                侧面
        </div>

        <div class="right-content">
                <div class="right-content-header">
                    头部页面
                </div>

                <div class="right-content-content">
                        main page

                    <div class="main-left-content">
                        <div class="main-left-header">

                        </div>

                        <div class="main-left-bottom">

                        </div>
                    </div>    

                    <div class="main-right-content">

                        <div class="main-right-header">

                        </div>

                        <div class="main-right-center">


                        </div>

                        <div class="main-right-bottom">


                        </div>

                    </div>
        
                </div>

                <div class="right-content-bottom">
                    底部页面
                </div>

        </div>

    </div>

    
</template>

<script>
export default {

    data () {
        return {
            heightData : "800px",
        }
    },

    mounted() {
        console.log("----navagate mouted------>>>") ;      
       this.heightData = `${document.documentElement.clientHeight}px` ;
       const that = this;
       window.onresize = function temp() {
            that.heightData = `${document.documentElement.clientHeight}px`;
      
            console.log("---heightData----" + that.heightData);
        };
    }

}
</script>

<style>

.content {
    display: flex;
    flex-direction:row;
    min-height: 100vh;
    overflow: hidden;
}
.left-content{
    background-color: #F00;
}

.right-content{
    background-color: #0F0;
    flex-grow:1;
    flex-direction: column;
}

.right-content-header {
    height: 4%;
}

.right-content-content {
    height: 92% ;
}

.right-content-bottom {
    height: 4%;
}


.main-content{
    flex-grow: 1;
}

</style>
