const getLoadingHtml = () => {
  return `<div class="loader-wrap">
        <div class="loader-inner pacman">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>`
}

const showToast = (params) => {
  const toast = $('#toast')
  //toast.css('color', params.success ? '#00c800' : '#f25d5d')
  toast.find('.content').html(params.text)
  toast.fadeIn()
  if (params.forever) {
    return
  }
  setTimeout(function () {
    toast.fadeOut()
  }, 2000)
}
const showDialog = (params) => {
  // text, okCallback, noCancel, okText, cancelText, title, cancelCallback, closeIcon
  const dialog = $('#promot-dialog')
  if (dialog.css('display') == 'block') {
    return
  }
  $('#promot-dialog .dialog-body').html(params.text)
  dialog.show()
  const cancelbtn = dialog.find('.dialog-foot .default')
  const okbtn = dialog.find('.dialog-foot .primary')
  okbtn.text(params.okText || '确定')
  cancelbtn.text(params.cancelText || '取消')
  if (params.noCancel) {
    cancelbtn.hide()
  } else {
    cancelbtn.show()
    cancelbtn.bind('click', function () {
      dialog.hide()
      if (params.cancelCallback) {
        params.cancelCallback()
      }
      cancelbtn.unbind()
      if (okbtn) {
        okbtn.unbind()
      }
    })
  }
  okbtn.bind('click', function () {
    dialog.hide()
    if (params.okCallback) {
      params.okCallback()
    }
    okbtn.unbind()
    if (cancelbtn) {
      cancelbtn.unbind()
    }
  })
  dialog.find('.dialog-head').text(params.title || '温馨提示')
  if (params.closeIcon) {
    const node = dialog.find('.close-icon')
    node.css('visibility', 'visible')
    node.bind('click', function () {
      dialog.hide()
      node.unbind()
      if (params.cancelCallback) {
        params.cancelCallback()
      }
      if (okbtn) {
        okbtn.unbind()
      }
      if (cancelbtn) {
        cancelbtn.unbind()
      }
    })
  } else {
    dialog.find('.close-icon').css('visibility', 'hidden')
  }
}

export {
  showDialog,
  showToast,
  getLoadingHtml
}
