let reponsitoryName = 'team-gantt-data';
let projectName = window.location.search?window.location.search.replace(/^\?projectName\=/,''):'default'//'creek-workflow';

g_holidays = test_holidays;
g_ImportantWorkingDay = test_ImportantWorkingDay;

let loadServerTasks = (callback)=>{
    $.ajax({
        method: "GET",
        url: "/action/load-data",
        dataType:'json',
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
    let data = {
        tasks: g_Tasks
    }
    $.ajax({
        method: "POST",
        url: "/action/save-data",
        data: { reponsitoryName, projectName, data }
    }).done(function( data ) {
        console.log(data)
    });
}