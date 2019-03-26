
let createOneTask=(data)=>{
    let rowIdx = data.rowIdx;
    let endDate = data.endDate;
    let subject = data.subject;
    let rowId = 'r'+rowIdx;
    let dateId = `${rowId}_${endDate}`//r1_d_2019-03-25
    let dateCell = document.getElementById(dateId)
    let days = data.days;

    let pos = $(dateCell).offset();
    console.log('pos',pos, !!dateCell,dateId)
    let taskid = 'task'+(Math.random()+'').replace(/^0\./,'')
    let taskHtml = `<div id="${taskid}" class="task" style="right:${0}px;top:${0}px;">${subject}</div>`

    //$('#tasks').append(taskHtml)
    //console.log(rowId, endDate)
    getDay(rowIdx, endDate).html(taskHtml)
    // let taskobj = $(`#tasks>div[id="${taskid}"]`)
    // taskobj.css({left: pos.left - taskobj.outerWidth()})
}
let test = ()=>{
    let t0=new Date()
    for(let i=0;i<200;i++) {
        let date = moment().add(i, 'days').format('YYYY-MM-DD')
        let j=i%6;
        createOneTask(j, date, {
            subject: 'aaa'
        })
    }
    //console.log(new Date() - t0)
}
let loadTaskData = (data)=>{
    data.forEach((tsk)=>{
        createOneTask(tsk)
    })
}