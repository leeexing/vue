$(function(){
  /**
   * CT 图像控制层
   */
  const Business = {
    insertTip() {
      let DRPreview = new MapPreviewCT();
      DRPreview.init(12731)
      $('.j-map').click(function(){
        DRPreview.Viewer.loadDRTipImage()
      })
    },
    mapBrowse() {
      // let mapBrowse = new DrViewer()
      // mapBrowse.showDR('3612549444941119490')
      let mapBrowse = new MapPreviewCT()
      mapBrowse.init('http://10.13.62.25:8070/api/CT/Query?PageNO=0&Limit=10&Offset=0')

    }
  }
  function Reducer(action, state = Business) {
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

  // 获取url的参数
  function getUrlParams() {
    let search = location.search
    let params = null
    if (search) {
      params = {}
      search.slice(1).split('&').forEach(item => {
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


  Reducer(urlParams)

})
