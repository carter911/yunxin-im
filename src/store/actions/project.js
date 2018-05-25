import store from '../'
import http from '../../utils/http'

export function updateCurrSessionProjectInfo ({state, commit}, SessionId) {

    let chatType = SessionId.slice(0, 4)
    if (chatType === 'team') {
    var projectId = SessionId.slice(5)
    var url = projectId + '/projects'
    var params = {type: 2}
    http.get(url, params).then(function (res) {
        if (res.code == 200) {
            store.commit('updateCurrSessionProjectInfo', res.data)
        }
    }).catch(function (err) {
            console.log(err)
    })
    }
}