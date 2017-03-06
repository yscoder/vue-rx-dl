<template>
    <div>
        <emp :data="empList"></emp>
        <task :task="task" v-if="task"></task>
    </div>
</template>
<script>
import emp from './emp'
import task from './task'
import { getTask, getEmps } from 'src/service2/task'

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
    }
}
</script>
