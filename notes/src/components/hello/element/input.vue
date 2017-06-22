<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12"><div class="grid-content bg-purple">
        <el-input v-model="input" placeholder="请输入内容"></el-input>
      </div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple">
        你的输入内容：{{input}}
      </div></el-col>
    </el-row>
  	
    <el-row :gutter="20">
      <el-col :span="12"><div class="grid-content bg-purple">
        <el-radio v-model="radio" label="星期四">星期四</el-radio>
        <el-radio v-model="radio" label="星期五">星期五</el-radio>
        <el-checkbox v-model="check">周末加班不</el-checkbox>
      </div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple">
        你的选择是：{{yourChoice}}
      </div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple">
        <el-input icon="search" v-model="input2" placeholder="请输入查询条件"></el-input>
      </div></el-col>
    </el-row>
    <el-row :gutter="30">
      <el-col :span="6"><div class="grid-content bg-purple">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div></el-col>
      <el-col :span="18"><div class="grid-content bg-purle">
        <el-select v-model="value6" placeholder="请选择">
          <el-option
            v-for="item in cities"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            <span style="float: left">{{ item.label }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
          </el-option>
        </el-select>  
        <el-select v-model="value8" filterable placeholder="可搜索选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select
          v-model="value10"
          multiple
          filterable
          allow-create
          placeholder="请选择文章标签">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>    
      </div></el-col>
    </el-row>

    <el-row :gutter="30">
      <el-col :span="6"><div class="grid-content big-purple">
        <el-switch
          v-model="swith" 
          on-color="#13ce66" 
          off-color="#f90"
        >
        </el-switch>
        <!-- 时间内选择器 -->
        <el-time-select
          v-model="time" :picker-options="{start:'07:30', step:'00:15', end:'18:30'}"
          placeholder="选中时间"
        ></el-time-select>
      </div></el-col>
      <el-col :span="12"><div class="grid-content">
        <div class="block">
          <span class="demonstration">区分颜色</span>
          <el-rate
            v-model="value2"
            show-text
            :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
          </el-rate>
        </div>
      </div></el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'btn',
  data () {
  	return {
  		visible: false,
      input: '',
      input2: '',
      radio: '星期四',
      options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
      value: '',
      value2: null,
      value6: '',
      value8: '',
      value10: '',
      swith: true
  	}
  },
  computed: {
    yourChoice() {
      return this.radio;
    },
    cities() {
      return this.options;
    }
  }
}
</script>
<style>
.el-row {
  padding: 10px;
}
</style>