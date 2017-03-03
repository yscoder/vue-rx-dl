<template>
    <div>
        <h2>{{items[0]}} <el-button>修改名称</el-button></h2>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="name in items">{{name}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>
<script>
export default {
    props: {
        items: Array
    }
}
</script>
