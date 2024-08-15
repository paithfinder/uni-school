import { reactive } from "vue";
import { defineStore } from "pinia";
export const useLoginedStore = defineStore("uni-logined", () => {
  const user = reactive({
    userId: 1,
    userType: 0, // 0--接单人， 1--发布人
  });
  return {
    user,
    // 在这里返回你的 getters 和 actions
  };
});
