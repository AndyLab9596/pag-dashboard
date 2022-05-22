# PAG Evaluation

## Tech stack

- Typescript
- React
- React Router
- Emotion CSS
- Tailwind CSS
- Chakra UI
- React Hook Form
- React Table
- Apollo Client
- React-I18next

## VS Code configration

They are highly suggested for the best Developer Experience. Extensions are responsible for:

- Eslint
- Prettier
- Styled Components
- Editorconfig

## Chrome Extensions

- Redux DevTools

## Note for Windows users

```shell
git config core.autocrlf false
```

## Environment variables

Copy `.env.local` to `.env.development.local` and update it accordingly your local env

- `.env`: Default, all env
- `.env.local`: Override, loaded for all environement except test.
- `.env.development.local`, `.env.development`: Loadef for `yarn start`
- `.env.production.local`, `.env.production`: Loaded for `yarn build`
- `.env.test.local`, `.env.test`: Loaded for `yarn test`

---

NOTES:

You must create custom environment variables beginning with `REACT_APP_`. Any other variables except NODE_ENV will be ignored to avoid accidentally.
These environment variables will be defined for you on process.env. For example, having an environment variable named `REACT_APP_NOT_SECRET_CODE` will be exposed in your JS as `process.env.REACT_APP_NOT_SECRET_CODE`.

Click [here](https://create-react-app.dev/docs/adding-custom-environment-variables) for more details

## Install & Start

⚠️ Using [Yarn Package Manager](https://yarnpkg.com) is recommended over `npm`.

```shell
yarn install
yarn start
```

## Genenate Graphql Hook

```bash
yarn codegen
```

## Build

```shell
yarn build
```

## Build docker image

```bash
docker build -t <TAG> .
```

---

## Styleguide

- `UpperCamelCase`: class / interface / type / enum / decorator / type parameters
- `lowerCamelCase`: variable / parameter / function / method / property / module alias
- `CONSTANT_CASE`: global constant values, including enum values

Reference: https://google.github.io/styleguide/tsguide.html

---

## Reference

This is created using CRA template

---

**📚 Documentation:** [Gitbook](https://cansahin.gitbook.io/react-boilerplate-cra-template/)

**🎨 Check the example app:** [Demonstrating the features](https://react-boilerplate.github.io/react-boilerplate-cra-template/)
