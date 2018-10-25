<template>

    <div>

        <el-form ref="form" label-width="70px" size="small">

            <el-row class="el-row-create-class">
                <el-col :span="6" class="el-row-title">
                    <el-form-item label="预算详情">
                        <el-select placeholder="空间区域" value="shanghai">
                            <el-option label="厨房" value="shanghai"></el-option>
                            <el-option label="客厅" value="beijing"></el-option>
                            <el-option label="卧室" value="beijing2"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>

                <el-col :span="4">
                    <el-button size="small" plain="true" type="primary">添加空间</el-button>
                </el-col>


            </el-row>

        </el-form>

    </div>

</template>

<script>
    import ElFormItem from "element-ui/packages/form/src/form-item";

    export default {
        components: {ElFormItem},
        name: "budget-base-header"
    }
</script>

<style scoped>
    .budget_header{
        text-align: left;
        font-size: 16px;
        margin: 24px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #343434;
    }


    form{
        margin-bottom: 0em;
        margin-top: 1em;
    }

    .el-row-create-class{
        margin-left: 24px;
        margin-right: 24px;
    }

</style>