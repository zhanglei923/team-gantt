let dataService = require('./longbow-local-db')

let reponsitoryName = 'team-gantt-data';
let projectName = 'creek-workflow';

let data0 = {a:1}

dataService.saveAllData(reponsitoryName, projectName, data0)
let todos = dataService.loadAllData(reponsitoryName, projectName);

console.log('todos', todos)