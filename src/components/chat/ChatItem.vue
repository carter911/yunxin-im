<template>
  
  <li class="u-msg"
    :class="{
      'item-me': msg.flow==='out',
      'item-you': msg.flow==='in',
      'item-time': msg.type==='timeTag',
      'item-tip': msg.type==='tip',
      'session-chat': type==='session'
    }">
    <!-- 时间显示 -->
    <div v-if="msg.type==='timeTag'"><span class="tips">{{msg.showText}}</span></div>
    <div v-else-if="msg.type==='tip'" class="tip">{{msg.showText}}</div>
    <!-- 系统消息提醒 -->
    <div style="text-align:center" v-else-if="msg.type==='notification' && msg.scene==='team'" class="notification"><span class="tips">{{msg.showText}}</span></div>
    <div
      v-else-if="msg.flow==='in' || msg.flow==='out'"
      :idClient="msg.idClient"
      :time="msg.time"
      :flow="msg.flow"
      :type="msg.type">
      
    <div class="msg-head" v-if="msg.avatar">
      <img  class="icon u-circle" :src="msg.avatar">
    </div>

    <div class="msg_body" >
        <p style="">{{msg.fromNick}}({{msg.role}})</p>
        <div class="msg_content">
          <span style="height:14px;width:14px;" v-if="msg.type==='text'" class="msg-text" v-html="msg.showText"></span>
          <span v-else-if="msg.type==='custom-type1'" class="msg-text" ref="mediaMsg"></span>
          <span v-else-if="msg.type==='custom-type3'" class="msg-text" ref="mediaMsg"></span>
          <span v-else-if="msg.type==='image'" class="msg-text msg-image" ref="mediaMsg" @click.stop="showFullImg(msg.originLink)"></span>
          <span v-else-if="msg.type==='video'" class="msg-text" ref="mediaMsg"></span>
          <span v-else-if="msg.type==='audio'" class="msg-text" @click="playAudio(msg.audioSrc)">{{msg.showText}}</span>
          <span v-else-if="msg.type==='file'" class="msg-text"><a :href="msg.fileLink" target="_blank"><i class="u-icon icon-file"></i>{{msg.showText}}</a></span>
          <span v-else-if="msg.type==='notification'" class="msg-text notify">{{msg.showText}}</span>
          <span v-else class="msg-text" v-html="msg.showText"></span>
          <span v-if="msg.status==='fail'" class="msg-failed"><i class="weui-icon-warn"></i></span>
          <a v-if="teamMsgUnRead >=0" class='msg-unread' :href='`#/msgReceiptDetail/${msg.to}-${msg.idServer}`'>{{teamMsgUnRead>0 ? `${teamMsgUnRead}人未读`: '全部已读'}}</a>
        </div>
    </div>
    <el-dialog style="height:600px;"
      :visible.sync="dialogVisible"
      width="70%"
      top="8vh"
      :before-close="handleClose">
      <div style="height:400px;text-align:center">
          <img height="100%" :src="fullImageUrl"/>
      </div>
      <!-- <img :src="fullImageUrl"/> -->
    </el-dialog>

      <!-- <div class="msg-head" v-if="msg.avatar">
        <img  height="30px" class="icon u-circle" :src="msg.avatar">
        <span style="margin-top:-10px;">{{msg.fromNick}}</span>
      </div>
      <p class="msg-user" v-else-if="msg.type!=='notification'"><em>{{msg.showTime}}</em>{{msg.from}}</p>
      <span style="height:14px;width:14px;" v-if="msg.type==='text'" class="msg-text" v-html="msg.showText"></span>
      <span v-else-if="msg.type==='custom-type1'" class="msg-text" ref="mediaMsg"></span>
      <span v-else-if="msg.type==='custom-type3'" class="msg-text" ref="mediaMsg"></span>
      <span v-else-if="msg.type==='image'" class="msg-text" ref="mediaMsg" @click.stop="showFullImg(msg.originLink)"></span>
      <span v-else-if="msg.type==='video'" class="msg-text" ref="mediaMsg"></span>
      <span v-else-if="msg.type==='audio'" class="msg-text" @click="playAudio(msg.audioSrc)">{{msg.showText}}</span>
      <span v-else-if="msg.type==='file'" class="msg-text"><a :href="msg.fileLink" target="_blank"><i class="u-icon icon-file"></i>{{msg.showText}}</a></span>
      <span v-else-if="msg.type==='notification'" class="msg-text notify">{{msg.showText}}</span>
      <span v-else class="msg-text" v-html="msg.showText"></span>
      <span v-if="msg.status==='fail'" class="msg-failed"><i class="weui-icon-warn"></i></span>
      <a v-if="teamMsgUnRead >=0" class='msg-unread' :href='`#/msgReceiptDetail/${msg.to}-${msg.idServer}`'>{{teamMsgUnRead>0 ? `${teamMsgUnRead}人未读`: '全部已读'}}</a> -->
    </div>
  </li>
</template>

<script type="text/javascript">
  import util from '../../utils'
  import config from '../../configs'
  import emojiObj from '../../configs/emoji'

  export default {
    props: {
      type: String, // 类型，chatroom, session
      rawMsg: {
        type: Object,
        default () {
          return {}
        }
      },
      userInfos: {
        type: Object,
        default () {
          return {}
        }
      },
      myInfo: {
        type: Object,
        default () {
          return {}
        }
      },
      isRobot: {
        type: Boolean,
        default () {
          return false
        }
      },
      isHistory: {
        type: Boolean,
        default() {
          return false
        }
      }
      // robotInfos: {
      //   type: Object,
      //   default () {
      //     return {}
      //   }
      // }
    },
    data () {
      return {
        msg: '',
        isFullImgShow: false,
        currentAudio: null,
        dialogVisible: false,
        fullImageUrl : '',
      }
    },
    computed: {
      robotInfos () {
        return this.$store.state.robotInfos
      },
      teamMsgUnRead() {
        var obj = !this.isHistory 
        && this.msg.needMsgReceipt 
        && this.msg.flow==='out' 
        && this.$store.state.teamMsgReads.find(item => item.idServer === this.msg.idServer)
        
        return obj ? parseInt(obj.unread) : -1
      }
    },
    beforeMount () {
      let item = Object.assign({}, this.rawMsg)
      item.role = ""
      if(item.custom != undefined && item.custom != ""){
        var ext = JSON.parse(item.custom);
        item.role = util.formatRole(ext.user_project_role);
        item.avatar = ext.user_icon_url;
      } 
      // 标记用户，区分聊天室、普通消息
      if (this.type === 'session') {
        
        if (item.flow === 'in') {
          if (item.type === 'robot' && item.content && item.content.msgOut) {
            // 机器人下行消息
            let robotAccid = item.content.robotAccid
            item.avatar = this.robotInfos[robotAccid].avatar
            item.isRobot = true
            item.link = `#/namecard/${robotAccid}`
          } else if (item.from !== this.$store.state.userUID) {
            if(item.custom != undefined && item.custom != ""){
                 var custom = JSON.parse(item.custom);
                 item.avatar = (custom && custom.user_icon_url) || config.defaultUserIcon
            }else{
                item.avatar = config.defaultUserIcon
            }
            item.link = `#/namecard/${item.from}`
            //todo  如果是未加好友的人发了消息，是否能看到名片
          } else {
            
            item.avatar = this.myInfo.avatar
          }
        } else if (item.flow === 'out') {
          item.avatar = this.myInfo.avatar
        }
      } else {
        // 标记时间，聊天室中
        item.showTime = util.formatDate(item.time)
      }
      if (item.type === 'timeTag') {
        // 标记发送的时间
        item.showText = item.text
      } else if (item.type === 'text') {
        // 文本消息
        item.showText = util.escape(item.text)
        if (/\[[^\]]+\]/.test(item.showText)) {
          let emojiItems = item.showText.match(/\[[^\]]+\]/g)
          emojiItems.forEach(text => {
            let emojiCnt = emojiObj.emojiList.emoji
            if (emojiCnt[text]) {
              item.showText = item.showText.replace(text, `<img class="emoji-small" src="${emojiCnt[text].img}">`)
            }
          })
        }
      } else if (item.type === 'custom') {
        let content = JSON.parse(item.content)
        // type 1 为猜拳消息
        if (content.type === 1) {
          let data = content.data
          let resourceUrl = config.resourceUrl
          // item.showText = `<img class="emoji-middle" src="${resourceUrl}/im/play-${data.value}.png">`
          item.type = 'custom-type1'
          item.imgUrl = `${resourceUrl}/im/play-${data.value}.png`
        // type 3 为贴图表情
        } else if (content.type === 3) {
          let data = content.data
          let emojiCnt = ''
          if (emojiObj.pinupList[data.catalog]) {
            emojiCnt = emojiObj.pinupList[data.catalog][data.chartlet]
            // item.showText = `<img class="emoji-big" src="${emojiCnt.img}">`
            item.type = 'custom-type3'
            item.imgUrl = `${emojiCnt.img}`
          }
        } else {
          item.showText = util.parseCustomMsg(item)
          if (item.showText !== '[自定义消息]') {
            item.showText += ',请到手机或电脑客户端查看'
          }
        }
      } else if (item.type === 'image') {
        // 原始图片全屏显示
        item.originLink = item.file.url
      } else if (item.type === 'video') {
        // ...
      } else if (item.type === 'audio') {
        item.audioSrc = item.file.mp3Url
        item.showText = Math.round(item.file.dur / 1000) + '" 点击播放'
      } else if (item.type === 'file') {
        item.fileLink = item.file.url
        item.showText = item.file.name
      } else if (item.type === 'notification') {
        if (item.scene === 'team') {
          item.showText = util.generateTeamSysmMsg(item)
        } else {
          //对于系统通知，更新下用户信息的状态
          item.showText = util.generateChatroomSysMsg(item)
        }
      } else if (item.type === 'tip') {
        //对于系统通知，更新下用户信息的状态
        item.showText = item.tip
      } else if (item.type === 'robot') {
        let content = item.content || {}
        let message = content.message || []
        if (!content.msgOut) {
          // 机器人上行消息
          item.robotFlow = 'out'
          item.showText = item.text
        } else if (content.flag === 'bot') {
          item.subType = 'bot'
          message = message.map(item => {
            if (item.type === 'template') {
              // 在vuex(store/actions/msgs.js)中已调用sdk方法做了转换
              return item.content.json
            } else if (item.type === 'text' || item.type === 'answer') {
              // 保持跟template结构一致
              return [{
                type: 'text',
                text: item.content
              }]
            } else if (item.type === 'image') {
              // 保持跟template结构一致
              return [{
                type: 'image',
                url: item.content
              }]
            }
          })
          item.message = message
        } else if (item.content.flag === 'faq') {
          item.subType = 'faq'
          item.query = message.query
          let match = message.match.sort((a, b) => {
            // 返回最匹配的答案
            return b.score - a.score
          })
          item.message = match[0]
        }
      } else {
        item.showText = `[${util.mapMsgType(item)}],请到手机或电脑客户端查看`
      }
      this.msg = item
    },
    mounted () {
      let item = this.msg
      // 有时序问题的操作
      this.$nextTick(() => {
        let media = null
        if (item.type === 'image') {
          // 图片消息缩略图
          media = new Image()
          media.src = item.file.url
        } else if (item.type === 'custom-type1') {
          // 猜拳消息
          media = new Image()
          media.className = 'emoji-middle'
          media.src = item.imgUrl
        } else if (item.type === 'custom-type3') {
          // 贴图表情
          media = new Image()
          media.className = 'emoji-big'
          media.src = item.imgUrl
        } else if (item.type === 'video') {
          if (/(mov|mp4|ogg|webm)/i.test(item.file.ext)) {
            media = document.createElement('video')
            media.src = item.file.url
            media.width = 640
            media.height = 480
            media.autoStart = false
            media.preload = 'metadata'
            media.controls = 'controls'
          } else {
            let aLink = document.createElement('a')
            aLink.href = item.file.url
            aLink.target = '_blank'
            aLink.innerHTML = `<i class="u-icon icon-file"></i>${video.name}`
            this.$refs.mediaMsg.appendChild(aLink)
          }
        }
        if (media) {
          if (this.$refs.mediaMsg) {
            this.$refs.mediaMsg.appendChild(media)
          }
          media.onload = () => {
            this.$emit('msg-loaded')
          }
          media.onerror = () => {
            this.$emit('msg-loaded')
          }
        } else {
          this.$emit('msg-loaded')
        }
      }) // end this.nextTick
    },
    methods: {
      artarError(url){
      },
      revocateMsg (vNode) {
        // 在会话聊天页
        if (this.$store.state.currSessionId) {
          if (vNode && vNode.data && vNode.data.attrs) {
            let attrs = vNode.data.attrs
            if (attrs.type === 'robot') {
              return
            }
            // 自己发的消息
            if (attrs.flow === 'out') {
              let that = this
              this.$vux.confirm.show({
                title: '确定需要撤回消息',
                onCancel () {
                },
                onConfirm () {
                  that.$store.dispatch('revocateMsg', {
                    idClient: attrs.idClient
                  })
                }
              })
            }
          }
        }
      },
      sendRobotBlockMsg (msg, originMsg) {
        if(this.isHistory) {
          // 在历史消息中，不进行机器人交互
          return
        }
        let body = '[复杂按钮模板触发消息]'
        if (msg.text && msg.text.length === 1) {
          body = msg.text[0].text
        }
        let robotAccid = originMsg.content.robotAccid
        if (!this.isRobot) {
          body = `@${this.robotInfos[robotAccid].nick} ${body}`
        }
        if (this.type === 'session') {
          this.$store.dispatch('sendRobotMsg', {
            type: 'link',
            scene: originMsg.scene,
            to: originMsg.to,
            robotAccid,
            // 机器人后台消息
            params: msg.params,
            target: msg.target,
            // 显示的文本消息
            body
          })
        } else if (this.type === 'chatroom') {
          this.$store.dispatch('sendChatroomRobotMsg', {
            type: 'link',
            robotAccid,
            // 机器人后台消息
            params: msg.params,
            target: msg.target,
            // 显示的文本消息
            body
          })
        } 
      },
      continueRobotMsg (robotAccid) {
        this.$store.dispatch('continueRobotMsg', robotAccid)
      },
      handleClose(done) {
        done();
      },
      showFullImg (src) {
        
        this.dialogVisible = true;
        this.fullImageUrl = src
        // this.$store.dispatch('showFullscreenImg', {
        //   src
        // })
      },
      playAudio (src) {
        if (!this.currentAudio) {
          this.currentAudio = new Audio(src)
          this.currentAudio.play()
          this.currentAudio.onended = () => {
            this.currentAudio = null
          }
        }
      },
      toMsgUnReadDetail() {
        this.href = '#/msgReceiptDetail/' + this.msg.idServer
      }
    }
  }
</script>

<style scoped>

  .msg-unread {
    position: relative;
    float: right;
    top: 0.3rem;
    right: 0.5rem;
    font-size: 0.9rem;
    color: #0091e4;
  }
  .u-msg{
      margin: 0px;
      margin-top: 10px;
      font-size: 11px;
  }
  

  .item-you{
    position: relative;
    text-align: left;
    border-radius: 10px;
    margin-left: 10px;
  }

  .item-you .msg-head{
    text-align: left;
    margin-top: 2px;
    float: left;
    width:40px;
    
  }
  .item-you .msg_body{
    float: left;
    padding: 0px;
    max-width: 60%;
  }

  .item-me{
    position: relative;
    text-align: right;
    border-radius: 10px;
    margin-right: 10px;
  }

  .item-me .msg-head{
    text-align: left;
    margin-top: 2px;
    float: right;
    width:40px;
  }

  .msg-head img{
    border-radius: 20px;
    height: 35px;
  }

  .item-me .msg_body{
    margin-right: 10px;
    float: right;
    padding: 0px;
    max-width: 60%;
  }

 .item-me .msg_content:after{
        content: "";
        position: absolute;
        top: 14px;
        right: 26px;
        margin: 20px;
        background: #cce5ff;
        width: 10px; height: 10px; 
        transform: rotate(135deg);
        -o-transform: rotate(135deg);
        -webkit-transform: rotate(135deg);
        -moz-transform: rotate(135deg);
        -ms-transform: rotate(135deg);
  }


  .item-time{
    border-radius: 10px;
  }

  .tips{
    font-size: 10px;
    color: #666;
    padding:1px 20px;
    background: #f8f8f8;
    border-radius: 9px;
  }
  

  .msg_body p{
      font-size: 13px;
      margin-top:0px;
      margin-bottom:5px;
  }

  .item-you  .msg_content{
    color: #333;
    background: #f3f3f3;
    /* border-radius: 10px; */
    font-size: 14px;
    border-radius: 14px;
    padding: 10px;
    min-width: 10%;
  }


  .item-me  .msg_content{
    color: #333;
    background: #cce5ff;
    /* border-radius: 10px; */
    font-size: 14px;
    border-radius: 14px;
    padding: 10px;

  }

  .item-you .msg_content:before{
        content: "";
        position: absolute;
        top: 14px;
        left: 16px;
        margin: 20px;
        background: #f3f3f3;
        width: 10px; height: 10px; 
        transform: rotate(135deg);
        -o-transform: rotate(135deg);
        -webkit-transform: rotate(135deg);
        -moz-transform: rotate(135deg);
        -ms-transform: rotate(135deg);
  }


</style>
<style>
  .msg-text{
   cursor: pointer; 
  }
  .msg-text img{
      height: 20px;
      width: 20px;
  }
  .msg-image{
     width: 100%;
  }
  .msg-image img{
      width: 100%;
      max-width: 300px;
      height: 100%;
  }




  
</style>
