
<template>
  <div id="pf" ref="pfscroll" style="text-align: left" v-if="visible">
    <div
      id="title"
      style="text-align:left;height:50px;font-size:16px;;line-height: 25px;font-weight:700;margin-left:10px;margin-right:10px;margin-bottom:5px"
    >您的评价是食堂菜品改进提升的方向和动力，非常感谢您认真完成本测评。</div>
    <div style="overflow-y:auto;background:#EEEEEE;" :style="{height: scrollerHeight}">
      <div
        class="panel"
        v-for="(food,uindex)  in foods"
        :key="food.id"
        style="text-align: left;padding-left:8px;padding-right:5px;margin-top:9px;background:#fff;"
      >
        <van-row>
          <div style="float:left;">
            <img
              style="height:90px;width:100px;padding:10px;border-radius: 20px;padding-left:2px"
              :src="food.pic"
              @click="DDimg(food.pic)"
            />
          </div>
          <div>
            <div style="font-size:18px;font-weight:700;padding-top:10px;">{{uindex+1}}.{{food.name}}</div>
            <div style="margin-top:8px;display:inline-flex">
              <font style>喜爱度：</font>
              <van-rate v-model="food.value1"  :disabled="save"/>
              <div
                style="float:right;;margin-left:10px;font-size:16px;color:#FFCC33"
              >{{getPingjia(food.value1)}}</div>
            </div>

            <div style="margin-top:8px;display:inline-flex">
              色香味：
              <van-rate v-model="food.value2" :disabled="save"/>
              <div
                style="float:right;;margin-left:10px;font-size:16px;color:#FFCC33"
              >{{getPingjia(food.value2)}}</div>
            </div>
          </div>
        </van-row>
      </div>
      <div style="background:#fff;">
        <div
          style="font-size:18px;font-size:18px;font-weight:700;margin-top:10px;margin-left:15px;padding-top:10px"
        >{{foods.length+1}}.您对食堂员工服务态度评价</div>
        <div style="margin:5px;margin-left:15px;display:inline-flex">
          <van-rate v-model="values[0]" :disabled="save"/>
          <div
            style="float:right;;margin-left:10px;font-size:16px;color:#FFCC33"
          >{{getPingjia(values[0])}}</div>
        </div>

        <div
          style="font-size:18px;font-size:18px;font-weight:700;margin-top:10px;margin-left:15px"
        >{{foods.length+2}}.您对饭菜性价比综合评价</div>
        <div style="margin:5px;margin-left:15px;display:inline-flex">
          <van-rate v-model="values[1]" :disabled="save"/>
          <div
            style="float:right;;margin-left:10px;font-size:16px;color:#FFCC33"
          >{{getPingjia(values[1])}}</div>
        </div>
        <div
          style="font-size:18px;font-size:18px;font-weight:700;margin-top:10px;margin-left:15px"
        >{{foods.length+3}}.您对食堂餐饮满意度综合评价</div>
        <div style="margin:5px;margin-left:15px;display:inline-flex">
          <van-rate v-model="values[2]" :disabled="save" />
          <div
            style="float:right;;margin-left:10px;font-size:16px;color:#FFCC33"
          >{{getPingjia(values[2])}}</div>
        </div>

        <div
          style="font-size:18px;font-size:18px;font-weight:700;margin-top:10px;margin-left:15px"
        >{{foods.length+4}}.推荐一道您喜欢的家常菜或时令菜</div>
        <div style="margin:5px;">
          <van-field
            v-model="values[3]"
            rows="3"
            label-width="0"
            autosize
            type="textarea"
            maxlength="150"
            show-word-limit
            placeholder="(选填)请输入内容"
            :disabled="save"
          />
        </div>

        <div
          style="font-size:18px;font-size:18px;font-weight:700;margin-top:10px;margin-left:15px"
        >{{foods.length+5}}.您对食堂饭菜提升等方面有何建议</div>
        <div style="margin:5px;">
          <van-field
            v-model="values[4]"
            rows="3"
            label-width="0"
            autosize
            type="textarea"
            maxlength="150"
            show-word-limit
            placeholder="(选填)请输入内容"
            :disabled="save"
          />
        </div>
      </div>
    </div>
    <van-button :disabled="save" style="font-size:18px" type="primary" @click="btnConfirm" block>提交</van-button>
  </div>
</template>
<script>
import {
  NavBar,
  Toast,
  Button,
  Field,
  Cell,
  CellGroup,
  NoticeBar,
  Dialog,
  Panel,
  Col,
  Row,
  Rate
} from "vant";
import Vue from "vue";
import utils from "../util/utils";
import axios from "axios";
import * as dd from "dingtalk-jsapi";

Vue.use(Button)
  .use(NavBar)
  .use(Toast)
  .use(Field)
  .use(Cell)
  .use(CellGroup)
  .use(NoticeBar)
  .use(Dialog)
  .use(Panel)
  .use(Col)
  .use(Row)
  .use(Rate);
export default {
  created: function() {
    Toast.loading({
      message: "加载中...",
      loadingType: "spinner",
      duration: 0
    });

    let _this = this;

    _this.questionid = _this.$route.query.questionid;
    //_this.getValues("05273505221222370");

    dd.ready(function() {
      dd.ui.webViewBounce.disable();
      //获取个人信息
      dd.runtime.permission.requestAuthCode({
        corpId: _this.global.CorpId, // 企业id
        onSuccess: function(info) {
          var userUrl = _this.global.ddapi + "DD/GetUserInfo?code=" + info.code;
          axios
            .get(userUrl)
            //then获取成功；response成功后的返回值（对象）
            .then(res => {
              if (res.data.errorMsg != "") {
                utils.AlertError({
                  "获取钉钉用户信息异常：": res.data.errorMsg
                });
                Toast.clear();
              } else {
                window.ddUserInfo = JSON.parse(res.data.content);
                _this.getValues(window.ddUserInfo.userid);
              }
            })
            .catch(error => {
              utils.AlertError("获取用户信息失败:" + error);
            });
        },
        onFail: function(err) {
          utils.AlertError("获取用户信息失败:" + JSON.stringify(err));
        }
      });
    });
  },

  mounted: function() {},
  data() {
    return {
      save: true,
      foods: [],
      values: [],
      questionid: "",
      userid: "",
      visible: false
    };
  },
  methods: {
    getValues(userid) {
      let _this = this;

      axios
        .get(
          _this.global.ddapi +
            "Foods/GetFoods?questionid=" +
            _this.questionid +
            "&userid=" +
            userid
        )
        .then(response => {
          if (response.data.errorMsg != "") {
            Dialog.alert({
              message: response.data.errorMsg
            }).then(() => {
              // on close
            });
          } else {
            _this.foods = response.data.fooddto;
            _this.values = response.data.values;
            _this.questionid = response.data.questionid;
            _this.userid = response.data.userid;
            _this.save = response.data.save;
            _this.visible = true;
          }
          Toast.clear();
        });
    },
    DDimg(img) {
      dd.ready(function() {
        dd.biz.util.previewImage({
          urls: [img], //图片地址列表
          current: img //当前显示的图片链接
        });
      });
    },
    getPingjia: function(value) {
      if (value == 1) value = "差";
      if (value == 2) value = "一般";
      if (value == 3) value = "较好";
      if (value == 4) value = "好";
      if (value == 5) value = "特好";
      if (value == 0) value = "";
      return value;
    },
    btnConfirm() {
      let _this = this;
      var flag = false;
      for (var i = 0; i < _this.foods.length; i++) {
        if (_this.foods[i].value1 == 0 || _this.foods[i].value2 == 0) {
          Dialog.alert({
            title: "提示",
            message: "完成评价后再提交！"
          }).then(() => {});
          flag = true;
          return;
        }
      }

      if (flag) return;

      if (
        _this.values[0] == 0 ||
        _this.values[1] == 0 ||
        _this.values[2] == 0
      ) {
        Dialog.alert({
          title: "提示",
          message: "完成评价后再提交！"
        }).then(() => {});
        return;
      }

      Toast.loading({
        message: "提交中...",
        loadingType: "spinner",
        duration: 0
      });

      axios
        .post(this.global.ddapi + "Foods/SaveFoods", {
          questionid: _this.questionid,
          userid: _this.userid,
          fooddto: _this.foods,
          values: _this.values
        })
        .then(function(response) {
          Toast.clear();
          if (response.data == "") {
            _this.save = true;
            Dialog.alert({
              title: "提示",
              message: "感谢您提交的评价！"
            }).then(() => {});
          } else {
            Dialog.alert({ title: "提示", message: response.data });
          }
        })
        .catch(function(error) {
          Dialog.alert({ title: "提示", message: error });
        });
    }
  },
  computed: {
    scrollerHeight: function() {
      return window.innerHeight - 100 + "px";
    }
  }
};

dd.error(function(err) {
  utils.AlertError("钉钉鉴权失败，请联系管理员: " + JSON.stringify(err));
});
</script>

<style>
#pf {
  font-size: 16px;
}

.username .van-cell__title {
  color: #ff9966;
  font-size: 20px;
  font-weight: bold;
}

.btn {
  color: #ff9966 !important;
  font-size: 15px !important;
}

.btnSelect {
  color: #07c160 !important;
  font-size: 15px !important;
}

.userselect .van-cell__title {
  color: #07c160;
  font-size: 20px;
  font-weight: bold;
}

.van-cell__title {
  color: #0099cc;
  font-size: 18px;
}

.van-hairline--top-bottom::after,
.van-hairline-unset--top-bottom::after {
  border-width: 0px !important;
  border: none !important;
}

.van-cell:not(:last-child)::after {
  border-width: 0px !important;
  border: none !important;
}

.van-row {
  font-size: 16px;
}

.van-cell {
  padding: 3px 16px;
}
</style>

