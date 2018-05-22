 <!-- 提醒详情 -->

<template>
    <div class="remind-content">

        <div class="remind-title">
            <h3>提醒详情</h3>
        </div>

        <div class="title">
            {{ remind.projectName }}
        </div>

        <div class="reminder"> {{ getReminder()}}</div>
        <div class="time"> {{ remind.startTime | formatDate}}</div>

        <div class="content" v-html="remind.detail"></div>

    </div>    

</template>

<script>
import Log from '../../common/Log';

export default {
    data() {
        return {
            pid : this.$route.params.id ,
            remind : {} 
        }
    },

    methods: {
        getReminder() {
            if(null == this.remind || undefined == this.remind.createUser) { return "" ; }

            let user = this.remind.createUser;
            return user.roleName + " " + user.name ;
        },

        request_remind_detail() {
            let url = this.pid + '/message' ;
            this.$http.get(url).then(response => {
                Log.L(response);

                if(response.data.code == 200) {
                    this.remind = response.data.data;
                }
            })
        }
    },

    created() {
        this.request_remind_detail();
    }


}
</script>

<style scope>
    .remind-content {
        padding: 8px;
    }

    .title {
        text-align: left;
    }

    .reminder {
        text-align: right;
    }

    .time {
        text-align: right; 
    }

    .content {
        text-align: left;
    }

    .img {
        width: 100%;
    }
</style>
