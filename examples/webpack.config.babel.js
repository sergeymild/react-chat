import path from 'path';
import express from 'express';
import webpack from 'webpack';

const config = {
  entry: {
    index: './src/index.js',
    chat_list_container: './src/ChatListContainer.jsx',
    chat_room_container: './src/ChatRoomContainer.jsx'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './bundle/')
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      }, {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }, {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: ['url-loader']
      }
    ]
  },
  externals: {
    'react-chat': 'window.ReactChat',
    'react-dom': 'window.ReactDOM',
    'react': 'window.React'
  },
  plugins: [new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('development')})],
  devServer: {
    contentBase: './',
    publicPath: '/build',
    port: 8080,
    before(app) {
      app.use('/build', express.static(path.resolve(__dirname, '../build/')));
    }
  }
};

export default config;
