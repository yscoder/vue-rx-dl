<template>
    <el-tree default-expand-all
        highlight-current
        :data="data"
        :expand-on-click-node="false"
        :props="defaultProps"
        node-key="uid"
        :current-node-key="defaultSelected"
        @current-change="onChange">
    </el-tree>
</template>
<script>
export default {
    props: {
        data: Array,
        defaultSelected: Number
    },
    data() {
        return {
            defaultProps: {
                children: 'childs',
                label: 'name'
            }
        }
    },
    methods: {
        onChange(item, el) {
            this.$emit('onSelected', item)
        }
    }
}
</script>
