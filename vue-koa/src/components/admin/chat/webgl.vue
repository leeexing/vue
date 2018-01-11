<template>
  <div class="m-webgl">
    <header>
      <h3 v-leeing>webgl 实验田</h3>
    </header>
    <div class="main">
      <section class="form">
        <el-row :gutter="20">
        <el-col :span="8"><div class="grid-content bg-purple">
          单选
          <el-select v-model="value1" v-leebind
            collapse-tags
            style="margin-left: 20px;" placeholder="请选择"
            @change="singleChange"
          >
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple">
          多选
          <el-select v-model="value2" 
            multiple style="margin-left: 20px;" placeholder="请选择"
            @change="multipleChange"
          >
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            >
            </el-option>
          </el-select>
        </div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple">
          分组多选
          <el-select v-model="value3"
            multiple placeholder="请选择"
            @change="groupChange"
          >
          <el-option-group
            v-for="group in options3"
            :key="group.label"
            :label="group.label">
            <el-option
              v-for="item in group.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            >
            </el-option>
          </el-option-group>
        </el-select>
        </div></el-col>
      </el-row>
      </section>
      <section class="dr">

      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'weblg',
  data () {
    return {
      options1: [
        {
          value: '选项1',
          label: '黄金糕'
        }
      ],
      options2: [
        {
          value: '选项1',
          label: '黄金糕'
        }
      ],
      options3: [
      ],
      options4: [
      ],
      value1: [],
      value2: [],
      value3: [],
      value4: []
    }
  },
  mounted () {
    let data = require('./selection.json')
    // console.log(data)
    this.options1 = data.single
    this.options2 = data.mutiple
    this.options3 = data.groupMul
    this.options4 = data.jilian
  },
  methods: {
    singleChange (val) {
      console.log(val)
    },
    multipleChange (val) {
      console.log(val)
      if (val.includes('all') && val.length > 1) {
        this.value2 = ['all']
        this.options2.forEach(option => {
          if (option.value !== 'all') {
            this.$set(option, 'disabled', true)
          }
        })
      } else if (val.includes('all') && val.length === 1) {
        this.options2.forEach(option => {
          if (option.value !== 'all') {
            this.$set(option, 'disabled', true)
          }
        })
      } else {
        this.options2.forEach(option => {
          this.$set(option, 'disabled', false)
        })
      }
    },
    groupChange (val) {
      console.log(val)
      if (val.includes('all') && val.length > 1) {
        this.value3 = ['all']
        this.options3.forEach(option => {
          option.options.forEach(item => {
            if (item.value !== 'all') {
              this.$set(item, 'disabled', true)
            }
          })
        })
      } else if (val.includes('all') && val.length === 1) {
        this.options3.forEach(option => {
          option.options.forEach(item => {
            if (item.value !== 'all') {
              this.$set(item, 'disabled', true)
            }
          })
        })
      } else {
        this.options3.forEach(option => {
          option.options.forEach(item => {
            this.$set(item, 'disabled', false)
          })
        })
      }
    },
    jilianChange (val) {
      console.log(val)
    }
  },
  /**
   * 自定义局部指令
   */
  directives: {
    leeing: {
      inserted (el) {
        console.log('您好，我是局部注册指令')
        console.log(el)
        el.style.color = '#f90'
      }
    },
    leebind: {
      bind (el) {
        el.focus()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.m-webgl {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  header {
    display: flex;
    align-items: center;
    height: 60px;
    flex-shrink: 0;
    padding: 10px;
    color: #409EFF;
    border-bottom: 1px solid #ddd;
    box-shadow: 0 1px 2px #eee;
    h3 {
      letter-spacing: 2px;
    }
  }
  .main {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 10px;
    section {
      width: 100%;
      &.form {
        padding: 10px 0;
        border-bottom: 1px solid #eee;
      }
    }
  }
}
</style>

