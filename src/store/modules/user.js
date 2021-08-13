export default {
  namespaced: true,
  state: {
    id: 0,
    name: "",
    description: "",
    companyId: "",
    companyName: "",
    threshold: null,
    level: "",
  },
  mutations: {
    updateId(state, id) {
      state.id = id;
    },
    updateName(state, name) {
      state.name = name;
    },
    updateDescription(state, description) {
      state.description = description;
    },
    updateCompanyId(state, companyId) {
      state.companyId = companyId;
    },
    updateCompanyName(state, companyName) {
      state.companyName = companyName;
    },
    updateThreshold(state, threshold) {
      state.threshold = threshold;
    },
    updateLevel(state, level) {
      state.level = level;
    },
  },
};
