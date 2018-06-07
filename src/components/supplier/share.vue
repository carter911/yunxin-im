<template>
  <div>
      <el-form ref="form" :model="form" label-width="50px">
            <el-row class="goods">
                <el-col :span="8">
                    <img width="100%"  :src="goodsInfo.images[0]"/>
                </el-col>
                <el-col class="goods_info" :span="16">
                    <h2>{{goodsInfo.product_name}}</h2>
                    <p>{{goodsInfo.discount_price}}</p>
                </el-col>
            </el-row>
            <el-form-item label="分享" class="share">
                <el-checkbox-group v-model="form.shareId">
                    <el-col :span="12">
                            <el-checkbox label="美食" name="goodsId"></el-checkbox>
                    </el-col>
                    <el-col :span="12">
                            <el-checkbox label="美食/餐厅" name="goodsId"></el-checkbox>
                    </el-col>
                    <el-col :span="12">
                            <el-checkbox label="美食/餐厅线上活动" name="goodsId"></el-checkbox>
                    </el-col>
                    <el-col :span="12">
                            <el-checkbox label="美食/餐厅线上活动" name="goodsId"></el-checkbox>
                    </el-col>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item class="share-btn">
                <el-button type="primary" @click="onSubmit">立即分享</el-button>
            </el-form-item>
      </el-form>

  </div>
</template>
<script>
import util from '../../utils'
import store from '../../store';
export default {
    data(){
        return {
            form: {
                name: '',
                shareId: [],
            },
        }
    },
    props: ['goodsId','projectId'],
    created(){
        this.init()
    },
    watch:{
        goodsId(){
            console.log('再次分享开始了')
            this.init()
        }
    },
    computed:{
        goodsInfo(){
            return this.$store.state.supplierGoodsDetail
        }
    },
    methods:{
        init(){
            let params = {productId:this.goodsId, projectId:this.projectId}
            this.$store.dispatch('getGoodsDetail',params);
            this.$store.dispatch('getShareUser',params);
        },
        onSubmit() {
            console.log(this.form)
            console.log('submit!');
        }
    }
}
</script>
<style scoped>
    .goods{
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
  .share{
      text-align: left;
  }

  .share-btn{
      text-align: center
  }
</style>