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
    del({ targets: 'dist/*' }),

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

    peerDepsExternal(),
    resolve(),
    commonjs(),

    // if you ever import JSON in your library code:
    json(),

    url({
      include: ['**/*.svg'],
      limit: 0,
      fileName: 'assets/icons/[dirname][hash][extname]',
    }),

    typescript({
      tsconfig: './tsconfig.build.json',
      declaration: true,
      declarationDir: 'dist/types',
      exclude: ['**/__tests__', '**/*.stories.tsx', '**/*.test.tsx'],
    }),
    copy({
      targets: [
        { src: 'src/assets/fonts/*', dest: 'dist/assets/fonts' },
        {
          src: 'src/styles/**/*.scss',
          dest: 'dist/scss',
        },
      ],
    }),

    postcss({
      extract: 'styles/global.css',
      minimize: true,
      modules: {
        auto: /\.module\.scss$/i,
        generateScopedName: '[name]__[local]___[hash:base64:5]',
      },
      use: ['sass'],
      plugins: [autoprefixer()],
    }),

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
