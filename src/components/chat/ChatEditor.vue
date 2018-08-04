<template>
    <div id="m-chat-editor" class="m-chat-editor" @click="hideRobotList">
        <ChatEmoji
                v-bind:type="type"
                v-bind:scene="scene"
                v-bind:to="to"
                v-show="isEmojiShown"
                v-on:add-emoji="addEmoji"
                v-on:hide-emoji="hideEmoji"
        ></ChatEmoji>
        <!-- <group v-show="isRobotListShown" class="m-chat-emoji m-chat-robot">
          <cell v-for="robot in robotslist" :title="robot.nick" :key="robot.account" @click.native="chooseRobot(robot)">
            <img class="icon u-circle" slot="icon" width="20" height="20" :src="robot.avatar">
          </cell>
        </group> -->
        <div class="m-chat-editor-main" :class="{robot:isRobot}">
            <div class="edit-bar">
        <span class="u-editor-icons">
          <span v-if="!isRobot" class="u-editor-icon" @click.stop="showEmoji">
            <i class="u-icon-img"><img :src="icon1"></i>
          </span>
          <span v-if="!isRobot" class="u-editor-icon img" @change="sendFileMsg">
            <i class="u-icon-img"><img :src="icon2"></i>
            <input type="file" ref="fileToSent">
          </span>
            <!-- <span v-if="!isRobot && !advancedTeam" class="u-editor-icon" @click.stop="sendPlayMsg">
              <i class="u-icon-img"><img :src="icon3"></i>
            </span> -->
            <!-- <span v-if='advancedTeam' class="u-editor-send u-editor-receipt" @click="turnToMsgReceipt">回执</span> -->
            <!-- <span class="u-editor-send" @click="sendTextMsg">发 送</span> -->
          <el-button class="u-editor-send" size="small" @click="sendTextMsg">发 送</el-button>
        </span>
            </div>
            <div class="u-editor-input">
                <el-input id='sendText' @keyup.enter.native="sendTextMsg" placeholder="请输入聊天消息 按回车键发送" type="textarea"
                          :rows="4" resize="none" v-model="msgToSent" @focus='onInputFocus'></el-input>
                <!-- <textarea v-model="msgToSent" @focus='onInputFocus'></textarea> -->
            </div>
        </div>


        <el-dialog style="height:600px;"
                   :visible.sync="dialogVisible"
                   width="70%"
                   top="8vh"
                   :before-close="handleClose">
            <PreviewImagePlugin :imageUrl="fullImageUrl"
                                @sendImage="this.sendClipboardMsg">
            </PreviewImagePlugin>


        </el-dialog>


    </div>
</template>

<script>
    import ChatEmoji from './ChatEmoji'
    import config from '../../configs'
    import pageUtil from '../../utils/page'
    import PreviewImagePlugin from "../image/PreviewImagePlugin"

    export default {
        components: {
            ChatEmoji,
            PreviewImagePlugin
        },

        mounted() {
            let self = this;
            //console.log("created------->>");
            window.document.getElementById("sendText").addEventListener('paste', function (e) {

                //window.clipboardData.getData("Text") ie下获取黏贴的内容 e.clipboardData.getData("text/plain")火狐谷歌下获取黏贴的内容
                //alert(e.clipboardData.getData("text/plain") )
                var clipboardData = e.clipboardData,//谷歌
                    i = 0,
                    items, item, types;
                console.log('0')

                if (clipboardData) {
                    console.log('1')
                    items = clipboardData.items;
                    if (!items) {
                        console.log(2)
                        return;
                    }

                    console.log(3)
                    item = items[0];
                    types = clipboardData.types || [];
                    for (; i < types.length; i++) {
                        if (types[i] === 'Files') {
                            item = items[i];
                            break;
                        }
                    }
                    if (item && item.kind === 'file' && item.type.match(/^image\//i)) {
                        self.imgReader(item);
                    }
                }
            }, false);
        },


        updated() {
            window.document.body.addEventListener('click', () => {
                this.isEmojiShown = false
            })
        },

        props: {
            type: String,
            scene: String,
            to: String,
            isRobot: {
                type: Boolean,
                default() {
                    return false
                }
            },
            invalid: {
                type: Boolean,
                default: false
            },
            invalidHint: {
                type: String,
                default: '您无权限发送消息'
            },
            advancedTeam: {
                type: Boolean,
                default: false
            }
        },
        watch: {
            continueRobotAccid(curVal, oldVal) {
                if (curVal && this.robotInfos[curVal]) {
                    this.msgToSent = `@${this.robotInfos[curVal].nick} `
                }
                // 重置
                this.$store.dispatch('continueRobotMsg', '')
            },
            msgToSent(curVal, oldVal) {
                if (this.isRobot) {
                    return
                }

                // let indexAt = this.msgToSent.indexOf('@')
                // if (indexAt >= 0 && (indexAt === this.msgToSent.length - 1)) {
                //     if (this.robotslist && this.robotslist.length > 0) {
                //         this.isRobotListShown = true
                //     }
                // } else if (this.isRobotListShown === true) {
                //     this.isRobotListShown = false
                // }
            }
        },
        data() {
            return {
                dialogVisible: false,
                fullImageUrl: "",

                isEmojiShown: false,
                isRobotListShown: false,
                msgToSent: '',
                icon1: `${config.resourceUrl}/im/chat-editor-1.png`,
                icon2: `${config.resourceUrl}/im/chat-editor-2.png`,
                icon3: `${config.resourceUrl}/im/chat-editor-3.png`,
            }
        },
        computed: {
            continueRobotAccid() {
                return this.$store.state.continueRobotAccid
            },
            robotslist() {
                console.log('消息列表11111------', this.$store.state.robotslist.length)
                return this.$store.state.robotslist
            },
            teamlist() {
                let teamlist = this.$store.state.teamlist;
                console.log('消息列表11111------', teamlist);
                return teamlist
            },
            robotInfos() {
                return this.$store.state.robotInfos
            },
            robotInfosByNick() {
                return this.$store.state.robotInfosByNick
            }
        },
        methods: {
            handleClose() {
                this.dialogVisible = false;
            },

            imgReader(item) {
                let self = this;
                let blob = item.getAsFile(),
                    reader = new FileReader();
                reader.onload = function (e) {

                    self.dialogVisible = true;
                    self.fullImageUrl = e.target.result;

                    //document.getElementById('sendText').appendChild(img)

                    //self.msgToSent = img.outerHTML ;

                    //self.msgToSent = "<img src='http://nim.nosdn.127.net/NTI3MjcyMA==/bmltYV8xNTAzODEwNzk5XzE1MzE0NTg1MjA1NjRfMjc3YzIzYWUtNWQ0Zi00NmQyLTk4MmQtNzFiNjc3ZTc5YWFm'/>"
                    // var editor = document.getElementById('sendText');
                    // var img = document.createElement('img');
                    // img.src = 'url';
                    // editor.appendChild(e.target.result);
                    //console.log("---content---" + document.getElementById("sendText").innerText);
                };

                reader.readAsDataURL(blob);
            },

            sendTextMsg() {
                if (this.invalid) {
                    this.$toast(this.invalidHint)
                    return
                }
                if (/^\s*$/.test(this.msgToSent)) {
                    this.$message({
                        message: '请不要发送空消息',
                        type: 'warning'
                    });
                    return
                } else if (this.msgToSent.length > 800) {
                    this.$message({
                        message: '请不要超过800个字',
                        type: 'warning'
                    });
                    return
                }
                this.msgToSent = this.msgToSent.trim()
                if (this.type === 'session') {
                    // 如果是机器人
                    if (this.isRobot) {
                        this.$store.dispatch('sendRobotMsg', {
                            type: 'text',
                            scene: this.scene,
                            to: this.to,
                            robotAccid: this.to,
                            // 机器人后台消息
                            content: this.msgToSent,
                            // 显示的文本消息
                            body: this.msgToSent
                        })
                    } else {
                        let robotAccid = ''
                        let robotText = ''

                        let atUsers = this.msgToSent.match(/@[^\s@$]+/g)

                        if (atUsers) {
                            for (let i = 0; i < atUsers.length; i++) {
                                let item = atUsers[i].replace('@', '')
                                if (this.robotInfosByNick[item]) {
                                    robotAccid = this.robotInfosByNick[item].account
                                    robotText = (this.msgToSent + '').replace(atUsers[i], '').trim()
                                    break
                                }
                            }
                        }
                        if (robotAccid) {
                            if (robotText) {
                                this.$store.dispatch('sendRobotMsg', {
                                    type: 'text',
                                    scene: this.scene,
                                    to: this.to,
                                    robotAccid,
                                    // 机器人后台消息
                                    content: robotText,
                                    // 显示的文本消息
                                    body: this.msgToSent
                                })
                            } else {
                                this.$store.dispatch('sendRobotMsg', {
                                    type: 'welcome',
                                    scene: this.scene,
                                    to: this.to,
                                    robotAccid,
                                    // 显示的文本消息
                                    body: this.msgToSent
                                })
                            }
                        } else {
                            this.$store.dispatch('sendMsg', {
                                type: 'text',
                                scene: this.scene,
                                to: this.to,
                                text: this.msgToSent
                            })
                        }
                    }
                } else if (this.type === 'chatroom') {
                    let robotAccid = ''
                    let robotText = ''

                    let atUsers = this.msgToSent.match(/@[^\s@$]+/g)
                    if (atUsers) {
                        for (let i = 0; i < atUsers.length; i++) {
                            let item = atUsers[i].replace('@', '')
                            if (this.robotInfosByNick[item]) {
                                robotAccid = this.robotInfosByNick[item].account
                                robotText = (this.msgToSent + '').replace(atUsers[i], '').trim()
                                break
                            }
                        }
                    }
                    if (robotAccid) {
                        if (robotText) {
                            this.$store.dispatch('sendChatroomRobotMsg', {
                                type: 'text',
                                robotAccid,
                                // 机器人后台消息
                                content: robotText,
                                // 显示的文本消息
                                body: this.msgToSent
                            })
                        } else {
                            this.$store.dispatch('sendChatroomRobotMsg', {
                                type: 'welcome',
                                robotAccid,
                                // 显示的文本消息
                                body: this.msgToSent
                            })
                        }
                    } else {
                        this.$store.dispatch('sendChatroomMsg', {
                            type: 'text',
                            text: this.msgToSent
                        })
                    }
                }
                this.msgToSent = ''
            },

            sendFileMsg() {
                if (this.invalid) {
                    this.$toast(this.invalidHint)
                    return
                }
                let ipt = this.$refs.fileToSent
                if (ipt.value) {
                    if (this.type === 'session') {
                        this.$store.dispatch('sendFileMsg', {
                            scene: this.scene,
                            to: this.to,
                            fileInput: ipt
                        })
                    } else if (this.type === 'chatroom') {
                        this.$store.dispatch('sendChatroomFileMsg', {
                            fileInput: ipt
                        })
                    }
                }
            },

            sendClipboardMsg(imageSrc) {
                this.dialogVisible = false;
                this.fullImageUrl = "";

                if (this.invalid) {
                    this.$toast(this.invalidHint);
                    return;
                }

                if (this.type === 'session') {
                    this.$store.dispatch('sendBase64Url', {
                        scene: this.scene,
                        to: this.to,
                        dataURL: imageSrc
                    })

                } else if (this.type === 'chatroom') {
                    this.$store.dispatch('sendChatroomFileMsg', {
                        fileInput: img
                    })
                }
            },


            showEmoji() {
                this.isEmojiShown = true
            },
            hideEmoji() {
                this.isEmojiShown = false
            },
            addEmoji(emojiName) {

                this.msgToSent += emojiName
                this.hideEmoji()
                var idObj = document.getElementById('sendText');
                idObj.focus();
            },
            chooseRobot(robot) {
                if (robot && robot.account) {
                    let len = this.msgToSent.length
                    if (len === 0 || this.msgToSent[len - 1] !== '@') {
                        this.msgToSent += '@' + robot.nick + ' '
                    }
                    {
                        this.msgToSent += robot.nick + ' '
                    }
                }
            },
            hideRobotList() {
                this.isRobotListShown = false
            },
            onInputFocus(e) {
                setTimeout(() => {
                    // todo fixme 解决iOS输入框被遮挡问题，但会存在空白缝隙
                    e.target.scrollIntoView()
                    pageUtil.scrollChatListDown()
                }, 200)
            },
            turnToMsgReceipt() {
                if (this.invalid) {
                    this.$toast(this.invalidHint)
                    return
                }
                location = `#/teamSendMsgReceipt/${this.to}`
            }
        }
    }
</script>

<style scoped>
    .m-chat-editor {
        position: relative;
        border-top: 1px solid #e9e9e9;
        height: 100px;
    }

    .edit-bar {
        text-align: left;
        height: 40px;
        line-height: 40px;
    }

    .edit-bar span {
        padding-top: 20px;
        height: 40px;
        line-height: 40px;
    }

    .edit-bar img {
        margin-top: 10px;
        margin-left: 10px;
        height: 25px;
        width: 25px;

    }

    .u-editor-icons {

        height: 40px;
        line-height: 40px;
    }

    .img {
        position: relative;
    }

    .img input {
        position: absolute;
        left: 5px;
        width: 30px;
        height: 40px;
        top: 15px;
        opacity: 0;
        cursor: pointer;
    }

    .u-editor-send {
        float: right;
        margin-top: 3px;
        margin-right: 10px;
    }

</style>

<style>
    .m-chat-editor {
        position: relative;
    }

    #m-chat-editor .el-input {
        width: 100%;
        height: 200px;
        resize: none;
        border: 0px solid #ccc;
        overflow-x: visible;
        overflow-y: visible;
    }

    #m-chat-editor .el-textarea__inner {
        border-radius: 0px;
        border: 0px solid #ccc;
        /* border-top :1px solid #dcdfe6; */
    }
</style>

