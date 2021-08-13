<template>
  <div class="layout-content">
    <div class="container flex-col">
      <div class="container-body">
        <div class="container-left flex-col">
          <div class="search-result">
            <div class="flex-row _mt">
              <div class="search-area">
                <el-input v-model="sInpKey" @keydown.enter.native="fSearch" clearable />
                <i class="iconfont icon-sousuo" @click="fSearch"></i>
              </div>
            </div>
            <div class="flex-row _mt">
              <el-tabs v-model="sActiveName" @tab-click="fSearch">
                <el-tab-pane :label="`全部（${nTotalResult}）`" name="all"></el-tab-pane>
                <el-tab-pane :label="`方案库（${nCaseCount}）`" name="1"></el-tab-pane>
                <el-tab-pane :label="`专家库（${nExpertCount}）`" name="2"></el-tab-pane>
                <el-tab-pane :label="`政策法规（${nPolicyCount}）`" name="3"></el-tab-pane>
              </el-tabs>
            </div>
            <div class="flex-row _mt">
              <el-table :data="aList" :show-header="false" v-loading="bLoading">
                <el-table-column prop="title">
                  <template slot-scope="{ row }">
                    <el-link :href="row | fRtnHref" :underline="false" target="_blank">
                      <div class="search-item">
                        <div class="search-item-title">{{ row.title }}</div>
                        <div class="search-item-summary">{{ row.content.replace(" ", "") }}</div>
                      </div>
                    </el-link>
                  </template>
                </el-table-column>
                <template slot="empty">
                  <el-image :src="require('@/assets/images/views/search/empty.png')"></el-image>
                  <div class="empty-text">暂无搜索结果</div>
                </template>
              </el-table>
            </div>
            <div class="flex-row _mt">
              <el-pagination
                :current-page="nCurrentPage"
                :page-size="nPageSize"
                :total="nTotalCount"
                :hide-on-single-page="true"
                prev-text="上一页"
                next-text="下一页"
                background
                layout="slot, total, prev, pager, next"
                @size-change="fHandleSizeChange"
                @current-change="fHandleCurrentChange"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * @desc SearchResult.vue
 * @author caoyu
 * @CreatedTime 2021/7/14 11:12 上午
 **/
export default {
  name: "SearchResult",
  props: {},
  components: {},
  data() {
    return {
      sActiveName: "all",
      nCurrentPage: 1,
      nPageSize: 8, //每页限制条数
      nTotalCount: 0, //数据总数
      nTotalResult: 0,
      nCaseCount: 0,
      nExpertCount: 0,
      nPolicyCount: 0,
      aList: [],
      bLoading: false,
      sInpKey: "",
    };
  },
  computed: {
    keyword: {
      get() {
        return decodeURIComponent(this.$route.query.keyword);
      },
      set(val) {
        return val;
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
    this.$store.commit("common/updateBreadcrumb", [{ name: "search", title: "搜索结果" }]);
    if (this.$route.query.keyword) {
      this.sInpKey = decodeURIComponent(this.$route.query.keyword);
    } else {
      this.sInpKey = "";
    }
  },
  mounted() {},
  methods: {
    fHandleSizeChange(val) {
      this.nPageSize = val;
      this.fDoSearch();
    },
    fHandleCurrentChange(val) {
      this.nCurrentPage = val;
      this.fDoSearch();
    },
    //输入框的相关操作
    fSearch() {
      this.nCurrentPage = 1;
      this.fDoSearch();
    },
    //查询事件
    fDoSearch() {
      if (this.searchKey !== this.sInpKey) this.searchKey = this.sInpKey;
      this.bLoading = true;
      this.aList = [];
      this.fGetResultCount();
      this.fGetList();
    },
    //列表项点击事件
    fTableRowClick(row) {
      let oRoute;
      switch (row.type) {
        case "1":
          // this.$store.commit("common/updateRoutPathName", "case");
          oRoute = this.$router.resolve({
            path: `case/case_detail/${row.id}`,
          });
          break;
        case "2":
          // this.$store.commit("common/updateRoutPathName", "expert");
          oRoute = this.$router.resolve({
            path: `/expert_detail/${row.id}`,
          });
          break;
        case "3":
          // this.$store.commit("common/updateRoutPathName", "policy");
          oRoute = this.$router.resolve({
            path: `/policy_detail/${row.id}`,
          });
          break;
      }
      window.open(oRoute.href, "_blank");
    },
    //获取结果数量
    fGetResultCount() {
      this.$axios({
        url: "/es/count",
        method: "get",
        params: {
          keyword: this.sInpKey,
        },
      }).then(({ data }) => {
        this.nTotalResult = data.total;
        this.nCaseCount = data["1"];
        this.nExpertCount = data["2"];
        this.nPolicyCount = data["3"];
      });
    },
    //获取搜索结果列表
    fGetList() {
      this.$axios({
        url: "es/page",
        method: "get",
        params: {
          page: this.nCurrentPage,
          size: this.nPageSize,
          type: this.sActiveName === "all" ? "" : this.sActiveName,
          keyword: this.sInpKey,
        },
      })
        .then(({ data }) => {
          this.aList = data;
          this.bLoading = false;
        })
        .catch(() => {
          this.bLoading = false;
        });
    },
  },
  filters: {
    fRtnHref(row) {
      switch (row.type) {
        case "1": // 方案库
          return `/case_detail/${row.id}`;
        case "2": // 专家库
          return `/expert_detail/${row.id}`;
        case "3": // 政策法规
          return `/policy_detail/${row.id}`;
      }
    },
  },
  watch: {
    sInpKey: {
      handler(sKey) {
        if (sKey) this.fSearch();
      },
      immediate: true,
    },
  },
};
</script>

<style lang="less" scoped>
.search-result {
}

.iconfont {
  font-size: 24px;
}

.search-area {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 46px;
  width: 572px;
  padding: 1px 12px;
  line-height: 46px;
  border: 1px solid @c_bor_base;
  border-radius: @s_border_radius_big;
  .l_pre(transition, all 0.3s ease-out);

  &:hover {
    border-color: @c_main;

    > i {
      color: @c_main;
    }
  }

  > input {
    flex: 1;
    font-size: 16px;
    background-color: transparent;
    outline: none;
    border: 0 none;
  }

  > i {
    font-size: 24px;
    color: @c_bor_base;
    cursor: pointer;
  }
}

.empty-text {
  font-size: @s_font_larger;
}

.search-item {
}

.search-item-title {
  margin-bottom: 2 * @s_mg_v;
  font-size: @s_font_larger;
  color: @c_font_main;
}

.search-item-summary {
  //width: 60%;
  color: @c_font_sec;
  .l_clamp(2);
}

.el-link.el-link--default {
  color: unset;
  cursor: default;
}

::v-deep {
  .el-tabs__nav-wrap::after {
    background-color: transparent;
  }

  .el-input__inner {
    font-size: 16px;
    padding: 0 12px 0 0;
    border: none;
    background-color: transparent;
  }

  .cell {
    padding: 2 * @s_mg_v 0.5 * @s_mg_h;
    //margin-bottom: 2 * @s_mg_v;
    border-bottom: 1px solid @c_bor_base;
    transition: all 0.3s ease-out;

    &:hover,
    &:focus,
    &._active {
      background-color: #f2f2f2;
    }
  }

  .el-table td,
  .el-table th.is-leaf {
    padding: 0;
    border: 0 none;
  }

  .el-table--border::after,
  .el-table--group::after,
  .el-table::before {
    display: none;
  }

  .el-table--enable-row-hover .el-table__body tr:hover > td {
    background-color: @c_white;
  }
}
</style>
<style lang="less">
.search-result {
}
</style>
