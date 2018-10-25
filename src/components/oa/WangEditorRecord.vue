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


        <div class="meeting-content-class" :style="{height : (this.$store.state.windowClientHeight - 126) + 'px'}">
            <el-form ref="form" :model="form" :rules="form_rules">

                <el-form-item label="会议标题" label-width="80px" prop="meetingTitle">
                    <el-input v-model="form.meetingTitle" style="color: #464646;"></el-input>
                </el-form-item>

                <el-form-item label="会议简介" label-width="80px" prop="meetingIntro">
                    <el-input v-model="form.meetingIntro" style="color: #464646;"></el-input>
                </el-form-item>

                <el-form-item>
                    <OAGroupDialog :oaGroupIds="this.oaGroupIds" ref="oaGroup"></OAGroupDialog>
                </el-form-item>

                <div ref="editor" style="text-align:left; height: 320px"></div>

                <el-form-item class="form_submit">
                    <el-button type="primary" @click="submit('form')">提交记录</el-button>
                    <el-button type="warning" @click="resetFormAndClose">{{this.getCancelButtonName()}}</el-button>

                </el-form-item>
            </el-form>

        </div>


    </div>


</template>

<script>

    import ElForm from "element-ui/packages/form/src/form";
    import ElInput from "element-ui/packages/input/src/input";
    import ElDialog from "element-ui/packages/dialog/src/component";
    import ElFormItem from "element-ui/packages/form/src/form-item";

    import OAGroupDialog from "./OAGroupDialog"

    import E from 'wangeditor';

    import http from "../../utils/http";
    import Log from '../../common/Log';


    export default {
        components: {
            ElFormItem,
            ElDialog,
            ElInput,
            ElForm,
            OAGroupDialog
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
            },

            oaGroupIds:{
                type:Array,
                require:true
            }
        },


        name: "add-meeting-record",
        data() {
            return {

                showOAGroupDialog : false,

                editorContent : '',

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

            }
        },

        methods: {
            //html解码
            htmlDecode(text) {
                //1.首先动态创建一个容器标签元素，如DIV
                let temp = document.createElement("div");
                //2.然后将要转换的字符串设置为这个元素的innerHTML(ie，火狐，google都支持)
                temp.innerHTML = text;
                //3.最后返回这个元素的innerText(ie支持)或者textContent(火狐，google支持)，即得到经过HTML解码的字符串了。
                let output = temp.innerText || temp.textContent;
                temp = null;
                return output;
            },

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

            createGroupIds(dataArray) {
                let result = [] ;
                dataArray.forEach(item => {
                    result.push(item.id);
                });

                return result ;
            },

            realCommit() {
                let that = this;
                let choosedGroup = that.$refs.oaGroup.getAllChooseItemGroup();
                if(null == choosedGroup || choosedGroup.length ===0){
                    that.showMsg("error", "请选择会议可见群组");
                    return
                }

                let groupIds = that.createGroupIds(choosedGroup);

                if (this.formSubmit) return;
                this.formSubmit = true;
                this.hasCommitData = true;

                let url = "meetingadd";
                let params = {
                    title: this.form.meetingTitle,
                    desc: this.form.meetingIntro,
                    content: this.editorContent,
                    id: this.meeting_id,
                    look_list:groupIds
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

            editOAGroup() {
                this.showOAGroupDialog = true;
            }
        },

        mounted() {

            let editor = new E(this.$refs.editor);

            editor.customConfig.debug = location.href.indexOf('wangeditor_debug_mode=1') > 0
            editor.customConfig.onchange = (html) => {
                this.editorContent = html
            };

            editor.customConfig.menus = [
                'head',  // 标题
                'bold',  // 粗体
                'fontSize',  // 字号
                'fontName',  // 字体
                'italic',  // 斜体
                'underline',  // 下划线
                'strikeThrough',  // 删除线
                'foreColor',  // 文字颜色
                'backColor',  // 背景颜色
                'link',  // 插入链接
                'list',  // 列表
                'justify',  // 对齐方式
                'image',  // 插入图片
                'undo',  // 撤销
                'redo'  // 重复
            ];

            //配置图片上传路径
            editor.customConfig.uploadImgServer = 'http://dev.e-shigong.com/Admin/Common/uploadWang';

            //配置z-index
            editor.customConfig.zIndex = 100;

            //创建
            editor.create();

            let tempData = this.htmlDecode(this.meeting_detail);
            //设置内容
            editor.txt.html(tempData);
            //设置默认内容 防止未更改时 数据提交为空
            this.editorContent = tempData;
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

    .meeting-content-class{
        overflow: auto;
        overflow-x: hidden;
    }

    .meeting-content-class::-webkit-scrollbar {
        display: none;
    }

    #id_content p {
        text-align: left;
    }


    #id_content {
        width: 98%;
        margin: 0 auto;
    }

    #id_content p img {
        margin: auto 0;
    }


</style>