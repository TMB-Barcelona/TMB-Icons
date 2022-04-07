const path = require('path');
const glob = require("glob");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const NpmDtsPlugin = require('npm-dts-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = (env) => ({
  entry: './src/react/index.tsx',
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  externals: env.test ? [] : [nodeExternals()],
  mode: env.prod ? 'production' : 'development',
  output: env.test ? undefined : {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    library: {
      name: 'TMB-Icons',
      type: 'umd'
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new NpmDtsPlugin({
      output: 'dist/index.d.ts'
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.xml$/i,
        use: 'raw-loader',
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
        loader: 'url-loader',
      },
    ],
  },
});
