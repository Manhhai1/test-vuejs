module.exports = {
  parser: 'vue-eslint-parser', 
  parserOptions: {
    parser: '@babel/eslint-parser', 
    sourceType: 'module', 
    requireConfigFile: false
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended', 
  ],
  rules: {
  
  },
};
