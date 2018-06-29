var path = require('path')
var webpack = require('webpack')
var HTMLWebpackPlugin = require('html-webpack-plugin')

var PORT = 2333
var HOST = 'http://localhost'
var URL = `${HOST}:${PORT}`

module.exports = {
  // 配置 webpack 的上下文，entry 以及 loader, plugin 中的相对路径都会以这个上下文为起始路径。先把上下文配好，后面的相对路径才好根据上下文路径来配
  context: path.resolve(__dirname, '../src'),

  entry: [
    'react-hot-loader/patch',
    `webpack-dev-server/client?${URL}`,
    'webpack/hot/only-dev-server', // 可以在有错误发生时不热加载刷新页面
    './index.tsx'
  ],
  // 打包输出目录及文件名
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'bundle.js',
    publicPath: '',
  },
  // 配置 webpack 处理得文件扩展名
  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'jsx', '.json']
  },

  // 配置各种loader
  module: {
    rules: [
      // 为打包编译后的文件添加 source-map，注意 enforce: 'pre'，这样可以在被编译的 JS 文件被加载钱就先加载 source-map-loader，从而在文件加载后得到 source-map
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader']
      },
      // ts(x)文件被 loader 编译前先进行 lint 检查
      {
        test: /\.tsx?$/,
        enforce: 'pre',
        include: [path.resolve(__dirname, '../src')],
        use: [{
          loader: 'tslint-loader',
          options: {
            tsConfigFile: 'tsconfig.json',
          }
        }]
      },

      // 编译 ts(x) 文件的 loader
      {
        test: /\.tsx?$/,
        exclude: /node_module/,
        use: [
          'react-hot-loader/webpack',
          {
            loader: 'awesome-typescript-loader',
            options: {
              useCache: true
            }
          }
        ]
      },

      // 编译 CSS, SCSS 的 loader
      {
        test: /\.(css|scss)$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: function() {
                return [
                  require('precss'),
                  require('autoprefixer')
                ]
              }
            }
          }
        ]
      },

      // 处理字体的 loader
      {
        test: /\.(ttf|eot|woff(?:2)?)(\?[a-z0-9]+)?$/,
        use: ['url-loader?limit=1000']
      },

      // 处理 svg 的 loader
      {
        test: /\.svg?(\?[a-z0-9]+)?$/,
        use: ['url-loader?limit=1000']
      },
      // 处理一般图片的 loaders
      {
        test: /\.(jpe?g|png|gif|ogg|mp3)$/,
        use: ['url-loader?limit=1000']
      }
    ]
  },

  plugins: [
    // 在 webpack 编译时定义全局变量
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    // 配置 HTML 模板的 plugin
    new HTMLWebpackPlugin({
      template: './app.html',
      filename: 'index.html',
    }),
    // 当模块更新的时候，会在浏览器控制台里 log 出更新的模块名称以及模块路径
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],

  // source map 配置
  devtool: 'source-map',

  // 配置 dev server
  devServer: {
    hot: true,
    compress: true,
    contentBase: path.resolve(__dirname, '../src'),
    port: PORT,
    publicPath: URL,
    historyApiFallback: true,
    stats: {
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }
  }
}




















