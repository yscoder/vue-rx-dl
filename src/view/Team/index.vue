<template>
    <el-row type="flex">
        <el-col :span="6">
            <tree :data="treeData"
                :defaultSelected="defaultSelected"
                @onSelected="onTreeSelected"></tree>
        </el-col>
        <el-col :span="18">
            <navHd :items="navPath" @updateTeam="updateTeamHandle"></navHd>
            <childDept :childs="curChilds" @addDept="addDeptHandle"></childDept>
            <empList :data="filterEmps" @delete="deleteMult"></empList>
        </el-col>
    </el-row>
</template>
<script>
import tree from './tree'
import navHd from './navHd'
import childDept from './childDept'
import empList from './emp'
import { getDepts, addDept } from 'src/service/dept'
import { getEmps, deleteEmp } from 'src/service/emp'
import { getTeam, updateTeam } from 'src/service/team'
import _ from 'lodash'

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
            // curChilds: [],
            curDept: []
        }
    },
    subscriptions() {
        return {
            depts: getDepts(),
            emps: getEmps(),
            team: getTeam()
        }
    },
    computed: {
        treeData() {
            if(!this.depts || !this.team) {
                return []
            }

            const root = _.clone(this.team)
            root.childs = this.formatTreeData()
            this.curDept = root
            this.defaultSelected = root.uid
            this.navPath = [root.name, root.name]
            return [root]
        },
        checkRoot() {
            return this.defaultSelected === this.team.uid
        },
        curChilds() {
            return this.curDept.childs || []
        },
        filterEmps() {
            if(!this.emps || !this.curDept || !this.team) {
                return []
            }

            let deptIdArr = this.deepMapId(this.curDept)
            return this.emps.filter(emp => emp.enabled && (this.checkRoot || _.includes(deptIdArr, emp.deptId)))
        }
    },
    methods: {
        formatTreeData(pid) {
            let childs = []
            this.depts.forEach(item => {
                if((!pid && !item.pid) || item.pid === pid) {
                    childs.push(item)
                    item.childs = this.formatTreeData(item.uid)
                }
            })
            return childs
        },
        deepMapId(item) {
            let arr = [item.uid]
            if(item.childs) {
                item.childs.forEach(n => {
                    arr = arr.concat(this.deepMapId(n))
                })
            }
            return arr
        },
        onTreeSelected(item) {
            this.curDept = item
            this.defaultSelected = item.uid
            this.navPath.splice(1, 1, item.name)
        },
        updateTeamHandle(name) {
            updateTeam(this.team.uid, { name })
        },
        addDeptHandle(name) {
            const pid = this.defaultSelected
            addDept(Object.assign({ name }, this.checkRoot ? {} : { pid }))
                .then(dept => {
                    this.defaultSelected = pid
                })
        },
        deleteMult(idArr) {
            deleteEmp(idArr).then(msg => {

            })
        }
    }
}
</script>
