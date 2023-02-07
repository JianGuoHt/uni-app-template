<template>
  <view>
    <NavBar title="测试"></NavBar>
    <image src="/static/logo.png" mode="scaleToFill" />
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: 'Hello',
    };
  },
  onLoad() {},
  onReady() {
    this.$refs.toast.show({ message: 'aa' });
  },
  methods: {},
};
</script>

<style lang="scss" scoped></style>
