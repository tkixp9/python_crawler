import ajaxutils from '../utils/_ajax'
import { debounce } from '../utils/_utils'
import { getLoadingHtml, showToast } from '../utils/_tools'
import router from '../utils/_router'
import '../../less/page/home.less'

const incomeController = (() => {
  const contentHtml =
    `<div class="page-wrap" id="page-home">
      <div class="page-content">${getLoadingHtml()}</div>
    </div>`

  const cancelScroll = () => {
    $(window).unbind('scroll')
  }

  const bindActions = () => {
    const requestFunction = debounce(requestList, 1000, true)
    $(window).scroll(function (e) {
      if (config.requesting) {
        return
      }
      if (e.currentTarget.innerHeight + e.currentTarget.scrollY + 160 < $(document).height()) {
        return
      }
      requestFunction()
    })
  }
  const requestList = () => {
    config.requesting = true
    ajaxutils.getData({
      url: '/api/list',
      data: { page: config.page++ },
      scb: (res) => {
        config.requesting = false
        if (res.data.length === 0) {
          cancelScroll()
          config.requesting = false
          return
        }
        if (config.page === 1) {
          $('.page-content').empty()
        }
        $('.page-content').append(res.data.map((item) => { return `
          <div class="list-item-card link-style" data-id="${item.id}">
            <p class="card-title">${item.title}</p>
            <img class="card-img" src="${item.img}"/>
          </div>`
        }))
        $('.list-item-card').bind('click', function (e) {
          cancelScroll()
          router.push({ action: 'detail', id: e.currentTarget.dataset.id })
        })
      },
      fcb: () => {
        config.requesting = false
        showToast({ text: '加载失败！' })
      },
    })
  }
  const reset = () => {
    config.page = 0
    config.requesting = false
  }
  const config = {
    page: 0,
    requesting: false
  }
  return {
    init: (params) => {
      reset()
      $('.app-wrap').empty().append(contentHtml)
      requestList()
      bindActions()
    }
  }
})()

const start = (params) => {
  params = params || {}
  incomeController.init(params)
}
export default {
  start,
}
