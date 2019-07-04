<template>
    <div class="contain-edit">
        <div class="header">
            <p>报警限管理</p>
        </div>
        <div class="table-content">
            <el-table :data="warnInfo" style="width: 100%;text-align:center" :border='true'>
                <el-table-column label="参数">
                    <template slot-scope="scope">
                        <span>{{scope.row.alarmType | typeTransfer}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="成人">
                    <template slot-scope="scope" prop="adult">
                        <input type="number" maxlength="10" v-model="scope.row.adult" @blur="blurValidate" class="warnval-input"/>
                    </template>
                </el-table-column>
                <el-table-column  label="儿童">
                    <template  slot-scope="scope" prop="children">
                        <input type="number" maxlength="10" v-model="scope.row.children" @blur="blurValidate" class="warnval-input"/>
                    </template>
                </el-table-column>
                <el-table-column  label="新生儿">
                    <template  slot-scope="scope" prop="newborn">
                        <input type="number" maxlength="10" v-model="scope.row.newborn" @blur="blurValidate" class="warnval-input"/>
                    </template>
                </el-table-column>
            </el-table> 
        </div>
        
        <el-button type="primary" @click="saveWarnInfo">保存</el-button>
    </div>
</template>

<script>
let CONSTANT = require('../../constant/constant.js');
let common = require("../../common.js");
let echarts = require('echarts');
export default {
    data() {
        return {
           warnInfo: [],
           measureCate: 0,
           submitLock: false,
        }
    },
    mounted() {
        this.userId  = this.$router.currentRoute.query.userId;
        this.getWarnInfo();
    },
    methods: {
        handleSelectionChange (val) {},
        getWarnInfo () {
            let url = CONSTANT.URL.ALARM.FINDPAGE;
            let dataForm = {}
            let param = {};
            param = JSON.stringify(param);
            common.requestAjax(url, param, dataForm, (res)=>{
                let data = res.data.bussData;
                console.log(data);
                this.warnInfo = data;
            });
        },
        blurValidate(e) {
            console.log(this.warnInfo);
            let inputValue = e.target.value;
            if (!inputValue) {
                this.$message.error('数值不能为空');
                this.submitLock = true;
            }
            if (inputValue < 0) {
                this.$message.error('数值不能小于0');
                this.submitLock = true;
            }

        },
        saveWarnInfo () {
            let arr = [],
                warnInfo = this.warnInfo;
            warnInfo.forEach((e, i) => {
                console.log(e.adult < 0);
                if (!this.submitLock) this.submitLock = !e.adult || !e.children || !e.newborn || e.adult < 0 || e.children < 0 || e.newborn < 0 || false;
                let obj = {
                    'id': e.id,
                    'alarmType': e.alarmType,
                    'adult': e.adult,
                    'children': e.children,
                    'newborn': e.newborn,
                };
                arr.push(obj);
            });
            console.log(this.submitLock);
            if (this.submitLock) {
                this.$message.error('存在数值不合法，无法提交');
                return
            }
            let url = CONSTANT.URL.ALARM.SAVEALARM,
                param = JSON.stringify({list: arr}),
                dataForm = {};
            common.requestAjax(url,param,dataForm,(res)=>{
            });
        }
    },
    filters:{
         typeTransfer (val) {
            switch (val) {
                case 'HEART_RATE_MINI':
                    return '心律报警低限'
                case 'HEART_RATE_MAX':
                    return '心律报警高限'
                case 'BLOOD_OXYGEN_MINI':
                    return '血氧报警低限'
                case 'BLOOD_OXYGEN_MAX':
                    return '血氧报警高限'
                case 'BREATHING_RATE_MINI':
                    return '呼吸率报警低限'
                case 'BREATHING_RATE_MAX':
                    return '呼吸率报警高限'
                case 'SYSTOLIC_BLOOD_PRESSURE_MINI':
                    return '收缩压报警低限'
                case 'SYSTOLIC_BLOOD_PRESSURE_MAX':
                    return '收缩压报警高限'
                case 'DIASTOLIC_PRESSURE_MINI':
                    return '舒张压报警低限'
                case 'DIASTOLIC_PRESSURE_MAX':
                    return '舒张压报警高限'
                case 'AVERAGE_PRESSURE_MINI':
                    return '平均压报警高限'
                case 'AVERAGE_PRESSURE_MAX':
                    return '平均压报警低限'
                case 'BODY_TEMPERATURE_MINI':
                    return '体温报警高限'
                case 'BODY_TEMPERATURE_MAX':
                    return '体温报警低限'
                case 'PULSE_FREQUENCY_MINI':
                    return '脉率报警高限'
                case 'PULSE_FREQUENCY_MAX':
                    return '脉率报警低限'
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
    .warnval-input {-webkit-appearance: none;background-color: #fff;background-image: none;border-radius: 4px;border: 1px solid #dcdfe6;-webkit-box-sizing: border-box;box-sizing: border-box;color: #606266;display: inline-block;font-size: inherit;height: 40px;line-height: 40px;outline: 0;padding: 0 15px;-webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);transition: border-color .2s cubic-bezier(.645,.045,.355,1);width: 100%;}

</style>

    
