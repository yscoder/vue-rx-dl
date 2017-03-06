<template>
    <el-form label-width="80px">
        <h2>聚合</h2>
        <el-form-item label="名称">
            {{task.name}}
        </el-form-item>
        <el-form-item label="成员">
           <el-tag v-for="item in task.members">{{item.name}}</el-tag>
        </el-form-item>
    </el-form>
</template>
<script>
export default {
    props: {
        task: Object
    }
}
</script>
