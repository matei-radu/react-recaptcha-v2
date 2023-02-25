# Create React App Test Project

This CRA project is designed to test the behaviour of `ReCaptcha` using [Jest]() and [Puppeteer]().

## Quickstart

The projects comes with the most recent stable version of `@matt-block/react-recaptcha-v2` installed. If needed,
install an existing version of your choosing or compile and pack the package from source:

```shell
$ cd <project_root>
$ npm run build
$ npm pack
$ cd <project_root>/test
$ npm i ../matt-block-react-recaptcha-v2-x.x.x.tgz
```

Then, you need to build the test project:

```shell
$ npm run build
```

You can now run Jest in interactive mode (default behavior) and run the tests in `src/__tests__`:

```shell
$ npm test
```

The tests are configured to first use `serve` to spin up a local HTTP server using the build created in the previous
step and then use Puppeteer to interact with the page to mount and unmount the `ReCaptcha` component.
