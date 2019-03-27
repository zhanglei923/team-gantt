let reponsitoryName = 'team-gantt-data';
let projectName = 'creek-workflow';

g_holidays = test_holidays;
g_ImportantWorkingDay = test_ImportantWorkingDay;

let loadServerTasks = (callback)=>{
    $.ajax({
        method: "GET",
        url: "/action/load-data",
        data: { reponsitoryName, projectName }
    }).done(function( data ) {
        let tasks = {};
        if(!_.isEmpty(data)){
            tasks = data.tasks;
        }else{
            tasks = test_TaskData;
        }
        callback(tasks)
    });
}
let saveServerTasks = ()=>{
    let savedata = {
        holidays: g_holidays,
        importantDays: g_ImportantWorkingDay,
        tasks: g_Tasks
    }
    window.localStorage.setItem('team-gantt-data', JSON.stringify(savedata))    
}