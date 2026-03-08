const webpack = require("webpack");
const { merge } = require("webpack-merge");
const common = require("./webpack.common");

module.exports = merge(common, {
  // Set the mode to development or production
  mode: "development",
  // Control how source maps are generated
  devtool: "inline-source-map",

  // Spin up a server for quick development
  devServer: {
    historyApiFallback: true,
    open: true,
    compress: true,
    port: 9000, // Порт 9000
    host: "localhost", // Хост
    hot: true, // Горячая перезагрузка (HMR)
    watchFiles: ["src/**/*"], // Отслеживание изменений в src
    static: {
      directory: path.join(__dirname, "dist") // Корневая папка для статических файлов
    }
  },

  plugins: [
    // Only update what has changed on hot reload
    new webpack.HotModuleReplacementPlugin(),
  ],
});