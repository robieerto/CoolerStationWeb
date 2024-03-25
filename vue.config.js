const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  publicPath: '/',
  devServer: {
    client: {
      overlay: false,
    },
  },
});
