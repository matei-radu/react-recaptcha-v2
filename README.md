# React reCAPTCHA v2

[![npm (scoped)][npm_shield]][npm]
![license: mit][license_shield] [![code style: prettier][prettier_shield]][prettier]

React wrapper component for Google's [reCAPTCHA v2][recaptcha_site] service,
built with [TypeScript][typescript] and [Rollup][rollup].

### Features

- Does not pollute the DOM by cleaning up on unmount (see below)
- Can safely add multiple `<ReCaptcha>` components in the same page, they
  will not conflict with each other.
- TypeScript and Flow type declarations

### DOM Pollution and Cleanup

`<ReCaptcha>` will handle all its dirt that is automatically added to the DOM:
according to the [official reCAPTCHA Documentation][recaptcha_docs], a
`<script>` must be added in the head section of our HTML document. However, it
is not explained that, once that script is loaded, more elements will be
automatically added to the DOM, _outside_ of out React tree.

Once the component is unmounted, all that has been directly and indirectly added
will be removed, leaving a clean document:

![Cleanup][cleanup_gif]

## Compatibility

This library will always target the most recent React package. If you are
using an older release of React, use the correct version of this library
from the compatibility table below (if available):

|       React       |                  Library                  |   Status   | End-of-Life |
| :---------------: | :---------------------------------------: | :--------: | :---------: |
|    `>=16.8.0`     |    [![npm (scoped)][npm_shield]][npm]     | **Active** |      -      |
| `16.0.0 - 16.7.x` | [![npm v1 (scoped)][npm_1_shield]][npm_1] |  **EOL**   | 2023-06-01  |

### Migrating from 1.x to 2.x

The current version requires React `16.8.0` or above. If you are stuck with an older version, you could:

- Not migrate to version 2 and continue to use a 1.x release, though support will end soon.
- Move to a different package for Google reCAPTCHA v2, like:
  - [react-google-recaptcha][recaptcha_alternative_1] which requires React `16.4.1` or above.
  - [react-recaptcha][recaptcha_alternative_2] which required React `15.5.4` or above

## Installation

Install the package via npm or Yarn:

```
npm install --save @matt-block/react-recaptcha-v2

// or

yarn add @matt-block/react-recaptcha-v2
```

That is all, no `<script>` needs to be added to your main HTML file as this
is handled automatically by the component.

## Usage

```javascript
import React from "react";
import ReCaptcha from "@matt-block/react-recaptcha-v2";

const MyFormComponent = () => {
  // other logic and hooks...

  return (
    {/* other components to render... */}
    <ReCaptcha
      siteKey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
      theme="light"
      size="normal"
      onSuccess={(captcha) => console.log(`Successful, result is ${captcha}`)}
      onError={() => console.log("Something went wrong, check your conenction")}
      onExpire={() => console.log("Verification has expired, re-verify.")}
    />
  );
}
```

## Props

The only mandatory prop is `siteKey` which can be obtained from the
[reCAPTCHA Admin Panel][recaptcha_admin], all other props are optional.

| Prop        | Type                  | Default     | Description                                                                                                                                                                                                                                          |
| ----------- | --------------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `siteKey`   | `string`              | `undefined` | **Required**. Your site key or the value `"test"` which will inject the [test key][recaptcha_testkey].                                                                                                                                               |
| `theme`     | `light` \| `dark`     | `light`     | The color theme of the widget.                                                                                                                                                                                                                       |
| `size`      | `normal` \| `compact` | `normal`    | The size of the widget.                                                                                                                                                                                                                              |
| `onSuccess` | `function`            | `undefined` | Callback function, executed when the user submits a successful response. The response token is passed to your callback.                                                                                                                              |
| `onError`   | `function`            | `undefined` | Callback function, executed when reCAPTCHA encounters an error (usually network connectivity) and cannot continue until connectivity is restored. If you specify a function here, you are responsible for informing the user that they should retry. |
| `onExpire`  | `function`            | `undefined` | Callback function, executed when the reCAPTCHA response expires and the user needs to re-verify.                                                                                                                                                     |

## Contributing

If you are looking to contribute to this project, check [CONTRIBUTING.md][contributing].

## License

Copyright (c) 2018-present Matei Bogdan Radu.

This source code is licensed under the MIT license found in the
[LICENSE][license] file in the root directory of this source tree.

<!-- Sources -->

[license]: https://github.com/matei-radu/react-recaptcha-v2/blob/main/LICENSE
[license_shield]: https://img.shields.io/badge/license-MIT-blue.svg
[prettier_shield]: https://img.shields.io/badge/code_style-prettier-ff69b4.svg
[prettier]: https://github.com/prettier/prettier
[npm]: https://www.npmjs.com/package/@matt-block/react-recaptcha-v2
[npm_shield]: https://img.shields.io/npm/v/@matt-block/react-recaptcha-v2/latest
[npm_1]: https://www.npmjs.com/package/@matt-block/react-recaptcha-v2/v/1.0.10
[npm_1_shield]: https://img.shields.io/badge/npm@legacy-v1.0.10-blue
[recaptcha_admin]: https://www.google.com/recaptcha/admin
[recaptcha_docs]: https://developers.google.com/recaptcha/docs/display
[recaptcha_site]: https://developers.google.com/recaptcha/
[recaptcha_testkey]: https://developers.google.com/recaptcha/docs/faq#automated_test
[cleanup_gif]: https://raw.githubusercontent.com/matei-radu/react-recaptcha-v2/main/assets/cleanup.gif
[typescript]: http://www.typescriptlang.org/
[rollup]: https://rollupjs.org
[contributing]: https://github.com/matei-radu/react-recaptcha-v2/blob/main/CONTRIBUTING.md
[recaptcha_alternative_1]: https://github.com/dozoisch/react-google-recaptcha
[recaptcha_alternative_2]: https://github.com/appleboy/react-recaptcha
