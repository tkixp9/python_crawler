/* 路由逻辑 */

import home from '../pages/home'
import detail from '../pages/detail'
import category from '../pages/category'
import categoryIncome from '../pages/categoryIncome'
import { getAllparams } from './_utils'

const routerPaths = [
  { action: 'home', title: '', handler: home.start },
  { action: 'detail', title: '', handler: detail.start },
  { action: 'category', title: '', handler: category.start },
  { action: 'category_income', handler: categoryIncome.start, title: '收益' },
]

const DEFAULT_PATH = 'home'

const specialAction = (params) => {
  if (false) {
    window.location.href = 'https://www.vzhuo.com'
  }
}
const push = (params, replace) => {
  if (specialAction(params)) {
    return
  }
  if (params && params.action && searchAndExe(params) == 1) {
    pushHistory($.extend({}, params), replace)
  }
}
const replace = (params) => {
  push(params, true)
}
const pushHistory = (params, replace) => {
  delete params.handler
  if (params.noHistory) {
    return
  }
  let url = location.href.split('?')[0]
  let contactA = '?'
  for (let value in params) {
    url += contactA + value + '=' + encodeURIComponent(params[value])
    contactA = '&'
  }
  history[replace ? 'replaceState' : 'pushState']({ title: document.title }, document.title, url)
}

const searchAndExe = (params) => {
  console.log('tkyj+++++' + JSON.stringify(params))
  for (let i = 0; i < routerPaths.length; i++) {
    let item = routerPaths[i]
    if (item.action == params.action) {
      if (item.handler) {
        const newParams = $.extend({}, item, params)
        item.handler(newParams)
        //state.postState(newParams)
        return 1
      }
      return -1
    }
  }
  return 0
}
const fnHashTrigger = () => {
  const params = getAllparams()
  if (!params || !params.action) {
    return false
  } else {
    const result = searchAndExe(params)
    if (result == 1) {
      return true
    } else if (result == -1) {
      return false
    }
    if (location.href.indexOf('code') > 0) {
      history.replaceState(null, document.title, location.href.split('?')[0])
      return fnHashTrigger()
    } else {
      return false
    }
  }
}
const initRouter = () => {
  window.addEventListener('popstate', function () {
    fnHashTrigger()
  })
}

const startRouter = () => {
  const params = getAllparams()
  if (!params.action || params.action == 'undefined') {
    params.action = DEFAULT_PATH
  }
  push(params)
}
export default {
  init: initRouter,
  startRouter: startRouter,
  push,
  replace,
}
