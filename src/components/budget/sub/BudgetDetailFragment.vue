<template>

    <div>
        <ProductInfoBudgetFragment></ProductInfoBudgetFragment>

        <BudgetBaseHeader></BudgetBaseHeader>

        <div class="budget-item-fragment-list">
            <BudgetItemFragment @showMaterialDialog="showSysMaterialDialog" @showQuotaDialog="showSysQuotaDialog"></BudgetItemFragment>

            <BudgetItemFragment @showMaterialDialog="showSysMaterialDialog" @showQuotaDialog="showSysQuotaDialog"></BudgetItemFragment>
        </div>


        <div v-if="showMaterialDialog">
            <MaterialDialog @closeMaterialDialog="closeMaterialDialog"></MaterialDialog>
        </div>


        <div v-if="showQuotaDialog">
            <QuotaDialog @closeQuotaDialog="closeQuotaDialog"></QuotaDialog>
        </div>

    </div>


</template>

<script>
    import ProductInfoBudgetFragment from "./ProjectInfoBudgetFragment"
    import BudgetBaseHeader from "./BudgetBaseHeader"
    import BudgetItemFragment from  "./BudgetItemFragment"

    import MaterialDialog from "./MaterialDialog"
    import QuotaDialog    from "./QuotaDialog"

    export default {
        name: "budget-detail-fragment",

        components: {
            ProductInfoBudgetFragment,
            BudgetBaseHeader,
            BudgetItemFragment,
            MaterialDialog,
            QuotaDialog
        },

        data() {
            return {
                showMaterialDialog : false ,
                showQuotaDialog : false ,
            }
        },

        methods:{
            closeMaterialDialog(){
                this.showMaterialDialog = false ;
            },

            closeQuotaDialog(){
                this.showQuotaDialog = false ;
            },


            showSysMaterialDialog() {
                this.showMaterialDialog = true ;
            },

            showSysQuotaDialog(){
                this.showQuotaDialog = true ;

            }

        }


    }
</script>

<style scoped>

    .budget-item-fragment-list{
        height: 400px;
        overflow:scroll;
    }

</style>