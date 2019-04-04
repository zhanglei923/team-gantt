let g_sectionStartEneDate = [];//每个section的起始日期
let loadRangeEvents = (startend_events)=>{
    startend_events = test_RangeTasks;

    console.log('g_sectionStartEneDate:', g_sectionStartEneDate)
    console.log('startend_events:', startend_events)
    let htmlSegments = []

    g_sectionStartEneDate.forEach((section)=>{
        let start = section.start;
        let end = section.end;
        let sectionStartMom = moment(start+'T00:00:00');
        let sectionEndMom = moment(end+'T23:59:59');

        for(let eventId in startend_events){
            let event = startend_events[eventId];
            let eventStartMom = moment(event.start+'T00:00:00');
            let eventEndMom = moment(event.end+'T23:59:59');
            // [  ooooo  ]
            if(eventStartMom.isSameOrAfter(sectionStartMom) && eventEndMom.isSameOrBefore(sectionEndMom)){
                htmlSegments.push({
                    section_count: section.section_count,
                    head: {
                        date: event.start,
                        isBegin: true
                    },
                    tail: {
                        date: event.end,
                        isEnd: true
                    }
                })
            } //[    ooooo]
            else if(eventStartMom.isSameOrAfter(sectionStartMom) && eventEndMom.isAfter(sectionEndMom)){
                htmlSegments.push({
                    section_count: section.section_count,
                    head: {
                        date: event.start,
                        isBegin: true
                    },
                    tail: {
                        date: event.end,
                        isEnd: false
                    }
                })
            }//[ooooo    ]
            else if(eventStartMom.isBefore(sectionStartMom) && eventEndMom.isAfter(sectionEndMom)){
                htmlSegments.push({
                    section_count: section.section_count,
                    head: {
                        date: event.start,
                        isBegin: false
                    },
                    tail: {
                        date: event.end,
                        isEnd: true
                    }
                })
            }//[ooooooooo]
            else if(eventStartMom.isBefore(sectionStartMom) && eventEndMom.isAfter(sectionEndMom)){
                htmlSegments.push({
                    section_count: section.section_count,
                    head: {
                        date: event.start,
                        isBegin: false
                    },
                    tail: {
                        date: event.end,
                        isEnd: false
                    }
                })
            }
        }
    });
    console.log(htmlSegments)
}