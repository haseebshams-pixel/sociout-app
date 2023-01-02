module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@assets': './src/assets',
          '@routes': './src/routes',
          '@screens': './src/screens',
          '@components': './src/shared/components',
          '@redux': './src/shared/redux',
          '@services': './src/shared/services',
          '@hooks': './src/shared/hooks',
          '@theme': './src/shared/theme',
          '@utils': './src/shared/utils',
          '@loaders': './src/shared/loaders',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
