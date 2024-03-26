import 'devextreme/dist/css/dx.common.css';
import './themes/generated/theme.base.css';
import './themes/generated/theme.additional.css';
import { createApp } from 'vue/';
import router from './router';
import themes from 'devextreme/ui/themes';
import { locale } from 'devextreme/localization';
import { localizeMessages } from '@/devextremeMessages';
import { auth } from '@/firebase';
import customAuth from './auth';

import App from './App';
import appInfo from './app-info';

locale('sk');
localizeMessages('sk');

themes.initialized(async () => {
  const app = createApp(App);
  auth.authStateReady().then(() => {
    customAuth.initOnAuthStateChanged();
    app.use(router);
    app.config.globalProperties.$appInfo = appInfo;
    app.mount('#app');
  });
});
