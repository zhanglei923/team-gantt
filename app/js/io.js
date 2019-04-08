let reponsitoryName = 'team-gantt-data';
let projectName = window.location.search?window.location.search.replace(/^\?projectName\=/,''):'default'//'creek-workflow';

g_holidays = test_holidays;
g_ImportantWorkingDay = test_ImportantWorkingDay;
updateImportantDaysData()

let loadServerTasks = (callback)=>{
    $.ajax({
        method: "GET",
        url: "/action/load-data",
        dataType:'json',
        data: { reponsitoryName, projectName }
    }).done(function( data ) {
        let tasks = {};
        let schedules = {}
        if(!_.isEmpty(data)){
            tasks = data.tasks;
            schedules = data.schedules;
        }else{
            tasks = test_TaskData;
        }
        callback(tasks, schedules)
    });
}
let saveServerTasks = ()=>{
    let data = {
        tasks: g_Tasks,
        schedules: g_Schedules
    }
    $('td').addClass('saving')
    $.ajax({
        method: "POST",
        url: "/action/save-data",
        data: { reponsitoryName, projectName, data }
    }).done(function( data ) {
        console.log(data)
        window.setTimeout(()=>{
            $('td').removeClass('saving')
        }, 200)        
    });
}
let loadProjectList=()=>{
    $.ajax({
        method: "GET",
        url: "/action/projects",
        dataType:'json',
        data: { reponsitoryName }
    }).done(function( data ) {
        //console.log(data)
        let html=''
        data.forEach((pName)=>{
            html += `<a href="./?projectName=${pName}" class="projectname ${pName===projectName?'current':''}" target="_self">${pName}</a>&nbsp;`
        })
        $('#projectslist').html(html)
    });
}