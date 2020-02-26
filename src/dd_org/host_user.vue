<template>
  <div id="host_user">
    <van-checkbox-group v-model="result" style="padding-bottom:45px">
      <van-cell-group>
        <van-cell
          v-for="(item, index) in list"
          clickable
          :key="item"
          :title="item"
          @click="toggle(index)"
        >
          <van-checkbox slot="right-icon" :name="item" ref="checkboxes" />
        </van-cell>
      </van-cell-group>
    </van-checkbox-group>
    <div class="van-address-list__bottom" >
      <van-button type="default" size="small" @click="btnCancle" style="margin-right:10px">取消</van-button>
      <van-button type="info" size="small" @click="btnOK">确定</van-button>
    </div>
  </div>
</template>

<script>
import { Checkbox, CheckboxGroup, Cell, CellGroup, Button } from "vant";
import Vue from "vue";
Vue.use(Checkbox)
  .use(CheckboxGroup)
  .use(Cell)
  .use(CellGroup)
  .use(Button);
export default {
  name:"host_user",
  data() {
    return {
      list: ["张三", "李总","陈琪"],
      result:[]
    };
  },
  methods: {
    btnOK() {
       this.$emit('return-value', this.result);
    },
    btnCancle()
    {
        this.$emit('return-value', '');
    },
    toggle(index) {
      this.$refs.checkboxes[index].toggle();
    }
  }
};
</script>

<style>
#host_user {
  text-align: left;
  padding: 15px;
}

.van-address-list__bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 999;
  box-sizing: border-box;
  width: 100%;
  padding: 5px 16px;
  background-color: #fff;
  text-align: right;
}
.van-address-list__add {
  height: 40px;
  line-height: 38px;
}
</style>
