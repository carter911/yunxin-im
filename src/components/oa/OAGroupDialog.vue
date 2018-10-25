
<!--用户群组选择 -->

<template>

    <div>
            <div style="background-color: #fafafa">
                <div>
                    <el-row>
                        <el-col :span="2" class="team-item-label">
                           可见群组
                        </el-col>

                        <el-col :span="20" class="tag_div_layout">
                            <el-tag class="tag_item"
                                    size="medium"
                                    v-for="tag in chooseTeamTags"
                                    :key="tag.id"
                                    closable
                                    @close="handleClose(tag.id)">

                                {{tag.name}}
                            </el-tag>
                        </el-col>
                    </el-row>
                </div>

                <div>
                    <el-row>
                        <el-col :span="2" class="team-item-label">
                            不可见群组
                        </el-col>

                        <el-col :span="20" class="tag_div_layout">
                            <el-button v-for="tag in unChooseTeamTags"
                                    class="tag_item"
                                    size="mini"
                                    type="success"
                                    icon="el-icon-edit"
                                    @click="chooseMore(tag.id)"
                                    :key="tag.id">

                                {{tag.name}}
                            </el-button>

                            <el-button class="tag_item" v-if="this.unChooseTeamTags.length > 0" size="mini" type="danger" @click="chooseAllGroup">全选</el-button>

                        </el-col>
                    </el-row>

                </div>
            </div>
    </div>

</template>

<script>
    import ElButton from "element-ui/packages/button/src/button";

    import http from "../../utils/http";

    export default {
        components: {ElButton},
        name: "o-a-group-dialog",

        props:{
            oaGroupIds:{
                type:Array,
                required:true
            }
        },

        data(){
            return {
                dialogTableVisible : true ,
                closeOnClickModal : false ,
                dialogModal : true,

                chooseTeamTags : [],

                unChooseTeamTags: []
            }
        },

        methods: {

            //选择所有群组
            chooseAllGroup(){
                if(this.unChooseTeamTags.length > 0) {
                    while(this.unChooseTeamTags.length > 0) {
                        this.chooseTeamTags.push(this.unChooseTeamTags.pop()
                      )
                    }
                }
            },

            //删除特定数据
            handleClose(id){
                let index = -1 ;
                let i = 0;
                for(let len = this.chooseTeamTags.length ; i < len ; i++){
                    if(id === this.chooseTeamTags[i].id){
                        index = i ;
                        break;
                    }
                }

                if(index >= 0){
                    let item = this.chooseTeamTags[i];
                    this.chooseTeamTags.splice(index,1);
                    this.unChooseTeamTags.push(item);
                }

            },

            chooseMore(id){
                let index = -1 ;
                let i = 0 ;
                for(let len = this.unChooseTeamTags.length ; i < len ; i++){
                    if(id === this.unChooseTeamTags[i].id){
                        index = i ;
                        break;
                    }
                }

                if(index >= 0){
                    let item = this.unChooseTeamTags[i];
                    this.unChooseTeamTags.splice(index,1);
                    this.chooseTeamTags.push(item);
                }
            },

            //获取用户的全部群组
            getUserAllTeamGroup(){
                let that = this;
                let url = "companyGroup";
                http.get(url,{}).then(response => {
                    if(null != response && 200 === response.code){
                        //that.unChooseTeamTags = response.data
                        that.parseData(response.data);
                    }

                }, error => {
                    console.error("error",error)
                })
            },

            parseData(allOAGroupData){
                if(this.oaGroupIds == null || 0 === this.oaGroupIds.length) {
                    this.unChooseTeamTags = allOAGroupData;
                }else{
                    allOAGroupData.forEach(item => {
                        if(this.isInArray(this.oaGroupIds,item.id)){
                            this.chooseTeamTags.push(item);
                        }else{
                            this.unChooseTeamTags.push(item);
                        }
                    })
                }
            },

            isInArray(arr, value) {
                for (let i = 0; i < arr.length; i++) {
                    if (value === arr[i]) {
                        return true;
                    }
                }
                return false;
            },

            getAllChooseItemGroup(){
                return this.chooseTeamTags;
            }

        },

        mounted() {
            this.getUserAllTeamGroup();

        }
    }
</script>

<style scoped>
    .team-item-label{
        margin-top: 6px;
    }


    .tag_div_layout {
        text-align: left;
        padding: 4px;
    }

    .tag_item {
        margin: 4px;
    }

</style>