// Action 提交的是 mutation，而不是直接变更状态。
// Action 可以包含任意异步操作。
/* 导出actions方法 */
import {hideFullscreenImg, hideLoading, showFullscreenImg, showLoading} from './widgetUi'
import {initNimSDK} from './initNimSDK'
import {initChatroomSDK, resetChatroomSDK} from './initChatroomSDK'
import {updateBlack} from './blacks'
import {addFriend, deleteFriend, updateFriend} from './friends'
import {resetSearchResult, searchTeam, searchUsers} from './search'
import {deleteSession, resetCurrSession, resetSessionUnread, setCurrSession} from './session'
import {
    continueRobotMsg, getHistoryMsgs, resetNoMoreHistoryMsgs, revocateMsg, sendBase64Url, sendFileMsg, sendMsg,
    sendMsgReceipt, sendRobotMsg,loadMoreChatData
} from './msgs'
import {deleteSysMsgs, markCustomSysMsgRead, markSysMsgRead, resetSysMsgs} from './sysMsgs'
import {getChatroomHistoryMsgs, sendChatroomFileMsg, sendChatroomMsg, sendChatroomRobotMsg} from './chatroomMsgs'
import {clearChatroomMembers, getChatroomInfo, getChatroomMembers, initChatroomInfos} from './chatroomInfos'
import {
    checkTeamMsgReceipt, delegateTeamFunction, enterSettingPage, getTeamMembers, getTeamMsgReads,
    onTeamNotificationMsg
} from './team'

import {getCurrentProjectInfo, updateCurrSessionProjectInfo} from './project'
import {getGoods, getGoodsDetail, getSupplierBanner} from './supplier'


function connectNim ({state, commit, dispatch}, obj) {
  let {force} = Object.assign({}, obj)

  // 操作为内容页刷新页面，此时无nim实例
  console.log('nim connectNim 开始连接',state.nim);

  // 切换账户
  let uid = localStorage.getItem("uid");
  let  ischange = 0;
  if(state.nim &&  state.nim.account !== uid){
    ischange =1
  }

  if (!state.nim || force || ischange) {
    let loginInfo = {
      uid: localStorage.getItem("uid"),
      sdktoken: localStorage.getItem("sdktoken")
    }

    //console.error('初始化用户信息', loginInfo,localStorage.getItem("uid"),localStorage.getItem("sdktoken"))
    if (!loginInfo.uid) {
      // 无cookie，直接跳转登录页
      //pageUtil.turnPage('无历史登录记录，请重新登录', 'login')
    } else {
      // 有cookie，重新登录

      console.log('nim connect初始化initNimSDK', loginInfo)
      dispatch('initNimSDK', loginInfo)
    }
  }
}

function connectChatroom ({state, commit, dispatch}, obj) {
  let {chatroomId} = Object.assign({}, obj)
  const nim = state.nim
  if (nim) {
    dispatch('showLoading')
    nim.getChatroomAddress({
      chatroomId,
      done: function getChatroomAddressDone (error, obj) {
        if (error) {
          alert(error.message)
          location.href = '#/room'
          return
        }
        dispatch('initChatroomSDK', obj)
      }
    })
  }
}

export default {
  updateRefreshState ({commit}) {
    commit('updateRefreshState')
  },

  // UI 及页面状态变更
  showLoading,
  hideLoading,
  showFullscreenImg,
  hideFullscreenImg,
  continueRobotMsg,

  // 连接sdk请求，false表示强制重连
  connect (store, obj) {
    console.log('nim开始connect','开始连接------------------------')
      
    let {type} = Object.assign({}, obj)
    // type 可为 nim chatroom
    type = type || 'nim'
    switch (type) {
      case 'nim':
        connectNim(store, obj)
        break
      case 'chatroom':
        connectChatroom(store, obj)
        break
    }
  },

  // 用户触发的登出逻辑
  logout ({ state, commit }) {
    localStorage.removeItem('uid')
    localStorage.removeItem('sdktoken')
    if (state.nim) {
      console.log('退出登录了')
      state.nim.disconnect()
    }
    //pageUtil.turnPage('', 'login')
  },

  // 初始化 重新连接SDK
  initNimSDK,
  // 清空所有搜索历史纪录
  resetSearchResult,
  // 搜索用户信息
  searchUsers,
  // 更新黑名单
  updateBlack,
  // 更新好友
  addFriend,
  deleteFriend,
  updateFriend,
  // 删除会话
  deleteSession,
  // 设置当前会话
  setCurrSession,
  // 重置当前会话
  resetCurrSession,
  resetSessionUnread,

  // 发送消息
  loadMoreChatData,

  sendMsg,
  sendFileMsg,
  sendBase64Url,
  sendRobotMsg,
  // 发送消息已读回执
  sendMsgReceipt,
  // 消息撤回
  revocateMsg,
  getHistoryMsgs,
  // 重置历史消息状态
  resetNoMoreHistoryMsgs,
  // 标记系统消息已读
  markSysMsgRead,
  markCustomSysMsgRead,
  resetSysMsgs,
  deleteSysMsgs,

  initChatroomSDK,
  initChatroomInfos,
  resetChatroomSDK,
  sendChatroomMsg,
  sendChatroomRobotMsg,
  sendChatroomFileMsg,
  getChatroomHistoryMsgs,
  getChatroomInfo,
  getChatroomMembers,
  clearChatroomMembers,

 
  // 搜索群
  searchTeam,
  // 代理sdk中的群方法
  delegateTeamFunction,
  // 处理群消息回调
  onTeamNotificationMsg,
  // 进入群信息设置页
  enterSettingPage,
  // 获取群成员
  getTeamMembers,
  // 群消息回执检查
  checkTeamMsgReceipt,
  // 查询群消息回执已读列表
  getTeamMsgReads,

  updateCurrSessionProjectInfo,
  getCurrentProjectInfo,
  // 供应商
  getSupplierBanner,
  getGoods,
  getGoodsDetail,


}
