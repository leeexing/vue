/**
 * 图像显需要用到的基础显示类
 * 1、右边菜单栏
 * 2、
 */
console.log('leeing')
class MapMenu {
  constructor(options={}) {
    this.version = '1.0'
    this.options = {
      url: ''
    }
    Object.assign(this.options, options)
    this.init()
  }
  init() {
    let that = this
    this.mapOuter = $('.j-map-menu')
    $.ajax({
      url: that.options.executeSql,
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3NUVEMjkyQTkwQUNFQkNGNUZCNTYxOTNBMzMxQ0NDMiIsImlhdCI6MTUxNjg0NjI0MCwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9leHBpcmF0aW9uIjoiMjYwMDY0MDAiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjM2MDgwNzkyMzkzMzA1MzMzMDAiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoi6LaF57qn566h55CG5ZGYIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiU3VwZXJBZG1pbiIsIk9yZ0lEIjoiMzYwODA3OTIzOTMzMDUzMzM3NiIsIkVudGVycHJpc2VDb2RlIjoiIiwibmJmIjoxNTE2ODQ2MjM5LCJleHAiOjE1NDI4NTI2MzksImlzcyI6Ik5TVFMuTlVDVEVDSC5DT00iLCJhdWQiOiJOU1RTX1VTRVIifQ.3_aYso892uDawzGIh46EKx8t2cYuk6i01t9EZmUD2uw'
      },
      success (data) {
        console.log(data)
        that.initElement(data.package)
        that.attachEvent()
        that.initShow()
      }
    })
  }
  initElement(data) {
    let mapListHtml = ''
    data.forEach(item => {
      mapListHtml += `
        <li data-id="${item.id}" data-isdanger="${item.isTip ? true : false}">
          <img src="${item.thumbnails.length > 0 ? item.thumbnails[0].thumbnail : ''}" />
          <div>${item.name}</div>
        </li>
      `
    })
    this.fixTitle = $(`<div class="fix-title animated">图像库</div>`)
    let title = `<header class="map-title"><h3>图像你库</h3><i class="nucfont inuc-arrow-circle-right j-map-hide"></i></header>`
    let mapUl = `<ul class="map-content">${mapListHtml}</ul>`
    $('body').append(this.fixTitle)
    this.mapOuter.append(title)
    this.mapOuter.append(mapUl)
  }
  initShow() {
    if (this.options.initShowId) {
      this.mapOuter.find('li[data-id="id"]').click()
    } else {
      this.mapOuter.find('li').eq(0).click()
    }
  }
  attachEvent() {
    let that = this
    this.mapOuter.on('click', '.j-map-hide', function() {
      that.mapOuter.removeClass('fadeInRight').addClass('animated fadeOutRight')
      that.fixTitle.removeClass('fadeOutUp').addClass('fadeInDownBig')
    })

    this.fixTitle.click(function() {
      that.mapOuter.removeClass('fadeOutRight').addClass('fadeInRight')
      $(this).removeClass('fadeInDownBig').addClass('fadeOutUp')
    })

    this.mapOuter.on('click', 'li', function(e) {
      let id = $(this).data('id')
      console.log(id)
      if (!$(this).hasClass('active')) {
        $(this).addClass('active').siblings().removeClass('active')
        that.options.drinstance.initShow(id)
      }
    })
  }
}
