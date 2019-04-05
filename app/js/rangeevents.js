let g_sectionStartEneDate = [];//每个section的起始日期
let loadRangeEvents = (startend_events)=>{
    startend_events = test_RangeTasks;

    //console.log('g_sectionStartEneDate:', g_sectionStartEneDate)
    //console.log('startend_events:', startend_events)
    let htmlSegments = []

    g_sectionStartEneDate.forEach((section)=>{
        let sectionStartMom = moment(section.start+'T00:00:00');
        let sectionEndMom = moment(section.end+'T23:59:59');

        for(let eventId in startend_events){
            //console.log(section, startend_events)
            let event = startend_events[eventId];
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
                html += `<div eventid="${seg.eventId}" class="eventsegment 
                        ${seg.left_close?' left-is-close':''}
                        ${seg.right_close?' right-is-close':''}
                        ${seg.all_close?' all-close':''}
                        ${seg.all_open?' all-open':''}
                        "
                        style="left:${head_pos.left}px;top:${head_pos.top}px;width:${width}px;"
                >
                    ${seg.head.isBegin?'<span class="begin-mark">BEGIN:</span>':'<span class="begin-mark">...</span>'}
                    ${seg.subject}
                    ${seg.tail.isEnd?'<span class="end-mark">END</span>':'<span class="end-mark">...</span>'}
                </div>`
            }            
        })
    })
    //console.log(html)
    $('#tasks').append(html)
}
let hideEventEditor=()=>{
    $('#startendeventEditor').hide()
    $("#editEventRowIdxIpt").val('');
    $("#editEventStartIpt").val('');
    $("#editEventEndIpt").val('');
    $("#editEventSubjectIpt").val('');
}
let showEventEditor=(event)=>{
    $('#startendeventEditor').show()
    //console.log(event)
    $("#editEventRowIdxIpt").val(event.rowIdx);
    $("#editEventStartIpt").val(event.start);
    $("#editEventEndIpt").val(event.end);
    $("#editEventSubjectIpt").val(event.subject?event.subject:'').focus();
}
let createEvent=()=>{
    if(!$('#startendeventEditor').is(':visible'))return;
    let taskid = $('#startendeventEditor').attr('taskid')
    let rowIdx = _.trim($('#editEventRowIdxIpt').val())
    let endDate = _.trim($('#editEventDateIpt').val())
    let subject = _.trim($('#editEventSubjectIpt').val())

}
let updateEvent=()=>{
    if(!$('#startendeventEditor').is(':visible'))return;
    let taskid = $('#startendeventEditor').attr('taskid')
    let rowIdx = _.trim($('#editEventRowIdxIpt').val())
    let endDate = _.trim($('#editEventDateIpt').val())
    let subject = _.trim($('#editEventSubjectIpt').val())
    if(!taskid)return;
}