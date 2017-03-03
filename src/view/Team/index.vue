<template>
    <el-row type="flex">
        <el-col :span="6">
            <tree :data="treeData"
                :defaultSelected="defaultSelected"
                @onSelected="onTreeSelected"></tree>
        </el-col>
        <el-col :span="18">
            <navHd :items="navPath"></navHd>
            <childDept :childs="curChilds"></childDept>
            <empList :data="emps"></empList>
        </el-col>
    </el-row>
</template>
<script>
import tree from './tree'
import navHd from './navHd'
import childDept from './childDept'
import empList from './emp'
import { getDepts } from 'src/service/dept'
import { getEmps } from 'src/service/emp'

export default {
    components: {
        tree,
        navHd,
        childDept,
        empList
    },
    data() {
        return {
            defaultSelected: 0,
            navPath: [],
            curChilds: []
        }
    },
    subscriptions() {
        return {
            depts: getDepts(),
            emps: getEmps()
        }
    },
    computed: {
        treeData() {
            if(!this.depts) {
                return []
            }

            const root = this.depts.find(item => !item.pid)
            root.childs = this.formatTreeData(root.uid)
            this.defaultSelected = root.uid
            this.navPath = [root.name, root.name]
            this.curChilds = root.childs
            return [root]
        }
    },
    methods: {
        formatTreeData(pid) {
            let childs = []
            this.depts.forEach(item => {
                if(item.pid === pid) {
                    childs.push(item)
                    item.childs = this.formatTreeData(item.uid)
                }
            })
            return childs
        },
        onTreeSelected(item) {
            this.navPath.splice(1, 1, item.name)
            this.curChilds = item.childs
        }
    }
}
</script>
