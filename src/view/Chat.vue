<template>
    <chat :list="data" @on-send="sendMsg"></chat>
</template>
<script>
import chat from 'components/chat'
import { getData, send } from '../service/chat'
export default {
    components: {
        chat
    },
    methods: {
        sendMsg(msg) {
            console.log('[RX]: send ', msg)
            send(msg)
        }
    },
    subscriptions() {
        return {
            data: getData()
        }
    }
}
</script>
