<template>
    <div>
        <van-panel title="建议标题">
            <div>{{analysis.analysisTitle}}</div>
        </van-panel>
        <van-cell title="提报单位">
            <span slot="default" style="font-size:16px;">{{analysis.analysisDept}}</span>
        </van-cell>
        <van-cell title="提报时间">
            <span slot="default" style="font-size:16px;">{{analysis.submitTime}}</span>
        </van-cell>
        <van-panel title="建议内容">
            <div>{{analysis.analysisContent}}</div>
        </van-panel>
    </div>
</template>
<script>
    import Vue from "vue";
    import { Panel, Cell, Dialog } from "vant";
    import axios from "axios";
    import utils from "../util/utils";

    Vue.use(Panel)
        .use(Cell)
        .use(axios)
        .use(Dialog);

    export default {
        created: function() {
            window.document.title = "专业数据分析详情";
            var deptId = this.$route.query.deptId;
            var month = this.$route.query.month;
            axios
                .get(this.global.javaapi + "/dataAnalysisInfo", {
                    params: {
                        deptId: deptId,
                        month: month
                    }
                })
                .then(response => {
                    if(response.data.result.analysisDept){
                        this.analysis=response.data.result;
                    }
                    else{
                        Dialog.alert({
                            title: "提示",
                            message: "本月未提报工作建议。"
                        }).then(() => {
                            this.$router.go(-1);
                        });
                    }
                })
                .catch(err => {
                    utils.AlertError(err);
                });
        },
        data() {
            return {
                analysis: {}
            };
        }
    };
</script>
<style>
    .van-cell__title {
        text-align: left;
    }
    .van-cell__title span {
        font-size: 16px;
    }
    .van-panel__content div {
        padding: 15px 20px;
        font-size: 16px;
        text-align: left;
        color: #999;
    }
</style>