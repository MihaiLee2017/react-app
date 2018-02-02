快速开始
=============

###########框架安装
1 npm install -g create-react-app 
2 create-react-app myapp
3 cd myapp 
4 npm start

环境配置
=============

###########引入SASS
1 npm install sass-loader node-sass --save-dev
2 找到webpack.config.dev.js文件中 loaders中的第一项exclude（值为数组），排除scss文件，否则将被'url-loader'捕获。
    {
    exclude: [
        /\.html$/,
        /\.(js|jsx)(\?.*)?$/,
        /\.css$/,
        /\.json$/,
        /\.svg$/,
        /\.scss$/     ....新增项!
    ]
3 loaders新增一项：
    {
        test: /\.scss$/,
        loader: 'style!css!postcss!sass?outputStyle=expanded'
    },

###########引入antd-mobile
1 npm install antd-mobile --save
2 使用 babel-plugini-import插件按需引用 npm install babel-plugin-import --save-dev
3 npm install --save-dev babel-cli babel-preset-es2015
3 安装完毕后，在根目录新建文件，命名: .babelrc
    {
      "presets": [
        "es2015",
        "react"
      ],
      "plugins": [
        [
          "import",
            {
              "libraryName": "antd-mobile",
              "style": "css"
            }
          ]
        ]
    }
4 把package.json中的babel配置给删掉，尤其是：react-app！！！
 "babel": {
    "presets": [
      "react-app"
    ]
  },
5 webpack.config.dev.js和webpack.config.prod.js中，都需要为resolve的extensions新增一项'.web.js'


###########引入react-router 4.x
1 npm install --save-dev react-router react-router-dom

###########引入react-redux
1 npm install --save redux react-redux redux-devtools

###########引入redux-sage
1 npm install --save redux-saga