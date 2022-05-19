module.exports = {
  extends: ['prettier', '@antfu/eslint-config-react'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 2,
  },
  env: {
    commonjs: true,
    es6: true,
    node: true,
    browser: true,
  },
}
