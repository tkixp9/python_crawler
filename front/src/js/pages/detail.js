import ajaxutils from '../utils/_ajax'
import { getLoadingHtml, showToast } from '../utils/_tools'
import router from '../utils/_router'
import '../../less/page/home.less'

const incomeController = (() => {

  const contentHtml =
    `<div class="page-wrap" id="page-detail">
      <div class="page-content">
        ${getLoadingHtml()}
      </div>
    </div>`

  const bindActions = () => {
  }
  const requestList = (id) => {
    ajaxutils.getData({
      url: '/api/detail',
      data: { id },
      scb: (res) => {
        const data = res.data
        $('.page-content').html(`
          <div class="detail-top-wrap">${data.title}</div>
          <div class="detail-des">${data.des}</div>
          ${data.imgs.map(item => `<img class="detail-img" src="${item}" />`).join('')}
        `)
        $('.list-item-card').bind('click', function (e) {
          router.push({ action: 'detail', id: e.currentTarget.dataset })
        })
      },
      fcb: () => {
        showToast({ text: '加载失败！' })
      },
    })
  }

  return {
    init: (params) => {
      $('.app-wrap').empty().append(contentHtml)
      requestList(params.id)
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
