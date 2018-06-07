<template>
  <div>
      <el-form ref="form" :model="form" label-width="50px">
            <el-row class="goods">
                <el-col :span="8">
                    <img width="100%"  :src="this.goodsInfo.curr_img"/>
                </el-col>
                <el-col class="goods_info" :span="16">
                    <h2>{{this.goodsInfo.product_name}}</h2>
                    <p>{{this.goodsInfo.discount_price}}</p>
                </el-col>
            </el-row>
            <el-form-item label="分享" class="share">
                <el-checkbox-group v-model="form.shareId">
                    <el-col v-for="(item, index) in shareUserList" :key="index">
                            <el-checkbox :key="item.owner_chat_id" :label="'team-'+item.owner_chat_id" name="goodsId">
                                {{item.project_name}}
                            </el-checkbox>
                            <el-checkbox v-if = "item.user.length>0" v-for="(itemUser) in item.user" :key="itemUser.user_id"   :label="'sgb'+itemUser.user_id" name="goodsId">{{itemUser.user_name}}</el-checkbox>
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
import types from '../../api/types'

import http from '../../utils/http'
export default {
    data(){
        return {
            form: {
                name: '',
                shareId: [],
            },
            goodsInfo:{},
            projectInfo:{},
            shareUserList:{}
        }
    },
    props: {
        goodsId:{
            type : String,
            required:true,
        },
        projectId:{
            type : String,
            required:true 
        }
    },
    created(){
        this.getGoodsDetail()
    },

    watch:{
        goodsId(){
            console.log('监听商品id的变化',this.projectId)
            this.getGoodsDetail()
        }
    },
    mounted(){
        //console.log('获取请求数据')
        this.getProjectInfo()
    },
    methods:{
        getGoodsDetail(){
            var params = {productId: this.goodsId, projectId: this.projectId}
            let self = this
            http.get(types.SUPPLIERGOODSINFO, params).then(function (res) {
                if (res.code === 200) {
                    let image = res.data.images.shift()
                    if(image){
                        res.data.curr_img = image
                    }
                    self.goodsInfo = res.data
                }
            }).catch(function (err) {
                console.log(err)
            })
        },
        getProjectInfo(){
            var url = this.projectId + '/projects'
            let self = this
            http.get(url).then(function (res) {
                if (res.code == 200) {
                    console.log(res.data)
                    self.projectInfo = res.data
                    self.getShareUserList()
                }
            }).catch(function (err) {
                    console.log('hhtp请求错误', err)
            })
        },
        getShareUserList(){
            let self = this
            console.log('获取项目详情------',this.projectInfo.companyId);
            let params = {
                companyId:this.projectInfo.companyId,
                projectId:this.projectId
            }
            console.log(params)
            http.get('companyproject',params).then(function (res) {
                if (res.code == 200) {
                    console.log('分享用户列表',res.data)
                    self.shareUserList = res.data
                    res.data.filter(function(item) {
                        return item;
                    });
                }
            }).catch(function (err) {
                    console.log('hhtp请求错误', err)
            })
        },

        onSubmit() {
            let goodsInfo =  this.goodsInfo
            console.log(goodsInfo)
            
            let content = {
                data: {
                image: goodsInfo.curr_img,
                image2:'',
                image3:"",
                name: "我向您分享了["+goodsInfo.product_name+"] 赶紧点击查看吧！",
                selectProductIds: goodsInfo.product_id
                },
                type: 1
            }
            
            let {shareId} = this.form
            let scene = 'team'
            shareId.forEach(element => {
                console.log(element)
                if(element.indexOf('sgb')>=0){
                   scene = 'p2p' 
                }else if(element.indexOf('team-')>=0){
                    scene = 'team' 
                    element = element.replace(/team-/g, '')
                }else{
                    console.log('分享失败');
                    return false;
                }

                //console.log(element);return false;
                this.$store.dispatch('sendMsg', {
                    type: 'custom',
                    scene: scene,
                    to: element,
                    text: '分享商品',
                    content: content
                })
            });

            this.$emit('ShareComplete')
            // console.log(shareId)
            // console.log(this.form)
            // console.log('submit!');
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