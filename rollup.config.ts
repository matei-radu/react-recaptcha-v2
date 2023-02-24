/*
 * Copyright (c) 2018-present, Matei Bogdan Radu <opensource@mateiradu.dev>
 *
 * This source code is licensed under the MIT license found in the LICENSE
 * file in the root directory of this source tree.
 */

import { defineConfig } from "rollup";
import typescript from "@rollup/plugin-typescript";
import nodeResolve from "@rollup/plugin-node-resolve";
import copy from "rollup-plugin-copy";

export default defineConfig({
  input: "src/index.tsx",
  output: {
    file: "lib/index.esm.js",
    format: "esm",
  },
  plugins: [
    nodeResolve(),
    typescript(),
    copy({
      targets: [
        { src: "src/index.js.flow", dest: "lib", rename: "index.esm.js.flow" },
      ],
    }),
  ],
  external: ["react"],
});
