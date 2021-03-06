import store from '../'
import config from '../../configs'
import util from '../../utils'
import cookie from '../../utils/cookie';

export function formatMsg(msg) {
    const nim = store.state.nim
    if (msg.type === 'robot') {
        if (msg.content && msg.content.flag === 'bot') {
            if (msg.content.message) {
                msg.content.message = msg.content.message.map(item => {
                    switch (item.type) {
                        case 'template':
                            item.content = nim.parseRobotTemplate(item.content)
                            break
                        case 'text':
                        case 'image':
                        case 'answer':
                            break
                    }
                    return item
                })
            }
        }
    }
    return msg
}

export function onRoamingMsgs(obj) {
    let msgs = obj.msgs.map(msg => {
        return formatMsg(msg)
    })
    store.commit('updateMsgs', msgs)
}

export function onOfflineMsgs(obj) {
    let msgs = obj.msgs.map(msg => {
        return formatMsg(msg)
    })

    store.commit('updateMsgs', msgs)
}


function onSendMsgDone(error, msg) {
    store.dispatch('hideLoading')
    if (error) {
        // 被拉黑
        if (error.code === 7101) {
            msg.status = 'success'
            alert(error.message)
        } else {
            alert(error.message)
        }
    }

    //处理发送过的msg
    onMsg(msg)
}


export function onMsg(msg) {
    msg = formatMsg(msg)
    console.log('我更新了数据', msg)

    //追加更新消息1 #index.putMsg
    store.commit('putMsg', msg);

    //追加更新消息2
    if (msg.sessionId === store.state.currSessionId) {
        store.commit('updateCurrSessionMsgs', {
            type: 'put',
            msg
        });

        console.log('sendMsgReceipt', store.state.currSessionId)
        // 发送已读回执s
        store.dispatch('sendMsgReceipt')

    } else {

        let oaCurrSessionId = store.state.OACurrentSessionId;
        if (null != oaCurrSessionId && msg.sessionId === oaCurrSessionId.replace("oa-", "team-")) {
            console.log("oa session", "OASessionMsg");

            store.commit('updateOASessionMsg', {
                type: 'put',
                msg
            });

            console.log("OA sendMsgReceipt", store.state.OACurrentSessionId);

            // 发送已读回执s
            store.dispatch('sendMsgReceipt')
        }
    }

    if (msg.scene === 'team' && msg.type === 'notification') {
        store.dispatch('onTeamNotificationMsg', msg)
    }

}


// 消息撤回
export function onRevocateMsg(error, msg) {
    const nim = store.state.nim
    if (error) {
        if (error.code === 508) {
            alert('发送时间超过2分钟的消息，不能被撤回')
        } else {
            alert(error)
        }
        return
    }
    let tip = ''
    if (msg.from === store.state.userUID) {
        tip = '你撤回了一条消息'
    } else {
        let userInfo = store.state.userInfos[msg.from]
        if (userInfo) {
            tip = `${util.getFriendAlias(userInfo)}撤回了一条消息`
        } else {
            tip = '对方撤回了一条消息'
        }
    }
    nim.sendTipMsg({
        isLocal: true,
        scene: msg.scene,
        to: msg.to,
        tip,
        time: msg.time,
        done: function sendTipMsgDone(error, tipMsg) {
            let idClient = msg.deletedIdClient || msg.idClient
            store.commit('replaceMsg', {
                sessionId: msg.sessionId,
                idClient,
                msg: tipMsg
            })
            if (msg.sessionId === store.state.currSessionId) {
                store.commit('updateCurrSessionMsgs', {
                    type: 'replace',
                    idClient,
                    msg: tipMsg
                })
            }
        }
    })
}


export function loadMoreChatData({state, commit}, isOAItem) {
    //alert("----loadMoreChatData----->>>")
    let sessionId = isOAItem ? state.OACurrentSessionId : state.currSessionId;
    sessionId = sessionId.replace("oa-","team-");

    //获取当前session
    let currentSession = state.msgs[sessionId] || [];
    //获取第一条消息
    let firstMsg = {} ;

    console.log("------get session id----", sessionId);
    console.dir(currentSession);

    let currentTime = Date.parse(new Date());
    if(currentSession.length > 0 ){
        firstMsg = currentSession[0];
        currentTime = firstMsg.time ;
    }

    let idServer = firstMsg.idServer;
    console.log("----idServer----",isOAItem, currentTime,  idServer , parseFloat(idServer));
    //35814464662011939
    //35814464662011940

    //此处直接获取云端信息 不从本地数据库获取
    const nim = state.nim;
    nim.getHistoryMsgs({
        scene: firstMsg.scene,
        to: firstMsg.to,
        lastMsgId: idServer ,
        endTime: currentTime,
        beginTime: 0,
        reverse: false,
        limit: 20,

        done: function (error , obj) {
            //console.log("---load msgs---", error , obj);
            
            if(error == null) {
                let historyMsgList = (obj.msgs || []).reverse() ;
                if(isOAItem){
                    state.OACurrentSessionMsg = historyMsgList.concat(state.OACurrentSessionMsg || []);
                    state.msgs[sessionId] = state.OACurrentSessionMsg;

                }else {
                    state.currSessionMsgs     = historyMsgList.concat(state.currSessionMsgs || []);
                    state.msgs[sessionId] = state.currSessionMsgs;
                }
            }

            console.log("getLocalHistory------>>", error , obj.msgs, firstMsg.idServer);
        }
    });
}


export function revocateMsg({state, commit}, msg) {
    const nim = state.nim
    let {idClient} = msg
    msg = Object.assign(msg, state.msgsMap[idClient])
    nim.deleteMsg({
        msg,
        done: function deleteMsgDone(error) {
            onRevocateMsg(error, msg)
        }
    })
}

// 发送普通消息
export function sendMsg({state, commit}, obj) {

    const nim = state.nim;
    obj = obj || {};
    obj.isOAItem = undefined === obj.isOAItem ? false : obj.isOAItem;

    let type = obj.type || '';
    let custom = {};
    let apns = obj.apns || {};

    if (obj.to.indexOf('sgb') >= 0) {  //发送到OA群&个人群
        if (type === 'custom') {
            custom = getCustom({state, commit}, 'team', obj.isOAItem)
        } else {
            custom = getCustom({state, commit}, 'p2p', obj.isOAItem)
        }
    } else {
        custom = getCustom({state, commit}, 'team', obj.isOAItem)
    }

    switch (type) {
        case 'text':
            if(apns.accounts) {
                nim.sendText({
                    scene: obj.scene,
                    to: obj.to,
                    text: obj.text,
                    done: onSendMsgDone,
                    needMsgReceipt: obj.needMsgReceipt || false,
                    custom: custom,
                    apns:apns
                });
            }else {
                nim.sendText({
                    scene: obj.scene,
                    to: obj.to,
                    text: obj.text,
                    done: onSendMsgDone,
                    needMsgReceipt: obj.needMsgReceipt || false,
                    custom: custom,
                });
            }

            break;

            // apns: {
            //     accounts:['sgb966','sgb1014'],
            //     content:"@测试 来来来",
            //     forcePush:true,
            // }

        case 'custom':
            nim.sendCustomMsg({
                scene: obj.scene,
                to: obj.to,
                pushContent: obj.pushContent,
                content: JSON.stringify(obj.content),
                done: onSendMsgDone,
                custom: custom,
            })
    }
}


function getCustom({state, commit}, type = 'team' , isOAItem = false) {
    let currSessionProjectInfo = {}
    if (type === 'team') {
        currSessionProjectInfo = state.currSessionProjectInfo
    } else {
        currSessionProjectInfo.id = 0
        currSessionProjectInfo.roleId = 0
    }

    let myUserinfo = JSON.parse(localStorage.getItem('userinfo'))
    console.log('用户信息' + myUserinfo.user.avatar)
    store.dispatch('showLoading')

    let userinfo;
    if(isOAItem) {
        userinfo = {
            'platform': 'web',
            'user_icon_url': myUserinfo.user.avatar,
            'user_name': myUserinfo.user.name,
            'user_project_id': "0",
            'user_project_role': "",
        }
    }else {
         userinfo = {
            'platform': 'web',
            'user_icon_url': myUserinfo.user.avatar,
            'user_name': myUserinfo.user.name,
            'user_project_id': currSessionProjectInfo.id,
            'user_project_role': currSessionProjectInfo.roleId,
        }
    }

    return JSON.stringify(userinfo)
}

// 发送文件消息
export function sendFileMsg({state, commit}, obj) {
    const nim = state.nim
    let {scene, to, fileInput} = obj
    let type = 'file'
    if (/\.(png|jpg|bmp|jpeg|gif)$/i.test(fileInput.value)) {
        type = 'image'
    } else if (/\.(mov|mp4|ogg|webm)$/i.test(fileInput.value)) {
        type = 'video'
    }
    store.dispatch('showLoading')
    let custom = getCustom({state, commit})

    nim.sendFile({
        scene,
        to,
        type,
        fileInput,
        custom: custom,
        uploadprogress: function (data) {
            // console.log(data.percentageText)
        },
        uploaderror: function () {
            console && console.log('上传失败')
        },
        uploaddone: function (error, file) {
            // console.log(error);
            // console.log(file);
        },
        beforesend: function (msg) {
            // console && console.log('正在发送消息, id=', msg);
        },
        done: function (error, msg) {
            onSendMsgDone(error, msg)
        }
    })
}


// 发送图片的base64图片
// obj = {scene, to, dataURL}
export function sendBase64Url({state, commit}, obj) {
    const nim = state.nim
    let {scene, to, dataURL} = obj
    let type = 'image'
    if (dataURL == null || dataURL.length === 0) return;

    store.dispatch('showLoading')
    let custom = getCustom({state, commit})
    nim.sendFile({
        scene,
        to,
        type,
        dataURL,
        custom: custom,
        uploadprogress: function (data) {
            // console.log(data.percentageText)
        },
        uploaderror: function () {
            console && console.log('上传失败')
        },
        uploaddone: function (error, file) {
            // console.log(error);
            // console.log(file);
        },
        beforesend: function (msg) {
            // console && console.log('正在发送消息, id=', msg);
        },
        done: function (error, msg) {
            onSendMsgDone(error, msg)
        }
    })

}


// 发送机器人消息
export function sendRobotMsg({state, commit}, obj) {
    const nim = state.nim
    let custom = getCustom({state, commit})
    let {type, scene, to, robotAccid, content, params, target, body} = obj
    scene = scene || 'p2p'
    if (type === 'text') {
        nim.sendRobotMsg({
            scene,
            to,
            robotAccid: robotAccid || to,
            content: {
                type: 'text',
                content,
            },
            body,
            done: onSendMsgDone,
            custom: custom,
        })
    } else if (type === 'welcome') {
        nim.sendRobotMsg({
            scene,
            to,
            robotAccid: robotAccid || to,
            content: {
                type: 'welcome',
            },
            body,
            done: onSendMsgDone
        })
    } else if (type === 'link') {
        nim.sendRobotMsg({
            scene,
            to,
            robotAccid: robotAccid || to,
            content: {
                type: 'link',
                params,
                target
            },
            body,
            done: onSendMsgDone
        })
    }
}

// 发送消息已读回执
export function sendMsgReceipt({state, commit}) {
    // 如果有当前会话
    let currSessionId = store.state.currSessionId
    if (currSessionId) {
        // 只有点对点消息才发已读回执
        if (util.parseSession(currSessionId).scene === 'p2p') {
            let msgs = store.state.currSessionMsgs
            const nim = state.nim
            if (state.sessionMap[currSessionId]) {
                nim.sendMsgReceipt({
                    msg: state.sessionMap[currSessionId].lastMsg,
                    done: function sendMsgReceiptDone(error, obj) {
                        // do something
                    }
                })
            }
        }
    }
}

function sendMsgReceiptDone(error, obj) {
    console.log('发送消息已读回执' + (!error ? '成功' : '失败'), error, obj);
}

export function getHistoryMsgs({state, commit}, obj) {
    const nim = state.nim
    if (nim) {
        let {scene, to} = obj
        let options = {
            scene,
            to,
            reverse: false,
            asc: true,
            limit: config.localMsglimit || 20,
            done: function getHistoryMsgsDone(error, obj) {
                if (obj.msgs) {
                    if (obj.msgs.length === 0) {
                        commit('setNoMoreHistoryMsgs')
                    } else {
                        let msgs = obj.msgs.map(msg => {
                            return formatMsg(msg)
                        })
                        commit('updateCurrSessionMsgs', {
                            type: 'concat',
                            msgs: msgs
                        })
                    }
                }
                store.dispatch('hideLoading')
            }
        }
        if (state.currSessionLastMsg) {
            options = Object.assign(options, {
                lastMsgId: state.currSessionLastMsg.idServer,
                endTime: state.currSessionLastMsg.time,
            })
        }
        store.dispatch('showLoading')
        nim.getHistoryMsgs(options)
    }
}

export function resetNoMoreHistoryMsgs({commit}) {
    commit('resetNoMoreHistoryMsgs')
}

// 继续与机器人会话交互
export function continueRobotMsg({commit}, robotAccid) {
    commit('continueRobotMsg', robotAccid)
}