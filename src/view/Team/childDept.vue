<template>
    <div>
        <h2>下级部门</h2>
        <el-button @click="add">添加部门</el-button>
        <ul>
            <li v-for="item in childs">{{item.name}}</li>
        </ul>
    </div>
</template>
<script>
export default {
    props: {
        childs: Array
    },
    methods: {
        add() {
            this.$prompt('请输入新部门名称', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(({ value }) => {
                if(value && value.trim()) {
                    this.$emit('addDept', value)
                }
            }).catch(e => {})
        }
    }
}
</script>
