<style scoped>
#supplier_list{
    padding: 8px;
}
.supplier_header{
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #dedede;
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
</style>
<template>
  <div id="supplier_list">
      <div class="supplier_header">
          <div class="supplier_header_name"><i class="el-icon-goods"></i>供应商</div>
          <div class="supplier_header_close" v-on:click="closeRightSupplier()">
              <img src="../../../static/ic_close.png" style=";"/> 
          </div>
      </div>
      <div>
        <div v-if="this.supplierList.length<=0">
            暂无供应商
        </div>
        <div v-if="this.supplierList.length>0" class="supplier_list">
            <el-row  :gutter="20"  v-for="item in this.supplierList"   class="category_list">
            <div class="category_name">{{item.category_name}}</div>
            <div v-if="item.children.length>0">
                <el-col :span="6" v-for="category in item.children" class="cagegory">
                    
                    <div class="grid-content bg-purple goods" @click="changeSupplier(category.supplier_id)">
                    <img width="100%" @error="defaultImage(category)" v-bind:src="category.image">
                    <h2>{{category.supplier_name}}</h2>
                    </div>
                </el-col>
            </div>
            
        </el-row>
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
            supplierList :[],
        }
    },
    props: {
        projectId:{
            type : Number,
            required:true 
        }
    },
    created(){
        this.getcompanySupplier()
        //this.getGoodsDetail()
    },
    mounted(){
        //console.log('获取请求数据')
        
    },
    methods:{
        defaultImage(item){
            item.image = "/../../../static/logo400.png"
        },
        closeRightSupplier() {
            this.$emit("closeRightSupplier");
        },
        getcompanySupplier(){
            let self = this
            let params = {
                projectId:this.projectId,
                type:1,
            }
            console.log(params)
            http.get('companySupplier',params).then(function (res) {
                if (res.code == 200) {
                    console.log('供应商列表----------->',res.data)
                    self.supplierList = res.data
                }
            }).catch(function (err) {
                    console.log('hhtp请求错误', err)
            })
        },
        changeSupplier(supplierId){
            let path = "/admin/supplier/supplierId/"+supplierId+"/projectId/"+this.projectId
            this.$router.push({path: path});
        }
    }
}
</script>
