# How to contribute to this project

## Setting up a development environment

The one hard requirement is to use at least Node.js `14.18.0`, which is the minimum supported version by the Rollup
bundler, though it is encouraged to use the most recent LTS version. If you're an [nvm](https://github.com/nvm-sh/nvm)
user, there is an `.nvmrc` file in the project's root directory to easily set the correct version:

```shell
$ nvm use
Found '/path/to/project/react-recaptcha-v2/.nvmrc' with version <lts/hydrogen>
Now using node v18.13.0 (npm v9.5.1)
```

The project also uses npm for package management. Avoid using Yarn or any other manager.

Optionally, it is recommended to use an IDE or editor that has good support for TypeScript to give you faster feedback
during development. If your tool of choice does not offer such integration, you can perform type checks regularly with:

```shell
$ npm run typecheck
```

## npm scripts

### `build`

This script will build the application and emit the TypeScript declarations. If you inspect `package.json`, you will see
the details of the process. In order:

1. The output directories `/lib` and `/types` are cleared with `build:clear`, then
2. The code is compiled with Rollup by running `build:rollup`. This will create and populate the `/lib` directory. Then
3. `build:ts-decl` will trigger the TypeScript compiler to emit type declarations in `/types`. This is necessary because
   Rollup cannot emit the declarations itself.

### `typecheck`

This is a convenience script for those that don't have an IDE or editor with TypeScript integration, so that they can
verify the type safety of their changes without having to compile the entire package. If you are using something like
VS Code or IntelliJ IDEA you will probably never have to run this one.

### `prepare`

This script is invoked automatically after running `npm install` for the first time to set up
[Husky](https://typicode.github.io/husky/#/). This will be invoked only once. Unless you are tinkering with Husky's
setup, you realistically will never have to run this script yourself.

## Commit behavior

This project is configured to use [Husky](https://typicode.github.io/husky/#/) to perform some chores on the code you
are about to commit. Specifically, it will run [lint-staged](https://github.com/okonet/lint-staged), which in turn will
use [prettier](https://prettier.io/) to automatically format the code staged for committing. So, don't be too confused
if your staged files change a bit when you run `git commit`.

Some developers might find this annoying, however, this ensures that all code committed is formatted consistently.
