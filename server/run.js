const fs = require('fs');
const Koa = require('koa');
const pathutil = require('path');
var Router = require('koa-router');
var bodyParser = require('koa-bodyparser');

let dataService = require('./longbow-local-db')
dataService.saveAllData('team-gantt-data', 'default', {a:1})

var app = new Koa();
var router = new Router();

app.keys = ['some secret hurr'];


const static = require('koa-static');
// 配置静态web服务的中间件
let wwwpath = pathutil.resolve(__dirname, '../app')
console.log(wwwpath)
app.use(static(wwwpath));//http://localhost:3006/index.html
 

let port = 3006;
app.listen(port);
console.log(`http://localhost:${port}/`)