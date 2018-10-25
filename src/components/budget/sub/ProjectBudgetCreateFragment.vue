<!--创建项目-->

<template>
    <div id="id_create_fragment">
         <div> 创建项目 </div>


          <el-row class="el-row-create-class">
              <el-col :span="4"> 项目名称 :</el-col>
              <el-col :span="13" class="el-row-create-left"> <el-input v-model="projectName" placeholder="请输入项目名称"  clearable></el-input> </el-col>
          </el-row>

            <el-row class="el-row-create-class">
                <el-col :span="4">项目经理:</el-col>
                <el-col :span="6" class="el-row-create-left"><el-autocomplete v-model="managerName" placeholder="请输入姓名" :fetch-suggestions="querySearchAsync" @select="handleSelect" clearable></el-autocomplete></el-col>
                <el-col :span="1"><span>&nbsp;</span></el-col>
                <el-col :span="6" class="el-row-create-left"><el-input id="id_manager" v-model="managerMobile" placeholder="请输入电话号码" clearable></el-input></el-col>
            </el-row>

        <el-row class="el-row-create-class">
            <el-col :span="4">业主:</el-col>
            <el-col :span="6"  class="el-row-create-left"><el-autocomplete v-model="ownerName"  :fetch-suggestions="querySearchAsync" placeholder="请输入姓名" @select="handleSelect" clearable></el-autocomplete></el-col>
            <el-col :span="1"><span>&nbsp;</span></el-col>
            <el-col :span="6"  class="el-row-create-left"><el-input v-model="ownerMobile"  placeholder="请输入电话号码" clearable></el-input></el-col>
        </el-row>


        <el-row class="el-row-create-class"  v-for='(item,index) in designerList' :key="index">
            <el-col :span="4">设计师{{index+1}}:</el-col>
            <el-col :span="6"  class="el-row-create-left"><el-autocomplete v-model="item.name" placeholder="请输入姓名" value=""  :fetch-suggestions="querySearchAsync" @select="handleSelect" clearable></el-autocomplete></el-col>
            <el-col :span="1"><span>&nbsp;</span></el-col>
            <el-col :span="6"  class="el-row-create-left"><el-input v-model="item.mobile"  placeholder="请输入电话号码" clearable></el-input></el-col>
            <el-col :span="1">&nbsp;</el-col>

            <el-col :span="2" class="el-row-create-left"><el-button v-if="index === 0 " type="success" @click="addMoreDesigner">添加设计师</el-button>
                                                         <el-button v-else type="warning" @click="deleteDesigner(index)">删除设计师</el-button>
            </el-col>

        </el-row>


        <el-row class="el-row-create-class">
            <el-col :span="4">所用模版:</el-col>
            <el-col :span="12"  style="text-align: left;"> <span>{{templateName}}</span></el-col>
        </el-row>

        <div>

        </div>

        <div class="el-row-template-div">
            <div>
                <el-row class="el-row-create-class">

                    <el-col :span="3" class="el-row-template-title">选择模版：</el-col>
                    <el-col :span="8">
                        <el-input v-model="templateKeyWord" placeholder="请输入模版名称"  clearable></el-input>
                    </el-col>

                    <el-col :span="1">&nbsp;</el-col>

                    <el-col :span="4">
                        <el-button type="primary">搜索</el-button>
                    </el-col>

                </el-row>
            </div>

        </div>

        <div class="el-row-template-list">
            <el-table
                    :data="this.getTemplateList"
                    height="250"
                    border
                    style="width: 100%">

                <el-table-column
                        prop="id"
                        label="序号"
                        width="100">
                </el-table-column>

                <el-table-column
                        prop="name"
                        label="名称"
                        width="240">
                </el-table-column>

                <el-table-column
                        prop="time"
                        label="时间">
                </el-table-column>

                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="error" @click="handleEdit(scope.$index, scope.row)">选择模版</el-button>

                    </template>
                </el-table-column>

            </el-table>
        </div>

        <div class="fragment_create_div">

            <el-button  type="primary" @click="createNewProject">创建项目</el-button>

        </div>


    </div>

</template>

<script>
    import ElInput from "element-ui/packages/input/src/input";

    import http from "../../../utils/http"


    export default {
        components: {ElInput},
        name: "project-budget-create-fragment",

        computed:{
            getTemplateList(){
                let that = this;
                return this.tableData.filter(item => {
                    if(that.templateKeyWord == null || that.templateKeyWord.length === 0) return true;

                    if (item.name.indexOf(that.templateKeyWord) === -1) {
                        return false;
                    }

                    return true ;
                })


            }
        },

        methods:{
            addMoreDesigner(){
                this.designerList.push({
                    mobile:"",
                    name:"",
                    id:"",
                });
            },

            deleteDesigner(index) {
                console.log("----->>" + index);
                this.designerList.splice(index,1);
            },

            querySearchAsync(queryString, cb){
                if(null == queryString || queryString.length === 0) return;
                this.checkMobileType(queryString);

                this.queryUserInfo(queryString,cb);
            },

            queryUserInfo(queryString,cb){
                let that = this;
                let params = {
                    "keyword":queryString,
                    "pageIndex":"1",
                    "pageSize":20
                };

                let userInfo = JSON.parse(localStorage.getItem('userinfo'));
                let url = userInfo.user.companyId + "/companyuser";

                http.get(url,params).then(function (res) {
                    if (res.code === 200 && res.data != null && res.data.length > 0) {
                        let newData = that.parseNewData(res.data);
                        cb(newData);
                    }else{
                        cb([])
                    }

                }).catch(function (err) {
                    console.log(err)
                })
            },

            parseNewData(data){
                let result = [] ;
                data.forEach(function(each){
                    if(null == each.name || each.name.length === 0 ||
                       null == each.mobile || each.mobile.length === 0) return;

                    result.push({
                        value:each.name,
                        mobile:each.mobile,
                        id:each.id
                    })
                })
                return result ;
            },

            handleSelect(item){
                console.log("handleSelect-------->>" + this.nameType + "----" + this.nameIndex);

                if(null == item) return;
                if(this.nameType === 0) {
                    this.managerName = item.value;
                    this.managerMobile = item.mobile;
                    this.managerId = item.id ;

                }else if(this.nameType === 1) {
                    this.ownerName = item.value;
                    this.ownerMobile = item.mobile;
                    this.ownerId = item.id ;

                }else{
                    let newItem = {
                        name: item.value,
                        mobile:item.mobile,
                        id:item.id,
                    };

                    this.designerList.splice(this.nameIndex,1,newItem);
                }

            },

            /**
             * 检查号码查询来自哪里
             * @param queryString
             */
            checkMobileType(queryString){
                if(queryString === this.managerName){
                    this.nameType = 0 ;
                }else if(queryString === this.ownerName){
                    this.nameType = 1;
                }else {
                    this.nameType = 2;
                    let that = this;

                    this.designerList.forEach((item,index)=>{
                        if(queryString === item.name) {
                            that.nameIndex = index;
                        }
                    })
                }
            },

            //加载所有模版
            loadAllTemplate() {
                let userInfo = JSON.parse(localStorage.getItem('userinfo'));
                let url = "usertemplat";
                let params = {"companyId": userInfo.user.companyId}

                let that = this;
                http.get(url,params).then(function (res) {
                    console.log(res);

                    if (res.code === 200 && res.data != null && res.data.length > 0) {
                        that.tableData =  that.tableData.concat(res.data)
                    }else{
                        //TODO
                    }

                }).catch(function (err) {
                    console.log(err)
                })
            },

            handleEdit(index, row) {
                if(row == null) return;

                this.templateId = row.id;
                this.templateName = row.name ;

            },

            createNewProject() {
                this.$emit("createNewProject");
            }

        },

        data() {
            return {
                nameType:0,
                nameIndex:0 ,

                projectName:"",

                managerName:"",
                managerMobile:"",
                managerId:"",

                ownerName:"",
                ownerMobile:"",
                ownerId:"",

                designerList: [
                    {
                        mobile:"",
                        name:"",
                        id:"",
                    }

                ],

                tableData: [],

                templateId:"",
                templateName:"暂无选择模版",
                templateKeyWord:"",


            }
        },

        mounted(){
            this.loadAllTemplate()
        }
    }
</script>

<style scoped>
    #id_create_fragment {
        color:#494949;
    }

    .fragment_create_div{
        margin-top: 24px;
    }

    .el-row-create-class{
        padding: 4px;
    }

    .el-row-create-left{
        text-align: left;
    }

    .el-input--small .el-input__inner {
        height: 32px;
        line-height: 32px;
        width:80% ;
    }

    .el-row-template-div{
        text-align: left;
        padding: 12px;
        margin-top: 12px;
        margin-left: 16px;
        border-top: 2px solid #f2f2f2;
    }

    .el-row-template-title{
        text-align: left;
        margin-top: 6px;
        font-size: 14px;
        color: #494949;
    }

    .el-row-template-list{
        margin-left: 20px;
        margin-right: 20px;

    }

</style>