<template>
  <div class="service-step container">
    <div class="block-title">服务流程</div>
    <div class="flex-row step-cont">
      <div
        :class="['flex-col', 'step-item', { _haspdr: i < aSteps.length - 1 }]"
        v-for="(step, i) in aSteps"
        :key="`step_${step.icon}_${i}`"
      >
        <div class="step-icon">
          <span :class="['iconfont', `icon-${step.icon}`]"></span>
        </div>
        <div class="step-title" v-html="step.title"></div>
        <div class="step-detail" v-html="step.subTitle"></div>
        <div class="iconfont icon-you_" v-show="i < aSteps.length - 1"></div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * @description service.vue
 * @author 13660
 * @CreatedTime 2021/7/13 17:28
 **/
export default {
  name: "service",
  props: {},
  components: {},
  data() {
    return {
      aSteps: [
        {
          icon: "xuqiuzhitongche",
          title: "了解核查",
          subTitle: "获取核查基本概念及相关知识，了解碳核查流程和相关方法",
        },
        {
          icon: "shenqingshenpi",
          title: "申请核查",
          subTitle: "注册登录平台，填写企业属性信息，申请平台核查服务",
        },
        {
          icon: "icon_xinyong_xianxing_jijin-",
          title: "开展核查",
          subTitle: "根据企业行业类型，填写县官活动排放信息，完成企业碳自查",
        },
        {
          icon: "yanjianggao",
          title: "生成报告",
          subTitle: "汇总整理相关活动排放信息，根据相关标准，输出标准格式报告",
        },
        {
          icon: "expert-library",
          title: "专家方案",
          subTitle: "为企业节碳减排提供可靠的专家咨询服务，以及碳方案以供参考",
        },
      ],
    };
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
.service-step {
  padding: 5 * @s_mg_v 0 4 * @s_mg_v;
}

.step-cont {
  padding-top: 2 * @s_mg_v;
}

.step-item {
  position: relative;
  //height: 204px;

  &._haspdr {
    padding-right: 62px;
  }

  > .iconfont {
    position: absolute;
    top: 44px;
    right: 12px;
    font-size: 38px;
  }
}

.step-icon {
  width: 126px;
  height: 126px;
  border-radius: 50%;
  text-align: center;
  line-height: 126px;
  margin: 0 auto;
  .l_pre(box-shadow, -2px -1px 4px 0 @c_bor_base);

  .iconfont {
    font-size: 50px;
  }
}

.step-title {
  text-align: center;
  margin-top: 2 * @s_mg_v;
  font-size: 18px;
  line-height: 19px;
  color: @c_font_main;
}

.step-detail {
  text-align: center;
  margin-top: 12px;
  font-size: 14px;
  line-height: 19px;
  color: @c_font_sec;
}
</style>
