/**
 * created by leeing on 17/9/5
 * 用于获取one 的图文列表
 */
async function getId (ctx) {
  return new Promise((resolve, reject) => {
    ctx.$http.get('http://v3.wufazhuce.com:8000/api/onelist/idlist')
      .then(ret => {
        resolve(ret.data.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}
function getOneList (ctx, id) {
  let url = `http://v3.wufazhuce.com:8000/api/onelist/${id}/0`
  return new Promise((resolve, reject) => {
    ctx.$http.get(url)
      .then(ret => {
        resolve(ret)
      })
      .catch(err => {
        reject(err)
      })
  })
}
async function getAllLists (ctx, ids) {
  let arrs = []
  ids.forEach(item => {
    arrs.push(getOneList(ctx, item))
  })
  return new Promise((resolve, reject) => {
    Promise.all(arrs).then(ret => {
      resolve(ret)
    }).catch(err => {
      reject(err)
    })
  })
}

export default {
  getId,
  getOneList,
  getAllLists
}
