# Contributing

## Setup

The following steps will get you up and running to contribute to Spark:

- Fork the repo
- Clone your fork locally

```sh
git clone https://github.com/<your_github_username>/spark.git
cd spark
```

- Setup all the dependencies and packages. This command will install dependencies.

```sh
npm install
```

> If you run into any problem during this step, feel free to open an issue

## Development

This project follows a monorepo structure. Each folder inside `packages` is an independent package that can be consumed in isolation.

### Tooling

- [NPM](https://www.npmjs.com/) as package manager and to handle workspaces
- [Nx](https://nx.dev/) to manage and publish packages (with Nx Release)
- [Vite](https://vitejs.dev/) to bundle packages
- [Storybook](https://storybook.js.org/) for rapid UI component development and testing
- [Vitest](https://vitest.dev/) and RTL for testing components and hooks

### Commands

Some of the most important commands are listed below.

- **`npm install`** install all dependencies

- **`npm run build`** run build for all packages

- **`npm run build:watch`** run build for all packages in watch mode

- **`npm run release`** publish changed packages

- **`npm run lint`** check for linting issues

- **`npm run prettier`** check for formatting issues and fixes them

- **`npm run storybook:start`** start storybook in development mode

- **`npm run storybook:build`** build storybook

### Linking packages

During development sometimes linking a package from this monorepo into your project could be useful

- Build packages in watch mode so changes can be detected

```sh
npm run build:watch
```

- Go to the package and link it

```sh
cd packages/components/button
npm link
```

- Link the package in your project

```sh
cd my-awesome-project
npm link "@spark-ui/dummy" // Make sure to use quotes around package name
```

Where you're done with your tests you may unlink the package with the following commands:

```sh
cd my-awesome-project
npm unlink --no-save "@spark-ui/dummy"
npm uninstall --global "@spark-ui/dummy"
```

### Commiting changes

All commits should follow the [commit strategy](https://sparkui.vercel.app/?path=/docs/contributing-guidelines-commit--docs)

### Tests

All commits that fix bugs or add features need a test that should follow the [testing strategy](https://sparkui.vercel.app/?path=/docs/contributing-writing-packages-testing--docs)

## Creating a Pull Request

Since Spark is a community project pull requests are more than welcome. However, before working on a large change, it is best to open an issue first to discuss it with the maintainers.

When in doubt try to keep your Pull Request as small as possible. To give a Pull Request the best chance of getting accepted, don't add more than one feature or bug fix per Pull Request. It's often best to create two smaller Pull Requests than one big one.

- Follow the setup steps described above
- Create a new branch

```
git checkout -b my-branch
```

- Make changes, commit and push to your fork

```
git push -u origin HEAD
```

- Go to the repository and open a Pull Request.

## License

By contributing your code to this GitHub repository, you agree to license your contribution under the MIT license.
