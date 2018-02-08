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
      let mapBrowse = new DrViewer()
      mapBrowse.showDR('http://10.13.62.25:92/fileroot/Image/CT10hx/CT/gunbarrel000025/0.png')
      console.log('图库查看~')
      $.ajax({
        url: 'http://10.13.62.25:8070/api/DR/Query?types=None&PageNO=1&Limit=11&Offset=1',
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3NUVEMjkyQTkwQUNFQkNGNUZCNTYxOTNBMzMxQ0NDMiIsImlhdCI6MTUxNjg0NjI0MCwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9leHBpcmF0aW9uIjoiMjYwMDY0MDAiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjM2MDgwNzkyMzkzMzA1MzMzMDAiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoi6LaF57qn566h55CG5ZGYIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiU3VwZXJBZG1pbiIsIk9yZ0lEIjoiMzYwODA3OTIzOTMzMDUzMzM3NiIsIkVudGVycHJpc2VDb2RlIjoiIiwibmJmIjoxNTE2ODQ2MjM5LCJleHAiOjE1NDI4NTI2MzksImlzcyI6Ik5TVFMuTlVDVEVDSC5DT00iLCJhdWQiOiJOU1RTX1VTRVIifQ.3_aYso892uDawzGIh46EKx8t2cYuk6i01t9EZmUD2uw'
        },
        success (data) {
          console.log(data)
        }
      })

      // let reader = new FileReader()
      // let xhr = new XMLHttpRequest()
      // xhr.open('get', 'http://10.13.62.25:92/fileroot/Image/CT10hx/CT/gunbarrel000025/0.png', true)
      // xhr.responseType = 'blob'
      // xhr.onload = function () {
      //   if (this.status === 200) {
      //     // console.log(typeof this.response)
      //     reader.readAsDataURL(this.response)
      //   } else {
      //     console.log(this.status)
      //   }
      // }
      // xhr.send()
      // reader.onerror = error => {
      //   console.log(error)
      // }
      // reader.onload = data => {
      //   console.log(data)
      // }
    }
  }
  //
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
        // console.log(item)
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
