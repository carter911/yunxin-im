<!-- 
评论Item 
-->

<template>
    <div>
        <div class="comment-item" v-for="(item,index) in this.commentList" 
                 :key="index"
                 onmouseover="this.style.backgroundColor='#F4F9FD'"  
                 onmouseout="this.style.backgroundColor='#FFFFFF'">
                
                <div class="comment-img"> 
                    <img :src='get_comment_avatar(item)' class="project-comment-avatar"/>
                </div>

                <div class="comment-list-desc">
                    <div class="product-comment-item-title">{{ item.user_name }}</div>
                    <div class="product-comment-item-content"> {{ item.content }}</div>
                </div>

                <div class="comment-item-time">
                    <span> {{ item.time }}</span>
                </div>   
        </div>
    </div>
</template>

<script>

import Log from '../../common/Log';

export default {
    props : {
        commentList : {
            type:Array,
            required:true
        }
    },

    methods : {
        get_comment_avatar(item) {
            if(null == item || null == item.avatar || !item.avatar.length) return Log.DEFAULT_IMAGE() ;
            return item.avatar ;
        },

        parse_comment_detail(item) {
            return "" ;
        }
    }

}
</script>

<style>

.comment-item {
    border-bottom: #f2f2f2 1px solid;
    padding: 4px 10px;
    text-align:center;
    display:flex;  
    justify-content:space-between;
}

.comment-img {
    display: flex;
    padding-left: 8px;
    padding-top: 4px;
    padding-bottom: 4px;
}

.project-comment-avatar{
    width: 40px;
	height: 40px;
    border-radius: 50%;
}

.comment-list-desc{
    flex-grow:1;
    padding-left:12px;
    padding-right:12px;
    padding-top: 4px;
    text-align:left;
}

.product-comment-item-title {
    font-size: 14px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 30px;
	letter-spacing: 0px;
	color: #333333;

}

.product-comment-item-content{
    margin: auto;
    font-size: 12px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 48px;
	letter-spacing: 0px;
	color: #666666;
}

.comment-item-time{
    margin: auto;
    font-size: 12px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 48px;
	letter-spacing: 0px;
	color: #999999;
    min-width: 100px;
}



</style>
