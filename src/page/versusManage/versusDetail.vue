<template>
    <div class="contain-edit">
        <!-- <div class="header">
           <el-button class="link" type="primary">
                <router-link to="/versusLis" style="color: #fff;">返回</router-link>
           </el-button>
        </div> -->
        <div class="input_modal">
           <div class="input-item">
                <el-button class="link" type="primary">
                    <router-link to="/versusLis" style="color: #fff;">返回</router-link>
                </el-button>
            </div>
        </div>
        <div class="main" style="width: 1550px;">
            <div class="list">
                <div class="title">对战详情</div>
                 <div class="item">
                    <div class="item-key">对战编号:</div>
                    <div class="item-value">{{ info.id }}</div>
                </div>
                 <div class="item">
                    <div class="item-key">对战时间:</div>
                    <div class="item-value">{{ info.starttime }}</div>
                </div>
                <div class="item">
                    <div class="item-key">对战玩家:</div>
                    <div class="item-value">
                        <span v-for="items in info.players" :key="items.id">
                            {{items.nickname}}
                        </span>
                    </div>
                </div>
                <!-- <div class="item item-pic">
                    <div class="item-key" style="width:100px;">对战题目及回答结果:</div>
                    <div class="item-value">
                        {{ info.checkContent }}  
                        <section class="imgContent"  v-for = 'item in info.images'  :key = 'item.fileId'>
                            <img  :src="item.fileUrl">
                        </section>
                    </div>
                </div> -->
                <div class="item " style="height: auto; min-height: 100px; display: flex;" >
                    <div class="item-key" style="">对战题目及回答结果:</div>
                    <div class="item-value" style="padding-left:0; height:auto; ">
                        <el-table :data="tableData" border style="width: 100%; margin-top:0;">
                            <el-table-column >
                                <template slot-scope="scope">
                                    <div>
                                        <div>{{scope.row.question.content}}</div>
                                        <div v-for="items in scope.row.question.options" :key="items.id" >
                                            <span>{{items.content}}</span>：
                                            <span>{{items.introduction}}</span>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="starttime" :label="info.players?info.players[0].nickname:''">
                                <template slot-scope="scope">
                                    <div>{{scope.row.playerA.answerOption  | formatStatus}} <span v-if="scope.row.playerA.answerOption != -1">:{{scope.row.playerA.score}}</span></div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="address" :label="info.players?info.players[1].nickname:''">
                                <template slot-scope="scope">
                                    <!-- <span v-for="value in scope.row.players"  style="margin-left:20px;" :key="value.id">{{value.nickname}}</span> -->
                                    <div>{{scope.row.playerB.answerOption | formatStatus}} <span v-if="scope.row.playerB.answerOption != -1">:{{scope.row.playerB.score}}</span></div>
                                </template>
                            </el-table-column>
                            <!-- <el-table-column prop="address" label="操作">
                                <template slot-scope="scope">
                                    <el-button type="text" size="mini" @clic    k="linkToEdit()">查看详情</el-button>
                                </template>
                            </el-table-column> -->
                        </el-table>
                    </div>
                </div>
                <div class="item">
                    <div class="item-key" style="border-right:1px solid #ccc; " >总分:</div>
                    <div class="item-value" style="padding-left:0; box-sizing: border-box; height:40px;">
                        <div class="table-out" style="border:none; margin-left: 0;" ></div>
                        <div class="table-out" >{{scoreA}}分</div> 
                        <div class="table-out" >{{scoreB}}分</div>
                    </div>
                </div>
                <!-- <div class="" style="border-left: 1px solid #ccc; border-right: 1px solid #ccc;flex-direction:column; position:flex;">
                    <div class="" style="width:150xp; border-right:1px solid #ccc; " >总分:</div>
                    <div class="" style="box-sizing: border-box; height:40px; flex:1; ">
                        <div class="" style="border:none; margin-left: 0;" ></div>
                        <div class="" >{{info.players[0].score}}分</div>
                        <div class="" >{{info.players[1].score}}分</div>
                    </div>
                </div> -->
                <div class="item">
                    <div class="item-key" >对战结果:</div>
                    <div class="item-value" style="padding-left:0; box-sizing: border-box; height:40px;">
                        <div class="table-out" style="border:none;" ></div>
                        <div class="table-out" >{{winA}}</div>
                        <div class="table-out" >{{winB}}</div>
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

export default {
    data() {
        return {
           id:'',
           info:'',
           tableData:[],
           scoreA:0,
           scoreB:0,
           winA:'',
           winB:'',
        }
    },
    mounted() {

        this.id  = this.$router.currentRoute.query.id;
    //    let source = this.$router.currentRoute.query.source;
        // console.log('来源',source);
        // this.$router.push({path:'/versusDetail',query:{'id':this.id}});
        // if(source){
        //     this.getDetail(); 
        // }
        this.getDetail(); 
        
    },
    methods: {
       
        getDetail(){
           let url = CONSTANT.URL.VERSUS.FINDDETAIL;
           let param = {
               id:this.id
           } ;
           common.requestAjax(url,param,null,(res)=>{
                let data = res.data.bussData;
                // console.log('详情数据',data);
                this.info = res.data.bussData;
                // this.tableData = data.questions;
                
                
                // 对战题目的数组
                let questions = data.questions;
                // 对战题目玩家答案
                // 如果未答题就退出
                let playerA = data.players[0].answers;
                let playerB = data.players[1].answers;
                if(playerA == undefined){
                    if(data.players[0].score == -1){
                        this.winA = '玩家退出';
                        this.winB = '胜';
                    }
                }
                
                // let playerB = {};
                // if(data.players.length == 2){ // 暂时没有只有一个玩家的情况
                //     playerB = data.players[1].answers;
                // }else{
                //     playerB = {};
                // }
                for(let j = 0; j < playerA.length; j++){
                    // 玩家A的得分
                    this.scoreA += parseInt(playerA[j].score);
                    // console.log('玩家A得分',this.scoreA);
                    // 玩家B的得分
                    this.scoreB += parseInt(playerB[j].score);
                }
                // 遍历所有的问题  
                for(let i = 0; i < questions.length; i++){
                    // tableData 行的数据
                    let tableObj = {};
                    for(let j = 0; j < playerA.length; j++){
                        // 玩家A的得分
                        // this.scoreA += parseInt(playerA[j].score);
                        // console.log('玩家A得分',this.scoreA);
                        // // 玩家B的得分
                        // this.scoreB += parseInt(playerB[j].score);
                        // 玩家的胜负
                        if(this.scoreA > this.scoreB){
                            this.winA = '胜';
                            this.winB = '负';
                        }else{
                            this.winA = '负';
                            this.winB = '胜';
                        }
                        if(questions[i].questionId == playerA[j].questionId){
                            tableObj.question = questions[i].question;
                            tableObj.playerA = playerA[j];
                            tableObj.playerB = playerB[j];
                            this.tableData.push(tableObj);
                            break;
                        }
                    }
                    
                }
                // console.log('拼接的tableData', this.tableData);
           }) 
        },  
    },
    filters:{
        formatStatus(value){
            if(value){
                if(value == -1){
                    return '答题超时'
                }
                else{
                    return value;
                }
            }
            else{ return '--'};
        },
    }
}
</script>
<style lang="scss">
    .item-key {
        float: left;
        width: 150px;
        padding-left: 20px;
        padding-right: 10px;
        // height: 40px;
        line-height: 40px;
        text-align: right;
        border-right: 1px solid #dedede;
    }
    .item-value{
        padding-left: 0;
        // background-color: yellow;
        // margin-left: 180px;
        flex: 1;
    }
    .table-out{
        width: 464px;
        // width: 459px;
        // width: 33.3333333333333%;
        height: 40px; 
        line-height: 40px;
        // padding-left: 30px;
        border-left: 1px solid #ccc; 
        float: left;
        box-sizing: border-box;
        // margin-left: 0;
    }
</style>
