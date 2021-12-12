import * as path from "path";
import * as webpack from "webpack";
import * as HtmlWebpackPlugin from "html-webpack-plugin";
import * as MiniCssExtractPlugin from "mini-css-extract-plugin";
import "webpack-dev-server";

const config: webpack.Configuration = {
  mode: "production",
  entry: {
    index: "./src/ts/index.ts"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      },
      {
        test: /\.png/,
        type: "asset/resource"
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/html/index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "./css/[name].css",
      chunkFilename: "[id].css"
    })
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  output: {
    filename: "./js/[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: 'img/[hash][ext][query]',
    clean: true
  }
};

export default config;
