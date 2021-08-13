<template>
  <div class="aside-block">
    <div class="aside-title flex-row">
      <div class="flex-col _ml _centerver">关键词</div>
      <div class="flex-col _ml _centerver">
        <el-autocomplete
          class="inline-input"
          v-model="searchKey"
          :fetch-suggestions="fQuerySearch"
          :trigger-on-focus="false"
          suffix-icon="iconfont icon-sousuo"
          size="mini"
          @select="fHandleSelect"
          @keyup.enter.native="fHandleSearch"
          @input="fGetSearchSuggestions"
        />
      </div>
    </div>
    <div class="aside-content" v-if="bLoading">
      <el-skeleton class="ske-loading" :rows="6" animated></el-skeleton>
    </div>
    <div class="aside-content" v-else>
      <div class="label-row" v-for="(aSub, i) in aLabel" :key="`label_row_${i}`">
        <el-tooltip
          :content="oSub.value"
          v-for="(oSub, i) in aSub"
          :key="`label_item_${keyType}_${i}`"
          placement="top"
          :disabled="oSub.value.length <= 5"
        >
          <div class="aside-label-item" @click="fLabelSelect(oSub)">{{ oSub.value }}</div>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
import { cutArray } from "@/utils/utils";

/**
 * @desc AsideLabel.vue
 * @author caoyu
 * @CreatedTime 2021/7/14 9:45 上午
 **/
export default {
  name: "AsideLabel",
  props: {
    keyType: {
      type: String,
      default: "solution",
    },
  },
  components: {},
  data() {
    return {
      bLoading: false,
      aSuggestions: [],
      aLabel: [],
    };
  },
  computed: {
    searchKey: {
      get() {
        return this.$store.state.common.searchKey;
      },
      set(val) {
        return this.$store.commit("common/updateSearchKey", val);
      },
    },
  },
  created() {
    this.fGetLabelList();
  },
  mounted() {},
  methods: {
    fQuerySearch(queryString, cb) {
      let aSuggestions = this.aSuggestions;
      let results = queryString ? aSuggestions.filter(this.fCreateFilter(queryString)) : aSuggestions;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    fCreateFilter(queryString) {
      return (restaurant) => {
        return restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
      };
    },
    //获取搜索建议
    fGetSearchSuggestions() {
      if (this.searchKey.trim().length >= 2)
        this.$axios({
          url: "portal/searchKeywordList",
          method: "get",
          params: {
            type: this.keyType,
            condition: this.searchKey,
          },
        }).then(({ data }) => {
          this.aSuggestions = data.searchKeyword;
        });
    },
    //获取标签
    fGetLabelList() {
      if (this.keyType) {
        this.bLoading = true;
        this.$axios({
          url: "portal/searchKeywordList",
          method: "get",
          params: {
            type: this.keyType,
          },
        })
          .then(({ data }) => {
            this.aLabel = cutArray(data.searchKeyword, 3);
            this.bLoading = false;
          })
          .catch(() => {
            this.bLoading = false;
          });
      }
    },
    fHandleSelect() {
      this.fHandleSearch();
    },
    fLabelSelect(item) {
      this.searchKey = item.value;
      this.fHandleSearch();
    },
    fHandleSearch() {
      if (this.searchKey.trim() === "") return this.$message({ message: "请输入您要查询的内容", type: "warning" });
      // this.$router.push({ name: "search" });
      // this.routPathName = "search";
    },
  },
  filters: {},
  watch: {},
};
</script>

<style lang="less" scoped>
.aside-block {
}

.label-row {
  display: flex;
  width: 100%;

  & + & {
    margin-top: 2 * @s_mg_v;
  }
}

::v-deep {
  .el-input__inner {
    border-radius: 12px;
    border-color: @c_block;

    &:focus,
    &:hover {
      border-color: @c_main;
    }
  }

  .el-input__suffix {
    color: @c_main;
  }
}
</style>
<style lang="less">
.aside-label {
}
</style>
