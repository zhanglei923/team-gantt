let loadServerTasks = (callback)=>{
    let data = window.localStorage.getItem('team-gantt-data');
    if(data){
        data = JSON.parse(data);
        let tasks = data.tasks;
        g_holidays = data.holidays;
        g_ImportantWorkingDay = data.importantDays;
        loadTaskData(tasks)
    }else{

    }
}
let saveServerTasks = ()=>{
    let savedata = {
        holidays: g_holidays,
        importantDays: g_ImportantWorkingDay,
        tasks: g_Tasks
    }
    window.localStorage.setItem('team-gantt-data', JSON.stringify(savedata))    
}