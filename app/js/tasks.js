let taskData = [
    {
        row: 'r0',
        startDate: '2019-03-26',
        days: 3,
        subject: 'aaaaaaa aaaaaaaaa aaaaaaa',
    },
    {
        row: 'r1',
        startDate: '2019-03-26',
        days: 3,
        subject: 'aaaaaaa aaaaaaaaa aaaaaaa',
    }
]

let createTask=(rowId, startDate, task)=>{
    let dateId = `${rowId}_d_${startDate}`//r1_d_2019-03-25
    let dateCell = document.getElementById(dateId)
    let days = task.days;

    let pos = $(dateCell).offset();
    //console.log('pos',pos, dateCell)
    let taskid = 'task'+(Math.random()+'').replace(/^0\./,'')
    let taskHtml = `<div id="${taskid}" class="task" style="left:${pos.left}px;top:${pos.top}px;">${task.subject}</div>`

    $('#tasks').append(taskHtml)
}
let test = ()=>{
    let t0=new Date()
    for(let i=0;i<200;i++) {
        let date = moment().add(i, 'days').format('YYYY-MM-DD')
        let j=i%9;
        createTask('r'+j, date, {
            subject: Math.random()+''+Math.random()
        })
    }
    console.log(new Date() - t0)
}