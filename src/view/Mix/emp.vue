<template>
    <el-table border :data="data" style="width: 100%">
        <el-table-column prop="id" label="工号">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="120">
        </el-table-column>
        <el-table-column prop="tel" label="电话">
        </el-table-column>
        <el-table-column label="操作" width="80">
            <template scope="scope">
                <el-button @click="handleDel" type="text" size="small">删除</el-button>
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
        handleDel() {
            console.log(arguments)
        }
    }
}
</script>
