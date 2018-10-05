/**
 * Copyright (c) 2018-present, Matei Bogdan Radu <matei.radu.92@gmail.com>
 *
 * This source code is licensed under the MIT license found in the LICENSE
 * file in the root directory of this source tree.
 */

import typescript from "rollup-plugin-typescript";

export default {
  input: "src/index.tsx",
  output: {
    file: "lib/index.esm.js",
    format: "esm"
  },
  plugins: [typescript()]
};
