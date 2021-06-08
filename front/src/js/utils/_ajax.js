import _utils from './_utils'
import router from './_router'

const SERVICE_DOMAIN_STRING = 'http://127.0.0.1:5000'
//const SERVICE_DOMAIN_STRING = 'https://test.qunsou.co'
const ajaxGet = (params) => {
  params.data.time = new Date().getTime()
  params.data.token = localStorage.token
  console.log('tkyj++22222++', params)
  $.ajax({
    type: 'GET',
    url: params.url,
    contentType: 'application/json;charset=UTF-8',
    dataType: 'json',
    data: params.data,
    success: (data) => {
      console.log('tkyj++33333++', data)
      if (data && (data.sta == 0 || data.status == 0)) {
        params.scb && params.scb(data)
        return
      }
      if (resolve4001(data)) {
        return
      }
      params.fcb && params.fcb(data)
    },
    error: (xhr, errorType, res) => {
      params.fcb && params.fcb(res)
    },
    complete: (res) => {
      params.ccb && params.ccb(res)
    }
  })
}
const resolve4001 = (data) => {
  if (data && data.errcode == 4001) {
    const phoneUrl = localStorage.phoneUrl
    if (phoneUrl && localStorage.openidUrl && $.cookie('pw_' + phoneUrl)) {
      localStorage.redirectAction = _utils.getParameterByName('action') || ''
    }
    router.push({ action: 'login', noHistory: true })
    return true
  }
}
const ajaxPost = (params) => {
  params.data.token = localStorage.token
  $.ajax({
    url: SERVICE_DOMAIN_STRING + params.url,
    method: 'POST',
    data: JSON.stringify(params.data),
    dataType: 'json',
    contentType: 'application/json',
    success: function (data) {
      if (data && (data.sta == 0 || data.status == 0)) {
        params.scb && params.scb(data)
        return
      }
      if (resolve4001(data)) {
        return
      }
      params.fcb && params.fcb(data)
    },
    error: function (res) {
      params.fcb && params.fcb(res)
    },
    complete: (res) => {
      params.ccb && params.ccb(res)
    }
  })
}

export default {

  getData: ajaxGet,
  postData: ajaxPost,
}
