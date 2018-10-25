<template>
    <div>

        <el-form ref="form" label-width="80px" size="mini">

            <el-form-item label="项目名称:" style="width: 300px;">
                <el-input v-model="projectName" placeholder="请输入项目名称" :disabled="true"  clearable></el-input>
            </el-form-item>

            <el-row class="el-row-create-class">
                <el-col :span="6" class="el-row-title">
                    <el-form-item label="项目经理:">
                        <el-input v-model="managerName" placeholder="请输入姓名" :disabled="true" clearable></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="6" class="el-row-title">
                    <el-form-item label="业主:" label-width="56px">
                        <el-input v-model="ownerName" placeholder="请输入姓名" :disabled="true" clearable></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="6" class="el-row-title">
                    <el-form-item label="设计师:" label-width="66px">
                        <el-input v-model="designerName" placeholder="请输入姓名" :disabled="true" clearable></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="2">
                    <el-button  size="mini" type="primary" icon="el-icon-edit" circle></el-button>
                </el-col>

            </el-row>


        </el-form>





        <hr class="top-hr-class"/>

    </div>



</template>

<script>
    import ElFormItem from "element-ui/packages/form/src/form-item";

    export default {
        components: {ElFormItem},
        name: "project-info-budget-fragment",

        data() {
           return {
               projectName : '云峰苑三期5套间',
               managerName : '任经理',
               ownerName   : '张先生',
               designerName: '方设计师'
           }

        }
    }
</script>

<style scoped>
    form{
        margin: 1em 1em 0em;
    }

    .el-row-create-class{

    }

    .el-row-title{

    }

    .top-hr-class{
        height:1px;
        border:none;
        padding: 0px;
        margin: 0px;
        border-top:1px solid #e2e2e2;
    }


</style>