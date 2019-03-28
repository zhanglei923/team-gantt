
let deleteTask=(taskId)=>{
    delete g_Tasks[taskId];
    $('#'+taskId).off().remove()
};
let createTask=(data)=>{
    let taskId = data.id;
    g_Tasks[taskId] = JSON.parse(JSON.stringify(data));
    let rowIdx = data.rowIdx;
    let endDate = data.endDate;
    let subject = data.subject;
    let rowId = 'r'+rowIdx;
    let dateId = `${rowId}_${endDate}`//r1_d_2019-03-25
    let dateCell = document.getElementById(dateId)
    let days = data.days;

    let pos = $(dateCell).offset();
    console.log('pos',pos, !!dateCell,dateId)
    let taskHtml = `<div id="${taskId}" class="task" style="right:${0}px;top:${0}px;">
                        <pre>${subject}</pre>
                    </div>`

    //$('#tasks').append(taskHtml)
    //console.log(rowId, endDate)
    getDay(rowIdx, endDate).html(taskHtml)
    // let taskobj = $(`#tasks>div[id="${taskid}"]`)
    // taskobj.css({left: pos.left - taskobj.outerWidth()})
}
let loadTaskData = (data)=>{
    for(let id in data){
        let d = data[id];
        d.id = id;
        createTask(d)
    }
}