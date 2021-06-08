const getParameterByName = (name) => {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]')
  const regex = new RegExp('[\\?&]' + name + '=([^&#]*)'),
    results = regex.exec(window.location.search)
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '))
}
const getAllparams = () => {
  const url = window.location.href, param = {}
  if (url.indexOf('?') != -1) {
    url.split('?')[1].split(/[&#]/).forEach(function (param_str) {
      (function () {
        param[this[0]] = decodeURIComponent(this[1])
      }).call(param_str.split('='))
    })
  }
  return param
}

/**
 * @desc 函数防抖
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param immediate true 表立即执行，false 表非立即执行
 */
const debounce = (func, wait, immediate) => {
  let timeout

  return function () {
    let context = this
    let args = arguments

    if (timeout) clearTimeout(timeout)
    if (immediate) {
      console.log('tkyj+++bindActions++4444++')
      const callNow = !timeout
      timeout = setTimeout(() => {
        timeout = null
      }, wait)
      console.log('tkyj+++bindActions++555++', callNow)
      if (callNow) func.apply(context, args)
    } else {
      timeout = setTimeout(function () {
        func.apply(context, args)
      }, wait)
    }
  }
}

const initRPX = () => {
  const docEl = document.documentElement
  const clientWidth = docEl.clientWidth
  // alert(clientWidth)
  docEl.style.fontSize = ((clientWidth >= 640 ? 640 : clientWidth) / 7.5) + 'px'
}

export {
  getParameterByName,
  getAllparams,
  debounce,
  initRPX,
}
