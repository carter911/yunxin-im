<template>

    <div id="id_content">

        <div>

            <el-row>
                <el-col :span="2" style="margin-top: 24px; margin-bottom: 20px">
                    <img src="../../../static/go_left.png" class="edit_back_left" @click="resetFormAndClose"/>
                </el-col>

                <el-col :span="18">
                    <h3>{{getTitleName()}}</h3>

                </el-col>
            </el-row>

        </div>

        <el-form ref="form" :model="form" :rules="form_rules">

            <el-form-item label="会议标题" label-width="80px" prop="meetingTitle">
                <el-input v-model="form.meetingTitle"></el-input>
            </el-form-item>

            <el-form-item label="会议简介" label-width="80px" prop="meetingIntro">
                <el-input v-model="form.meetingIntro"></el-input>
            </el-form-item>

            <froala id="froala" :tag="'textarea'" :config="config" v-html="form.meetingDetail"></froala>

            <el-form-item class="form_submit">
                <el-button type="primary" @click="submit('form')">提交记录</el-button>
                <el-button type="warning" @click="resetFormAndClose">{{this.getCancelButtonName()}}</el-button>

            </el-form-item>

        </el-form>


        <!--</el-dialog>-->

    </div>


</template>

<script>

    import ElForm from "element-ui/packages/form/src/form";
    import ElInput from "element-ui/packages/input/src/input";
    import ElDialog from "element-ui/packages/dialog/src/component";
    import VueFroala from 'vue-froala-wysiwyg';
    import ElFormItem from "element-ui/packages/form/src/form-item";

    import http from "../../utils/http"
    import Log from '../../common/Log';


    export default {
        components: {
            ElFormItem,
            ElDialog,
            ElInput,
            ElForm
        },

        props: {
            meeting_title: {
                type: String,
                required: false
            },

            meeting_desc: {
                type: String,
                required: false
            },

            meeting_detail: {
                type: String,
                require: false
            },

            meeting_id: {
                type: String,
                require: false
            }
        },


        name: "add-meeting-record",
        data() {
            return {
                froalaObject: Object,

                hasCommitData: false,

                formSubmit: false,

                meetingId: this.meeting_id,

                form: {
                    meetingTitle: this.meeting_title,
                    meetingIntro: this.meeting_desc,
                    meetingDetail: this.meeting_detail,
                },

                form_rules: {
                    meetingTitle: [
                        {required: true, message: '请输入会议名称', trigger: 'blur'},
                        {min: 5, message: '请输入至少5个字符', trigger: 'blur'}
                    ],

                    meetingIntro: [
                        {required: true, message: '请填写会议简介', trigger: 'blur'}
                    ],

                    meetingDetail: [
                        {required: true, message: '请填写会议详情', trigger: 'blur'}
                    ]
                },

                dialogTableVisible: true,
                closeOnClickModal: false,

                config: {
                    heightMin: '45%',
                    heightMax: '45%',
                    toolbarButtons: ['fontSize', '|', 'paragraphFormat', '|', 'bold', 'italic', 'underline', 'strikeThrough', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'indent', 'outdent', 'insertImage', 'undo', 'redo'],
                    charCounterCount: false,
                    fontFamilySelection: true,
                    fontSizeSelection: true,
                    paragraphFormatSelection: true,

                    placeholderText: '在这里编辑会议内容吧...',
                    quickInsertButtons: [],
                    quickInsertTags: [],

                    events: {
                        'froalaEditor.initialized': function () {
                            console.log('initialized')
                        }
                    },

                    //上传地址
                    imageUploadURL: 'http://dev.e-shigong.com/Admin/Common/uploadFroala',

                    //语言
                    language: 'zh_cn',

                    html: 'hello word'

                },
            }
        },

        methods: {
            getTitleName() {
                if (null == this.meetingId || this.meetingId.length === 0) return "新增会议记录";
                return "修改会议记录";
            },

            getCancelButtonName(){
                if(null == this.meetingId || this.meetingId.length === 0) return "取消新增";
                return "取消修改";
            },

            dialogBeforeClose() {
                this.resetFormAndClose();
            },

            submit(formName) {
                let that = this;
                this.$refs[formName].validate((validate) => {
                    if (validate) {
                        //alert("commit")
                        that.realCommit()
                    }
                })
            },

            showMsg(type, msg) {
                this.$message({
                    message: msg,
                    type: type
                })
            },

            realCommit() {
                let html = this.froalaObject.innerHTML;

                let that = this;
                if (this.formSubmit) return;
                this.formSubmit = true;
                this.hasCommitData = true;

                let url = "meetingadd";
                let params = {
                    title: this.form.meetingTitle,
                    desc: this.form.meetingIntro,
                    content: html,
                    id: this.meeting_id
                };

                http.post(url, params).then(response => {
                    that.formSubmit = false;

                    let result = response;
                    Log.L(result);
                    if (result.code === 200) {
                        that.showMsg("success", result.message);
                        that.resetFormAndClose();
                    } else {
                        that.showMsg("error", result.message)
                    }

                }, error => {
                    that.formSubmit = false;
                    that.showMsg("error", "添加会议记录失败，请稍后重试！");
                });
            },

            resetFormAndClose() {
                this.$refs["form"].resetFields();
                this.$emit("closeMeetingAddDialog", this.hasCommitData);
            },
        },

        mounted() {
           this.froalaObject = document.getElementsByClassName("fr-element fr-view")[0];
           //console.log("------>>" + this.froalaObject)
        }

    }
</script>

<style scoped>
    /*@import '/node_modules/froala-editor/css/froala_editor.css';*/
    .form_submit {
        margin-top: 24px;
    }

    .edit_back_left {
        width: 20px;
        height: 20px;
        margin: 0 auto;
    }

    #id_content {
        width: 98%;
        margin: 0 auto;
    }

    #id_content p img {
        margin: auto 0;
    }

</style>