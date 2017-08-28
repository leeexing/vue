<template>
  <transition name="slide-right">
    <div class="chatting">
      <!-- 聊天界面头部 -->
      <div class="chatting-header">
        <i class="ai"></i>
        <h2>AI 智能</h2>
        <i class="menu"></i>
      </div>
      <!-- 聊天内容区 -->
      <div class="chatting-content" ref="chatwrap">
        <div v-for="item of msg">
          <div class="chat-item" :class="{other: !item.self}">
            <p class="msg-date">{{item.date}}</p>
            <div class="msg-from">
              <span class="location">【{{item.loc}}】</span>
              <span class="msg-author">{{item.from}}</span>
              <img :src="item.avataUrl" alt="">
            </div>
            <div class="msg-content">{{item.content}}</div>
          </div>
          <!-- 聊天内容区 
          <div class="chat-item other">
            <p class="msg-date">20178/8 16:14</p>
            <div class="msg-from">
              <span class="location">【火星】</span>
              <span class="msg-author">AI</span>
              <img src="../../assets/icons/icon-ai2.svg" alt="">
            </div>
            <div class="msg-content">今天是周二，美好的一天，美妙的一天</div>
          </div>
          -->
        </div>
      </div>
      <!-- 聊天输入区 -->
      <div class="chatting-input">
        <input @keyup.enter="send" v-model="chatContent" type="text" placeholder="主人，您有什么吩咐">
        <button @click="send">发送</button>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'AI',
  data () {
    return {
      chatContent: '',
      msg: localStorage.msg_ai && JSON.parse(localStorage.msg_ai) || []
    }
  },
  mounted () {
    console.log('AI')
  },
  watch: {
    msg (value) {
      localStorage.msg_ai = JSON.stringify(value)
    }
  },
  computed: {
    avataUrl () {
      return `http://omratag7g.bkt.clouddn.com/icon-avatar${Math.floor(Math.random() * 21)}.svg`
    }
  },
  methods: {
    send () {
      console.log(this.chatContent)
      if (this.chatContent === '') {
        return
      }
      this.msg.push({
        date: this.moment().format('YYYY-MM-DD HH:mm:ss'),
        loc: localStorage.addr || '火星',
        from: `${localStorage.name}`,
        content: this.chatContent,
        self: true,
        avataUrl: this.avataUrl
      })
      setTimeout(() => {
        let top = this.$refs.chatwrap.scrollHeight
        this.$refs.chatwrap.scrollTop = top
      }, 0)
      // let url = 'https://zhaoplus.com/api/AI?search=' + this.chatContent + '&userid=' + localStorage.name + localStorage.addr + '&loc=' + localStorage.addr
      // let url = 'http://cn.bing.com/search?q=reduce+js&qs=n&form=QBRE&sp=-1&pq=reduce+js&sc=1-9&sk=&cvid=B4E3578DAE8542828C383D33872B59CF'
      this.$http.get('http://element.eleme.io/#/zh-CN/component/icon').then(result => {
        console.log(result)
      }).catch(err => {
        console.log(err)
      })
      this.chatContent = ''
    }
  }
}
</script>

<style lang="less">
  @inputColor: #fff;
  @fontsize: 18px;
  .chatting {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100%;

    .chatting-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 50px;
      padding: 0 8px;
      background: #00bcd4;
      i {
        display: inline-block;
        width: 40px;
        height: 40px;
        &.ai {
          background: url('../../assets/icons/icon-ai.svg') no-repeat;
          background-size: contain;
        }
        &.menu {
          background: url('../../assets/icons/icon-menu.svg') no-repeat;
          background-size: contain;
        }
      }
    }
    // 聊天内容
    .chatting-content {
      flex: auto;
      display: flex;
      flex-direction: column;
      max-height: 100%;
      background: #ddd;
      color: #000;
      overflow-y: auto;
      .chat-item {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        &.other {
          align-items: flex-start;
          .msg-from img {
            order: -1;
          }
        }
        .msg-date {
          align-self: center;
          padding: 5px 0;
          text-align: center;
          color: #777;
          font-size: @fontsize - 4;
        }
        .msg-from {
          display: flex;
          align-items: center;
          height: 24px;
          padding-right: 10px;
          .msg-author {
            align-self: flex-start;
            padding: 0 5px;
            font-size: @fontsize + 6;
          }
          img {
            width: 24px;
            height: 24px;
          }
        }
        .msg-content {
          margin: 10px;
          padding: 10px;
          border-radius: 10px;
          background: @inputColor;
        }
      }
    }

    .chatting-input {
      display: flex;
      justify-content: space-between;
      height: 40px;
      input {
        flex: auto;
        text-indent: 5px;
        font-size: @fontsize + 4;
      }
      button {
        display: inline-block;
        width: 60px;
        background: #00bcd4;
        text-align: center;
        color: @inputColor;
        font-size: @fontsize;
      }
    }
  }
</style>