<template>
  <el-container style="border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <KnowledgeMenu></KnowledgeMenu>
    </el-aside>

    <el-container>
      <el-main>
        <el-table :data="tableData">
          <el-table-column prop="date" label="日期" width="140" />
          <el-table-column prop="name" label="姓名" width="120" />
          <el-table-column prop="address" label="地址" />
        </el-table>
      </el-main>
    </el-container>
  </el-container>
</template>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
    padding: 0;
    margin-bottom: 0;
    border-right: 1px solid #ddd;
    border-radius: 0;
  }

  .app-main{
    padding: 5px;
  }
</style>

<script>
import KnowledgeMenu from './menu'
import { listKnowledge, createKnowledge, deleteKnowledge } from '@/api/knowledge'
export default {
  components: { KnowledgeMenu },
  data() {
    const item = {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    }
    return {
      tableData: Array(20).fill(item)
    }
  },
  methods: {}
}
</script>
