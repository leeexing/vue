<template>
  <div class="users">
    <div>
      <bread-crumb :breadinfo="breadinfo"></bread-crumb>
    </div>
    <div class="content">
      <div class="search">
        <el-row>
          <el-col :span="4">
            <el-input v-model="userSearch" placeholder="标题"></el-input>
          </el-col>
          <el-col :span="6" :offset="1">
            <el-button type="primary">查询</el-button>
            <el-button type="primary">新增</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="table">
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            type="index"
            width="60">
          </el-table-column>
          <el-table-column
            label="创建日期"
            width="180">
            <template scope="scope">
              <el-icon name="time"></el-icon>
              <span style="margin-left: 10px">{{ scope.row.addTime.split('T')[0] }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="标题"
            width="180">
            <template scope="scope">
              {{scope.row.title}}
            </template>
          </el-table-column>
          <el-table-column
            label="内容简介">
            <template scope="scope">
              {{scope.row.brife}}
            </template>
          </el-table-column>
          <el-table-column
            label="阅读次数"
            width="100">
            <template scope="scope">
              {{scope.row.views}}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="180">
            <template scope="scope">
              <el-button
                size="small"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="small"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pages">
          <el-pagination
            layout="prev, pager, next"
            @current-change="currentChange"
            :page-size="pageSize"
            :total="totalTopics">
          </el-pagination>
        </div>
      </div>
    </div>
    <div class="mask" :class="{show: showEdit}">
      <div class="artical">
        <h2 class="title">文章修改</h2>
        <el-form label-position="top" label-width="100px" :model="formLabelAlign">
          <el-form-item label="文章标题">
            <el-input v-model="formLabelAlign.title"></el-input>
          </el-form-item>
          <el-form-item label="文章简介">
            <el-input
              type="textarea"
              placeholder="请输入内容"
              :autosize="{ minRows: 2, maxRows: 4}"
              v-model="formLabelAlign.brife">
            </el-input>
          </el-form-item>
          <el-form-item label="文章内容">
            <el-input
              type="textarea"
              placeholder="请输入内容"
              :rows="5"
              v-model="formLabelAlign.content">
            </el-input>
          </el-form-item>
          <el-form-item class="btn-wrap">
            <el-button type="success" @click="certainEdit">确认</el-button>
            <el-button @click="cancelEdit">取消</el-button>
          </el-form-item>
        </el-form>  
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import BreadCrumb from './breadcrumb'
export default {
  name: 'home',
  data () {
    return {
      breadinfo: ['用户列表'],
      userSearch: '',
      topicData: [],
      totalTopics: 0,
      pageSize: 5,
      currentPage: 1,
      formLabelAlign: {
        title: '',
        brife: '',
        content: ''
      },
      oldData: {},
      showEdit: false
    }
  },
  mounted () {
    this.$http.get('/admin/topic')
      .then(ret => {
        this.topicData = ret.data.message
        this.totalTopics = this.topicData.length
      })
      .catch(err => {
        console.log(err)
      })
  },
  computed: {
    tableData () {
      let start = (this.currentPage - 1) * this.pageSize
      let end = Math.min(this.totalTopics, this.pageSize * this.currentPage)
      return this.topicData.slice(start, end)
    }
  },
  methods: {
    handleEdit (index, row) {
      // let obj = {
      //   title: row.title,
      //   brife: row.brife,
      //   content: row.content
      // }
      // this.formLabelAlign = obj
      // this.oldData = row
      this.oldData = this.formLabelAlign = row
      this.showEdit = true
    },
    handleDelete (index, row) {
      console.log(index)
      this.topicData.splice(index, 1)
    },
    currentChange (val) {
      this.currentPage = val
    },
    certainEdit () {
      if (!_.isEqual(this.oldData.title, this.formLabelAlign.title) &&
        !_.isEqual(this.oldData.brife, this.formLabelAlign.brife) &&
        !_.isEqual(this.oldData.content, this.formLabelAlign.content)) {
        this.$message.info('没有内容变更哦')
        console.log(_.isEqual(this.oldData.title, this.formLabelAlign.title))
        console.log(_.isEqual(this.oldData.brife, this.formLabelAlign.brife))
        console.log(_.isEqual(this.oldData.content, this.formLabelAlign.content))
      } else {
        this.$message.info('有内容变更哦')
      }
      // if (_.isEqual(this.oldData.brife, this.formLabelAlign.brife)) {
      //   this.$message.info('没有内容变更哦')
      //   console.log(this.oldData.brife)
      //   console.log(this.formLabelAlign.brife)
      //   console.log(this.oldData.brife === this.formLabelAlign.brife)
      // } else {
      //   this.$message.info('有内容变更哦')
      // }
      this.showEdit = false
    },
    cancelEdit () {
      this.showEdit = false
    }
  },
  components: {
    BreadCrumb
  }
}
</script>

<style lang="less" scoped>
.users {
  flex: auto;
  .table {
    padding-top: 20px;
  }
}
.content {
  padding-top: 15px;
  padding-left: 15px;
}
.pages {
  display: flex;
  justify-content: center;
  padding: 15px;
}
.mask {
  display: none;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 9;
  &.show {
    display: block;
  }
  .artical {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 600px;
    height: 500px;
    padding: 10px 30px;
    background: #fff;
    transform: translate(-50%, -50%);
    border-radius: 5px;
    .title {
      padding: 10px;
      margin-bottom: 20px;
      border-bottom: 1px solid #999;
      text-align: center;
    }
    .btn-wrap {
      text-align: right;
    }
  }
}
</style>

