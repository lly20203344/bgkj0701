<template lang="html">
    <div class="search_header">
        <div v-if="!status" class="search_title">
            <span>标题：</span>
            <el-input v-model="obj.title" placeholder="请输入内容"></el-input>
        </div>
        <div v-if="!status" class="search_user">
            <span>用户：</span>
            <el-input v-model="obj.nickName" placeholder="请输入内容"></el-input>
        </div>
        <div class="search_status">
            <span>状态：</span>
            <el-select v-model="obj.status" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.status"
                  :label="item.label"
                  :value="item.status">
                </el-option>
            </el-select>
        </div>
        <div class="search_btn">
            <el-button type="primary" @click="handleSearch">查询</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            obj: {
                title: "",
                nickName: "",
                status: ""
            },
            options: [
                {
                    status: '',
                    label: "全部"
                },
                {
                    status: 'init',
                    label: "待审核"
                },
                {
                    status: 'pass',
                    label: "通过"
                },
                {
                    status: 'reject',
                    label: "未通过"
                }
            ]
        }
    },
    props:['status'],
    methods: {
        handleSearch() {
            this.$emit("parentSearch", this.obj)
        }
    }
}
</script>

<style lang="scss">
    .search_header {
        .search_title, .search_user, .search_status,  {
            display: inline-block;
            width: 30%;
            font-size: 14px;
            .el-input {
                display: inline-block;
                width: 80%;
            }
        }
        .search_status {
            width: 20%;
            .el-select {
                width: 80%;
            }
        }
        .search_btn {
            display: inline-block;
        }
    }
</style>
