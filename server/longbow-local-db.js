/**
 * https://github.com/zhanglei923/longbow-local-db
 * License MIT
 * zhanglei923@gmail.com
 */

const fs = require('fs');
const pathutil = require('path');
const moment = require('moment');
const mkdir = require('make-dir')
const _ = require('lodash')

//config
let configpath = pathutil.resolve(__dirname, './longbow-local-db.json')
if(!fs.existsSync(configpath)){
    throw "can not find config file: 'longbow-local-db.json'"
}
let config = fs.readFileSync(configpath, 'utf8')
console.log(config)
config = JSON.parse(config)
let MaxHistory = config.maxHistory?config.maxHistory:100;
let defaultProjectName = config.defaultProjectName?config.defaultProjectName:'default';
let dataFolder = config.dataFolder?config.dataFolder:'./longbow-local-db-repo';
let dataPath = pathutil.resolve(__dirname, dataFolder)


mkdir.sync(dataPath)
console.log(dataPath)

let getSavePath = (repoName, prjName) =>{
    let path = dataPath + '/' + repoName + '/' + prjName + '/';
    mkdir.sync(path);
    return path;
}

let handler = {
    getDataPath:()=>{
        return dataPath;
    },
    getCountPath: (repoName, prjName)=>{
        return getSavePath(repoName, prjName) + '/counter.json'; 
    },
    getCount: (repoName, prjName)=>{
        let count = 0;
        let counterPath = handler.getCountPath(repoName, prjName)
        if(!fs.existsSync(counterPath)){
            fs.writeFileSync(counterPath, count);
        }
        count = fs.readFileSync(counterPath, 'utf8');
        return parseInt(count);
    },
    setCount: (repoName, prjName, count)=>{
        let counterPath = handler.getCountPath(repoName, prjName)
        fs.writeFileSync(counterPath, count);
    },
    getHistoryList:(repoName, prjName)=>{
        //console.log('gg', prjName)
        var results = []
        let savepath = getSavePath(repoName, prjName);
        console.log('savepath',savepath)
        if(!fs.existsSync(getSavePath(repoName, prjName))) return;
        var list = fs.readdirSync(getSavePath(repoName, prjName))
        list.forEach(function(file) {
            file = getSavePath(repoName, prjName) + '/' + file
            var stat = fs.statSync(file)
            if (stat && stat.isFile() && !/counter\.json$/.test(file)){
                //console.log(stat)
                //console.log(file)
                results.push({
                    birthtimeMs: stat.birthtimeMs,
                    file
                })
            }
        })
        results = results.sort((a,b)=>{
            return a.birthtimeMs - b.birthtimeMs;
        })
        results.reverse();
        return results;
    },
    cleanHistory: (repoName, prjName)=>{
        var results = handler.getHistoryList(repoName, prjName);
        var count = 0;
        results.forEach((todo)=>{
            count++;
            if(!/counter\.json$/.test(todo.file))
            if(count > MaxHistory)fs.unlinkSync(todo.file)
        })
        console.log(results)
    },
    getFileName:(count)=>{
        let count0x = count.toString(32);//32进制
        let filename = `todos-${count0x}.json`; 
        return filename;
    },
    loadAllData:(repoName, prjName)=>{
        let history = handler.getHistoryList(repoName, prjName);
        let result = {
            items:[]
        }
        if(history.length===0) return result;
        let latest = history[0]
        //let count = handler.getCount();
        let fpath = getSavePath(repoName, prjName) + '/latest.json';//latest.file;
        if(!fs.existsSync(fpath)) return result;
        let todos = fs.readFileSync(fpath, 'utf8');
        todos = JSON.parse(todos)
        if(_.isArray(todos)){
            result.items = todos;//for old data
        }else{
            result = todos;
        }
        return result;
    },
    saveAllData:(repoName, prjName, todos)=>{
        let count = handler.getCount(repoName, prjName);
        count++;
        let fpath = getSavePath(repoName, prjName) + '/' + handler.getFileName(count);
        let todostr = JSON.stringify(todos);
        fs.writeFileSync(fpath, todostr); 
        fs.writeFileSync(getSavePath(repoName, prjName) + '/latest.json', todostr); 
        handler.setCount(repoName, prjName, count)
        //fs.readFileSync( 'utf8')
        handler.cleanHistory(repoName, prjName);
    },
    loadProjects:(repoName)=>{
        let repoPath = pathutil.resolve(dataPath, repoName)

        if(!fs.existsSync(repoPath)) return [defaultProjectName];
        var list = fs.readdirSync(repoPath)
        let results = [];
        list.forEach(function(file) {
            var fpath = repoPath + '/' + file
            var stat = fs.statSync(fpath)
            if (stat && !stat.isFile()){
                results.push(file)
            }
        })
        if(results.length ===0) results = [defaultProjectName]
        //console.log(results)
        return results;
    },
    createProject:(repoName, projectName)=>{
        let fpath = getSavePath(repoName, projectName);
        if(fs.existsSync(fpath)) return 'exist';
        fs.mkdirSync(fpath)
        return 'succ';
    }
};
module.exports = handler;
