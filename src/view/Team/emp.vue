<template>
    <div>
        <h2>部门人员</h2>
        <div>
            <el-button type="primary" @click="addEmp">添加成员</el-button>
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
    </div>
</template>
<script>
export default {
    props: {
        data: Array
    },
    data() {
        return {
            selections: []
        }
    },
    methods: {
        selectionChange(val) {
            this.selections = val
        },
        updateDept() {

        },
        deleteAll() {
            if(this.selections.length) {
                this.$emit('delete', this.selections.map(item => item.id))
            }
        },
        addEmp() {

        }
    }
}
</script>
