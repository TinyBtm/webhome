<template>
  <el-table :data="aboutArticle" :show-header="false" empty-text="未查询到相关文章">
    <el-table-column prop="name">
      <template slot-scope="{ row }">
        <el-link :href="`/expert_detail/article/${row.id}`" :underline="false" target="_blank"
          >{{ `${row.articleAuthor}: ${row.articleTitle}` }}
        </el-link>
      </template>
    </el-table-column>
    <el-table-column prop="date" width="106">
      <template slot-scope="{ row }"> {{ row.date | fRtnDate }}</template>
    </el-table-column>
  </el-table>
</template>

<script>
import moment from "moment";

/**
 * @description CompArticle.vue
 * @author handle、
 * @CreatedTime 2021/7/22 10:56
 **/
export default {
  name: "CompArticle",
  props: {
    aboutArticle: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  components: {},
  data() {
    return {};
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
  },
  created() {},
  mounted() {},
  methods: {
    fOnArticleRowClick(row) {
      const oRoute = this.$router.resolve({
        path: `/article/${row.id}`,
      });
      // this.$store.commit("common/updateRoutPathName", "expert");
      window.open(oRoute.href, "_blank");
    },
  },
  filters: {
    fRtnDate(date) {
      return moment(date).format("yyyy-MM-DD");
    },
  },
  watch: {},
};
</script>

<style lang="less" scoped></style>
