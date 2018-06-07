<!-- 
    产品评论集合体
-->

<template>
    <div>
            <div>
                <CommentItem :commentList="this.commentList" ></CommentItem>
            </div>

            <div v-if="checkPageDataEmpty()">
                    <img class="data-img-empty" src="../../../static/pic_content_empty.png"/>
            </div>

            <div v-if="this.shouldShowLoadMore()">
                <BottomLoading :loadingType="this.buttomLoadingType" @loadingMore="loadingMore">
                </BottomLoading>
            </div>

    </div>

</template>

<script>

import CommentItem from "./CommentItem.vue"
import BottomLoading from '../common/BottomLoading.vue'
import http from "../../utils/http"
import Log from '../../common/Log';

export default {
    components : {
        CommentItem,
        BottomLoading    
    },

    props: {
        productId: {
            type:String,
            required:true 
        }
    },

    data() {
        return {
            commentList : [] ,

            buttomLoadingType : 0 ,

            dataCanLoadMore: false ,

            //当前page
            currentPageIndex : 1  ,

            currentPageSize : 15 
        }
    },

    methods : {
        checkPageDataEmpty() {
            return !this.productCommentList  ;
        },

        shouldShowLoadMore() {
            return this.dataCanLoadMore;
        },

        loadingMore() {
            this.request_product_comment(this.currentPageIndex);
        },

        request_product_comment(pageIndex = 1) {
            let url = "supplierEvaluate" ;
            let params = {
                productId : this.productId,
                pageIndex : pageIndex,
                pageSize : this.currentPageSize 
            }

            this.buttomLoadingType = 1 ;
            http.get(url,params).then(data => {
                console.log(data);

                if(pageIndex == 1) {
                  this.commentList = []   
                }

                this.currentPageIndex ++ ;
                this.buttomLoadingType = 0 ;
                if(data.code == 200 ) {
                    if(data.data) {
                        this.commentList = this.commentList.concat(data.data);
                    }
                    this.dataCanLoadMore = data.data && data.data.length >= this.currentPageSize ;

                }else {
                    this.showMessageInfo(data.message, "error");      
                    this.dataCanLoadMore = false;              
                }

            }, error => {
                    this.showMessageInfo("获取评论失败","error");
                    this.dataCanLoadMore = false;
                    this.buttomLoadingType = 0 ;
            });
        },

        showMessageInfo(msg,type) {
         this.$message({
             message: msg,
             type: type
           });
        }
    },

    mounted() {
        this.request_product_comment()
    }
}
</script>

<style>

.data-img-empty {
    width:180px;
    height: 180px;
    margin-top: 80px;

}

</style>
