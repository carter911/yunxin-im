<template>
  <div class="m-chat-emoji">
    <div class="emoji-content">
      <div class="cnt" >
        <span class="emoji-item" :class="{'pinup-item':item.type==='pinup'}" v-for="item in currEmoji.list" @click.stop="selectEmoji(item)">
          <img :src="item.img"/>
        </span>
      </div>
   </div>
   </div>
</template>

<script>
import emojiObj from '../../configs/emoji'

function genEmojiList (type, emojiList) {
  let result = {}
  for (let name in emojiList) {
    let emojiMap = emojiList[name]
    let list = []
    for (let key in emojiMap) {
      list.push({
        type,
        name,
        key,
        img: emojiMap[key].img
      })
    }
    if (list.length > 0) {
      result[name] = {
        type,
        name,
        list,
        album: list[0].img
      }
    }
  }
  return result
}

export default {
  props: {
    type: String,
    scene: String,
    to: String
  },
  data () {
    return {
      currType: 'emoji',
      currAlbum: 'emoji',
      dialogVisible: false
    }
  },
  computed: {
    emoji () {
      this.dialogVisible = true
      return genEmojiList('emoji', emojiObj.emojiList)
    },
    pinup () {
      return genEmojiList('pinup', emojiObj.pinupList)
    },
    currEmoji () {
      if (this.currType === 'emoji') {
        return this.emoji[this.currAlbum]
      } else if (this.currType === 'pinup') {
        return this.pinup[this.currAlbum]
      }
      return []
    }
  },
  methods: {
    handleClose(done) {
        this.dialogVisible = false
    },
    selectAlbum (album) {
      this.currType = album.type
      this.currAlbum = album.name
    },
    selectEmoji (emoji) {
      if (this.currType === 'emoji') {
        // 由触发父组件事件，增加表情文案
        this.$emit('add-emoji', emoji.key)
      } else if (this.currType === 'pinup') {
        if (this.type === 'session') {
          this.$store.dispatch('sendMsg', {
            type: 'custom',
            scene: this.scene,
            to: this.to,
            pushContent: '[贴图表情]',
            content: {
              type: 3,
              data: {
                catalog: this.currAlbum,
                chartlet: emoji.key
              }
            }
          })
        } else if (this.type === 'chatroom') {
          this.$store.dispatch('sendChatroomMsg', {
            type: 'custom',
            pushContent: '[贴图表情]',
            content: {
              type: 3,
              data: {
                catalog: this.currAlbum,
                chartlet: emoji.key
              }
            }
          })
        }
        this.$emit('hide-emoji')
      }
    }
  }
}
</script>
<style >

  .m-chat-emoji{
  }

  .emoji-content{
    z-index: 10000;
    position: absolute;
    /* border-radius: 10px; */
    border:2px solid #ddd;
    padding: 5px;
    background: #fff;
    width:500px;
    height: 320px;
    left:0px;
    top:-300px;
  }
  .emoji-item img{
    padding: 5px;
    width:25px;
    height:25px;
  }
</style>
