let loadServerTasks = ()=>{
    let data = window.localStorage.getItem('team-gantt-data');
    if(data){
        data = JSON.parse(data);
        loadTaskData(data)
    }
}
let saveServerTasks = ()=>{
    window.localStorage.setItem('team-gantt-data', JSON.stringify(g_Tasks))    
}