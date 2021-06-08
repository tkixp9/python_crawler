const incomeController = (() => {
  const contentHtml = `<div class="page-in-frame" id="category-income-page">
        <div class="develop-container">
            <img src="https://static.zhinikefu.com/fans/static/images/developing.png" />
            开发中，敬请期待...
        </div>
    </div>`

  const bindActions = () => {
  }
  return {
    init: (params) => {
      $('.app-wrap').empty().append(contentHtml)
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
