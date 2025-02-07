// rollup.config.js
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import url from '@rollup/plugin-url';
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
      // Use the alias plugin to resolve your custom path aliases:
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
        tsconfig: './tsconfig.json',
        declarationDir: 'dist/types', // Generates declaration files into this folder
        exclude: ['**/__tests__', '**/*.stories.tsx', '**/*.test.tsx'],
      }),
      url({
        include: ['**/*.svg'],
        // Set limit to 0 to always emit a file (adjust as needed)
        limit: 0,
        fileName: '[dirname][hash][extname]',
      }),
      postcss({
        // All CSS (both global and CSS Modules) will be extracted into one file.
        extract: 'styles/index.css',
        minimize: true,
        // Files matching *.module.scss will be treated as CSS Modules.
        autoModules: true,
        modules: {
          // This ensures that a default export (the mapping object) is created.
          namedExports: false,
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
        use: ['sass'],
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
