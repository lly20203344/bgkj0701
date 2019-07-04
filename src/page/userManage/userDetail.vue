<template>
    <div class="contain-edit">
        <div class="input_modal">
            <el-button class="link" type="primary">
                    <router-link to="/" style="color: #fff;">返回</router-link>
            </el-button>
        </div>
        <div class="main">
            <div class="list">
                <div class="title">用户详情</div>
                <div class="item">
                    <div class="item-key">用户姓名:</div>
                    <div class="item-value">{{ info.name }}</div>
                </div>
                 <div class="item">
                    <div class="item-key">竞赛积分数:</div>
                    <div class="item-value">{{ info.fakePoint }}</div>
                </div>
                 <div class="item">
                    <div class="item-key">三九内经:</div>
                    <div class="item-value">{{ info.truePoint }}</div>
                </div>
                <!-- <div class="item">
                    <div class="item-key">金币:</div>
                    <div class="item-value">{{ info.gardenGold }}</div>
                </div> -->
                <!-- <div class="item">
                    <div class="item-key">钻石数:</div>
                    <div class="item-value">{{ info.gardenDiamond }}</div>
                </div>
                <div class="item">
                    <div class="item-key">绑定手机:</div>
                    <div class="item-value" v-if="info.gardenMobile">{{ info.gardenMobile }}</div>
                    <div class="item-value" v-else>没有绑定手机</div>
                </div>
                <div class="item">
                    <div class="item-key">常用地址:</div>
                    <div class="item-value" v-if="info.gardenAddress && !!info.gardenAddress.length" ><span v-for="item in info.gardenAddress" :key="item.address">{{ item.province_name }}{{ item.area_name }}{{ item.city_name }}{{ item.address }}</span></div>
                    <div class="item-value" v-else>没有绑定地址</div>
                </div>
                -->
                <!-- <div class="item" style="height:160px;">
                    <div class="item-left" style="height:160px;">背包物品:</div>
                    <div class="item-value">
                        <span style="width:100px; height:40px; display:inline-block; margin-right: 10px;" v-for="item in backPack" :key="item.name">
                            {{item.name}}X{{item.quantity}}
                        </span>
                    </div>
                </div> -->
                <div class="item" style="width:auto; height:auto;">
                    <div class="item-left" style="height:auto; border-right: none;">对战信息:</div>
                    <div style="margin-left: 151px; height:auto;">
                        <el-table :data="tableData" border style="width: 100%">
                            <el-table-column prop="id" label="对战编号"></el-table-column>
                            <el-table-column prop="starttime" label="对战时间"></el-table-column>
                            <el-table-column prop="address" label="对战玩家">
                                <template slot-scope="scope">
                                    <span v-for="value in scope.row.players" :key="value.id" style="margin-left:20px;">{{value.nickname}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="winner" label="胜方"></el-table-column>
                            <el-table-column prop="" label="操作">
                                <template slot-scope="scope">
                                    <el-button type="text" size="mini" @click="linkToEdit(scope.row.id)">查看详情</el-button>
                                </template>
                            </el-table-column>
                        </el-table> 
                    </div>
                </div>
                <div class="item item-pic" style="height: 550px;">
                    <div class="item-key" style="height: 550px;">能力分析:</div>
                    <div class="analyse" >
                        <div class="pic" >
                            <span class="pic-font">能力雷达图</span>
                            <div id='chart' style=""></div>
                            <div class="avatar-info">
                                <div class="avatar">
                                    <!-- <img v-if="info.headimgurl" :src="info.headimgurl" alt="" class="avatar-img"> -->
                                    <img src="../../images/headImg.png" alt="" class="avatar-img">
                                </div>
                                <div class="info">
                                    <span>{{evaluation}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="wins">
                            <span class="pic-font"> 比赛胜率</span>
                            <ul class="match">
                                <li class="match-item">
                                    <div style="display: inline-block">
                                        <span style="display: block; line-height: 25px;">成长赛</span>
                                        <span style="font-size: 14px;">{{matchGame.totalCount}}场</span>
                                    </div>
                                    <div style="display: inline-block; margin-left:10px;">
                                        <span>
                                            <progress :value="matchGame.winCount" :max="matchGame.totalCount" style="line-height: 50px;"></progress>
                                        </span>
                                        <div style="font-size: 14px;" v-if="matchGame" >胜{{parseInt(matchGame.winCount/matchGame.totalCount*100)}}%，{{matchGame.totalCount}}场</div>
                                        <div style="font-size: 14px;" v-else >胜0%，0场</div>
                                    </div>
                                </li>
                                <li class="match-item">
                                    <div style="display: inline-block">
                                        <span style="display: block; line-height: 25px;">好友赛</span>
                                        <span style="font-size: 14px;">{{friendGame.totalCount}}场</span>
                                    </div>
                                    <div style="display: inline-block; margin-left:10px;">
                                        <span>
                                            <progress :value="friendGame.winCount" :max="friendGame.totalCount" style="line-height: 50px;"></progress>
                                        </span>
                                        <div style="font-size: 14px;" v-if="!!friendGame && !!friendGame.winCount">胜{{parseInt(friendGame.winCount/friendGame.totalCount*100)}}%，{{friendGame.totalCount}}场</div>
                                        <div style="font-size: 14px;" v-else>胜0%，0场</div>
                                    </div>
                                </li>
                                <li class="match-item">
                                    <div style="display: inline-block">
                                        <span style="display: block; line-height: 25px;">锦标赛</span>
                                        <span style="font-size: 14px;">0场</span>
                                    </div>
                                    <div style="display: inline-block; margin-left:10px;">
                                        <span>
                                            <progress value="0" max="100" style="line-height: 50px;"></progress>
                                        </span>
                                        <div style="font-size: 14px;">胜0%，0场</div>
                                    </div>
                                </li>
                            </ul>
                            <span class="pic-font">个人荣誉</span>
                            <div>
                                <ul class="match">
                                    <li class="honor"><img class="honor-img" src="../../images/trophy.png" alt=""><span class="honor-span">0</span><span class="honor-text">十六强次数</span></li>
                                    <li class="honor"><img class="honor-img" src="../../images/trophy.png" alt=""><span class="honor-span">0</span><span class="honor-text">八强次数</span></li>
                                    <li class="honor"><img class="honor-img" src="../../images/trophy.png" alt=""><span class="honor-span">0</span><span class="honor-text">决赛场次</span></li>
                                    <li class="honor"><img class="honor-img" src="../../images/trophy.png" alt=""><span class="honor-span">0</span><span class="honor-text">冠军次数</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
           </div>
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
           id:'',
           info:'',
           backPack:[], // 背包物品
           address:'',
           tableData:[],
           evaluation:{}, // 头像部分
           gameDistrib:[], // 比赛胜率
           friendGame:{
               
           },  // 好友赛
           matchGame:{
               
           },  //成长赛
           answerDistrib:[], // 雷达图数据
        }
    },
    mounted() {
        this.userId  = this.$router.currentRoute.query.userId;
        this.getDetail(); 
    },
    methods: {
        getDetail(){
           let url = CONSTANT.URL.USER.FINDDETAIL;
           let param = {
               id:this.userId
           } ;
           common.requestAjax(url,param,null,(res)=>{
                let data = res.data.bussData;
                this.info = data;
                
                // 背包物品
                if(!!data.gardenBackpack.length){
                    for(let i = 0; i < data.gardenBackpack.length; i++){
                        let Obj = {};
                        Obj.name = data.gardenBackpack[i].name;
                        Obj.quantity = data.gardenBackpack[i].quantity;
                        this.backPack.push(Obj);
                    }
                }
                // this.backPack = data.gardenBackpack
                if(!!data.gardenAddress.length){
                    this.address = data.gardenAddress[0].address;
                }
                
                this.tableData = data.recentGames;
                // 头像部分
                this.evaluation = data.evaluation;
                // 比赛胜率
                this.gameDistrib = data.gameDistrib;
                // console.log('比赛胜率',data.gameDistrib);
                // console.log('比赛胜率数组长度',!!this.gameDistrib.length);
                if(!this.gameDistrib.length){
                    this.friendGame = 0;
                    this.matchGame = 0;
                }else{
                    for(let i = 0; i<this.gameDistrib.length;i++){
                        if(this.gameDistrib[i].category == 'FRIEND'){
                            // 好友赛
                            this.friendGame.totalCount = this.gameDistrib[i].totalCount;
                            this.friendGame.winCount = this.gameDistrib[i].winCount;
                        }
                        if(this.gameDistrib[i].category == 'MATCH'){
                            // 成长赛
                            this.matchGame.totalCount = this.gameDistrib[i].totalCount;
                            this.matchGame.winCount = this.gameDistrib[i].winCount;
                        }
                }
                }
                console.log('好友赛',this.friendGame);
                console.log('成长赛',this.matchGame);
                
                //雷达图数据
                // this.answerDistrib
                let answerDistrib = data.answerDistrib;
                // console.log('雷达图数据',answerDistrib);
                let option_value = [];
                for(let i = 0;i < answerDistrib.length;i++){
                    let count = (answerDistrib[i].winCount / answerDistrib[i].totalCount *100).toFixed(2);
                    option_value.push(count);
                }
                // console.log('填充雷达图的数据',option_value);
                // console.log('获取详情',data);

                // let option_value = [10,20,30,40,50,60];
                let option = this.getChart(option_value);
                let myChart = echarts.init(document.getElementById('chart')); // 绘制图表
                myChart.setOption(option);
           }) 
        },  
        getChart(option_value){
            let option = {
                tooltip: {},
                radar: {
                    shape: 'circle',
                    name: {
                        textStyle: {
                            color: '#fff',
                            backgroundColor: '#999',
                            borderRadius: 3,
                            padding: [3, 5]
                    }
                    },
                    indicator: [
                    
                    { name: '文艺', max: 100},
                    { name: '文科', max: 100},
                    { name: '理科', max: 100},
                    { name: '生活', max: 100},
                    { name: '流行', max: 100},
                    { name: '娱乐', max: 100},
                    ]
                    // indicator: this.indicator
                },
                series: [{
                    name: '能力分析',
                    type: 'radar',
                    data :[
                        { value:option_value}
                    ]
                }]
            };
           
            return option;
        },
        linkToEdit(id){
            this.$router.push({path:'/versusDetail',query:{'id':id}}); 
            // this.$router.push({path:'/test',query:{'id':id}});
        }
    },
    filters:{
         
       
    }
}
</script>
<style lang="scss">
    .item-left {
        float: left;
        width: 120px;
        padding-left: 20px;
        padding-right: 10px;
        // height: 40px;
        line-height: 40px;
        text-align: right;
        border-right: 1px solid #dedede;
    }
    .item-right {
        // height: 40px;
        // line-height: 40px;
        padding-left: 20px;
        float: left;
    }
    .backage {
        height: auto;
        border: 1px solid #dedede;
        border-top: none;
    }
    .analyse{
        margin-left: 151px;
        height:530px; 
        padding-top: 20px; 
        display: flex;
    }
    .pic{
        width:330px; 
        height:530px;
        // background-color:yellowgreen;
        display: inline-block;
        margin-right: 30px;
        padding-left: 20px;
        .avatar-info{
            .avatar{
                width:100px;
                height:100px;
                background-color:#626262;
                margin-top:50px;
                border-radius:50%;
                float:left;
                .avatar-img{
                    width: 100%;
                    height: 100%;
                }
            }
            .info{
                // float:left;
                // margin-top:50px;
                margin-left:10px;
                padding: 60px 20px;
            }
        }
    }
    .pic-font{
            border-left: 5px solid #999;
            width: 100px;
            height: 40px;
            line-height: 40px;
            // background-color: pink;
            // margin-left: 15px;
            margin-bottom: 15px;
            display: block;
            padding-left: 20px;
            text-align: left;
        }
    .wins{
        display: inline-block;
        height: 350px;
        flex: 1;
    }
    .match{
        list-style:none; 
        padding-left:20px; 
        margin-top:20px;
        .match-item{
            width: 300px; 
            height:50px; 
            background-color: #eee; 
            margin-bottom:30px;
        }
    }
    #chart{
        width:300px;
        height:300px;
    }
    .honor {
        float: left;
        width: 150px;
        height: 150px;
        margin-right: 20px;
        // background-color: yellow;
        .honor-img{
            width: 70px;
            height: 70px;
            padding: 30px 40px 0px 40px;
        }
        .honor-span{
            width: 40px;
            height: 20px;
            border: 1px solid #ccc;
            display: block;
            margin-left: 55px;
            text-align: center;
            line-height: 20px;
        }
        .honor-text{
            display: block;
            text-align: center;
            font-size: 14px;
        }
    }
   
</style>

    
