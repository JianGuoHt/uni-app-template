<template>
  <view>
    <u-toast ref="uToast"></u-toast>
  </view>
</template>

<script>
export default {
  methods: {
    show(params) {
      this.$refs.uToast.show(params);
    },
  },
};
</script>

<style></style>
