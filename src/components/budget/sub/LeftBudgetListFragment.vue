<template>
    <div>
        <div class="top-button-class">
            <el-button type="primary">&nbsp;&nbsp;新建项目预算&nbsp;&nbsp;</el-button>
        </div>

        <hr class="top-hr-class"/>

        <div v-for="(item, index) in this.budgetList" :key="index">

            <div class="budget-list-item">{{item}}</div>

        </div>

    </div>

</template>

<script>
    export default {
        name: "left-budget-list-fragment",


        data() {
            return {
                budgetList :['三室一厅精装修','三室一厅简装','三室一厅','两室一厅'] ,
            }
        }
    }
</script>

<style scoped>

    .top-button-class{
        margin-top: 12px;
        margin-bottom: 12px;
    }

    .top-hr-class{
        height:1px;
        border:none;
        padding: 0px;
        margin: 0px 2px;
        border-top:1px solid #e2e2e2;
    }

    .budget-list-item{
        padding: 8px 24px;
        border-bottom: 1px solid #f1f1f1;
        font-size: 14px;
        color: #494949;
        text-align: left;
    }



</style>