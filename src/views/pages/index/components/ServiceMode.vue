<template>
  <div class="service-mode flex-col">
    <div class="block-title _light">服务模式</div>
    <div class="mode-body">
      <div class="container">
        <div class="mode-body-top">
          <div class="_block _left">
            <div class="mode-icon _1"></div>
            <div class="mode-title">系统架构</div>
            <div class="mode-detail">
              基于碳排放因子库、活动库、构建碳排放管理智能化闭环<br />满足企业碳自查、碳核查的核心需求
            </div>
          </div>
          <div class="_block _right">
            <div class="mode-icon _2"></div>
            <div class="mode-title">智能管理</div>
            <div class="mode-detail">
              为企业提供集“录入、分析、评估、优化”为一体的碳排放<br />智能化管理服务平台，赋能企业智能制造，助力实现碳中和
            </div>
          </div>
        </div>
        <div class="mode-body-bottom" style="display: inline-flex">
          <div class="_block _left">
            <div class="mode-icon _3"></div>
            <div class="mode-title">专家解读</div>
            <div class="mode-detail">
              集中优质专家资源，为企业提供咨询对接平台，<br />解读排放报告，提供高效优化方案
            </div>
            <el-button class="btn-more" size="small" round>
              <el-link type="primary" href="/expert" :underline="false">查看更多</el-link>
            </el-button>
          </div>
          <div class="_block _center">
            <div class="mode-icon _4"></div>
            <div class="mode-title">碳方案库</div>
            <div class="mode-detail">
              提供节能减排成熟方案，为企业提供碳排放相关政策，<br />碳市场相关信息，助力企业把握决策方向，提升决策价值
            </div>
            <el-button class="btn-more" size="small" round>
              <el-link type="primary" href="/case" :underline="false">查看更多</el-link>
            </el-button>
          </div>
          <div class="_block _right">
            <div class="mode-icon _5"></div>
            <div class="mode-title">国家标准</div>
            <div class="mode-detail">
              依照生态环境部发布的相关文件，规范核查术语、活动定义<br />及因子数据，以标准化的方式输出排放报告
            </div>
            <el-button class="btn-more" size="small" round>
              <el-link type="primary" href="/policy" :underline="false">查看更多</el-link>
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * @description ServiceMode.vue
 * @author 13660
 * @CreatedTime 2021/7/14 15:46
 **/
export default {
  name: "ServiceMode",
  props: {},
  components: {},
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    fGoPage(type) {
      switch (type) {
        case "case":
          this.$router.push({ name: "case" });
          break;
        case "expert":
          this.$router.push({ name: "expert" });
          break;
        case "policy":
          this.$router.push({ name: "policy" });
          break;
      }
    },
  },
  filters: {},
  watch: {},
};
</script>

<style lang="less" scoped>
.service-mode {
  position: relative;
  flex: 1;
  //height: 588px;
  padding: 5 * @s_mg_v 0 3 * @s_mg_v;
  .l_linear_gradient(@c_title_block, #00367d, 150deg);

  &::before {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 494px;
    content: "";
    background: url("~@/assets/images/views/index/service-mode/corner-white.png") no-repeat -80px bottom;
    opacity: 0.2;
  }
}

.mode-body {
  text-align: center;
  padding: 2 * @s_mg_v 0;
}

.mode-body-top {
  display: inline-flex;
  border-bottom: 2px solid rgb(1, 37, 85);

  ._block {
    width: 555px;
    height: 227px;
    padding-top: 3 * @s_mg_v;

    &._left {
      border-right: 1px solid rgb(1, 37, 85);
    }

    &._right {
      border-left: 1px solid rgb(1, 74, 172);
    }
  }
}

.mode-body-bottom {
  display: inline-flex;
  border-top: 2px solid rgb(1, 74, 172);

  ._block {
    width: 370px;
    padding-top: 3 * @s_mg_v;

    &._left {
      border-right: 1px solid rgb(1, 37, 85);
    }

    &._center {
      border-left: 1px solid rgb(1, 74, 172);
      border-right: 1px solid rgb(1, 37, 85);
    }

    &._right {
      border-left: 1px solid rgb(1, 74, 172);
    }
  }
}

.mode-icon {
  width: 58px;
  height: 52px;
  margin: 0 auto 2 * @s_mg_v;
  background: no-repeat center;

  &._1 {
    background-image: url("~@/assets/images/views/index/service-mode/1.png");
  }

  &._2 {
    background-image: url("~@/assets/images/views/index/service-mode/2.png");
  }

  &._3 {
    background-image: url("~@/assets/images/views/index/service-mode/3.png");
  }

  &._4 {
    background-image: url("~@/assets/images/views/index/service-mode/4.png");
  }

  &._5 {
    background-image: url("~@/assets/images/views/index/service-mode/5.png");
  }
}

.mode-title {
  font-size: @s_font_medium;
  color: @c_white;
  text-align: center;
  margin-bottom: 2 * @s_mg_v;
}

.mode-detail {
  font-size: @s_font;
  color: @c_white;
  margin-bottom: 2 * @s_mg_v;
  line-height: 30px;
  text-align: center;
}

.btn-more {
  margin: 0 auto;
  color: @c_main;
}
</style>
