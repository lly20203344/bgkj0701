<template>
    <div class="contain">
        <div class="input_modal">
            <div class="input-item">
                <span>测量类型：</span>
                <el-select v-model='measureCate' placeholder='-请选择-' @change="changeCategory">
                    <el-option v-for="item in measureCateList"   :key="item.value"   :label="item.label"  :value="item.value"></el-option>
                </el-select>
            </div>
            <div class="input-item">
                <span>测量日期：</span>
                <el-date-picker
                    v-model="dateValue"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </div>
            <el-button type="primary" @click="getDetail">查询</el-button>
            <el-button class="link" type="primary">
                <router-link to="/" style="color: #fff;">返回</router-link>
            </el-button>
        </div>
        <div class="table-content">
            <el-table :data="tableData" style="width: 100%;text-align:center" :border='true' @selection-change="handleSelectionChange">
                <el-table-column label="姓名">
                    <template slot-scope="scope">
                        <span>{{scope.row.realName || '未填写'}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="测量类型">
                    <template slot-scope="scope">
                        <span>{{scope.row.measureType | measureTypeFilter}}</span>
                    </template>
                </el-table-column>
                <el-table-column  label="测量时间">
                    <template  slot-scope="scope">
                        {{scope.row.gmtCreated | timeFormater}}
                    </template>
                </el-table-column>
                <el-table-column  label="测量数值">
                    <template  slot-scope="scope">
                        <span v-if="scope.row.measureValue1" class="{{}}">{{scope.row.measureValue1}}</span>
                        <span v-if="scope.row.measureValue2" class="{{}}">、{{scope.row.measureValue2}}</span>
                    </template>
                </el-table-column>
                <el-table-column  label="情况">
                    <template  slot-scope="scope">
                        <span :class="scope.row.statusClass">{{scope.row.modifier}}</span>
                    </template>
                </el-table-column>
            </el-table> 
        </div>
        <div class="pagination">
            <el-pagination   @size-change="handleSizeChange"  @current-change="handleCurrentChange"
                :current-page.sync="pageIndex"              
                :page-size="pageSize"   
                :page-sizes='[10,20,30,40]'    
                layout="sizes, prev, pager, next"
                :total="totalCount">
            </el-pagination>
        </div>
    </div>
</template>

<script>
let CONSTANT = require('../../constant/constant.js');
let common = require("../../common.js");
let echarts = require('echarts');
export default {
    data() {
        return {
           measureCateList: [
                {value: HEART_RATE, label: "心电"},
                {value: BLOOD_OXYGEN, label: "血氧"},
                {value: BREATHING_RATE, label: "呼吸"},
                {value: BLOOD_PRESSURE, label: "血压"},
                {value: BODY_TEMPERATURE, label: "血氧"},
                {value: BLOOD_SUGAR, label: "血糖"},
                {value: WEIGHT, label: "体重"},
                {value: SLEEP, label: "睡眠"}
            ],
           dateValue: [],
           info: [],
           pageIndex: 1,
           pageSize: 10,
           totalCount: 0,
           measureCate: 0,
        }
    },
    mounted() {
        this.userId  = this.$router.currentRoute.query.userId;
        this.getDetail();
    },
    methods: {
        handleSizeChange (val) {
            this.pageSize= val;
            this.getDetail();
        },
        handleCurrentChange (val) {
            this.pageIndex = val;
            this.getDetail();
        },
        handleSelectionChange (val) {},
        getDetail () {
            let url = CONSTANT.URL.MEASURE.FINDMEASUREBYPAGE;
            let dataForm = {
                pageIndex: this.pageIndex,
                pageSize: this.pageSize
            }
            let param = {
                // userId: this.userId
            };
            param = JSON.stringify(param);
            common.requestAjax(url, param, dataForm, (res)=>{
                let data = res.data.bussData,
                    info = [];
                this.totalCount = data.pageCount * this.pageSize;
            });
        },
        changeCategory () {

        }
    },
    filters:{
         measureTypeFilter (val) {
            switch (val) {
                case 'HEART_RATE':
                    return '心电'
                case 'BLOOD_OXYGEN':
                    return '血氧'
                case 'BREATHING_RATE':
                    return '呼吸'
                case 'BLOOD_PRESSURE':
                    return '血压'
                case 'BODY_TEMPERATURE':
                    return '血氧'
                case 'BLOOD_SUGAR':
                    return '血糖'
                case 'SLEEP':
                    return '睡眠'
                case 'WEIGHT':
                    return '体重'
            }
         },
         timeFormater (val) {
            let time = newDate(val),
            year = time.getFullYear(),
            month = time.getMonth() + 1,
            day = time.getDate(),
            hour = time.getHours(),
            minute = time.getMinutes(),
            second = time.getSeconds();
            return `${year}-${month}-${day} ${hour}:${minute}:${second}`
         }
    }
}
</script>
<style lang="scss">
    .contain .input_modal .input-item {vertical-align: top;}
    .contain .input_modal .el-button {vertical-align: middle;}
   
</style>

    
