<template>
  <div class="accordion-collapse container">
    <div
      :class="['accordion-collapse-item', `_${work.name}`, { _active: work.name === oCurWork.name }]"
      v-for="(work, i) in aWork"
      :key="`workpace_${i}_${work.name}`"
      @click="fItemClick(work)"
    >
      <div class="accordion-collapse-title">{{ work.title }}</div>
    </div>
  </div>
</template>

<script>
let sCurWorkCopy;
/**
 * @desc AccordionCollapse.vue
 * @author caoyu
 * @CreatedTime 2021/7/13 3:48 下午
 **/
export default {
  name: "AccordionCollapse",
  props: {
    industry: { type: String, default: "electricity" },
  },
  components: {},
  data() {
    return {
      aWork: [
        { id: "100100", name: "electricity", title: "电力行业" },
        { id: "100300", name: "iron", title: "钢铁行业" },
        { id: "100400", name: "chemistry", title: "化工行业" },
        { id: "100500", name: "fuel", title: "石化行业" },
        { id: "100200", name: "material", title: "建材行业" },
        { id: "100600", name: "paper", title: "造纸行业" },
        { id: "100800", name: "space", title: "航空行业" },
        { id: "100700", name: "color", title: "有色行业" },
      ],
      oCurWork: {},
      oCurWorkHover: {},
      bAni: false,
      timer: 0,
    };
  },
  computed: {},
  created() {},
  mounted() {
    this.fItemClick(
      this.aWork.find((item) => {
        return item.name === this.industry;
      })
    );
  },
  methods: {
    fItemEnter() {
      this.oCurWork = {};
    },
    fItemLeave() {
      this.oCurWork = JSON.parse(sCurWorkCopy);
    },
    fItemClick(item) {
      this.oCurWork = item;
      sCurWorkCopy = JSON.stringify(item);
      this.$router.push({
        path: "/case/electricity",
        name: `case_${item.name}`,
        meta: {
          hideInMenu: true,
          title: `${item.title}方案库`,
        },
        params: {
          industryId: item.id,
        },
      });
      this.$store.commit("common/updateRoutPathName", "case");
    },
  },
  filters: {},
  watch: {},
};
</script>

<style lang="less" scoped>
.accordion-collapse {
  display: flex;
  height: 418px;
  width: @s_min_container_width;
  font-size: 0;
  overflow: hidden;
}

.accordion-collapse-item {
  position: relative;
  flex: 1;
  height: 418px;
  //width: 108px;
  font-size: @s_font;
  background: no-repeat center;
  background-size: 608px;
  border: 2px solid @c_bor_base;
  cursor: pointer;

  & + & {
    border-left: 0 none;
  }

  &._electricity {
    background-image: url("~@/assets/images/views/workpace/electricity.jpg");
  }

  &._iron {
    background-image: url("~@/assets/images/views/workpace/iron.jpg");
  }

  &._chemistry {
    background-image: url("~@/assets/images/views/workpace/chemistry.jpg");
  }

  &._fuel {
    background-image: url("~@/assets/images/views/workpace/fuel.jpg");
  }

  &._material {
    background-image: url("~@/assets/images/views/workpace/material.jpg");
  }

  &._paper {
    background-image: url("~@/assets/images/views/workpace/paper.jpg");
  }

  &._space {
    background-image: url("~@/assets/images/views/workpace/space.jpg");
  }

  &._color {
    background-image: url("~@/assets/images/views/workpace/color.jpg");
  }

  &._active {
    //width: 608px;
    flex: 4;
    .l_pre(animation, aniFlex 0.5s ease-out 1);

    .accordion-collapse-title {
      top: unset;
      right: unset;
      bottom: 30px;
      height: 56px;
      line-height: 56px;
      padding: 0 3 * @s_mg_h;
      text-align: left;
      font-size: 30px;
      //background-color: transparent;
    }
  }
}

.accordion-collapse-title {
  position: absolute;
  top: 70px;
  left: 0;
  right: 0;
  height: 42px;
  text-align: center;
  line-height: 42px;
  background-color: rgba(255, 255, 255, 0.8);
  overflow: hidden;
}

::v-deep {
}

.l_keyframes(aniFlex, {
  from {
    flex: 1;
  }
  to {
    flex: 4;
  }
});

.l_keyframes(aniFlexTo1, {
  to {
    flex: 1;
  }
});
</style>
<style lang="less">
.accordion-collapse {
}
</style>
