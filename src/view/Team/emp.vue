<template>
    <div>
        <h2>部门人员</h2>
        <div>
            <el-button @click="updateDept">调整部门</el-button>
            <el-button type="danger" @click="deleteAll">批量删除</el-button>
        </div>
        <el-table :data="data" border style="width: 100%" @selection-change="selectionChange">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="id" label="工号">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="tel" label="电话">
            </el-table-column>
        </el-table>
        <el-dialog title="调整部门" v-model="delDeptVisible">
            <el-tree default-expand-all
                :data="treeData"
                :expand-on-click-node="false"
                :props="defaultProps"
                node-key="uid"
                @current-change="onSelectDept">
            </el-tree>
        </el-dialog>
    </div>
</template>
<script>
export default {
    props: {
        data: Array,
        treeData: Array
    },
    data() {
        return {
            selections: [],
            delDeptVisible: false,
            defaultProps: {
                children: 'childs',
                label: 'name'
            }
        }
    },
    methods: {
        selectionChange(val) {
            this.selections = val
        },
        updateDept() {
            this.delDeptVisible = true
        },
        onSelectDept(dept) {
            if(this.selections.length) {
                this.$emit('updateDept', this.selections.filter(item => item.deptId !== dept.uid).map(item => item.id), dept.uid)
            }
            this.delDeptVisible = false
        },
        deleteAll() {
            if(this.selections.length) {
                this.$emit('delete', this.selections.map(item => item.id))
            }
        }
    }
}
</script>
