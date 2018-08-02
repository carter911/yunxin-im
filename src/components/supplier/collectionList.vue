<style scoped>
#supplier_list{
    padding: 8px;

}
.supplier_header{
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #dedede;
}
.supplier_body{
    overflow:auto;
}
.supplier_header_name{
    font-size: 13px;
    text-align: left;
    width: 300px;
    float: left;
}
.supplier_header_name i{
    margin-right: 5px;
    font-size: 18px;
    color: #ff943e;
}
.supplier_header_close{
    text-align: right;
    width: 100px;
    float:right;
    
}

.supplier_header_close img{
    margin-top: 10px;
    margin-right: 10px;
    width:15px;
    height:15px
}
.supplier_list{
    /* background:#f0f0f0; */
    padding: 8px;
    padding-top: 0px;

}
.category_list{
    /* background:#f0f0f0; */
    
    margin: 8px;
    margin-bottom: 15px;
    padding-bottom: 15px;
    border-bottom: 1px solid #f0f0f0;
}
.category_name{
    margin: 10px 0px;
}
.cagegory{
    margin-bottom: 10px;
    cursor: pointer;
}
.cagegory img{
    cursor: pointer;
    background: #fff;
    border: 1px solid #ddd;
    text-align: center;
    width: 60px;
    height: 30px;
    padding: 5px;
    object-fit: contain;
}
.cagegory h2{
    margin: 0px;
    font-size: 13px;
}
.empty{
    margin-top:20px;
}

.goods{
    border-bottom: 1px solid #dddd;
}
.goods img{
    cursor: pointer;
    width:70px;
    height: 50px;
    border-radius: 5px;
    margin-top: 10px;
    padding: 5px;
}
.goods_info{
    font-size: 12px;
    text-align: left;
}
.goods_info h2 {
    cursor: pointer;
    font-size: 12px;
    height: 28px;
}

.goods_info p{
    cursor: pointer;
    color: #f24c49;
}

.loading{
    font-size: 11px;
    text-align: center;
    margin-top: 20px;
}
.load_true{
    cursor: pointer;
}
</style>
<template>
  <div id="supplier_list" >
      <div class="supplier_header">
          <div class="supplier_header_name"><i class="el-icon-star-off"></i>我的收藏</div>
          <div class="supplier_header_close" v-on:click="closeRightSupplier()">
              <img src="../../../static/ic_close.png" style=";"/> 
          </div>
      </div>
      <div class="supplier_body" :style="{height : (this.$store.state.windowClientHeight - 122) + 'px'}">
        <div class="empty" v-if="this.list.length<=0">
            暂无收藏
        </div>
        <div v-if="this.list.length>0" class="supplier_list">
            <el-row v-for="(item,key) in list" :key='key' class="goods">
                <el-col :span="8">
                    <img @click="changeGoods(item.product_id)" width="100%"  :src="item.product_image"/>
                </el-col>
                <el-col class="goods_info" :span="16">
                    <h2 @click="changeGoods(item.product_id)">{{item.product_name}}</h2>
                    <p>{{item.discount_price}}元</p>
                </el-col>
            </el-row>
            <div class="loading " v-if="isLast">--我也是有底线的--</div>
            <div class="loading load_true" v-if="!isLast" @click="this.getList">下一页</div>
        </div>
        
      </div>
  </div>
</template>
<script>
import util from '../../utils'
import store from '../../store';
import types from '../../api/types'

import http from '../../utils/http'
export default {
    data(){
        return {
            list : [],
            pageSize: 20,
            pageIndex: 1,
            isLast: false,
        }
    },
    props: {
        companyId:{
            type : Number,
            required:true 
        },
        projectId:{
            type : Number,
            required:true 
        }
    },
    created(){
        this.getList()
    },
    mounted(){
        //console.log('获取请求数据')
    },
    methods:{
        defaultImage(item){
            item.image = "/../../../static/logo400.png"
        },
        closeRightSupplier() {
            this.$emit("closeCollectionList");
        },
        getList(){
            let self = this
            let params = {
                companyId:this.companyId,
                pageIndex:this.pageIndex,
                pageSize:this.pageSize
            }
            console.log(params)
            http.get('collectList',params).then(function (res) {
                if (res.code == 200) {
                    self.pageIndex = self.pageIndex+1;
                    if(res.data!=null){
                        if(self.pageSize>res.data.length){
                            self.isLast = true;
                        }
                        res.data.forEach(element => {
                            self.list.push(element)
                        });
                    }else {
                        self.isLast = true;
                    }
                    
                }
            }).catch(function (err) {
                    console.log('hhtp请求错误', err)
            })
        },
        changeGoods(productId){
            //商品详情
            
            let path = "/admin/product/detail/"+parseInt(this.projectId)+"/"+parseInt(productId)
            this.$router.push({path: path});
        },
        changeSupplier(supplierId){
            let path = "/admin/supplier/supplierId/"+supplierId+"/projectId/"+this.projectId
            this.$router.push({path: path});
        }
    }
}
</script>
