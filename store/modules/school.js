import { ref } from "vue";
import { defineStore } from "pinia";
export const useSchoolStore = defineStore(
  "uni-schol",
  () => {
    const schoolList = ref([
      { id: 1, name: "重庆理工大学", areas: ["花溪校区", "两江校区"] },
      {
        id: 2,
        name: "四川轻化工大学",
        areas: ["黄岭校区", "宜宾校区", "汇东校区", "李白河校区"],
      },
      { id: 3, name: "成都信息工程大学", areas: ["龙泉校区", "航空港校区"] },
    ]);
    const selectedSchool = ref("");
    const selectedArea = ref("");
    const areaList = ref([]);
    // getters
    const getSchoolName = () => {
      return schoolList.value.map((item) => item.name);
    };

    const getAreas = () => {
      const areaObj = schoolList.value.find(
        (item) => item.name === selectedSchool.value
      );
      return areaObj ? areaObj.areas : [];
    };

    const getAreaList = () => {
      return areaList.value;
    };

    const changeAreaList = async (value) => {
      areaList.value = value;
    };

    // actions
    const name = async (value) => {
      selectedSchool.value = value;
      // console.log(selectedSchool.value);

      // 注意这里直接调用 getAreas() 函数
      const areas = getAreas();
      changeAreaList(areas);
      // console.log(areaList.value);
    };
    const area = async (value) => {
      console.log(value);
      selectedArea.value = value;
      console.log(selectedArea.value);
    };
    return {
      schoolList,
      selectedSchool,
      selectedArea,
      areaList,
      getSchoolName,
      getAreas,
      getAreaList,

      changeAreaList,
      name,
      area,
    };
    defineExpose({
      selectedSchool,
      selectedArea,
      areaList,
    });
  },
  {
    persist: true,
  }
);
