<template>
  <div class="application-scenarios">
    <div class="container">
      <div class="block-title">应用场景</div>
      <div class="scenery-btn">
        <button
          v-for="item in aRadio"
          :key="item.name"
          :class="['application-scenarios-item', { active: radio === item.text }]"
          @click="changingOver(item.text)"
        >
          {{ item.text }}
        </button>
      </div>
      <div class="scenarios scenery-block">
        <div class="scenery-business" v-show="radio === '企业'">
          <div class="icon icon-business"></div>
          <div class="text text-business">
            DOA/Handle系统不是单纯的标识编码系统，而是提供了包含标识编码、数据解析、数
            据管理、安全管理的整体基础架构支持的系统。
          </div>
        </div>
        <div class="scenery-group" v-show="radio === '集团'">
          <div class="icon icon-group"></div>
          <div class="text text-group">
            DOA/Handle系统不是单纯的标识编码系统，而是提供了包含标识编码、数据解析、数
            据管理、安全管理的整体基础架构支持的系统。
          </div>
        </div>
        <div class="scenery-supervision" v-show="radio === '监管'">
          <div class="icon icon-supervision"></div>
          <div class="text text-supervision">
            DOA/Handle系统不是单纯的标识编码系统，而是提供了包含标识编码、数据解析、数
            据管理、安全管理的整体基础架构支持的系统。
          </div>
        </div>
        <div class="scenery-platform" v-show="radio === '平台'">
          <div class="icon icon-platform"></div>
          <div class="text text-platform">
            DOA/Handle系统不是单纯的标识编码系统，而是提供了包含标识编码、数据解析、数
            据管理、安全管理的整体基础架构支持的系统。
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * @description ApplicationScenarios.vue
 * @author 13660
 * @CreatedTime 2021/7/14 11:25
 **/
export default {
  name: "ApplicationScenarios",
  props: {},
  components: {},
  data() {
    return {
      radio: "企业",
      aRadio: [
        { name: "business", text: "企业" },
        { name: "group", text: "集团" },
        { name: "supervision", text: "监管" },
        { name: "platform", text: "平台" },
      ],
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    changingOver(text) {
      this.radio = text;
    },
  },
  filters: {},
  watch: {},
};
</script>

<style lang="less" scoped>
.application-scenarios-item {
  width: 200px;
  height: 56px;
  margin-left: 0;
  border-radius: 0;
  color: @c_font_main;
  position: relative;
  border: 1px solid @c_bor_base;
  background-color: @c_white;
  cursor: pointer;
  outline: none;

  & + & {
    border-left: 0;
  }

  &.active {
    background-color: @c_main;
    color: @c_white;

    &:after {
      position: absolute;
      content: "";
      border-top: @c_main 10px solid;
      border-bottom: transparent 0 solid;
      border-right: transparent 10px solid;
      border-left: transparent 10px solid;
      transform: translate(-25px, 37px);
    }
  }
}

.application-scenarios {
  width: 100%;
  background-color: #fbfbfb;
  padding: 5 * @s_mg_v 0 3 * @s_mg_v;

  .scenery-btn {
    margin: 2 * @s_mg_v 0 0;
    text-align: center;
  }

  .scenery-block {
    border-bottom: 1px solid @c_bor_base;
    transition: all 0.3s ease-out;
    border-radius: @s_border_radius;
    .l_pre(box-shadow, 0 2px 6px 0 @c_bor_base);
  }

  .scenarios {
    margin: 2 * @s_mg_v 0;
    overflow: hidden;
    zoom: 1;
    height: 400px;
    background-color: @c_white;

    .icon {
      width: 656px;
      height: 368px;
      float: left;
      margin-top: 15px;
      margin-left: 10px;

      &.icon-business {
        background-image: url("~@/assets/images/views/index/business.jpg");
      }

      &.icon-group {
        background-image: url("~@/assets/images/views/index/group.jpg");
      }

      &.icon-supervision {
        background-image: url("~@/assets/images/views/index/supervision.jpg");
      }

      &.icon-platform {
        background-image: url("~@/assets/images/views/index/platform.jpg");
      }
    }

    .text {
      overflow: hidden;
      zoom: 1;
      font-size: @s_font_medium;
      line-height: 26px;
      text-indent: 50px;
      padding-top: 25px;
      padding-left: 10px;
    }
  }
}
</style>
