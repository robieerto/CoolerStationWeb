<template>
  <form class="login-form" @submit.prevent="onSubmit">
    <dx-form :form-data="formData" :disabled="loading">
      <dx-item data-field="email" editor-type="dxTextBox" :editor-options="{ stylingMode: 'filled', placeholder: 'Email', mode: 'email' }">
        <dx-required-rule message="Email je povinný" />
        <dx-email-rule message="Email je nesprávny" />
        <dx-label :visible="false" />
      </dx-item>
      <dx-item data-field="password" editor-type="dxTextBox" :editor-options="{ stylingMode: 'filled', placeholder: 'Heslo', mode: 'password' }">
        <dx-required-rule message="Heslo je povinné" />
        <dx-label :visible="false" />
      </dx-item>
      <!-- <dx-item data-field="rememberMe" editor-type="dxCheckBox" :editor-options="{ text: 'Zapamätať si prihlásenie', elementAttr: { class: 'form-text' } }">
        <dx-label :visible="false" />
      </dx-item> -->
      <dx-button-item>
        <dx-button-options width="100%" type="default" template="signInTemplate" :use-submit-behavior="true"> </dx-button-options>
      </dx-button-item>
      <!-- <dx-item>
        <template #default>
          <div class="link">
            <router-link to="/reset-password">Forgot password?</router-link>
          </div>
        </template>
      </dx-item>
      <dx-button-item>
        <dx-button-options text="Create an account" width="100%" :on-click="onCreateAccountClick" />
      </dx-button-item> -->
      <template #signInTemplate>
        <div>
          <span class="dx-button-text">
            <dx-load-indicator v-if="loading" width="24px" height="24px" :visible="true" />
            <span v-if="!loading">Prihlásiť</span>
          </span>
        </div>
      </template>
    </dx-form>
  </form>
</template>

<script>
import DxLoadIndicator from 'devextreme-vue/load-indicator';
import DxForm, { DxItem, DxEmailRule, DxRequiredRule, DxLabel, DxButtonItem, DxButtonOptions } from 'devextreme-vue/form';
import notify from 'devextreme/ui/notify';

import auth from '@/auth';

import { reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
  components: {
    DxLoadIndicator,
    DxForm,
    DxEmailRule,
    DxRequiredRule,
    DxItem,
    DxLabel,
    DxButtonItem,
    DxButtonOptions,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();

    const formData = reactive({
      email: '',
      password: '',
      rememberMe: false,
    });
    const loading = ref(false);

    function onCreateAccountClick() {
      router.push('/create-account');
    }

    async function onSubmit() {
      const { email, password, rememberMe } = formData;
      loading.value = true;
      const result = await auth.logIn(email, password, rememberMe);
      if (!result.isOk) {
        loading.value = false;
        notify(result.message, 'error', 2000);
      } else {
        router.push(route.query.redirect || '/home');
      }
    }

    return {
      formData,
      loading,
      onCreateAccountClick,
      onSubmit,
    };
  },
};
</script>

<style lang="scss">
@import '../themes/generated/variables.base.scss';

.login-form {
  .link {
    text-align: center;
    font-size: 16px;
    font-style: normal;

    a {
      text-decoration: none;
    }
  }

  .form-text {
    margin: 10px 0;
    color: rgba($base-text-color, alpha($base-text-color) * 0.7);
  }
}
</style>
