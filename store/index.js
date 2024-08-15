import { createPinia } from "pinia";
import persist from "pinia-plugin-persistedstate";

const pinia = createPinia();
pinia.use(persist);

export default pinia;
export * from "./modules/loginedUser";
export * from "./modules/school";
export * from "./modules/user";
