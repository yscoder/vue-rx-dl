<template>
    <div>
        <h2>{{items[0]}} <el-button @click="update">修改名称</el-button></h2>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="name in items">{{name}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>
<script>
export default {
    props: {
        items: Array
    },
    methods: {
        update() {
            this.$prompt('请输入团队名称', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(({ value }) => {
                if(value && value.trim()) {
                    this.$emit('updateTeam', value)
                }
            }).catch(e => {})
        }
    }
}
</script>
