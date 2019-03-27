let reponsitoryName = 'team-gantt-data';
let projectName = 'creek-workflow';

let g_holidays;
let g_ImportantWorkingDay;

let loadServerTasks = (callback)=>{
    let data = window.localStorage.getItem('team-gantt-data');
    let tasks = {};
    if(data){
        data = JSON.parse(data);
        tasks = data.tasks;
        g_holidays = data.holidays;
        g_ImportantWorkingDay = data.importantDays;
    }else{
        tasks = test_TaskData;
        g_holidays = test_holidays;
        g_ImportantWorkingDay = test_ImportantWorkingDay;
    }
    callback(tasks)
}
let saveServerTasks = ()=>{
    let savedata = {
        holidays: g_holidays,
        importantDays: g_ImportantWorkingDay,
        tasks: g_Tasks
    }
    window.localStorage.setItem('team-gantt-data', JSON.stringify(savedata))    
}
