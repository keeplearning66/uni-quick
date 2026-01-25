import { createSSRApp } from 'vue';
import App from './App.vue';
import setupPlugins from './plugins';
import 'virtual:uno.css';

export function createApp() {
  const app = createSSRApp(App);
  app.use(setupPlugins);

  return {
    app,
  };
}
