<template>
    <el-table border :data="data" style="width: 100%">
        <el-table-column prop="id" label="工号">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="120">
        </el-table-column>
        <el-table-column prop="tel" label="电话">
        </el-table-column>
        <el-table-column label="操作" width="150">
            <template scope="scope">
                <el-button @click="edit(scope)" type="text" size="small">编辑</el-button>
                <el-button @click="handleDel(scope)" type="text" size="small">移除</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>
<script>
export default {
    props: {
        data: Array
    },
    methods: {
        handleDel({row}) {
            this.$emit('disabledEmp', row.id)
        },
        edit({row}) {
            this.$prompt('请输入姓名', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(({ value }) => {
                this.$emit('editEmp', {
                    id: row.id,
                    name: value
                })
            }).catch(err => {
                console.log(err)
            })
        }
    }
}
</script>
