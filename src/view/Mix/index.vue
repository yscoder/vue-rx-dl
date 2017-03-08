<template>
    <div>
        <emp v-if="empList" :data="empList" @disabledEmp="disabledEmp"></emp>
        <task v-if="task" :task="task"></task>
    </div>
</template>
<script>
import emp from './emp'
import task from './task'
import { getTask, getEmps, updateEmp } from 'src/service2/task'

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
    subscriptions() {
        return {
            empList: getEmps(),
            task: getTask(this.taskId)
        }
    },
    methods: {
        disabledEmp(id) {
            updateEmp(id, {
                enabled: false
            })
        }
    }
}
</script>
