<template>
    <div>
        <el-row class="goods" v-for="(item, index) in this.GoodList" :key="index">
            <el-col :span="8">
                <img  @click="changeGoods(item.product_id)" width="100%"  :src="item.product_image"/>
            </el-col>
            <el-col class="goods_info" :span="16">
                <h2  @click="changeGoods(item.product_id)">{{item.product_name}}</h2>
                <p>{{item.discount_price}}</p>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import http from '../../utils/http.js'
export default {
    data(){
        return {
            GoodList:[],
        }
    },
    props:['item_ids','custom'],
    created(){
        this.getGoodsList()
    },
    methods:{
        getGoodsList(){
            let params = {ids:this.item_ids}
            let self = this
            http.get('supplierGoodsById',params).then(function (res) {
                if (res.code == 200) {
                    console.log('供应商列表----------->',res.data)
                    self.GoodList = res.data
                }
            }).catch(function (err) {
                    console.log('hhtp请求错误', err)
            })
        },
        changeGoods(productId){
          //商品详情
          let projectId = this.custom.user_project_id
          let path = "/admin/product/detail/"+parseInt(projectId)+"/"+parseInt(productId)
          this.$router.push({path: path});
        },
    }

}
</script>
<style scoped>
    .goods{
        cursor: pointer;
        border-bottom: 1px solid #dddd;
    }
  .goods img{
      width:80px;
      height: 60px;
      border-radius: 5px;
      padding: 10px;
  }
  .goods_info h2 {
      font-size: 13px;
      height: 28px;
  }
 
</style>
