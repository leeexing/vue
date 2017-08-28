/**
 * created by leeing on 8/24
 */

export default {
  // 保存用户名
  save_username ({commit}) {
    commit('SAVE_USERNAME')
  },
  // 关闭遮罩
  close_mask ({commit}) {
    commit('CLOSE_MASK')
  }
}
