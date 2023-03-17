import { createApp, h } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router/index"
import { apolloProvider } from './apollo/index';

// createApp(App).mount("#app");

const app = createApp({
  render: () => h(App),
});

app.use(router);
app.use(apolloProvider);
app.mount("#app");
