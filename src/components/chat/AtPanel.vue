<template>
    <div class="at-panel-content" @click.stop="touchPanel">
        <el-table ref="multipleTable"
                  :data="tableData"
                  max-height="240"
                  stripe
                  tooltip-effect="dark"
                  @selection-change="handleSelectionChange"
                  style="width: 100%">

            <el-table-column
                    type="selection"
                    width="40">
            </el-table-column>

            <el-table-column
                    label="姓名"
                    width="200">

                <template slot-scope="scope">{{ scope.row.name }}</template>

            </el-table-column>

        </el-table>

        <div style="margin-top: 20px">
            <el-button @click="selectMember">确定</el-button>
        </div>

    </div>


</template>

<script>
    import http from '../../utils/http'


    export default {
        name: "at-panel",

        props:{
           teamId:{
               type:String,
               required:true
           }
        },

        data() {
            return {
                tableData:[],
                chooseAtMemberList:[] ,
            }
        },

        methods: {
            touchPanel(){
              //empty implement
                console.log("---touchPanel----");

            },

            getAllTeamMemberInfo() {
                let url = "yxteams" ;
                let params = {
                    teamId: this.teamId  //TODO
                };

                http.get(url,params).then(response => {
                    if(response.code === 200){
                        this.tableData = response.data;
                    }

                }, error=> {
                    this.tableData = [] ;
                })
            },

            selectMember(){ //选择成员
                this.$emit("selectMember",this.chooseAtMemberList);

            },

            handleSelectionChange(val){
                //console.log("----handleSelectionChange---", val);
                this.chooseAtMemberList = val;

            }


        },


        mounted () {
            this.getAllTeamMemberInfo();


        }
    }
</script>

<style scoped>

    .at-panel-content{
        z-index: 10000;
        position: absolute;
        /* border-radius: 10px; */
        border:1px solid #ddd;
        padding: 5px;
        background: #fff;
        width:240px;
        height: 290px;
        left:0px;
        top:-300px;
    }


</style>