'use strict'
import axios from 'axios'
import qs from 'qs'
import cookie from './cookie'
import config from './../../config'

axios.interceptors.request.use(config => {
  // loading
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.resolve(error.response)
})

function checkStatus (response) {
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    return response.data
  }

  // 异常状态下，把错误信息返回去
  return {
    status: -404,
    msg: '网络异常'
  }
}

function checkCode (res) {
  // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
  if (res.status === -404) {
    // alert('网络异常')
    //alert(res.message)
  }
  return res
}

export default {
  post (url, data) {
    var userInfo = JSON.parse(localStorage.getItem('userinfo'))
    var headers = {
      'userid': userInfo ? userInfo.userId : '',
      'platform': 'web',
      // 'teoken': userInfo.token,
      'Content-Type': 'application/x-www-form-urlencoded'
    }

    return axios({
      method: 'post',
      baseURL: config.request_url,
      url,
      data: qs.stringify(data),
      timeout: 10000,
      headers: headers
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  },


  get (url, params) {
    var userInfo = JSON.parse(localStorage.getItem('userinfo'))
    var headers = {
      'userid': userInfo ? userInfo.userId : '',
      'platform': 'web',
      // 'teoken': userInfo.token,
      'Content-Type': 'application/x-www-form-urlencoded'
    }

    return axios({
      method: 'get',
      baseURL: config.request_url,
      url,
      params, // get 请求时带的参数
      timeout: 10000,
      headers: headers
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  }
}