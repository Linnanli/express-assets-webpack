const expressAssetsWebpack = require('./index')

const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');

const { resolveConfig, loadConfig } = require('./resolve')

const config = loadConfig()
resolveConfig(config)

// 实例化一个 Expressjs app
const app = express();

// 用读取到的 Webpack 配置实例化一个 Compiler
const compiler = webpack(config);
// 给 app 注册 webpackMiddleware 中间件
app.use(webpackMiddleware(compiler));
// 启动 HTTP 服务器，服务器监听在 3000 端口 
app.listen(3000);