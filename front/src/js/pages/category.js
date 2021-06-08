import router from '../utils/_router'
import ajaxutils from '../utils/_ajax'
import frameutils from '../utils/_tools'

const categoryController = (() => {
  const getHtml = () => {
    return `<div class="page-in-frame" id="category-page">
            <div class="top-container">
                <img class="logout-icon" src="https://static.zhinikefu.com/fans/static/images/logout_icon.svg"/>
                <div class="category-phone">${localStorage.phoneUrl}</div>
                <div class="category-tag"></div>
            </div>
            <div class="page-card">
                <div class="category-item-c">
                    <div class="category-item" id="category_team">
                        <img class="icon" src="https://static.zhinikefu.com/fans/static/images/category_team.png" />
                        <div class="title">粉丝</div>
                    </div>
                    <div class="category-item" id="category_total">
                        <img class="icon" src="https://static.zhinikefu.com/fans/static/images/category_total.png" />
                        <div class="title">营业额</div>
                    </div>
                    <div class="category-item" id="category_income">
                        <img class="icon" src="https://static.zhinikefu.com/fans/static/images/category_income.png" />
                        <div class="title">收益</div>
                    </div>
                    <div class="category-item" id="category_invite">
                        <img class="icon" src="https://static.zhinikefu.com/fans/static/images/category_invite.png" />
                        <div class="title">邀请</div>
                    </div>
                </div>
            </div>
        </div>`
  }

  const bindActions = () => {
    $('.logout-icon').bind('click', () => {
      ajaxutils.postData({
        url: '/wykf/api/v1/proxy/logout',
        data: {},
        scb: (res) => {
          delete localStorage.phoneUrl
          delete localStorage.token
          router.push({ action: 'login' })
        },
        fcb: (res) => {
          frameutils.showToast({ text: res.msg || '操作失败！' })
        },
      })
    })
    $('.category-item').bind('click', function (event) {
      router.push({ action: event.currentTarget.id })
    })
  }
  const fetchData = () => {
    ajaxutils.getData({
      url: '/wykf/api/v1/proxy/details',
      data: {},
      scb: (res) => {
        $('.category-tag').text(['新进代理', '普通代理', '高级代理', '特约代理'][(res.proxy_seller_level - 1) || 0]).show()
      },
      fcb: (res) => {
        $('.app-wrap').empty()
        frameutils.showDialog({
          text: res.msg || '获取数据失败！', okCallback: () => {
            router.push({ action: 'login' })
          }, noCancel: true
        })
      },
    })
  }
  return {
    init: (params) => {
      $('.app-wrap').empty().append(getHtml())
      fetchData()
      bindActions()
    }
  }
})()

const start = (params) => {
  params = params || {}
  categoryController.init(params)
}
export default {
  start,
}
