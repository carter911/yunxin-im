<template>

    <div>

        <el-dialog title="文件详情"
                   width="65%"
                   :visible.sync="centerDialogVisible"
                   :closeOnClickModal="closeOnClickModal"
                   :beforeClose="closeFileDialog">

            <div id="id_dialog_content" style="text-align: left;">
                <div class="div-content-class">
                    文件名: {{this.detailMessage.file.name}}
                </div>

                <div class="div-content-class">
                    文件大小: {{this.calculateFileSize(this.detailMessage.file.size)}}
                </div>

                <div class="div-content-class">
                    发送人: {{this.detailMessage.fromNick}}
                </div>

                <div class="div-content-class">
                    发送(接收)日期: {{this.formatTime(this.detailMessage.time)}}
                </div>

                <div class="file-url-css">
                    文件地址: <span style="color: #F02023"> {{this.detailMessage.file.url}}</span>
                    <textarea id="id_text_area" style="width: 1px;height: 1px;">{{this.detailMessage.file.url}}</textarea>

                    <span style="font-size: 14px;color: deepskyblue; margin-left: 4px;" v-if="this.copySuccess">[地址已复制到剪切板]</span>
                    
                </div>

                <div class="div-content-class">
                    <p>提示: 施公宝目前不支持文件预览，请复制文件地址到浏览器中下载然后本地查看...</p>
                </div>
            </div>

            <div>
                <el-button type="success" @click="copyImagePath">复制地址</el-button>
                <el-button type="primary" @click="closeFileDialog">确定</el-button>
            </div>

        </el-dialog>

    </div>


</template>

<script>
    import ElButton from "element-ui/packages/button/src/button";

    export default {
        components: {ElButton},
        name: "file-detail-dialog",

        props : {
            detailMessage :{
                type : Object,
                required:true
            }
        },

        data() {
            return {
                centerDialogVisible: true,
                closeOnClickModal: true,
                copySuccess:false,
            }
        },

        methods: {
            formatTime(formatTime){
                if(null == formatTime || formatTime <= 0) return "" ;
                let myDate = new Date(formatTime);
                return myDate.toLocaleString();
            },

            calculateFileSize(value) {
                if (null == value || value === '' || value === 0) {
                    return "0 Bytes";
                }

                let unitArr = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
                let index = 0, srcsize = parseFloat(value);

                index = Math.floor(Math.log(srcsize) / Math.log(1024));
                let size = srcsize / Math.pow(1024, index);
                //  保留的小数位数
                size = size.toFixed(2);
                return size + unitArr[index];
            },

            closeFileDialog(){
                this.centerDialogVisible = false;
                this.$emit("closeFileDetailDialog")
            },

            copyImagePath() {  //复制文件地址到内存中
                let textArea = document.getElementById("id_text_area");
                textArea.value = textArea.value + "&download=" + this.detailMessage.file.name;

                textArea.select();
                document.execCommand("Copy"); //执行浏览器复制命令

                this.copySuccess = true ;
            }
        }
    }

</script>

<style scoped>

    .file-url-css{
        word-wrap:break-word;
        cursor: default;
        font-size: 16px;
        color: #464646;
        margin-top: 4px;
    }

    .div-content-class{
        font-size: 16px;
        margin-top: 4px;
        color: #464646;
    }



</style>