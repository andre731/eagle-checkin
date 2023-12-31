module.exports = function (api) {
  api.cache(true)
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      'react-native-reanimated/plugin',
      [
        "module-resolver",
        {
          root: ["."],
          alias: {
            "@": "./src",
            "@views": "./src/views",
            "@routes": "./src/routes",
            "@types": "./src/types",
            "@common": "./common",
            "@enums": "./common/enums",
            "@components": "./src/components",
          },
        },
      ],
    ],
  }
}
