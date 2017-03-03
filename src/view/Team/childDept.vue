<template>
    <div>
        <h2>下级部门</h2>
        <el-button>添加部门</el-button>
        <ul>
            <li v-for="item in childs">{{item.name}}</li>
        </ul>
    </div>
</template>
<script>
export default {
    props: {
        childs: Array
    }
}
</script>
