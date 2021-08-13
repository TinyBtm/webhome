<template>
  <div class="wrap-abs">
    <div class="error-box">
      <div class="error-icon"></div>
      <div class="error-msg">
        <div class="error-msg-row _state">401</div>
        <div class="error-msg-row">抱歉，您暂无访问该页面的权限！</div>
        <div class="error-msg-row">
          <el-button type="success" @click="$router.history.go(-1)">返回上一页</el-button>
          <el-button type="success" @click="$router.replace({ name: 'login' })">前往登录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * @description 401.vue
 * @author caoyu
 * @CreatedTime 2021/6/28 17:16
 **/
export default {
  name: "error-401",
  props: {},
  components: {},
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {},
  filters: {},
  watch: {},
};
</script>

<style lang="less" scoped>
@import url("~@/assets/css/views/error/index");
</style>
