let g_TaskData = [
    {
        row: 'r0',
        startDate: '2019-03-26',
        days: 3,
        subject: 'AAAAAAA AAAAAAA AAAAAAA',
    },
    {
        row: 'r1',
        startDate: '2019-04-16',
        days: 30,
        subject: 'BBBBBBB BBBBBBBB BBBBBB',
    },
    {
        row: 'r2',
        startDate: '2019-02-16',
        days: 90,
        subject: 'CCCCCCCC CCCCCCCC CCCCCCCC',
    }
]

let createOneTask=(rowIdx, startDate, task)=>{
    let rowId = 'r'+rowIdx;
    let dateId = `${rowId}_${startDate}`//r1_d_2019-03-25
    let dateCell = document.getElementById(dateId)
    let days = task.days;

    let pos = $(dateCell).offset();
    //console.log('pos',pos, dateCell,dateId)
    let taskid = 'task'+(Math.random()+'').replace(/^0\./,'')
    let taskHtml = `<div id="${taskid}" class="task" style="left:${pos.left}px;top:${pos.top}px;">${task.subject}</div>`

    $('#tasks').append(taskHtml)
    let taskobj = $(`#tasks>div[id="${taskid}"]`)
    taskobj.css({left: pos.left - taskobj.outerWidth()})
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