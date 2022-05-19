module.exports = {
  extends: ['@antfu/eslint-config-react', 'prettier', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 2,
    '@typescript-eslint/comma-dangle': 0,
  },
  env: {
    commonjs: true,
    es6: true,
    node: true,
    browser: true,
  },
}
