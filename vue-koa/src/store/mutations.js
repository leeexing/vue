/**
 * created by leeing on 8/24
 */
const SAVE_USERNAME = 'SAVE_USERNAME'
const CLOSE_MASK = 'CLOSE_MASK'
const GET_TODOLIST = 'GET_TODOLIST'
// const SHOW_SUGGEST = 'SHOW_SUGGEST'
// const SLOSE_SUGGEST = 'CLOSE_SUGGEST'
// const INIT_MAP = 'INIT_MAP'
// const CLOSE_LOCATION_ERROR = 'CLOSE_LOCATION_ERROR'
// const SET_POSITION = 'SET_POSITION'

export default {
  // 保存用户名
  [SAVE_USERNAME] (state, name) {
    if (state.isLogined) {
      state.username = name
    }
  },
  // 关闭遮罩层
  [CLOSE_MASK] (state) {
    state.ismask = false
  },
  // 获取 list 数据
  [GET_TODOLIST] (state) {
    //
  }
}
