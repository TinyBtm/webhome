<template>
  <div class="layout-content">
    <div class="container flex-col">
      <div class="container-body">
        <div class="container-left flex-col">
          <div class="list-plate">
            <el-table :data="aList" :show-header="false" v-loading="bLoading">
              <el-table-column prop="label">
                <template slot-scope="{ row }">
                  <list-plate
                    :title="row.name"
                    :sub-title="row.technicalTitle"
                    :content="row.introduce"
                    :tags="row.expertKeywordList"
                    :image="row.picture"
                    :href="`expert_detail/${row.id}`"
                  ></list-plate>
                </template>
              </el-table-column>
              <template slot="empty">
                <el-image :src="require('@/assets/images/views/search/empty.png')"></el-image>
                <div class="empty-text">暂无结果</div>
              </template>
            </el-table>
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
        <div class="container-right">
          <layout-aside in-page="expert" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LayoutAside from "@/layout/components/LayoutAside";
import ListPlate from "@/components/list/list-plate";
import store from "@/store";

let imgUrl;
if (process.env.NODE_ENV === "development") {
  const { SITE_CONFIG } = require("/public/config/config.dev.js");
  imgUrl = SITE_CONFIG.imgUrl;
} else {
  imgUrl = window.SITE_OPTION.imgUrl;
}

/**
 * @description list.vue
 * @author handle、
 * @CreatedTime 2021/7/12 16:08
 **/
export default {
  name: "list",
  props: {},
  components: { ListPlate, LayoutAside },
  data() {
    return {
      aList: [],
      nCurrentPage: 1,
      nPageSize: 8, //每页限制条数
      nTotalCount: 0, //数据总数
      bLoading: false,
    };
  },
  computed: {
    breadcrumb: {
      get() {
        return this.$store.state.common.breadcrumb;
      },
      set(val) {
        this.$store.commit("common/updateBreadcrumb", val);
      },
    },
    searchKey: {
      get() {
        return this.$store.state.common.searchKey;
      },
    },
  },
  beforeRouteEnter(to, from, next) {
    store.commit("common/updateSearchKey", "");
    next();
  },
  created() {
    this.fGetList();
    this.$store.commit("common/updateBreadcrumb", [{ name: "expert", title: "专家库" }]);
  },
  mounted() {},
  methods: {
    fHandleSizeChange(val) {
      this.nPageSize = val;
      this.fGetList();
    },
    fHandleCurrentChange(val) {
      this.nCurrentPage = val;
      this.fGetList();
    },
    //跳转详情页面
    fGoToDetail(row) {
      // this.breadcrumb = this.breadcrumb.concat([
      //   {
      //     name: "expert_detail",
      //     title: row.name,
      //   },
      // ]);
      this.$router.push({
        path: `/expert_detail/${row.id}`,
      });
    },
    fGetList() {
      this.bLoading = true;
      this.$axios({
        url: "/portal/expertPage",
        method: "get",
        params: {
          page: this.nCurrentPage - 1,
          size: this.nPageSize,
          condition: this.searchKey,
        },
      })
        .then(({ data }) => {
          this.aList = data.content;
          this.nTotalCount = data.totalElements;
          this.aList.forEach((list) => {
            list.picture = list.picture
              ? imgUrl + list.picture
              : require("@/assets/images/views/list/avatar_default.png");
          });
          this.bLoading = false;
        })
        .catch(() => {
          this.bLoading = false;
        });
    },
  },
  filters: {},
  watch: {
    searchKey: {
      handler(sKey) {
        if (sKey) this.fGetList();
      },
      immediate: true,
    },
  },
};
</script>

<style lang="less" scoped>
.list {
}
</style>
<style lang="less">
.list {
}
</style>
