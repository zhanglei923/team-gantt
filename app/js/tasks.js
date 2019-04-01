let escapeHtml=(txt)=>{
    return (txt + '')
                    .replace(/&/g, '&amp;')
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;')
                    .replace(/'/g, '&#039;')
                    .replace(/"/g, '&quot;')
                    .replace(/\n/g, '<br />');
}
let deleteTask=(taskId)=>{
    delete g_Tasks[taskId];
    $('#'+taskId).off().remove()
};
let getTaskHtml=(data)=>{
    let taskHtml = `<div id="${data.id}" class="task" style="right:${0}px;top:${0}px;">
                        <pre><a href="javascript:void(0)" class="delete">X</a>|${escapeHtml(data.subject)}</pre>
                    </div>`
    return taskHtml;
}
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
    let taskHtml = getTaskHtml(data);

    //$('#tasks').append(taskHtml)
    //console.log(rowId, endDate)
    getDayElem(rowIdx, endDate).html(taskHtml)
    // let taskobj = $(`#tasks>div[id="${taskid}"]`)
    // taskobj.css({left: pos.left - taskobj.outerWidth()})
}
let showTaskEditor=(taskid)=>{
    let data = g_Tasks[taskid];
    if(!data)return;
    console.log(data)
    let code = `${data.rowIdx},${data.endDate},${data.subject}`;
    $('#taskEditor').show().attr('taskid', taskid)
    $('#editTaskRowIdxIpt').val(data.rowIdx)
    $('#editTaskDateIpt').val(data.endDate)
    $('#editTaskSubjectIpt').val(data.subject)
}
let updateTask=()=>{
    let taskid = $('#taskEditor').attr('taskid')
    let rowIdx = _.trim($('#editTaskRowIdxIpt').val())
    let endDate = _.trim($('#editTaskDateIpt').val())
    let subject = _.trim($('#editTaskSubjectIpt').val())

    console.log(taskid, rowIdx, endDate, subject)
    let data = g_Tasks[taskid];
    if(!data)return;
    Object.assign(data, {
        rowIdx, endDate, subject
    })
    console.log(data)
    $('#'+taskid).off().remove()
    let tdid = getDayId(rowIdx, endDate)
    $('#'+tdid).html(getTaskHtml(data))

    g_Tasks[taskid] = data;
}
let loadTaskData = (data)=>{
    for(let id in data){
        let d = data[id];
        d.id = id;
        createTask(d)
    }
}