import store from '../'
import http from '../../utils/http'
import types from '../../api/types.js'

export function updateCurrSessionProjectInfo ({state, commit}, SessionId) {
    let chatType = SessionId.slice(0, 4)

    console.log("updateCurrentSessionProjectInfo","-------->>" + SessionId);

    if (chatType === 'team') {
        var projectId = SessionId.replace("team-","").replace("oa-","")
        var url = projectId + '/'+ types.PROJECTS
        var params = {type: 2}

        http.get(url, params).then(function (res) {
            //console.error(url, res.data)

            if (res.code === 200) {
                store.commit('updateCurrSessionProjectInfo', res.data)
            }else{
                alert(res.message)
            }
        }).catch(function (err) {
                console.log(err)
        })
    }
}


export function getCurrentProjectInfo ({state, commit}, projectId) {
    console.log(types)
    var url = projectId + '/' + types.PROJECTS
    http.get(url).then(function (res) {
        if (res.code === 200) {
            store.commit('updateCurrSessionProjectInfo', res.data)
        }
    }).catch(function (err) {
            console.log(err)
    })
}

