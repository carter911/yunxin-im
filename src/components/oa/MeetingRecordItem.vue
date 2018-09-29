<template>

    <div id="id_content" @click="onItemClick()">

        <el-row>
            <el-col>

                <el-card >

                    <div class="item_title">{{item.title}}</div>

                    <div class="item_record_time">记录时间: {{item.create_time}}</div>

                    <div class="item_desc">记录简介: {{item.desc}}</div>

                </el-card>

            </el-col>


        </el-row>


    </div>


</template>

<script>
    import ElCard from "element-ui/packages/card/src/main";

    export default {
        components: {ElCard},
        name: "meeting-record-item",

        props: {
            item: {
                type: Object,
                required: true
            }
        },

        methods: {
            onItemClick() {
                this.$emit("onItemClick", this.item);

            }
        }
    }
</script>

<style scoped>

    #id_content {
        margin: 12px;
    }

    .item_record_time{
        text-align: left;
        font-size: 12px;
        color: #a8a8a8;
    }

    .item_title {
        text-align: left;
        font-size: 15px;
        color: #494949;
    }

    .item_desc {
        text-align: left;
        font-size: 12px;
        color: #a0a0a0;
    }



</style>