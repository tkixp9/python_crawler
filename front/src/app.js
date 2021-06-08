import 'babel-polyfill'

import './less/public.less'
import './less/common.less'
import './lib/jquery.min.js'
import { initRPX } from './js/utils/_utils'
import router from './js/utils/_router'

//
// /**在development中, 才能正常运行( 通过proxy ) */
// if (process.env.NODE_ENV === "development") {
//   $.get(
//     "/comments/hotflow",
//     {
//       id: "4263554020904293",
//       mid: "4263554020904293",
//       max_id_type: "0"
//     },
//     function(data) {
//       console.log(data);
//     }
//   );
// } else {
//   console.log("开发模式下才能测试 '代理功能' ");
// }
// /***************************************** */

const initApp = () => {
  // const openid = utils.getParameterByName('openid');
  // const phone = utils.getParameterByName('phone');
  // openid && (localStorage.openidUrl = openid);
  // phone && (localStorage.phoneUrl = phone);
  initRPX()
  router.init()
  router.startRouter()
}
initApp()
