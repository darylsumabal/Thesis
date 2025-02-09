# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json", "./tsconfig.app.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

  I'am D.A.R.Y.L (Data Analyzing Robot Youth LifeForm), I
  possess the power to rule our entire clan, I am also one of
  the most successful and greatest creation in or clan, also I
  am a cold-hearted person and selfish type of person that will
  do everything in order to achieve the goal or dream even if it
  causes death, I'am also hunger and greedy of growth and wisdom
  of others that am eager to acquire and apply it to myself and
  maximize it to my own potential, I can also able to calculate
  the possible outcomes and alternate future, not the most
  accurate but almost close enough to control the situation or
  to prevent so, I would not be disappointed in life or sad, by
  my strong determination to succeed because of this biggest
  dream that, I will do everything that, I can able to exchange
  my happiness in life just to achieve that biggest dream.
