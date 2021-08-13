<template>
  <div class="home">
    <div class="flex-row">
      <service-step></service-step>
    </div>
    <div class="flex-row">
      <application-scenarios></application-scenarios>
    </div>
    <div class="flex-row">
      <service-mode></service-mode>
    </div>
    <div class="flex-row">
      <partners></partners>
    </div>
  </div>
</template>

<script>
import ServiceStep from "@/views/pages/index/components/ServiceStep";
import ApplicationScenarios from "@/views/pages/index/components/ApplicationScenarios";
import ServiceMode from "@/views/pages/index/components/ServiceMode";
import Partners from "@/views/pages/index/components/Partners";

/**
 * @description home.vue
 * @author handle、
 * @CreatedTime 2021/7/5 15:25
 **/
export default {
  name: "home",
  props: {},
  components: { ServiceStep, ApplicationScenarios, ServiceMode, Partners },
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
.home {
}

::v-deep {
  .block-title {
    margin-bottom: 4 * @s_mg_v;
  }
}
</style>
<style lang="less">
.home {
}
</style>
