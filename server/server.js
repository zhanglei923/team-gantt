var express = require('express');
var app = express();
var fs = require('fs');
var http = require('http');
var URL = require('url');
var bodyParser = require('body-parser')
var _ = require('lodash')
var pathutil = require('path');
let dataService = require('./longbow-local-db')

let PORT = 3006;
var httpServer = http.createServer(app);

app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}));

let webPath = pathutil.resolve(__dirname, '../app')
//全局拦截器
app.use(function (req, res, next) {
    res.set('Cache-Control', 'no-cache')
    next();
});
app.use('/', express.static(webPath));//注意：必须在全局拦截器之后，否则拦截器无法运行

console.log('webPath:',webPath)
app.get('/action/load-data**', function(req, res) {
    var html = 'unknown page.'
    var accept = req.headers.accept;
    var originalUrl = req.originalUrl;
    var url = req.url;
    var urlInfo = URL.parse(url, true);

    let query = req.query;

    let reponsitoryName = query.reponsitoryName;
    let projectName = query.projectName;

    let data = dataService.loadAllData(reponsitoryName, projectName);
    let result = JSON.stringify(data)

    res.send(result)
});
app.post('/action/save-data',function(req, res){
    var accept = req.headers.accept;
    var originalUrl = req.originalUrl;

    console.log(req.body)
    let reponsitoryName = req.body.reponsitoryName;
    let projectName = req.body.projectName;
    let data = req.body.data;
    dataService.saveAllData(reponsitoryName, projectName, data)

    res.send('succ')
})
app.get('/action/projects',function(req, res){
    let query = req.query;

    let reponsitoryName = query.reponsitoryName;
    let projects = dataService.loadProjects(reponsitoryName)

    res.send(projects)
})
app.get('/action/imortantdays',function(req, res){
    let query = req.query;

    let holidays = [];
    let fullpath;
    fullpath = pathutil.resolve('../../', 'gantt_holidays.json');
    if(fs.existsSync(fullpath)){
        let txt = fs.readFileSync(fullpath, 'utf8');
        holidays = JSON.parse(txt)
    }
    let importantdays = {};
    fullpath = pathutil.resolve('../../', 'gantt_importantdays.json');
    if(fs.existsSync(fullpath)){
        let txt = fs.readFileSync(fullpath, 'utf8');
        importantdays = JSON.parse(txt)
    }

    res.json({holidays,importantdays})
})

// var server = httpServer.listen(PORT, function() {
//     var host = server.address().address;
//     var port = server.address().port;
    
//     console.log('HTTP http://localhost:%s', port);
//     //exec.exec('start http://localhost:'+port);
// });

//启动
var server = app.listen(3006, function () {
    var host = server.address().address;
    var port = server.address().port;
  
    console.log('Example app listening at http://%s:%s', host, port);
  });