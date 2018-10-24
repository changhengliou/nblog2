const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = (env, options) => {
  const isProduction = options.mode === 'production';

  return {
    entry: [path.join(__dirname, 'index.js')],
    output: {
      path: path.join(__dirname, '..', 'static', 'dist'),
      filename: `[name]${isProduction ? '.min' : ''}.js`,
      publicPath: '/static/dist',
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        '@': path.join(__dirname, 'src'),
      },
    },
    devServer: {
      contentBase: path.join(__dirname, '..'),
      port: 3000,
    },
    devtool: isProduction ? false : 'source-map',
    module: {
      rules:
              [{
                type: 'javascript/auto',
                test: /\.mjs$/,
                include: /node_modules/,
                use: [],
              },
              {
                enforce: 'pre',
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
              },
              {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env', '@babel/preset-react'],
                    plugins: ['@babel/plugin-transform-runtime', '@babel/plugin-proposal-class-properties'],
                  },
                },
              },
              {
                test: /\.html$/,
                use: [{
                  loader: 'html-loader',
                  options: {
                    minimize: true,
                  },
                }],
              },
              {
                test: /\.css$/,
                use: [
                  MiniCssExtractPlugin.loader, {
                    loader: 'css-loader',
                    options:
                          { minimize: isProduction, sourceMap: !isProduction },
                  },
                  {
                    loader: 'postcss-loader',
                    options: { plugins: [require('autoprefixer')] },
                  },
                ],
              },
              ],
    },
    plugins: [
      new HtmlWebPackPlugin(
        {
          template: './index.html',
          title: 'App',
          filename: isProduction ? '../index.html' : 'index.html',
        },
      ),
      new MiniCssExtractPlugin(
        { filename: '[name].css', chunkFilename: '[id].css' },
      ),
    ],
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },
  };
};
