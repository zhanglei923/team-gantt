let handleTdClick=(td)=>{
    //td=$(td);
    let tdid = td.getAttribute('id')
    let rowidx = td.getAttribute('rowidx');
    let date = td.getAttribute('date');

    let alltd = $('tr>td')
    alltd.removeClass('choosed_day').removeClass('selected_day').removeClass('selected_daycol')
    $(`tr>td[id$="${date}"]`).addClass('selected_daycol')
    let daytd = getDayElem(rowidx, date);
    daytd.addClass('selected_day')
    getRowTdElems(rowidx).addClass('selected_day')
    //console.log(tdid, rowidx, date, td.className)//)
    showDateInfo(null, date)
}
let handleTdChoosed=(td)=>{
    let tdid = td.getAttribute('id')
    let rowidx = td.getAttribute('rowidx');
    let date = td.getAttribute('date');

    let alltd = $('tr>td')
    td=$(td);
    alltd.removeClass('choosed_day').removeClass('selected_day').removeClass('selected_daycol')
    if(td.hasClass('choosed_day')){
        unChooseDay(rowidx, date)
    }else{
        chooseDay(rowidx, date, td)
    }

}
let g_hoveringrowidx, g_hoveringdate;
let handleTdMouseOver=(e, td)=>{
    //td=$(td);
    let ctrlHolding = e.metaKey || e.ctrlKey;
    if(ctrlHolding){
        let tdid = td.getAttribute('id')
        let rowidx = td.getAttribute('rowidx');
        let date = td.getAttribute('date');
        if(date === g_hoveringdate && rowidx === g_hoveringrowidx) return;
        g_hoveringrowidx = rowidx;
        g_hoveringdate = date;
        $('tr').removeClass('hovering')
        $('td[date].hovering').removeClass('hovering')
        //console.log(rowidx,date)
        let coldays = getColumnElem(date).days;
        let rowdays = getRow(rowidx);
        // rowdays.addClass('hovering')
        // coldays.addClass('hovering')
        //console.log(ctrlHolding, g_hoveringrowidx, g_hoveringdate)
    }
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
            handleTdChoosed(e.currentTarget);
        }else{
            resetChooseDay()
            handleTdClick(e.currentTarget);
        }
        e.preventDefault();
        return false;            
    })
    $('#root').on('click', '.task .delete', (e)=>{
        askDeleteTask($(e.currentTarget).closest('.task').attr('id'))
    })
    $('#root').on('dblclick', 'td[id].day', (e)=>{
        let text=prompt('Please input, like "Your Subject..."')
        let td=e.currentTarget;
        handleCreateTaskPrompt(text, td)
    })
    $('#root').on('dblclick', '.task', (e)=>{
        let taskid = e.currentTarget.getAttribute('id')
        showTaskEditor(taskid)
        e.preventDefault()
        e.stopPropagation();        
    })
    $('#updateTaskBtn').click(updateTask)
    $('#root').on('mousemove', 'td[id].day', (e)=>{
        handleTdMouseOver(e, e.currentTarget);
    })
    $('#saveBtn').click(()=>{
        saveServerTasks();
    })
    
}