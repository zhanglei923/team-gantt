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

    let data = dataService.loadAllData(reponsitoryName, projectName);
    console.log(data)
    ctx.body = JSON.stringify(data)
  })
  .post('/action/save-data', (ctx, next) => {
      let query = ctx.query;
      let reponsitoryName = query.reponsitoryName;
      let projectName = query.projectName;
      let data = query.data;

      console.log('----------')
      console.log(query)
      console.log(reponsitoryName,projectName,data)
      console.log('----------')
  
      dataService.saveAllData(reponsitoryName, projectName, data)
      ctx.body = 'success'
    })

app
.use(bodyParser())
.use(router.routes())
.use(router.allowedMethods());

let port = 3006;
app.listen(port);
console.log(`http://localhost:${port}/`)