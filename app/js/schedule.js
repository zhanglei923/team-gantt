let g_sectionStartEneDate = [];//每个section的起始日期
let loadSchedules = (schedulelist)=>{
    //schedulelist = test_Schedules;
    for(let schedule_id in schedulelist) {
        schedulelist[schedule_id].id = schedule_id;
        g_Schedules[schedule_id] = schedulelist[schedule_id];
    }
    //console.log('g_sectionStartEneDate:', g_sectionStartEneDate)
    //console.log('schedulelist:', schedulelist)
    let htmlSegments = []

    g_sectionStartEneDate.forEach((section)=>{
        let sectionStartMom = moment(section.start+'T00:00:00');
        let sectionEndMom = moment(section.end+'T23:59:59');

        for(let eventId in schedulelist){
            //console.log(section, schedulelist)
            let event = schedulelist[eventId];
            let currentMom = moment();
            let eventStartMom = moment(event.start+'T00:00:00');
            let eventEndMom = moment(event.end+'T23:59:59');
            let days = eventEndMom.diff(eventStartMom, 'days') + 1;
            let seg = {
                eventId,
                section_idx: section.section_idx,
                subject: event.subject,
                start: event.start,
                end: event.end,
                days,
                styletype: event.styletype,
                rowIdx: event.rowIdx,
                isPassed: eventEndMom.isSameOrBefore(currentMom),
                isNotbegin: eventStartMom.isSameOrAfter(currentMom)
            }
            // [  ooooo  ]
            if(eventStartMom.isSameOrAfter(sectionStartMom) && eventEndMom.isSameOrBefore(sectionEndMom)){
                htmlSegments.push(Object.assign(seg, {
                    all_close:true,
                    head: {
                        date: event.start,
                        isBegin: true,
                    },
                    tail: {
                        date: event.end,
                        isEnd: true
                    }
                }))
            } //[    ooooo]
            if(eventStartMom.isSameOrAfter(sectionStartMom) && eventEndMom.isAfter(sectionEndMom) && eventStartMom.isBefore(sectionEndMom)){
                htmlSegments.push(Object.assign(seg, {
                    left_close:true,
                    head: {
                        date: event.start,
                        isBegin: true
                    },
                    tail: {
                        date: section.end,
                        isEnd: false
                    }
                }))
            }//[ooooo    ]
            if(eventStartMom.isBefore(sectionStartMom) && eventEndMom.isBefore(sectionEndMom) && eventEndMom.isAfter(sectionStartMom)){
                htmlSegments.push(Object.assign(seg, {
                    right_close:true,
                    head: {
                        date: section.start,
                        isBegin: false
                    },
                    tail: {
                        date: event.end,
                        isEnd: true
                    }
                }))
            }//[ooooooooo]
            if(eventStartMom.isBefore(sectionStartMom) && eventEndMom.isAfter(sectionEndMom)){
                htmlSegments.push(Object.assign(seg, {
                    all_open: true,
                    head: {
                        date: section.start,
                        isBegin: false
                    },
                    tail: {
                        date: section.end,
                        isEnd: false
                    }
                }))
            }
        }
    });
    //console.log(htmlSegments)
    drawStartEndEvents(htmlSegments)
}
let drawStartEndEvents=(segments)=>{
    let html = '';
    console.log(segments)
    segments.forEach((seg)=>{
        g_sectionDaysList.forEach((section, i)=>{
            section = $(section);
            let sectionElem = $('#gantt_section'+i);
            let headTd = $(`td.day[date="${seg.head.date}"][rowidx="${seg.rowIdx}"]`);
            let tailTd = $(`td.day[date="${seg.tail.date}"][rowidx="${seg.rowIdx}"]`);
            let head_pos = headTd.offset()
            let tail_pos = tailTd.offset()
            let width = tail_pos.left - head_pos.left+tailTd.outerWidth() - 2;
            if(seg.section_idx === i){
                let subject = `${seg.subject}${seg.days>2?('<span class="days">='+seg.days+'d</span>'):''}`;
                html += `<div id="${seg.eventId}_${Math.random()}" seg_schedule_id="${seg.eventId}" class="schedule_segment 
                        ${seg.left_close?' left-is-close':''}
                        ${seg.right_close?' right-is-close':''}
                        ${seg.all_close?' all-close':''}
                        ${seg.all_open?' all-open':''}
                        ${seg.isPassed?' ispassed':''}
                        ${seg.isNotbegin?' isnotbegin':''}
                        ${seg.styletype?' '+seg.styletype:''}
                        "
                        title="${seg.start} to ${seg.end}，共${seg.days}个自然日: '${seg.subject}'"
                        style="left:${head_pos.left}px;top:${head_pos.top}px;width:${width}px;"
                >
                <span class="subject">
                    ${seg.head.isBegin?'':'...'}${subject}${seg.tail.isEnd?'':'...'}
                    </span>
                </div>`
            }            
        })
    })
    //console.log(html)
    $('#tasks').append(html)
}
let hideScheduleEditor=()=>{
    $('#scheduleEditor').hide()
    $("#editScheduleRowIdxIpt").val('');
    $("#editScheduleStartIpt").val('');
    $("#editScheduleEndIpt").val('');
    $("#editScheduleSubjectIpt").val('');
    $("#editScheduleStyleTypeSel").val('');    
    $('.schedule_segment').removeClass('selected');
}
let showScheduleEditorFromHtml=(id)=>{
    let schedule = g_Schedules[id];
    schedule.id=id;
    showScheduleEditor(schedule);
}
let showScheduleEditor=(schedule)=>{
    hideEditors()
    initScheuleStyleType();
    $('#scheduleEditor').show()
    console.log(schedule)
    if(!schedule.id) schedule.id = 'schedule_'+(Math.random()+'').replace(/\./g,'')
    $('#scheduleEditor').attr('schedule_id', schedule.id)
    $("#editScheduleRowIdxIpt").val(schedule.rowIdx);
    $("#editScheduleStartIpt").val(schedule.start);
    $("#editScheduleEndIpt").val(schedule.end);
    $("#editScheduleSubjectIpt").val(schedule.subject?schedule.subject:'').focus();
    $("#editScheduleStyleTypeSel").val(schedule.styletype);
    $('.schedule_segment').removeClass('selected');
    $(`[seg_schedule_id="${schedule.id}"]`).addClass('selected');
}
let updateSchedule=(nohide)=>{
    if(!$('#scheduleEditor').is(':visible'))return;
    if(typeof nohide=== 'undefined') nohide=false;
    let schedule_id = $('#scheduleEditor').attr('schedule_id')
    let rowIdx = _.trim($('#editScheduleRowIdxIpt').val())    
    let startDate = _.trim($('#editScheduleStartIpt').val())
    let endDate = _.trim($('#editScheduleEndIpt').val())
    let subject = _.trim($('#editScheduleSubjectIpt').val())
    let styletype = _.trim($('#editScheduleStyleTypeSel').val())

    if(!schedule_id)return;
    if(!subject)return;
    if(!isValidDate(startDate) || !isValidDate(endDate)) {
        //console.log(isValidDate(startDate), isValidDate(endDate), startDate, endDate)
        return;
    }
    getScheduleSegments(schedule_id).off().remove();
    delete g_Schedules[schedule_id];
    let schedule = {
        [schedule_id]:{
            id: schedule_id,
            start: startDate, 
            end: endDate,
            subject: subject,
            styletype,
            rowIdx: rowIdx
        }
    }
    console.log(schedule)
    loadSchedules(schedule);
    if(!nohide)hideScheduleEditor()
}
let moveSchedule=(id, dir)=>{
    let task = g_Schedules[id];
    let editScheduleRowIdxIpt = $('#editScheduleRowIdxIpt')
    let editScheduleStartIpt = $('#editScheduleStartIpt')
    let editScheduleEndIpt = $('#editScheduleEndIpt')
    let rowidx = parseInt(editScheduleRowIdxIpt.val())
    let date1 = editScheduleStartIpt.val()
    let date2 = editScheduleEndIpt.val()
    let mom1 = moment(date1)
    let mom2 = moment(date2)
    if(dir==='up'){//ArrowUp
        rowidx -= 1;
        if(rowidx>=0)
        editScheduleRowIdxIpt.val(rowidx);
    }else
    if(dir==='down'){//ArrowDown
        rowidx += 1;
        if(rowidx<=initRowSize-1)
        editScheduleRowIdxIpt.val(rowidx);        
    }else
    if(dir==='left'){//ArrowLeft
        mom1.subtract(1, 'days');
        editScheduleStartIpt.val(mom1.format('YYYY-MM-DD'))
        mom2.subtract(1, 'days');
        editScheduleEndIpt.val(mom2.format('YYYY-MM-DD'))
    }else
    if(dir==='right'){//ArrowRight
        mom1.add(1, 'days');
        editScheduleStartIpt.val(mom1.format('YYYY-MM-DD'))     
        mom2.add(1, 'days');
        editScheduleEndIpt.val(mom2.format('YYYY-MM-DD'))        
    }
    updateSchedule(true)
}
let changeScheduleRange=(ipt, dir, schedule_id)=>{
    let date = ipt.val();
    if(isValidDate(date)){
        let mom = moment(date);
        if(dir==='up') mom.add(1, 'days');
        if(dir==='down') mom.subtract(1, 'days');
        ipt.val(mom.format('YYYY-MM-DD'));
        updateSchedule(true)
    }
}
let askDeleteSchedule=(id)=>{
    let data = g_Schedules[id];
    if(data){
        let ok = confirm('Sure to delete "'+data.subject+'"?')
        if(ok){
            deleteSchedule(id)
        }
    }
}
let getScheduleSegments=(id)=>{
    return $(`div.schedule_segment[seg_schedule_id="${id}"]`);
}
let deleteSchedule=(id)=>{
    delete g_Schedules[id];
    getScheduleSegments(id).off().remove()
    hideEditors()
};
let styleTypeList = ['', 'type_holiday']
styleTypeList = styleTypeList.concat(['type_color_red', 'type_color_green', 'type_color_greenyellow', 'type_color_black', 'type_color_orange',
                            'type_color_cyan','type_color_cyangreen'
                    ])
let initScheuleStyleType = ()=>{
    let options = ''
    styleTypeList.forEach((type)=>{
        options += `<option val="${type}">${type}</option>`
    })
    $('#editScheduleStyleTypeSel').html(options)
}