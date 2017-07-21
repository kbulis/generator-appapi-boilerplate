var htmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

var app = {
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'bin/app'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.html$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'raw-loader'
        }
      }
    ]
  },
  entry: {
    shared: [
      'angular',
      'angular-route'
    ],
    app: [
      './src/app/index.js'
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      template: './src/app/index.html',
      favicon: './src/app/favicon.ico',
      minify: {
        caseSensitive: true,
        collapseWhitespace: true,
        minifyCSS: true
      },
      chunksSortMode: function(a, b) {
        if (a.names[0] === 'shared') {
          return -1;
        }
        else
        if (b.names[0] === 'shared') {
          return +1;
        }
        else {
          return 0;
        }
      }
    })
  ]
};


var api = {
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'bin/api'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.txt$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'raw-loader'
        }
      }      
    ]
  },
  entry: {
    api: [
      './src/api/index.js'
    ]
  },
  externals: {
    'express': 'commonjs express'
  }
};

module.exports = [
  app,
  api
];