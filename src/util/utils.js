import * as dd from "dingtalk-jsapi";

//获取当前时间戳
function AlertError(mes) {
  dd.ready(function () {
    dd.device.notification.alert({
      message: mes,
      title: "提示", //可传空
      buttonName: "确定"
    });
  });
}

export default {
  AlertError: AlertError,
}

