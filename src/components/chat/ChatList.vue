<template>
    <ul  class="m-chat-list p-chat-list" v-bind:style="{height: (this.$store.state.windowClientHeight-370)+'px'}">
        <li  class="u-msg item-time" v-if="this.canLoadMore" @click="loadChatData()">
        ---- 点击加载更多 ----

        </li>
        <li class="u-msg item-time" v-else>
        ---- 已无更多记录 ----
        </li>
    
        <chat-item
        v-for="msg in msglist"
        :type="type"
        :rawMsg="msg"
        :isRobot="isRobot"
        :userInfos="userInfos"
        :myInfo="myInfo"
        :key="msg.idClient"
        :isHistory='isHistory'
        @msg-loaded="msgLoaded"
        @msg-file-detail="msgFileDetail">
        </chat-item>
        
    </ul>
</template>

<script type="text/javascript">
    import util from '../../utils'
    import config from '../../configs'
    import emojiObj from '../../configs/emoji'
    import ChatItem from './ChatItem'
    export default {
        components: {
            ChatItem
        },

        props: {
            type: String, // 类型，chatroom, session

            canLoadMore:{
                type:Boolean,
                default(){
                    return true
                }
            },
            isRobot: {
                type: Boolean,
                default () {
                return false
                }
            },

            msglist: {
                type: Array,
                default () {
                return []
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

            isHistory: {
                type: Boolean,
                default() {
                    return false
                }
            },

            isOAItem :{
                type: Boolean,
                default(){
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
                    lastMsgCount:0,

                    isFullImgShow: false,
                    msgLoadedTimer: null,
                    //chatHeight :(this.$store.state.windowClientHeight-370)+'px',
                }
        },
        methods: {
            msgFileDetail(file){
              this.$emit("msgFileDetail",file)
            },

            showFullImg (src) {
                this.$store.dispatch('showFullscreenImg', {
                src
                })
            },
            msgLoaded () {
                clearTimeout(this.msgLoadedTimer)
                this.msgLoadedTimer = setTimeout(() => {
                this.$emit('msgs-loaded')
                }, 20)
            },

            loadChatData(){
                this.$store.dispatch("loadMoreChatData",this.isOAItem)
            },

        },

        computed:{
        },

        mounted() {
            this.lastMsgCount = this.msglist.length;
            console.log("----last msg count---" , this.lastMsgCount);
        }
    }
</script>

<style type="text/css">
  .item-time{
    font-size: 11px;
    color: #999;
  }
  .m-chat-list li{
    list-style: none;
    text-align: center;
    overflow: auto;
    padding-bottom: 20px;
  }
  
  .p-chat-list {
    padding: 5px;
    .u-icon {
      width: 1.4rem;
      height: 1.6rem;
      margin-right: 0.2rem;
      vertical-align: bottom;
    }
  }
  
  
</style>
