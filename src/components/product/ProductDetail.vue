<!--
    产品详情组件
 -->
 <style>

 </style>
 
<template>
    <div id="id_product_base" 
         class="product_detail_cl"
         :style="{height : (this.$store.state.windowClientHeight - 61) + 'px'}"  
         v-loading="this.dataIsLoading">   
        <!-- 产品图片 & 产品说明 开始 -->
        <div class="product_header">
            <div class="product_image">
                <ProductImageList :imageList="this.productImageList"></ProductImageList>
            </div>
            <div class="product_base_info">
                    <div class="product_title">
                        <span>{{this.productDetail.product_name}}</span>
                    </div>
                    <div class="product_old_price">
                        <span>原价： {{this.productDetail.product_price}}</span>
                    </div>
                    <div class="product_new_price_content">
                       <div><span class="product_new_price">￥:  {{this.productDetail.product_price}}</span></div> 
                    
                       <div><span class="product_look_count">已预览:{{this.productDetail.buyerCount}}</span></div>
                    </div>

                    <div class="product_new_operate">
                        <div v-if="this.productDetail.collect==0" class="product_add_collect" @click="addCollect">加入收藏夹</div>
                        <div v-if="this.productDetail.collect==1" class="product_add_collect product_add_collect_active">已加入收藏</div>
                        <div class="prooduct_share_friends" @click="share2Friends">分享至朋友</div>
                    </div>
                    <div class="connection" @click="chat">
                        <div>联系供应商：{{this.productDetail.supplier_name}}</div><img src="../../../static/wangwang.png"/>
                    </div>

                    <div class="product_good_style">
                        <div class="good_style_tip" v-for="(item ,index) in this.productDetail.label" :key="index">
                            <i class="el-icon-circle-check">
                                <span style="padding-left:12px;">{{item}}</span>
                            </i>
                        </div>
                    </div>
            </div>
        </div>
        <!-- 产品图片 & 产品说明 结束 -->

        <!-- 产品详情 & 评价 开始  -->
        <div class="product_body">
            <hr class="product_body_hr_header"/>
                <div >
                    <el-menu :default-active="this.currentType"
                             :router="false" 
                             class="el-menu-demo" 
                             @select="handleSelect"
                             mode="horizontal">
                                    <el-menu-item index="0">商品详情</el-menu-item>
                                    <el-menu-item index="1">评价</el-menu-item>
                    </el-menu>
                </div>

                <div v-show="this.currentType == '0'" class="shop_detail">
                    <div v-html="this.productDetailContent"> </div>
                </div>

                <div v-show="this.currentType == '1'" class="shop_detail">
                    <ProductComment :productId="this.productId"></ProductComment>
                </div>
        </div>

        <!-- 产品详情 & 评价 结束  -->
        <el-dialog
                title="分享商品"
                :visible.sync="dialogShareShow"
                width="60%"
                center>
                <Share 
                :goodsId='this.productId'
                :projectId='this.projectId'
                @ShareComplete = "ShareComplete"></Share>
        </el-dialog>
        <el-dialog
                :title="productDetail.supplier_name"
                top=50
                :visible.sync="chatShow"
                width="700px"
                :before-close="beforeChat"
                center>
                <div style="width:100%;height:400px;">
                    <Message chatHeight="270px" :sessionType="worker" style="width:100%" :sessionId="'p2p-'+this.productDetail.client" />
                </div>
        </el-dialog>
    </div>

</template>

<script>
import ProductImageList from '../image/ProductImageList.vue'
import Log from '../../common/Log';
import http from "../../utils/http"
import ProductComment from "./ProductComment.vue"
import Share from '../supplier/share.vue'
import Message from '../../components/chat/message.vue'
// import { session } from 'electron';
export default {

    data() {
        return {
            worker:'worker',
            chatShow:false,
            currentType : '0' ,
            //产品详情对象
            productDetail : {} ,
            //产品图片集合
            productImageList : [] ,
            //产品详情字符
            productDetailContent: '',

            productId:'0' ,

            projectId:'0',

            dialogShareShow : false ,

            dataIsLoading : true ,
        }
    },

    components: {
        ProductImageList,
        ProductComment,
        Share,
        Message
    },


    methods : {
        share2Friends() {
            this.dialogShareShow = true 
        },

        ShareComplete() {
            this.dialogShareShow = false; 
            this.showMessageInfo("产品分享成功","success")
        },

        handleSelect(index) {
            this.currentType = index ;
        },

        request_product_detail() {
            //TODO projectId=896&productId=544

            this.dataIsLoading = true ;
            let url = "supplierGoodsInfo";
            let params = {
                projectId : this.projectId ,
                productId : this.productId ,
            }

            http.get(url,params).then(data => {
                Log.L(data) ;
                this.dataIsLoading = false ;
                
                if(data.code == 200){
                    this.productDetail = data.data ;
                    this.productImageList = this.productDetail.images || [] ;

                    this.request_product_content(this.productDetail.detail_url);
                }else {
                    this.showMessageInfo(data.message, "error");
                }
            }, error => {
                this.dataIsLoading = false ;
                this.showMessageInfo("获取产品信息失败", "error");

            })
        },

        request_product_content(url){
            http.get(url).then(data => {
                this.productDetailContent = data ? data : "<p>暂无产品评论</p>"  ;
            },error => {
                this.showMessageInfo(error, "error");
                this.productDetailContent = "<p>暂无产品评论</p>"
            })
        } ,

        addCollect(){
            let url = "collectAdd";
            let params = {
                productId : this.productId ,
                companyId : this.productDetail.companyId ,
                supplierId : this.productDetail.supplier_id ,
            }
            http.post(url,params).then(data => {
                Log.L(data) ;
                if(data.code == 200){
                    this.productDetail.collect=1;
                    this.showMessageInfo(data.message, "success");
                }else {
                    this.showMessageInfo(data.message, "error");
                }
            }, error => {
                this.showMessageInfo("接口异常请稍后重试", "error");

            })
        },

        showMessageInfo(msg,type) {
         this.$message({
             message: msg,
             type: type
           });
        },
        beforeChat(done){
            let sessionId = localStorage.getItem('supplierChatId')
            console.error('供应商聊天关闭',sessionId)
            this.$store.commit('updateCurrSessionId', {
                type: 'init',
                sessionId:sessionId
            });
            this.$store.commit('updateCurrSessionMsgs', {
                type: 'init',
                sessionId: sessionId
            });
            this.chatShow = true;
            done();
        },
        chat(){
            console.error('供应商聊天1',this.$store.state.currSessionId)
            localStorage.setItem('supplierChatId',this.$store.state.currSessionId)
            let sessionId = 'p2p-'+this.productDetail.client
            console.error('供应商聊天',sessionId)
            this.$store.commit('updateCurrSessionId', {
                type: 'init',
                sessionId:sessionId
            });
            this.$store.commit('updateCurrSessionMsgs', {
                type: 'init',
                sessionId: sessionId
            });
            this.chatShow = true;
        }
    },

    created() {
        this.projectId = this.$route.params.projectId;
        this.productId = this.$route.params.productId ;
    },

    mounted() {
        this.request_product_detail()
    }

}
</script>

<style>
#id_product_base {
    color: #000;
    background-color: #FFF ;
}

</style>


<style scoped>

.product_detail_cl {
     overflow:auto
}

.connection{
    margin: 10px;
    float:right;
    cursor: pointer;
    height:30px;
    widht:30px;
}
.connection div{
    float: left;
    height: 30px;
    line-height:30px;
    display: inline-block;
    margin-top:0px;
   
}
.connection img{
    
    height:30px;
    widht:30px;
    vert-align: middle;
}
.product_header {
    padding:12px;
    display: flex;
    justify-content:space-between;
}

.product_body_hr_header {
    height:2px;
    border:none;
    border-top: 1px solid #e2e2e2;
}


.product_base_info {
    flex-grow:1;
}

.product_base_info{
    margin-left:24px;
    margin-right:24px;
    margin-top:36px;
    text-align:left;
}

.product_title {
    font-family: 'MicrosoftYaHei';
	font-size: 16px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 24px;
	letter-spacing: 0px;
	color: #333333;
}

.product_old_price{
	font-family: 'MicrosoftYaHei';
	font-size: 16px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 18px;
	letter-spacing: 0px;
	color: #999999;
    text-decoration: line-through;
    margin-top:20px;
}

.product_new_price_content{
    margin-top:20px;
    margin-right:12px;
    display: flex;
    justify-content:space-between;
}

.product_new_price {
	font-family: 'MicrosoftYaHei';
	font-size: 18px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 18px;
	letter-spacing: 0px;
	color: #ea3535;
}

.product_look_count{
    font-family: 'MicrosoftYaHei';
	font-size: 12px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 18px;
	letter-spacing: 0px;
	color: #999999;
}

.product_new_operate{
    cursor: pointer;
   display: flex;
   justify-content:space-between;
   margin-top:20px;
   margin-right:12px;
}

.product_add_collect{
    overflow: hidden;
    position: relative;
    width: 178px;
    background-color:  #fff;
    border: 1px solid  #489bfb;
    color: #2f8ff5;
    font-family: 'Microsoft Yahei';
    height: 38px;
    line-height: 38px;
    text-align: center;
    font-size: 16px;
}
.product_add_collect_active{
    background:#ccc;
    border:0px;
    color:#fff;
}


.prooduct_share_friends{
    overflow: hidden;
    position: relative;
    width: 178px;
    background-color:  #42a6fc;
    border: 1px solid  #42a6fc;
    color: #FFF;
    font-family: 'Microsoft Yahei';
    height: 38px;
    line-height: 38px;
    text-align: center;
    font-size: 16px;
}

.product_good_style {
    margin-top:36px;
    display: flex;
    margin-right:12px;
    justify-content:space-between;
}

.good_style_tip{
    font-family: MicrosoftYaHei;
	font-size: 14px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 18px;
	letter-spacing: 0px;
	color: #42a6fc;
    margin-right:12px;
    margin-left:12px;
}

.shop_detail {
    padding-bottom:12px;
}

</style>

