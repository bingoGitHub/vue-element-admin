<template>
  <el-tree
    :data="treeData"
    node-key="id"
    default-expand-all
    draggable
    :expand-on-click-node="false"
    :allow-drop="allowDrop"
    :allow-drag="allowDrag"
    @node-drag-start="handleDragStart"
    @node-drag-enter="handleDragEnter"
    @node-drag-leave="handleDragLeave"
    @node-drag-over="handleDragOver"
    @node-drag-end="handleDragEnd"
    @node-drop="handleDrop"
  >
    <span slot-scope="{ node, data }" class="custom-tree-node">
      <span>
        <el-input
          v-if="data.isNew"
          :ref="data.id"
          v-model="data.label"
          size="mini"
          placeholder="名称"
          @blur="addType(node, data)"
        />
        <span v-else>{{ data.label }}</span>
      </span>
      <span>
        <el-button
          type="text"
          size="mini"
          @click="append(node,data)"
        >
          +
        </el-button>
        <el-button
          type="text"
          size="mini"
          @click="remove(node, data)"
        >
          -
        </el-button>
      </span>
    </span>
  </el-tree>
</template>
<style scoped>
  .el-tree{
    height: 100%;
  }

  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>
<script>
import { listKnowledgeType, createKnowledgeType, deleteKnowledgeType } from '@/api/knowledge'
export default {
  name: 'KnowledgeMenu',
  data() {
    const treeData = []
    return {
      treeData: treeData
    }
  },
  methods: {
    append(node, data) {
      const newChild = { id: new Date().getTime(), label: '', children: [], isNew: true }
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      data.children.push(newChild)
      const _this = this
      _this.$nextTick(function() {
        _this.$refs[newChild.id].focus()
      })
    },
    async remove(node, data) {
      if (node.children && node.children.length > 0) {
        this.$message({
          message: '请先删除子节点的数据',
          type: 'error'
        })
        return
      }

      await deleteKnowledgeType(data.id)
      this.$message({
        message: '删除类型成功',
        type: 'success'
      })

      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
    },
    handleDragStart(node, ev) {
      console.log('drag start', node)
    },
    handleDragEnter(draggingNode, dropNode, ev) {
      console.log('tree drag enter: ', dropNode.label)
    },
    handleDragLeave(draggingNode, dropNode, ev) {
      console.log('tree drag leave: ', dropNode.label)
    },
    handleDragOver(draggingNode, dropNode, ev) {
      console.log('tree drag over: ', dropNode.label)
    },
    handleDragEnd(draggingNode, dropNode, dropType, ev) {
      console.log('tree drag end: ', dropNode && dropNode.label, dropType)
    },
    handleDrop(draggingNode, dropNode, dropType, ev) {
      console.log(this.treeData)
      console.log('tree drop: ', dropNode.label, dropType)
    },
    allowDrop(draggingNode, dropNode, type) {
      if (dropNode.data.label === '二级 3-1') {
        return type !== 'inner'
      } else {
        return true
      }
    },
    allowDrag(draggingNode) {
      return draggingNode.data.label.indexOf('三级 3-2-2') === -1
    },
    async getType() {
      const typeList = await listKnowledgeType()
      this.treeData = this.transformTreeData(typeList.data)
    },
    transformTreeData(data) {
      const treeData = []
      data.forEach(item => {
        if (item.parent_type_id === '-1') {
          item.label = item.name
          item.children = this.getTreeDataChild(data, item.id)
          treeData.push(item)
        }
      })
      return treeData
    },
    getTreeDataChild(data, parentId) {
      const child = []
      data.forEach(item => {
        if (item.parent_type_id === parentId) {
          item.label = item.name
          item.children = this.getTreeDataChild(data, item.id)
          child.push(item)
        }
      })
      return child
    },
    async addType(node, data) {
      if (data.label) {
        data.isNew = false
        const param = {
          'parent_type_id': node.parent.data.id + '',
          'name': data.label,
          'idx': 0
        }
        await createKnowledgeType(param)
        this.$message({
          message: '添加类型成功',
          type: 'success'
        })
        this.getType()
      } else {
        debugger
        // delete data
      }
    }
  },
  created() {
    this.getType()
  }
}
</script>
