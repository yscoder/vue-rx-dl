<template>
    <div id="app">
        <el-radio-group v-model="path" @change="goPath">
            <el-radio-button label="Chat"></el-radio-button>
            <el-radio-button label="Team"></el-radio-button>
        </el-radio-group>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    data() {
        return {
            path: ''
        }
    },
    methods: {
        goPath() {
            this.$router.push(this.path)
        }
    }
}
</script>
