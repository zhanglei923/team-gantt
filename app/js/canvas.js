let holidays = [
    {startDate: '2019-04-05', duration: 3, workingWeekendDays:['2019-04-04']},
    {startDate: '2019-05-01', duration: 4, workingWeekendDays:[]},
    {startDate: '2019-06-07', duration: 3, workingWeekendDays:[]},
    {startDate: '2019-09-13', duration: 3, workingWeekendDays:[]},
    {startDate: '2019-10-01', duration: 7, workingWeekendDays:[]},
    {startDate: '2019-12-31', duration: 3, workingWeekendDays:[]},
];
let g_ImportantWorkingDay = {
    '2019-03-22': {id:'v1904_sp3_end',desc:'1904 Sp3 End', level:'important'},
    '2019-04-04': {id:'v1904_sp4_end',desc:'1904 Sp4 End', level:'important'},
    '2019-04-10': {id:'v1904_intg',desc:'This is a notice.', level:'notice'},
    '2019-04-19': {id:'v1904_intg',desc:'1904 Intg', level:'important'},
    '2019-04-26': {id:'v1904_gray_prod',desc:'1904 Gray Prod', level:'important'},
    '2019-04-29': {id:'v1904_intg',desc:'This is also a notice.', level:'notice'},
    '2019-05-10': {id:'v1907_sp0',desc:'1907 Sp0', level:'important'},
    '2019-05-24': {id:'v1907_sp1', desc:'1907 Sp1', level:'important'},
};
//------
let holidayDays = {};
let workingWeekendDays = {};
let initRowSize = 6;
let displayDays = 360;
let sectionDays = 7*9;
let g_CanvasDateList = [];
let g_CanvasDateInfo = {};
let weekdayCN = ['', '一','二','三','四','五','六','日']
let todayMom = moment();
let todayText = todayMom.format('YYYY-MM-DD');
let extractHolidays=()=>{ 
    holidayDays = {};
    holidays.forEach((hol)=>{
        let startDate = hol.startDate;
        for(let i=0;i<hol.duration;i++){
            let mom = moment(startDate+'T00:00:00')
            mom.add(i, 'days');
            holidayDays[mom.format('YYYY-MM-DD')]=true;
        }
        hol.workingWeekendDays.forEach((daytxt)=>{
            workingWeekendDays[daytxt]=true;
        })
    })
    //console.log(holidayDays, workingWeekendDays)
}
let initDate = ()=>{
    extractHolidays();
    let thisweekday = todayMom.day();
    let startmom = moment(todayMom.format('YYYY-MM-DD')+'T00:00:00').subtract(thisweekday+7, 'days');
    for(let i=0;i<displayDays;i++){
        let mom = startmom.add(1, 'days');
        let dateTxt = mom.format('YYYY-MM-DD')
        let dateId = ''+dateTxt
        let dateShortText = mom.format('MMDD');
        let day = mom.date();
        let dayText = mom.format('DD');
        let month = mom.month()+1;
        let monthText = mom.format('M');

        let daysFromToday =  todayMom.diff(mom, 'days');
        let isBeforeToday = daysFromToday>0?true: false;
        let isAfterToday = daysFromToday<0?true: false;
        let isToday = mom.isSame(todayMom, 'day');

        let isHoliday = !!holidayDays[dateTxt];
        let isWeekend = (mom.day()===6 || mom.day()===0 || mom.day()===7);
        let dayofWeekend = mom.day() === 0 ? 7 : mom.day();
        let isWorkDay = true;
        if(isWeekend) isWorkDay = false;
        if(isHoliday) isWorkDay = false;
        if(workingWeekendDays[dateTxt]) isWorkDay = true;

        let isImportantWorkingDay;
        let isNoticeWorkingDay;
        if(g_ImportantWorkingDay[dateTxt]){
            if(g_ImportantWorkingDay[dateTxt].level==='important')isImportantWorkingDay = g_ImportantWorkingDay[dateTxt];
            if(g_ImportantWorkingDay[dateTxt].level==='notice')isNoticeWorkingDay = g_ImportantWorkingDay[dateTxt];
        }
        //console.warn(isNoticeWorkingDay)

        let info = {
            timestamp: mom.valueOf(),
            dateTxt,
            dateShortText,
            day,
            dayText,
            month,
            monthText,
            isHoliday,
            isToday,
            isWeekend,
            dayofWeekend,
            isWorkDay,
            isImportantWorkingDay,
            isNoticeWorkingDay,
            daysFromToday,
            isBeforeToday,
            isAfterToday,
        }
        g_CanvasDateList.push(dateId);
        g_CanvasDateInfo[dateId] = info;
    }
}
let sectionDaysList = [];
let initSections = ()=>{
    let days = [];
    let count=0;
    for(let i=0;i<g_CanvasDateList.length;i++){
        let id = g_CanvasDateList[i];
        let info = g_CanvasDateInfo[id];
        days.push(id)
        count++;
        if(count >= sectionDays){
            sectionDaysList.push(days);
            days=[];
            count=0;
            continue;
        }
    }
    let html = ''
    sectionDaysList.forEach((sec, i)=>{
        html += `<div id="tip_ofsection${i}" class="tip_ofsection"></div>
                 <table id="gantt_section${i}" class="gantt_section">
                    <thead id="gantt_section_thead${i}"></thead>
                    <tbody id="gantt_section_tbody${i}"></tbody>
                 </table>`
    })
    document.getElementById('root').innerHTML = html;
}
let renderSection = (days, secidx)=>{    
    //console.log('days', days)
    let headhtml = `<tr><th>\\</th>`
    for(let i=0;i<days.length;i++){
        let id = days[i];
        let dateinfo = g_CanvasDateInfo[id];
        headhtml += `<th class="${dateinfo.isToday?' is-today':''}
                                ${dateinfo.isBeforeToday?'isBeforeToday':''}
                                ${dateinfo.isImportantWorkingDay?' important-workingday':''}
                                ${dateinfo.isNoticeWorkingDay?' notice-workingday':''}
                                ${dateinfo.isWeekend?'weekend':''}
                                "
                         date="${id}"                                
                        >
                        <div>${dateinfo.monthText}</div>
                        <div>${dateinfo.dayText}</div>
                        <div>${weekdayCN[dateinfo.dayofWeekend]}</div>
                    </th>`
    }
    headhtml += '</tr>'

    $(`#gantt_section_thead${secidx}`).html(headhtml)
    
    let bodyhtml = `<tr id="sec${secidx}_r%RowIdx%"><td>r%RowIdx%</td>`;
    for(let i=0;i<days.length;i++){
        let dateid = days[i];
        let dateinfo = g_CanvasDateInfo[dateid];
        //let dateTxt = dateinfo.dateTxt;
        let monthzebra = dateinfo.month%2;
        bodyhtml += `<td id="r%RowIdx%_${dateid}" align="center" rowIdx="%RowIdx%" date="${dateid}"
                            class="day monthzebra${monthzebra} row%RowIdx%
                                ${dateinfo.isBeforeToday?'isBeforeToday':''}
                                ${dateinfo.isWeekend&&!dateinfo.isWorkDay?' weekend':''} 
                                ${dateinfo.isToday?' is-today':''} ${dateinfo.isHoliday?' holiday':''}

                                ${dateinfo.isImportantWorkingDay?' important-workingday':''}
                                ${dateinfo.isImportantWorkingDay?(' is-important-workingday="'+dateinfo.isImportantWorkingDay.id+'"'):''}
                                ${dateinfo.isNoticeWorkingDay?' notice-workingday':''}
                                ${dateinfo.isNoticeWorkingDay?(' is-notice-workingday="'+dateinfo.isNoticeWorkingDay.id+'"'):''}
                                "
                            >
                                ${dateinfo.isWeekend?'':''}
                            </td>`
    }
    bodyhtml += '</tr>';

    let bigbodyhtml = ''
    for(let i=0;i<initRowSize;i++){
        let s = bodyhtml;
        s = s.replace(/%RowIdx%/g, i)
        
        bigbodyhtml += s
    }
    $(`#gantt_section_tbody${secidx}`).html(bigbodyhtml)
}
let showCurrentTimeline=()=>{
    let tbody0 = $('#gantt_section_tbody0')
    let tr0 = $('#sec0_r0')
    let firstTd = tr0.find('>td.is-today');
    let pos = firstTd.offset();
    let width = firstTd.width();
    let clock0 = moment(moment().format('YYYY-MM-DD')+'T00:00:00');
    let clock1 = moment(moment().add(1,'days').format('YYYY-MM-DD')+'T00:00:00');
    let clocknow = moment();
    let percentage = (clocknow.valueOf() - clock0.valueOf()) / (clock1.valueOf() - clock0.valueOf());
    console.log('percentage', percentage)
    $('#tasks').append(`<div id="currentTimeline" class="currentTimeline" style="
        height:${tbody0.height()}px;
        left:${pos.left+percentage*width}px;
        top:${pos.top}px;
    "></div>`)
}
let showTipsOfImportantDay=()=>{
    let html = ``
    let arr = [{date:todayText,tip: {id:'now', now:true, date:todayText,desc:'NOW'}}];
    for(let date in g_ImportantWorkingDay) arr.push({date, tip:g_ImportantWorkingDay[date]})
    arr.forEach((data)=>{
        let date = data.date;
        let tip = data.tip;
        let desc = tip.desc;
        let level = tip.level;
        let th = $(`th[date="${date}"]`);
        let pos = th.offset();
        let left = pos.left;
        let offtop = 18;
        if(tip.now) offtop = 6;
        if(tip.level==='notice') offtop = 4;
        let top = pos.top - offtop;
        let isafter = moment(date).isAfter(moment())
        html += `<div class="tip_of_day ${level?level:''} ${tip.now?'now':''} ${isafter||tip.now?'':'ispassed'}" style="left:${left}px;top:${top}px;">${desc}</div>`
        //console.log(pos, desc)
    })
    $('#tasks').append(html)
    let tdw = $('td.day:first').outerWidth()
    $('#tasks>div.tip_of_day').each((i,o)=>{
        //console.log(a,b)
        o=$(o);
        let left = o.css('left');
        o.css('left', (parseInt(left)-o.width()+tdw))
    })
}
let initGantt = ()=>{
    let t0=new Date()*1;
    initDate();
    initSections();
    // console.log(g_CanvasDateList);
    // console.log(g_CanvasDateInfo);
    // console.log(sections);
    sectionDaysList.forEach((days, i)=>{        
        renderSection(days, i);
    })
    window.setTimeout(()=>{
        showCurrentTimeline();
        showTipsOfImportantDay();
    }, 0)
    initEvent();
    let t1=new Date()*1;
    console.log(t1-t0)
}
$(initGantt)