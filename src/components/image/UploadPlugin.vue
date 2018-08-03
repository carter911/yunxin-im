<!-- 图片上传组件 -->

<template>

    <div>
        <el-form ref="remindForm" label-width="120px">

            <el-form-item label="添加图片" style="text-align:left;" multiple="true">
                <el-upload
                        ref="upload"
                        action=""
                        :limit="9"
                        :before-remove="this.onFileDelete"
                        :http-request="this.onFileUpload"
                        :file-list="this.upload_image_list"
                        :on-exceed="this.maxCountError"
                        list-type="picture-card">

                    <i class="el-icon-plus"></i>
                </el-upload>

            </el-form-item>

        </el-form>

    </div>


</template>


<script>

    import Log from '../../common/Log';

    import http from "../../utils/http"

    //引入qiniusdk
    import * as qiniu from 'qiniu-js'


    export default {
        data() {
            return {
                //上传图片集合
                upload_image_list: [],

                //上传图片 image:url / tempFile
                imageUploadMap: [],

                imageToken: "",

                //token请求次数
                //网速差的情况下，重复请求次数
                request_count: 3,

                //单张图片上传，尝试次数
                request_image_count: 3,
            }
        },

        methods: {
            clearFiles() {
                this.$refs.upload.clearFiles()
                this.imageUploadMap = []
            },

            //移除删除的文件
            onFileDelete(file, fileList) {
                if (null == file || undefined === file) return;

                this.imageUploadMap.forEach(ele => {
                    if (null != ele && ele.obj.file === file.raw) {
                        this.imageUploadMap.splice(this.imageUploadMap.indexOf(ele), 1);
                    }
                });
            },

            //文件超过个数限制
            maxCountError() {
                this.$message({message: "每次最多能上传9张图片", type: 'error'});
            },

            //获取图片Token
            get_image_token() {
                http.get("gettoken").then(response => {
                    Log.L2("获取token中:", response)

                    let result = response;
                    if (result.code === 200) {
                        this.imageToken = result.data.token;
                    }

                }, error => {
                    Log.L2("请求图片token失败" + error)
                    if (-- this.request_count > 0) {
                        this.get_image_token()
                    }

                });
            },

            //文件上传
            onFileUpload(obj) {
                this.request_image_count = 3;
                this.realUploadImage(obj);
            },

            //尝试图片上传
            realUploadImage(obj) {
                let self = this;
                let newObj = obj;

                if (undefined === obj || null == obj) return;
                let url = Log.getRandomImageFileName();
                Log.L2("upload url : ", url);

                let observable = qiniu.upload(obj.file, url, this.imageToken, null, null);
                observable.subscribe({
                    next(res) {
                        Log.L2("next upload ", res);
                    },

                    error(err) {
                        Log.L2("upload error", err);
                        if (-- self.request_image_count > 0) {
                            self.realUploadImage(newObj)
                        }
                    },

                    complete(res) {
                        Log.L2("upload complete", res);
                        self.imageUploadMap[self.imageUploadMap.length] = {url: url, obj: obj};
                    }
                });
            }
        },

        mounted() {
            //获取图片的ImageToken
            this.get_image_token()
        }
    }

</script>


<style>


</style>