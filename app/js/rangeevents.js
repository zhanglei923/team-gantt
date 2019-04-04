let g_sectionStartEneDate = [];//每个section的起始日期
let loadRangeEvents = (startend_events)=>{
    startend_events = test_RangeTasks;

    console.log('g_sectionStartEneDate:', g_sectionStartEneDate)
    console.log('startend_events:', startend_events)
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
                section_count: section.section_count,
                subject: event.subject,
                rowIdx: event.rowIdx
            }
            // [  ooooo  ]
            if(eventStartMom.isSameOrAfter(sectionStartMom) && eventEndMom.isSameOrBefore(sectionEndMom)){
                htmlSegments.push(Object.assign(seg, {
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
    console.log(htmlSegments)
}