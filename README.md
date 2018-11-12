# React reCAPTCHA v2

[![npm (scoped)][npm_shield]][npm]
![license: mit][license_shield] [![code style: prettier][prettier_shield]][prettier]

React wrapper component for Google's [reCAPTCHA v2][recaptcha_site] service,
built with [Typescript][typescript] and [Rollup][rollup].

### Features

- [x] Does not pollute the DOM by cleaning up on unmount (see below)
- [x] Can safely add multiple `<ReCaptcha>` components in the same page, they
      will not conflict with each other.
- [x] Typescript definitions (Flow ones are WIP)
- [x] Actively developed

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

|  React   | Library |
| :------: | :-----: |
| >=16.0.0 | latest  |

## Installation

Install the package via Yarn or npm:

```
yarn add @matt-block/react-recaptcha-v2

// or

npm install --save @matt-block/react-recaptcha-v2
```

That is all, no `<script>` needs to be added to your main HTML file as this
is handled automatically by the component.

## Usage

```javascript
import React, { Component } from "react";
import ReCaptcha from "@matt-block/react-recaptcha-v2";

class MyFormComponent extends Component {
  // other methods and callbacks...

  render() {
    return (
      {/* other components to render... */}
      <ReCaptcha
        siteKey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
        theme="light"
        size="normal"
        onSuccess={(captcha) => console.log(`Successful, result is ${captcha}`)}
        onExpire={() => console.log("Verification has expired, re-verify.")}
        onError={() => console.log("Something went wrong, check your conenction")}
      />
    );
  }
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
| `onExpired` | `function`            | `undefined` | Callback function, executed when the reCAPTCHA response expires and the user needs to re-verify.                                                                                                                                                     |
| `onError`   | `function`            | `undefined` | Callback function, executed when reCAPTCHA encounters an error (usually network connectivity) and cannot continue until connectivity is restored. If you specify a function here, you are responsible for informing the user that they should retry. |

## License

Copyright (c) 2018-present Matei Bogdan Radu.

This source code is licensed under the MIT license found in the
[LICENSE][license] file in the root directory of this source tree.

<!-- Sources -->

[license]: https://github.com/matt-block/react-recaptcha-v2/blob/master/LICENSE
[license_shield]: https://img.shields.io/badge/license-MIT-blue.svg
[prettier_shield]: https://img.shields.io/badge/code_style-prettier-ff69b4.svg
[prettier]: https://github.com/prettier/prettier
[npm]: https://www.npmjs.com/package/@matt-block/react-recaptcha-v2
[npm_shield]: https://img.shields.io/npm/v/@matt-block/react-recaptcha-v2.svg
[recaptcha_admin]: https://www.google.com/recaptcha/admin
[recaptcha_docs]: https://developers.google.com/recaptcha/docs/display
[recaptcha_site]: https://developers.google.com/recaptcha/
[recaptcha_testkey]: https://developers.google.com/recaptcha/docs/faq#automated_test
[cleanup_gif]: https://raw.githubusercontent.com/matt-block/react-recaptcha-v2/master/assets/cleanup.gif
[typescript]: http://www.typescriptlang.org/
[rollup]: https://rollupjs.org
