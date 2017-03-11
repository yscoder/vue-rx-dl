<template>
    <div id="app">
        <el-radio-group v-model="path" @change="goPath">
            <el-radio-button label="Chat"></el-radio-button>
            <el-radio-button label="team">常规</el-radio-button>
            <el-radio-button label="task">聚合</el-radio-button>
        </el-radio-group>
        <span>登录用户：{{loginUser.name}}</span>
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
    computed: {
        loginUser() {
            return this.$store.getters.loginUser
        }
    },
    methods: {
        goPath() {
            this.$router.push(this.path)
        }
    }
}
</script>
