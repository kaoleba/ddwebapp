
<template>
  <div>

    Test
    1
  </div>
</template>
<script>
import { Button } from "vant";
import Vue from "vue";
Vue.use(Button);


export default {
  methods:
  {
    toAdd()
    {
      this.$router.push({ path: '/addadvice' });
    }
  }
};
</script>

<style>

</style>
