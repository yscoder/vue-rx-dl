<template>
    <div>
        <emp v-if="empList" :data="empList" @disabledEmp="disabledEmp" @editEmp="editEmp"></emp>
        <task v-if="task" :task="task"></task>
    </div>
</template>
<script>
import emp from './emp'
import task from './task'

export default {
    components: {
        emp,
        task
    },
    data() {
        return {
            taskId: 123454
        }
    },
    computed: {
        empList() {
            return this.$store.state.userList.filter(u => u.enabled)
        },
        task() {
            return this.$store.getters.task
        }
    },
    methods: {
        disabledEmp(id) {
            this.$store.dispatch('updateUser', {
                id,
                enabled: false
            })
        },
        editEmp(emp) {
            this.$store.dispatch('updateUser', emp)
        }
    },
    created() {
        this.$store.dispatch('getUsers')
        this.$store.dispatch('getTask', this.taskId)
    }
}
</script>
