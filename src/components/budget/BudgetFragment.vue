<template>


    <div id="budget">

        <el-container>
            <el-aside class="budget-left" width="240px"
                      v-bind:style="{height: (this.$store.state.windowClientHeight-60)+'px'}">
                <div>
                    <LeftBudgetListFragment></LeftBudgetListFragment>
                </div>
            </el-aside>


            <el-main style="background-color: #FFF">
                <div v-show="!this.showBudgetDetail">
                    <ProjectBudgetCreateFragment @createNewProject="createNewProject"></ProjectBudgetCreateFragment>
                </div>

                <div v-show="this.showBudgetDetail">
                    <BudgetDetailFragment></BudgetDetailFragment>

                </div>

            </el-main>

        </el-container>

    </div>

</template>

<script>
    import LeftBudgetListFragment from './sub/LeftBudgetListFragment'
    import ProjectBudgetCreateFragment from  './sub/ProjectBudgetCreateFragment'
    import BudgetDetailFragment from "./sub/BudgetDetailFragment"

    export default {
        name: "budget-fragment",

        components: {
            LeftBudgetListFragment,
            ProjectBudgetCreateFragment,
            BudgetDetailFragment
        },

        data(){
          return {
              showBudgetDetail:false ,

          }

        },

        methods:{
            createNewProject() {
                this.showBudgetDetail = true ;

            }
        }
    }
</script>

<style scoped>

    .budget-left{
        background-color: #FFF;
        border-right: 1px solid #e1e1e1;
    }

</style>