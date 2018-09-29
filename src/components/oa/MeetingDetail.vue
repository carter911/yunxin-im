<template>

    <div class="meeting_detail" v-html="meetingDetail">


    </div>
    
</template>

<script>

    import http from "../../utils/http"

    export default {
        name: "meeting-detail",
        prop:{
          url:{
              type:String,
              required:true
          }
        },

        data() {
            return {

            }
        },

        computed: {
            meetingDetail(){
                return "<h1>detail</h1> hello world" ;
            }
        },



    }
</script>

<style scoped>

    .meeting_detail {



    }

</style>