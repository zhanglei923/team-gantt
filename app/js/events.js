let handleTdClick=(td)=>{
    //td=$(td);
    let tdid = td.getAttribute('id')
    let rowidx = td.getAttribute('rowidx');
    let date = td.getAttribute('date');

    let alltd = $('tr>td')
    alltd.removeClass('choosed_day').removeClass('selected_day').removeClass('selected_daycol')
    $(`tr>td[id$="${date}"]`).addClass('selected_daycol')
    let daytd = getDay(rowidx, date);
    daytd.addClass('selected_day')
    console.log(tdid, rowidx, date, td.className)//)
    showDateInfo(null, date)
}
let handleTdSelected=(td)=>{
    let tdid = td.getAttribute('id')
    let rowidx = td.getAttribute('rowidx');
    let date = td.getAttribute('date');

    let alltd = $('tr>td')
    alltd.removeClass('choosed_day').removeClass('selected_day').removeClass('selected_daycol')
    $(td).addClass('choosed_day')
    console.log(tdid, rowidx, date)
}
let hoveringrowidx, hoveringdate;
let handleTdMouseOver=(td)=>{
    //td=$(td);
    let tdid = td.getAttribute('id')
    let rowidx = td.getAttribute('rowidx');
    let date = td.getAttribute('date');
    if(date === hoveringdate && rowidx === hoveringrowidx) return;
    hoveringrowidx = rowidx;
    hoveringdate = date;
    $('tr').removeClass('hovering')
    $('td[date].hovering').removeClass('hovering')
    //console.log(rowidx,date)
    let coldays = getColumn(date).days;
    let rowdays = getRow(rowidx);
    // rowdays.addClass('hovering')
    // coldays.addClass('hovering')
}
let handleCreateTaskPrompt=(text, td)=>{
    let date = td.getAttribute('date')
    let tr = td.parentNode;
    let rowIdx = tr.getAttribute('rowidx')
    text = _.trim(text);
    if(!text) return;
    var title = text;
    createTask({
        id: 'task_'+((Math.random()+'').replace(/0\./,'')*1).toString(36),
        rowIdx: rowIdx,
        startDate: null,
        endDate: date,
        days: 1,
        subject: title
    })
}

let initEvent = ()=>{
    $('#root').on('mousedown', 'td[id].day', (e)=>{
        if(e.ctrlKey||e.metaKey){
            handleTdSelected(e.currentTarget);
        }else{
            handleTdClick(e.currentTarget);
        }
        e.preventDefault();
        return false;            
    })
    $('#root').on('dblclick', 'td[id].day', (e)=>{
        let text=prompt('Please input, like "Your Subject..."')
        let td=e.currentTarget;
        handleCreateTaskPrompt(text, td)
    })
    $('#root').on('mousemove', 'td[id].day', (e)=>{
        handleTdMouseOver(e.currentTarget);
    })
    $('#saveBtn').click(()=>{
        saveServerTasks();
    })
}