<template>
  <div class="layout-content">
    <div class="container flex-col">
      <div class="container-body">
        <div class="container-left flex-col">
          <div class="contact">
            <div class="block-title">联系我们</div>
            <div class="contact-des">
              致力于打造省级工业互联网龙头企业，建立统一、融合、开放的工业互联网标准标识体系
            </div>
            <div class="contact-main flex-row">
              <div class="flex-col _flex0 _ml">
                <el-image class="contact-image" :src="require('@/assets/images/views/contact/contact.jpg')" />
              </div>
              <div class="flex-col _ml">
                <div class="contact-company">无锡汉朵网络科技有限公司</div>
                <el-form>
                  <el-form-item><i slot="label" class="iconfont icon-dianhua"></i>电话: +86 010-00000000</el-form-item>
                  <el-form-item
                    ><i slot="label" class="iconfont icon-dingwei"></i>地址: 无锡经开区清舒道99号物联网创新促进中心
                  </el-form-item>
                  <el-form-item
                    ><i slot="label" class="iconfont icon-youxiang"></i>邮箱: contact@wxhandle.com
                  </el-form-item>
                  <el-form-item><i slot="label" class="iconfont icon-wuxian"></i>www.0000000.com</el-form-item>
                </el-form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * @desc contact.vue
 * @author caoyu
 * @CreatedTime 2021/7/13 2:26 下午
 **/
export default {
  name: "contact",
  props: {},
  components: {},
  data() {
    return {};
  },
  computed: {},
  created() {
    this.$store.commit("common/updateBreadcrumb", [{ name: "contact", title: "联系我们" }]);
  },
  mounted() {},
  methods: {},
  filters: {},
  watch: {},
};
</script>

<style lang="less" scoped>
.contact {
}

.contact-des {
  width: fit-content;
  margin: 2 * @s_mg_v auto 9 * @s_mg_v;
  color: @c_font_sec;
}

.contact-company {
  width: 522px;
  padding: 6 * @s_mg_v 0 3 * @s_mg_v;
  margin-bottom: 2 * @s_mg_v;
  line-height: 1;
  font-size: @s_font_larger;
  border-bottom: 1px solid @c_bor_base;
}

.flex-col._ml + .flex-col._ml {
  margin-left: 7 * @s_mg_h;
}

.contact-image {
  width: 621px;
  height: 414px;
}

::v-deep {
  .el-form-item {
    margin-bottom: @s_mg_v;
  }

  .iconfont {
    font-size: 24px;
    //color: @c_main;
  }
}
</style>
<style lang="less">
.contact {
}
</style>
