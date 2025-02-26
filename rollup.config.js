// rollup.config.js
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import url from '@rollup/plugin-url';
import autoprefixer from 'autoprefixer';
import copy from 'rollup-plugin-copy';
import del from 'rollup-plugin-delete';
import { dts } from 'rollup-plugin-dts';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';

import packageJson from './package.json' assert { type: 'json' };

// Resolve __dirname in ES modules:
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    // Mark React as external so that consumers must install it
    external: ['react', 'react-dom'],
    plugins: [
      del({ targets: 'dist/*' }),
      alias({
        entries: [
          {
            find: '@styles',
            replacement: path.resolve(__dirname, 'src/styles'),
          },
          {
            find: '@assets',
            replacement: path.resolve(__dirname, 'src/assets'),
          },
          {
            find: '@components',
            replacement: path.resolve(__dirname, 'src/components'),
          },
        ],
      }),
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.build.json',
        exclude: ['**/__tests__', '**/*.stories.tsx', '**/*.test.tsx'],
      }),
      url({
        include: ['**/*.svg'],
        limit: 0,
        fileName: 'assets/icons/[dirname][hash][extname]',
      }),
      copy({
        targets: [{ src: 'src/assets/fonts/*', dest: 'dist/assets/fonts' }],
        verbose: true,
      }),
      postcss({
        extract: 'styles/global.css', // All CSS will be extracted into this one file
        minimize: true,
        // Only process CSS modules for files matching *.module.scss
        modules: {
          auto: (id) => /\.module\.scss$/i.test(id),
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
        use: ['sass'],
        plugins: [autoprefixer()],
      }),
      terser(),
    ],
  },

  // Bundle TypeScript declaration files
  {
    input: 'dist/types/index.d.ts',
    output: [{ file: 'dist/types/index.d.ts', format: 'es' }],
    plugins: [dts()],
  },
];
