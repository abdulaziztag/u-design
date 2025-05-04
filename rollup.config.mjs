// rollup.config.mjs
import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import url from '@rollup/plugin-url';
import autoprefixer from 'autoprefixer';
import copy from 'rollup-plugin-copy';
import del from 'rollup-plugin-delete';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Synchronously read and parse package.json
const pkg = JSON.parse(
  readFileSync(path.resolve(__dirname, 'package.json'), 'utf8'),
);

export default {
  input: 'src/index.ts',
  external: ['react', 'react-dom', 'tslib'],
  plugins: [
    // 1) Clean the output folder
    del({ targets: 'dist/*' }),

    // 2) Path aliases
    alias({
      entries: [
        {
          find: '@components',
          replacement: path.resolve(__dirname, 'src/components'),
        },
        { find: '@styles', replacement: path.resolve(__dirname, 'src/styles') },
        { find: '@assets', replacement: path.resolve(__dirname, 'src/assets') },
      ],
    }),

    // 3) Externalize peer deps
    peerDepsExternal(),

    // 4) Resolve node modules
    resolve(),

    // 5) CommonJS modules
    commonjs(),
    json(),

    // 6) SVGs → URLs or components
    url({
      include: ['**/*.svg'],
      limit: 0,
      fileName: 'assets/icons/[dirname][hash][extname]',
    }),

    // 7a) Component SCSS modules: compile & inject
    postcss({
      include: /\.module\.scss$/,
      modules: { generateScopedName: '[name]__[local]___[hash:base64:5]' },
      inject: true,
      minimize: false,
      use: ['sass'],
      plugins: [autoprefixer()],
    }),

    // 7b) Global styles: compile & extract
    postcss({
      include: /global\.scss$/,
      extract: 'dist/styles/global.css',
      minimize: true,
      use: ['sass'],
      plugins: [autoprefixer()],
    }),

    // 8) TypeScript compilation (emit .d.ts too)
    typescript({
      tsconfig: './tsconfig.build.json',
      declaration: true,
      declarationDir: 'dist/types',
      exclude: ['**/__tests__', '**/*.stories.tsx', '**/*.test.tsx'],
    }),

    // 9) Copy static assets & SCSS partials
    copy({
      targets: [
        { src: 'src/assets/fonts/*', dest: 'dist/assets/fonts' },
        { src: 'src/styles/**/*.scss', dest: 'dist/scss' },
      ],
    }),

    // 10) Minify JS
    terser(),
  ],

  output: {
    dir: 'dist',
    format: 'esm',
    sourcemap: true,
    preserveModules: true,
    preserveModulesRoot: 'src',
  },
};
