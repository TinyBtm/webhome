<template>
  <div class="layout-subnav flex-row">
    <div class="flex-col _centerver _flex0 _ml">
      <div class="logo-title">碳排放公共服务平台</div>
    </div>
    <div class="flex-col _centerver _ml">
      <div class="nav-bar flex-row _centerver">
        <div :class="['nav-bar-item', { _active: routPathName === nav.name }]" v-for="nav in aNav" :key="nav.key">
          <el-link type="snow" :href="nav.path" :underline="false">{{ nav.meta.title }}</el-link>
        </div>
      </div>
    </div>
    <div class="flex-col _centerver _flex0 _ml">
      <div class="flex-row _centerver search-wrap">
        <div class="search-area" v-show="bShowSearch">
          <input
            type="text"
            v-model="sInputText"
            @blur="fDoSearch"
            @keydown.enter="fDoSearch"
            placeholder="请输入关键词"
          /><i class="iconfont icon-sousuo" @click="fDoSearch"></i>
        </div>
        <div class="search-area _icon" v-show="!bShowSearch" @click="fShowSearch">
          <i class="iconfont icon-sousuo"></i>
        </div>
        <div class="login-btn">
          <el-link type="snow" href="http://www.cloud-carbon.com/" :underline="false" target="_blank"
            >登陆/注册
          </el-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router/router";

/**
 * @desc LayoutSubnav.vue
 * @author caoyu
 * @CreatedTime 2021/7/13 11:25 上午
 **/
export default {
  name: "LayoutSubnav",
  props: {},
  components: {},
  data() {
    return {
      bShowSearch: false,
      sInputText: "",
      aNav: [],
      oNav: {},
    };
  },
  computed: {
    routPathName: {
      get() {
        return this.$store.state.common.routPathName;
      },
      set(val) {
        this.$store.commit("common/updateRoutPathName", val);
      },
    },
    breadcrumb: {
      get() {
        return this.$store.state.common.breadcrumb;
      },
      set(val) {
        this.$store.commit("common/updateBreadcrumb", val);
      },
    },
  },
  created() {
    if (this.$route.query.keyword) this.sInputText = decodeURIComponent(this.$route.query.keyword);
    this.aNav = router[0].children.filter((item) => {
      return !item.meta.hideInMenu;
    });
  },
  mounted() {},
  methods: {
    //显示搜索
    fShowSearch() {
      this.bShowSearch = true;
      // this.sInputText = "";
    },
    //搜索框失焦后事件
    fDoSearch() {
      if (this.sInputText) {
        // if (this.sInputText.trim() === "") return this.$message({ message: "请输入您要查询的内容", type: "warning" });
        let oRoute = this.$router.resolve({ name: "search", query: { keyword: encodeURIComponent(this.sInputText) } });
        this.bShowSearch = true;
        // this.$store.commit("common/updateRoutPathName", "search");
        window.open(oRoute.href, "_blank");
      } else return this.$message({ message: "请输入您要查询的内容", type: "warning" });
    },
    //菜单项点击事件
    fOnNavClick(oNav) {
      this.oNav = oNav;
      this.$router.push(oNav);
      this.routPathName = oNav.name;
      this.$emit("nav-select", oNav);
    },
  },
  filters: {},
  watch: {},
};
</script>

<style lang="less" scoped>
//@import url("~@/assets/css/_variables");

@c_highlight: #ffc600;
.layout-subnav {
}

.logo-title {
  font-size: 37px;
}

.nav-bar {
  justify-content: flex-end;
  font-size: 16px;
}

.nav-bar-item {
  cursor: pointer;
  .l_pre(transition, color 0.3s ease-out);

  a {
    font-size: 16px;
  }

  &:focus,
  &:hover,
  &._active {
    color: @c_highlight;

    a {
      color: @c_highlight;
    }
  }

  & + & {
    margin-left: 4 * @s_mg_h;
  }
}

.search-wrap {
  justify-content: flex-end;
  width: 360px;
  height: 100%;
}

.search-area {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 40px;
  width: 224px;
  padding: 1px 12px;
  line-height: 24px;
  border: 1px solid @c_white;
  border-radius: @s_border_radius;
  .l_pre(transition, all 0.3s ease-out);

  &:hover {
    color: @c_highlight;

    &:not(&._icon) {
      border-color: @c_highlight;
    }
  }

  > input {
    flex: 1;
    color: @c_white;
    font-size: 16px;
    background-color: transparent;
    outline: none;
    border: 0 none;
    .l_placeholder(@c_block);
  }

  > i {
    font-size: 24px;
    cursor: pointer;
  }

  &._icon {
    width: 50px;
    border-color: transparent;
  }
}

.login-btn {
  width: 120px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  margin-left: 2 * @s_mg_h;
  border: 1px solid @c_white;
  border-radius: 2.5 * @s_border_radius;
  cursor: pointer;

  &:hover {
    color: @c_highlight;
    border-color: @c_highlight;

    a {
      color: @c_highlight;
    }
  }
}

::v-deep {
}
</style>
<style lang="less">
.layout-subnav {
  height: 100%;
}
</style>
