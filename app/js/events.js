let handleTdClick=(td)=>{
    //td=$(td);
    let tdid = td.getAttribute('id')
    let rowidx = td.getAttribute('rowidx');
    let date = td.getAttribute('date');

    let alltd = $('td')
    alltd.removeClass('choosed_day').removeClass('selected_day').removeClass('selected_day_row').removeClass('selected_daycol')
    $(`tr>td[id$="${date}"]`).addClass('selected_daycol')
    $('th.selected_dayheader').removeClass('selected_dayheader')
    $(`th[date$="${date}"]`).addClass('selected_dayheader')
    let daytd = getDayElem(rowidx, date);
    daytd.addClass('selected_day')
    getRowTdElems(rowidx).addClass('selected_day_row')
    //console.log(tdid, rowidx, date, td.className)//)
    showDateInfo(null, date)
}
let handleTdChoosed=(td)=>{
    let tdid = td.getAttribute('id')
    let rowidx = td.getAttribute('rowidx');
    let date = td.getAttribute('date');

    td=$(td);
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
        id: getNewTaskId(),
        rowIdx: rowIdx,
        startDate: null,
        endDate: date,
        days: 1,
        subject: title
    })
}

let initEvent = ()=>{
    $('#root').on('mousedown', 'td[id].day', (e)=>{
        let td = e.currentTarget;
        if(e.ctrlKey||e.metaKey){
            handleTdChoosed(td);
        }else{
            resetChooseDay()
            let rowidx = td.getAttribute('rowidx');
            let date = td.getAttribute('date');
            g_chooseDate1 = date;
            g_choosingRowIdx = rowidx;
            handleTdClick(td);
        }
        e.preventDefault();
        return false;            
    })
    $('#root').on('click', '.task .delete', (e)=>{
        askDeleteTask($(e.currentTarget).closest('.task').attr('id'))
        e.preventDefault();
    })
    $('#tasks').on('click', '.schedule_segment .delete', (e)=>{
        askDeleteSchedule($(e.currentTarget).closest('.schedule_segment').attr('seg_schedule_id'))
        e.preventDefault();
    })
    $('#root').on('dblclick', 'td[id].day', (e)=>{
        let text=prompt('Please input, like "Your Subject..."')
        let td=e.currentTarget;
        handleCreateTaskPrompt(text, td)
    })
    $('#root').on('click', '.task', (e)=>{
        let taskid = e.currentTarget.getAttribute('id')
        showTaskEditor(taskid)
        e.preventDefault()
        e.stopPropagation();        
    })
    $('#tasks').on('click', '.schedule_segment', (e)=>{
        let id = e.currentTarget.getAttribute('seg_schedule_id')
        showScheduleEditorFromHtml(id)
        e.preventDefault()
        e.stopPropagation();        
    })    
    $('#updateTaskBtn').click(updateTask)
    $('#updateScheduleBtn').click(updateSchedule)
    $('#root').on('mousemove', 'td[id].day', (e)=>{
        handleTdMouseOver(e, e.currentTarget);
    })
    $('#deleteScheduleBtn').on('click', (e)=>{
        askDeleteSchedule($('#scheduleEditor').attr('schedule_id'))        
    })
    $('#saveBtn').click(()=>{
        saveToServer();
    })
    $(window).keydown((e)=>{
        if(e.metaKey || e.ctrlKey){
            if(e.key.toLowerCase()==='s') {
                // updateTask()
                // updateSchedule()
                saveToServer()
                e.preventDefault()
            }
        }
        if(e.key.toLowerCase()==='escape'){
            hideEditors()
        }
    })
    $('#deleteTaskBtn').click(()=>{
        askDeleteTask($('#taskEditor').attr('taskid'))
    })

    $('#taskEditor input').keydown((e)=>{
        if(e.key.toLowerCase()==='enter'){
            $('#updateTaskBtn').click()
            //hideEditors()
            e.preventDefault();
        }
        if(e.metaKey || e.ctrlKey){
            let taskid = $('#taskEditor').attr('taskid')
            let prevent = false;
            if(e.keyCode===38){//ArrowUp
                prevent=true;
                moveTask(taskid, 'up')
            }else
            if(e.keyCode===40){//ArrowDown
                prevent=true;
                moveTask(taskid, 'down')
            }else
            if(e.keyCode===37){//ArrowLeft
                prevent=true;
                moveTask(taskid, 'left')
            }else
            if(e.keyCode===39){//ArrowRight
                prevent=true;
                moveTask(taskid, 'right')                
            }
            if(prevent) e.preventDefault()
        }
    })
    $('#scheduleEditor input').keydown((e)=>{
        if(e.key.toLowerCase()==='enter'){
            $('#updateScheduleBtn').click()
            //hideEditors()
            e.preventDefault();
        }
        if(e.metaKey || e.ctrlKey){
            let schedule_id = $('#scheduleEditor').attr('schedule_id')
            let prevent = false;
            if(e.keyCode===38){//ArrowUp
                prevent=true;
                moveSchedule(schedule_id, 'up')
            }else
            if(e.keyCode===40){//ArrowDown
                prevent=true;
                moveSchedule(schedule_id, 'down')
            }else
            if(e.keyCode===37){//ArrowLeft
                prevent=true;
                moveSchedule(schedule_id, 'left')
            }else
            if(e.keyCode===39){//ArrowRight
                prevent=true;
                moveSchedule(schedule_id, 'right')                
            }
            if(prevent)e.preventDefault()
        }
    })
    let handleSubjectKeyup_timer;
    let handleSubjectKeyup=()=>{
        window.clearTimeout(handleSubjectKeyup_timer)
        handleSubjectKeyup_timer = window.setTimeout(()=>{
            updateTask(true)
            updateSchedule(true)
        }, 150)
    }
    $('#scheduleEditor').on('keyup', 'input', handleSubjectKeyup)
    $('#taskEditor').on('keyup', 'input', handleSubjectKeyup)
    // $('#editScheduleSubjectIpt').keyup(handleSubjectKeyup)
    // $('#editTaskSubjectIpt').keyup(handleSubjectKeyup)
}