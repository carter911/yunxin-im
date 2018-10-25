
<!--单个预算单元-->
<template>
    <div class="el-row_header_item">
        <el-row class="el-row-create-class" :gutter="24">
            <el-col :span="4" class="el-row-header-item-left">
                厨房预算
            </el-col>

            <el-col :span="18" class="el-row-header-item-right">
                <el-button type="primary" size="mini" plain @click="showMaterialDialog">添加材料</el-button>
                <el-button type="success" size="mini" plain @click="showQuotaDialog">添加定额</el-button>
                <el-button type="danger"  size="mini" plain >移除空间</el-button>
            </el-col>
        </el-row>


        <div class="el-row-template-list">
            <el-table
                    :data="this.getTemplateList"
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

                <el-table-column label="操作" fixed="right">
                    <template slot-scope="scope">
                        <el-button size="error" @click="handleEdit(scope.$index, scope.row)">选择模版</el-button>

                    </template>
                </el-table-column>

            </el-table>
        </div>

    </div>

</template>

<script>
    export default {
        name: "budget-item-fragment",

        data(){
            return {
                getBudgetList :[],
            }
        },

        computed:{
            getTemplateList(){
                return this.getBudgetList;
            }
        },

        methods:{

            showMaterialDialog(){
                this.$emit("showMaterialDialog")
            },

            showQuotaDialog(){
                this.$emit("showQuotaDialog")
            }
        }
    }
</script>

<style scoped>
.el-row-header-item-left{
    text-align: left;
    margin-left: 20px;
    margin-top: 12px;
    margin-bottom: 12px;
    font-weight: bold;
}

.el-row-header-item-right{
    text-align: right;
    padding-top: 4px;
    margin: 6px;
}

.el-row_header_item{
    margin-top: 4px;
    border-top: 1px solid #f2f2f2;
}

    .cell{
        text-align: center;
    }

</style>