import router from "./router/index";
import naive from "naive-ui";

export default (app) => {
    app.use(router);
    app.use(naive);
}