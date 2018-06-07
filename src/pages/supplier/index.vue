<template>
  <div id="supplier" style="padding:20px;" v-bind:style="{height: heightData}">
    <el-carousel type="card" indicator-position='none' :interval="3000" height="200px">
        <el-carousel-item v-for="item in banner" :key="item.id">
        <img   height="100%" width="100%" :src="item.image" />
        </el-carousel-item>
    </el-carousel>
    <div class='supplier_name'>雷士照明</div>
    <el-row :gutter="20"  >
      <el-col :span="6" v-for="item in goods">
        <div class="grid-content bg-purple goods">
          <img @error="defaultImage(item)" v-bind:src="item.product_image">
          <h2>{{item.product_name}}</h2>
          <div>
            <span class="price">{{item.discount_price}}</span>
            <span @click="share(item.product_id)" class="share"><i class="el-icon-share"></i>分享</span>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-dialog
      title="分享商品"
      :visible.sync="shareShow"
      width="400px"
      center>
      <share 
      :goodsId='this.goodsId'
      :projectId='this.projectId'
      ></share>
    </el-dialog>
    
  </div>
</template>
<script>
import share from '../../components/supplier/share.vue'
export default {
    data(){
        return {
            heightData: (document.documentElement.clientHeight-100)+'px',
            shareShow: false,
            goodsId: 0,
            projectId: 0,
            supplierId: 0,
        }
    },
    components: {
        share
    },
    created(){
        this.projectId = this.$route.params.projectId
        this.supplierId = this.$route.params.supplierId
        if(this.projectId<=0 || this.supplierId<=0){
          this.$message.error('您请求的地址不合法');
        }
        this.$store.dispatch('getSupplierBanner',this.supplierId);
        this.$store.dispatch('getGoods',this.supplierId);
    },
    watch:{
      banner(){
        console.log(1111);
      },
      goods(){

      },
      projectInfo(){
        
      }
    },
    computed: {
        banner(){
          return  this.$store.state.supplierBanner 
        },
        goods(){
          return  this.$store.state.supplierGoods 
        },
        projectInfo(){
          return  this.$store.state.currSessionProjectInfo
        }
    },
    methods:{
      share(id){
        this.goodsId = id
        console.log('商品id', id)
        this.shareShow = true
      },
      defaultImage(item){
        item.product_image = "/../../../static/logo400.png"
      }
      
    }
}
</script>
<style scoped>
  #supplier{
    background: #fff;
    height: 500px;
    overflow: hidden;
    OVERFLOW-Y: auto;
  }
  .supplier_name{
    text-align: left;
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid #eeeeee;
  }
  .goods{
    cursor: pointer;
    text-align: left;
    height: 230px;
    min-width: 200px;
    margin-bottom: 20px;
    background: #fff;
    border: 1px solid #eeeeee;
  }

  .goods h2:hover{
    color: #2f95fa;
  }

  .goods>div{
      margin-top: 10px;
  }
  .goods img {
    width: 100%;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    height: 150px;
  }
  .goods h2{
    margin: 0px;
    margin-left: 10px;
    width: 180px;
    height: 31px;
    font-family: MicrosoftYaHei;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 18px;
    letter-spacing: 0px;
    color: #999999;
  }
  .goods .share{
      float: right;
      margin-right: 10px;
      font-size: 12px;
  }

  .goods .share:hover{
    color: #2f95fa;
  }
  .goods .price{
      float: left;
      margin-left: 10px;
    	width: 33px;
      height: 12px;
      font-family: MicrosoftYaHei;
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 18px;
      letter-spacing: 0px;
      color: #de3636;
  }
  .el-row {
    margin-top: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>

<style>
  #supplier .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  #supplier .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  #supplier .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }




</style>
