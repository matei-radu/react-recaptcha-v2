# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.10] - 2023-05-03

### Changed

- Bump `nanoid` to version `3.3.6`.
- Bump `prettier` to version `2.8.8`.
- Bump `typescript` to version `3.9.10`.

## [1.0.9] - 2022-02-23

### Added

- This changelog.

### Changed

- Bump `nanoid` to version `3.3.4`.
- Bump `@rollup/plugin-node-resolve` to version `13.3.0`.
- Bump `@rollup/plugin-typescript` to version `8.5.0`.
- Bump `@types/react` to version `18.0.28`.
- Bump `lint-staged` to version `12.5.0`.
- Bump `prettier` to version `2.8.4`.
- Bump `rollup` to version `2.79.1`.
- Bump `typescript` to version `3.8.3`.

## [1.0.8] - 2022-04-28

### Added

- `@rollup/plugin-node-resolve` dev-dependency required to bundle `nanoid` (see the fix below).
- `@rollup/plugin-typescript` dev-dependency that replaces `rollup-plugin-typescript`.

### Fixed

- Fix `nanoid` not being bundled with the package. `nanoid` was incorrectly configured as an external dependency in the
  Rollup configuration, so it was never bundled with the package. However, `nanoid` is so common that most devs probably
  had it available as a transient dependency, so the issue never surfaced up.

### Changed

- Bump `husky` to version `7.0.4`.
- Bump `lint-staged` to version `12.4.1`.
- Bump `nanoid` to version `3.3.3`.
- Bump `prettier` to version `2.6.2`.
- Bump `rollup` to version `2.70.2`.
- Bump `rollup-plugin-copy` to version `3.4.0`.
- Bump `tslib` to version `1.14.1`.
- Bump `typescript` to version `3.7.5`.

### Removed

- `@types/nanoid` dev-dependency because `nanoid` v3 comes with built-in type declarations.
- `rollup-plugin-typescript` dev-dependency that is replaced by `@rollup/plugin-typescript`.

## [1.0.7] - 2022-04-28

### Added

- Compatibility with React v17 and v18.

### Changed

- This project has changed package manager, from `yarn` back to `npm`. This also means the removal of `yarn.lock` and
  the addition of `package-lock.json`.
- Bump `@types/react` to version `18.0.8`.

## [1.0.6] - 2019-10-13

### Fixed

- Fix URL of the Google reCAPTCHA release script. Apparently Google changed it at some point.

## [1.0.5] - 2019-06-09

### Changed

- Bump `nanoid` to version `2.0.3`.
- Bump `@types/nanoid` to version `2.0.0`.
- Bump `husky` to version `2.4.0`.
- Bump `lint-staged` to version `8.2.0`.
- Bump `prettier` to version `1.18.2`.
- Bump `rollup` to version `1.14.4`.
- Bump `rollup-plugin-copy` to version `2.0.1`.
- Bump `rollup-plugin-typescript` to version `1.0.1`.
- Bump `typescript` to version `3.5.1`.

## [1.0.4] - 2019-02-09

### Added

- [Flow](https://flow.org/) type definitions.
- `rollup-plugin-copy` dev-dependency required to copy the Flow definitions at build time.

## [1.0.3] - 2018-11-12

### Added

- Option to use the string `"test"` as value for the `siteKey` prop to easily use the reCAPTCHA test key.

### Changed

- Bump `nanoid` to version `2.0.0`.
- Bump `@types/react` to version `16.7.3`.
- Bump `husky` to version `1.1.3`.
- Bump `lint-staged` to version `8.0.4`.
- Bump `prettier` to version `1.15.2`.
- Bump `rollup` to version `0.67.1`.
- Bump `typescript` to version `3.1.6`.

## [1.0.2] - 2018-10-14

### Fixed

- Fix criteria for removing hidden `div`s added by the reCAPTCHA script, as in some cases it would throw a `cannot read property of undefined` error.

## [1.0.1] - 2018-10-15

### Fixed

- Fix the GIF not showing up correctly in `README.md`.

## [1.0.0] - 2018-10-15

### Added

- `ReCaptcha`: React component to render a Google reCAPTCHA v2 widget.

[1.0.10]: https://github.com/matei-radu/react-recaptcha-v2/compare/v1.0.9...v1.0.10
[1.0.9]: https://github.com/matei-radu/react-recaptcha-v2/compare/v1.0.8...v1.0.9
[1.0.8]: https://github.com/matei-radu/react-recaptcha-v2/compare/v1.0.7...v1.0.8
[1.0.7]: https://github.com/matei-radu/react-recaptcha-v2/compare/v1.0.6...v1.0.7
[1.0.6]: https://github.com/matei-radu/react-recaptcha-v2/compare/v1.0.5...v1.0.6
[1.0.5]: https://github.com/matei-radu/react-recaptcha-v2/compare/v1.0.4...v1.0.5
[1.0.4]: https://github.com/matei-radu/react-recaptcha-v2/compare/v1.0.3...v1.0.4
[1.0.3]: https://github.com/matei-radu/react-recaptcha-v2/compare/v1.0.2...v1.0.3
[1.0.2]: https://github.com/matei-radu/react-recaptcha-v2/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/matei-radu/react-recaptcha-v2/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/matei-radu/react-recaptcha-v2/compare/595f761b221959461f1f475e6f67770c4cfb901d...v1.0.0
