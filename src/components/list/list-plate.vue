<template>
  <el-link class="link-wrap" :href="href" :underline="false" target="_blank" @click.prevent="fOnItemClick">
    <div class="flex-row">
      <div class="list-image flex-col _flex0 _ml" v-if="image">
        <el-image :src="image" fit="cover" />
      </div>
      <div :class="['flex-col list-content _ml', { _noimg: !image }]" @click="$emit('row-click')">
        <div class="list-title">
          {{ title }}<span v-if="subTitle" class="list-title-sub">{{ subTitle }}</span>
        </div>
        <el-tooltip :content="content" placement="top" :disabled="content.length <= 70">
          <p class="p-content">
            {{ content.length > 70 ? `${content.substr(0, 70)}...` : content }}
          </p>
        </el-tooltip>
        <div class="flex-row list-footer">
          <div class="flex-col _flex0 _centerver" v-if="date">{{ sDate }}</div>
          <div class="flex-col _centerver">
            <div class="flex-row list-tag">
              <el-tooltip v-for="item in tags" :key="item" :content="item" :disabled="item.length <= 4" placement="top">
                <el-link :href="`/search?keyword=${encodeURIComponent(item)}`" :underline="false" target="_blank">
                  <div class="aside-label-item _mini" @click.stop="fOnTagClick(item)">
                    {{ item }}
                  </div>
                </el-link>
              </el-tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-link>
</template>

<script>
import moment from "moment";

export default {
  name: "list",
  props: {
    href: { type: String, default: "" },
    image: { type: String, default: "" },
    title: { type: String, default: "" },
    subTitle: { type: String, default: "" },
    content: { type: String, default: "" },
    date: { type: Number, default: 0 },
    tags: {
      type: Array,
      default: () => {
        return [];
      },
    },
    hasImage: { type: Boolean, default: true },
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
    sDate() {
      return moment(this.date).format("yyyy-MM-DD");
    },
  },
  created() {},
  mounted() {},
  methods: {
    fOnTagClick(item) {
      const oRoute = this.$router.resolve({
        name: "search",
        query: {
          keyword: encodeURIComponent(item),
        },
      });
      // this.$router.push({ name: "search" });
      // this.$store.commit("common/updateRoutPathName", "search");
      // this.$store.commit("common/updateSearchKey", item);
      window.open(oRoute.href, "_blank");
    },
  },
  filters: {},
  watch: {},
};
</script>

<style lang="less" scoped>
.list {
}

.el-link.el-link--default {
  color: unset;
  cursor: default;
}

.el-link.el-link--default + .el-link.el-link--default {
  margin-left: @s_mg_h;
}

.link-wrap {
  width: 100%;
}
</style>
<style lang="less">
.list {
}
</style>
