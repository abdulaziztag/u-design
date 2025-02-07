import { resolve } from 'path';

import type { StorybookConfig } from '@storybook/react-webpack5';
import type { RuleSetRule } from 'webpack';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-webpack5-compiler-swc',
    '@storybook/addon-onboarding',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  swc: () => ({
    jsc: {
      transform: {
        react: {
          runtime: 'automatic',
        },
      },
    },
  }),
  core: {
    builder: 'webpack5',
  },
  staticDirs: [resolve(__dirname, '../src/assets')],
  webpackFinal: async (config) => {
    if (!config.resolve) config.resolve = {};

    config.resolve.alias = {
      ...config.resolve.alias,
      '@components': resolve(__dirname, '../src/components'),
      '@styles': resolve(__dirname, '../src/styles'),
      '@assets': resolve(__dirname, '../src/assets'),
    };

    config.module = config.module || { rules: [] };

    config.module.rules = (config.module.rules ?? []).filter(
      (rule): rule is RuleSetRule =>
        rule !== null &&
        typeof rule === 'object' &&
        !(rule.test instanceof RegExp && rule.test.toString().includes('svg')),
    );

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    config.module.rules.push({
      test: /\.(otf|ttf|woff|woff2)$/,
      type: 'asset/resource',
      generator: {
        filename: 'fonts/[name][ext]',
      },
    });

    config.module.rules.push({
      test: /\.scss$/,
      exclude: /\.module\.scss$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
          },
        },
        'sass-loader',
      ],
    });

    config.module.rules.push({
      test: /\.module\.scss$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: {
              namedExport: false,
              localIdentName: '[local]__[hash:base64:5]',
            },
            importLoaders: 1,
          },
        },
        'sass-loader',
      ],
    });

    return config;
  },
};

export default config;
