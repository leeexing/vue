$(function(){

  const Business = {
    insertTip() {
      let DRPreview = new MapPreviewDR();
      DRPreview.init(12731)
      $('.j-map').click(function(){
        DRPreview.Viewer.loadDRTipImage()
      })
    },
    mapBrowse() {
      // let mapBrowse = new MapBrowse()
      // mapBrowse.show()
      console.log('图库查看~')
    }
  }

  // 获取url的参数
  function getUrlParams() {
    let search = location.search
    let params = null
    if (search) {
      params = {}
      search.slice(1).split('&').forEach(item => {
        console.log(item)
        let arr = item.split('=')
        params[arr[0]] = arr[1]
      })
    }
    return params
  }

  let session = sessionStorage.getItem('nstsInfo')
  console.log(session)
  let urlParams = getUrlParams()
  console.log(urlParams)

  function initBus(action, state = Business) {
    let { business } = action
    switch (business) {
      case 'INSERT_TIP':
        state.insertTip()
        break;

      case 'MAP_BROWSE':
        state.mapBrowse()

      default:
        break;
    }
  }
  initBus(urlParams)

})
