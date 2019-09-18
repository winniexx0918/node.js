const path = require('path');
module.exports = {
    entry: './src/app.js',  //進入點，資料位置
    mode: 'production', // 兩種不同檔: development or production壓縮檔
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'bundle.js'
    },
    module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          }
        ]
      }

};
