let path = require('path')
let webpack = require('webpack')
let BundleTracker = require('webpack-bundle-tracker')
let VueLoaderPlugin = require('vue-loader/lib/plugin')
let CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: 'http://127.0.0.1:9000/static/',
    filename: 'build.js'
  },
  module: {
    rules: [
      {
      test: /\.html$/,
        use: ['html-loader']
      },
      {
      test: /\.css$/,
        use: [
          'vue-style-loader',
          {loader: "css-loader", options: { sourceMap: true }},
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          {loader: "css-loader", options: { sourceMap: true }},
          {loader: "sass-loader", options: { sourceMap: true }},
        ],
      },
      {
        test: /\.sass$/,
        use: [
          'vue-style-loader',
          {loader: "css-loader", options: { sourceMap: true }},
          {loader: "sass-loader?indentedSyntax", options: { sourceMap: true }}
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this necessary.
            'scss': [
              'vue-style-loader',
              {loader: "css-loader", options: { sourceMap: true }},
              {loader: "sass-loader", options: { sourceMap: true }}
            ],
            'sass': [
              'vue-style-loader',
              {loader: "css-loader", options: { sourceMap: true }},
              {loader: "sass-loader?indentedSyntax", options: { sourceMap: true }},
            ]
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg|ico|ttf|otf|woff|woff2|eot|xml|webmanifest)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]',
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin([path.resolve(__dirname, '../dist')], {
      root: process.cwd()
    }),
    new VueLoaderPlugin(),
    new BundleTracker({
      filename: './webpack-stats.json'
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    })
  ],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true,
    port: 9000,
    disableHostCheck: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    }
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}
