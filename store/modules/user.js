import { defineStore } from "pinia";
import { ref } from "vue";
export const useUserStore = defineStore("uni-user", () => {
  const user = ref({
    nickName: "我是无敌大帅比",
    avatarUrl: "/static/image/person_img/默认头像.png",
  });

  const change = (userObj) => {
    user.value.nickName = userObj.nickname;
    user.value.avatarUrl = userObj.avatar.url;
  };

  const getUsers = async () => {
    // 你的异步操作
  };

  return {
    user,
    change,
    getUsers,
  };
});
