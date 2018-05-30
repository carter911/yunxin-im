<!--简单的等待框-->

<template>
    <div>
            <el-dialog title="" :visible.sync="dialogVisible" width="40%"  :modal="false">

                <div class="el-loading-mask" style="">
                    <div class="el-loading-spinner">
                        <svg viewBox="25 25 50 50" class="circular">
                            <circle cx="50" cy="50" r="20" fill="none" class="path"></circle>
                        </svg><!---->        
                    </div>
                </div>

               <span slot="footer" class="dialog-footer">
                   <span @click="this.click()">数据加载中.请稍后</span>
                </span>
            </el-dialog>
    </div>

</template>

<script>
export default {
    data() {
        return {
            dialogVisible : false 
        }
    },

    methods : {
        operationDialog(result) {
            //this.dialogVisible = false;
            this.dialogVisible = result;
        }
    },

    mounted() {
        this.$on("bridge", (result) => {
            console.log("loading brige");
            this.operationDialog(result);
        }) ;
    }


}
</script>

<style scope>

.el-dialog__footer {
    padding: 10px 20px 20px;
    text-align: center;
    color: #000;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}

</style>
