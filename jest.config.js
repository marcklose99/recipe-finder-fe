module.exports = {
    transform: {
      "^.+\\.vue$": "@vue/vue3-jest",
      "^.+\\.jsx?$": "babel-jest",
      "^.+\\.tsx?$": "ts-jest",
    },
    testEnvironment: "jsdom",
    testEnvironmentOptions: {
      customExportConditions: ["node", "node-addons"],
    },
  };