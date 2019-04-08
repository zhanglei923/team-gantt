let g_sectionStartEneDate = [];//每个section的起始日期
let loadSchedules = (schedulelist)=>{
    //schedulelist = test_Schedules;
    for(let schedule_id in schedulelist) g_Schedules[schedule_id] = schedulelist[schedule_id];
    //console.log('g_sectionStartEneDate:', g_sectionStartEneDate)
    //console.log('schedulelist:', schedulelist)
    let htmlSegments = []

    g_sectionStartEneDate.forEach((section)=>{
        let sectionStartMom = moment(section.start+'T00:00:00');
        let sectionEndMom = moment(section.end+'T23:59:59');

        for(let eventId in schedulelist){
            //console.log(section, schedulelist)
            let event = schedulelist[eventId];
            let eventStartMom = moment(event.start+'T00:00:00');
            let eventEndMom = moment(event.end+'T23:59:59');
            let seg = {
                eventId,
                section_idx: section.section_idx,
                subject: event.subject,
                rowIdx: event.rowIdx
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
            let width = tail_pos.left - head_pos.left+tailTd.outerWidth();
            if(seg.section_idx === i){
                html += `<div eventid="${seg.eventId}" class="schedule_segment 
                        ${seg.left_close?' left-is-close':''}
                        ${seg.right_close?' right-is-close':''}
                        ${seg.all_close?' all-close':''}
                        ${seg.all_open?' all-open':''}
                        "
                        style="left:${head_pos.left}px;top:${head_pos.top}px;width:${width}px;"
                >
                    ${seg.head.isBegin?'<span class="begin-mark">^</span>':'<span class="begin-mark">...</span>'}
                    ${seg.subject}
                    ${seg.tail.isEnd?'<span class="end-mark">$</span>':'<span class="end-mark">...</span>'}
                </div>`
            }            
        })
    })
    //console.log(html)
    $('#tasks').append(html)
}
let hideEventEditor=()=>{
    $('#scheduleEditor').hide()
    $("#editScheduleRowIdxIpt").val('');
    $("#editScheduleStartIpt").val('');
    $("#editScheduleEndIpt").val('');
    $("#editScheduleSubjectIpt").val('');
}
let showEventEditor=(event)=>{
    $('#scheduleEditor').show()
    console.log(event)
    if(!event.id) event.id = 'schedule_'+(Math.random()+'').replace(/\./g,'')
    $('#scheduleEditor').attr('schedule_id', event.id)
    $("#editScheduleRowIdxIpt").val(event.rowIdx);
    $("#editScheduleStartIpt").val(event.start);
    $("#editScheduleEndIpt").val(event.end);
    $("#editScheduleSubjectIpt").val(event.subject?event.subject:'').focus();
}
let updateSchedule=()=>{
    if(!$('#scheduleEditor').is(':visible'))return;
    let schedule_id = $('#scheduleEditor').attr('schedule_id')
    let rowIdx = _.trim($('#editScheduleRowIdxIpt').val())    
    let startDate = _.trim($('#editScheduleStartIpt').val())
    let endDate = _.trim($('#editScheduleEndIpt').val())
    let subject = _.trim($('#editScheduleSubjectIpt').val())

    if(!schedule_id)return;
    if(!subject)return;
    let schedule = {
        [schedule_id]:{
            start: startDate, 
            end: endDate,
            subject: subject,
            rowIdx: rowIdx
        }
    }
    console.log(schedule)
    loadSchedules(schedule);
}
