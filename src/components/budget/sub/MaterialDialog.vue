<!--添加材料 对话框-->

<template>
    <div>
        <el-dialog title="材料数据"
                   :visible.sync="dialogTableVisible"
                   width="80%"
                   :beforeClose="dialogBeforeClose"
                   :closeOnClickModal="closeOnClickModal" >

            <div>

                <el-form :inline="true" size="small" class="demo-form-inline">

                    <el-form-item label="分类:">

                        <el-select v-model="value" placeholder="请选择" v-bind:style="{width: '140px'}">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>

                        <span>-</span>

                        <el-select v-model="value" placeholder="请选择" v-bind:style="{width: '140px'}">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>

                    </el-form-item>

                    <el-form-item label="名称:">
                       <el-input placeholder="请输入关键字" clearable v-bind:style="{width: '140px'}"></el-input>
                    </el-form-item>


                    <el-form-item>
                        <el-button type="primary" plain size="mini" >查询</el-button>
                    </el-form-item>

                </el-form>

                <div class="el-row-template-list">
                    <el-table
                            :data="getTemplateList"
                            height="200"
                            border
                            style="width: 100%">

                        <el-table-column
                                prop="id"
                                label="类型"
                                width="100">
                        </el-table-column>

                        <el-table-column
                                prop="name"
                                label="名称"
                                width="100">
                        </el-table-column>

                        <el-table-column
                                prop="time"
                                label="单位">
                        </el-table-column>

                        <el-table-column
                                prop="time"
                                label="采购价">
                        </el-table-column>

                        <el-table-column
                                prop="time"
                                label="销售价">
                        </el-table-column>

                        <el-table-column
                                prop="time"
                                label="承包价">
                        </el-table-column>

                        <el-table-column
                                prop="time"
                                label="工艺">
                        </el-table-column>

                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button size="error">选择</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>

                <div class="fragment_create_div">
                    <el-button  type="primary">确认添加</el-button>

                </div>

            </div>

        </el-dialog>


    </div>



</template>

<script>
    import ElFormItem from "element-ui/packages/form/src/form-item";

    export default {
        components: {ElFormItem},
        name: "material-dialog",

        data(){
            return {

                dialogTableVisible : true,
                closeOnClickModal : false,

                dataTable:[],

                value:'',

                options: [
                    {
                        label:'主材',
                        value:'1'
                    },{
                        label:'辅材',
                        value:'2',
                    },{
                        label:'其他',
                        value:'3'
                    }
                ]

            }
        },

        methods: {
            dialogBeforeClose(){
                this.dialogTableVisible = false ;
                this.$emit("closeMaterialDialog")

            }
        },

        computed: {
            getTemplateList(){
                return [] ;
            }
        }
    }
</script>

<style scoped>
    form{
        margin-top: 0em;
        margin-bottom: 0em;
    }


    .fragment_create_div{
        margin-top: 24px;
    }

</style>

<style>

    .el-dialog__header{
        padding: 20px 20px 10px;
        background-color: #43a4fd;
    }

    .el-dialog__title{
        color: #FFF;
        font-weight: bold;
    }

    .el-dialog__headerbtn .el-dialog__close {
        color: #FFF;
    }

    .cell{
        text-align: center;
    }
</style>