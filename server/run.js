const fs = require('fs');
const Koa = require('koa');
const pathutil = require('path');
var Router = require('koa-router');
var bodyParser = require('koa-bodyparser');

let dataService = require('./longbow-local-db')


var app = new Koa();
var router = new Router();

app.keys = ['some secret hurr'];

const static = require('koa-static');
// 配置静态web服务的中间件
let wwwpath = pathutil.resolve(__dirname, '../app')
console.log(wwwpath)
app.use(static(wwwpath));//http://localhost:3006/index.html

router
  .get('/action/load-data', (ctx, next) => {
    let query = ctx.query;
    let reponsitoryName = query.reponsitoryName;
    let projectName = query.projectName;

    let todos = dataService.loadAllData(reponsitoryName, projectName);
    console.log(todos)
    ctx.body = JSON.stringify(todos)
  })
  .post('/action/save-data', (ctx, next) => {
      let query = ctx.query;
      let reponsitoryName = query.reponsitoryName;
      let projectName = query.projectName;
  
      ctx.body='projects';
      dataService.saveAllData('team-gantt-data', 'default', {a:1})
    })

app
.use(bodyParser())
.use(router.routes())
.use(router.allowedMethods());

let port = 3006;
app.listen(port);
console.log(`http://localhost:${port}/`)