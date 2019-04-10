//------
let holidayDays = {};
let alteredWorkingDays = {};
let initRowSize = 20;
let displayDays = 126;
let sectionDays = 7*9;
let g_Tasks = {};
let g_Schedules = {};
let g_CanvasDateList = [];
let g_CanvasDateInfo = {};
let weekdayCN = ['', '一','二','三','四','五','六','日']
let todayMom = moment();
let todayText = todayMom.format('YYYY-MM-DD');
let extractHolidays=()=>{ 
    holidayDays = {};
    g_holidays.forEach((hol)=>{
        let startDate = hol.startDate;
        for(let i=0;i<hol.duration;i++){
            let mom = moment(startDate+'T00:00:00')
            mom.add(i, 'days');
            holidayDays[mom.format('YYYY-MM-DD')]=true;
        }
        hol.alteredWorkingDays.forEach((daytxt)=>{
            alteredWorkingDays[daytxt]=true;
        })
    })
    //console.log(holidayDays, alteredWorkingDays)
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
        let textofWeekend = weekdayCN[dayofWeekend];
        let isWorkDay = true;
        if(isWeekend) isWorkDay = false;
        if(isHoliday) isWorkDay = false;
        if(alteredWorkingDays[dateTxt]) isWorkDay = true;

        let isImportantWorkingDay;
        let isNoticeWorkingDay;
        if(g_ImportantWorkingDay[dateTxt]){
            g_ImportantWorkingDay[dateTxt].forEach((d)=>{
                if(d.level === 'important'){isImportantWorkingDay = d;}
                if(d.level === 'notice'){isNoticeWorkingDay = d;}
            })
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
            textofWeekend,
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
let g_sectionDaysList = [];
let is_a_newbegin = true;
let section_count = 0;
let initSections = ()=>{
    let days = [];
    let count=0;
    for(let i=0;i<g_CanvasDateList.length;i++){
        let id = g_CanvasDateList[i];
        let date = id;
        days.push(id)
        if(is_a_newbegin) {
            g_sectionStartEneDate.push({section_idx:section_count, start: date, end: null});
            is_a_newbegin=false;
            section_count++
        }
        count++;
        if(count >= sectionDays){
            g_sectionDaysList.push(days);
            days=[];
            count=0;
            g_sectionStartEneDate[g_sectionDaysList.length-1].end = id;
            is_a_newbegin=true;
            continue;
        }else if(i===g_CanvasDateList.length-1){
            g_sectionDaysList.push(days);
            g_sectionStartEneDate[g_sectionDaysList.length-1].end = id;
        }
    }
    let html = ''
    g_sectionDaysList.forEach((sec, i)=>{
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
    let headhtml = `<tr class="isBeforeToday"><th>\\</th>`
    for(let i=0;i<days.length;i++){
        let id = days[i];
        let dateinfo = g_CanvasDateInfo[id];
        headhtml += `<th class="${dateinfo.isToday?' is-today':''}
                                ${dateinfo.isBeforeToday?'isBeforeToday':''}
                                ${dateinfo.isImportantWorkingDay?' dir_'+dateinfo.isImportantWorkingDay.is:''}
                                ${dateinfo.isImportantWorkingDay?' important-workingday':''}
                                ${dateinfo.isNoticeWorkingDay?' notice-workingday':''}
                                ${dateinfo.isWeekend?'weekend':''}
                                "
                         date="${id}"                                
                        >
                        <div>${dateinfo.monthText}</div>
                        <div>${dateinfo.dayText}</div>
                        <div>${dateinfo.textofWeekend}</div>
                    </th>`
    }
    headhtml += '</tr>'

    $(`#gantt_section_thead${secidx}`).html(headhtml)
    
    let bodyhtml = `<tr id="sec${secidx}_r%RowIdx%" rowIdx="%RowIdx%"><td class="rowcol isBeforeToday">r%RowIdx%</td>`;
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

                                ${dateinfo.isImportantWorkingDay?' dir_'+dateinfo.isImportantWorkingDay.is:''}
                                ${dateinfo.isImportantWorkingDay?' important-workingday':''}
                                ${dateinfo.isNoticeWorkingDay?' notice-workingday':''}
                                "
                                ${dateinfo.isImportantWorkingDay?(' id-important-workingday="'+dateinfo.isImportantWorkingDay.id+'"'):''}
                                ${dateinfo.isNoticeWorkingDay?(' id-notice-workingday="'+dateinfo.isNoticeWorkingDay.id+'"'):''}
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
    let timelineWidth = 5;
    $('#tasks>div.currentTimeline').remove();
    $('#tasks>div.currentTimelineCover').remove();

    let left = pos.left + percentage*width - timelineWidth/1
    let cover_width=width-timelineWidth+0;
    $('#tasks').append(`<div id="currentTimeline" class="currentTimeline" style="
        height:${tbody0.height()}px;
        left:${left}px;
        top:${pos.top}px;
    "></div>
    <div id="currentTimelineCover" class="currentTimelineCover" style="
        background-color: #333;
        opacity: 0.1;
        position:absolute;
        width:${cover_width}px;
        height:${tbody0.height()}px;
        left:${left-cover_width}px;
        top:${pos.top}px;
    "></div>
    `)
}
window.setInterval(showCurrentTimeline, 10*60*1000)
let showTipsOfImportantDay=()=>{
    let tdw = $('td.day:first').outerWidth()
    let html = ``
    let arr = [{date:todayText,tip: {id:'now', now:true, date:todayText,desc:'TODAY'}}];
    let allimportantdays = getAllImportantDays();
    allimportantdays.forEach((d)=>{
        arr.push({date: d.date, tip:d})
    })
    arr.forEach((data)=>{
        let date = data.date;
        let tip = data.tip;
        if(tip.level==='notice') {tip.is='end'}//default
        let desc = tip.desc;
        let level = tip.level;
        let is = tip.is ? tip.is : 'start'
        let th = $(`th[date="${date}"]`);
        if(th.length>0){
            let pos = th.offset();
            let left = pos.left;
            let offtop = 18;
            if(tip.now) {
                offtop = 36;
                left -= 10;
            }
            if(tip.level==='notice') {                
                offtop = -48;
                left -= 2;
            }
            if(tip.offset_y) offtop -= tip.offset_y*21;
            let top = pos.top - offtop;
            let isafter = moment(date+'T23:59:59').isAfter(moment())
            html += `<div is="${is}" class="tip_of_day dir_${is} ${level?level:''} ${tip.now?'now':''} ${isafter||tip.now?'':'ispassed'}" 
                        title="[${date}] ${escapeHtml(desc)}"
                        style="left:${left}px;top:${top}px;">
                        <span>${escapeHtml(desc)}</span>
                        ${level==='notice'?'<span style="width: 18px;display: inline-block;"><span class="pointer"></span></span>':''}
                        </div>`
        }
    })
    $('#tasks').append(html)
    $('#tasks>div.tip_of_day').each((i,o)=>{
        o=$(o);
        if(o.hasClass('dir_end')){
            let left = o.css('left');
            o.css('left', (parseInt(left)-o.width()+tdw))            
        }
    })
}
let initGantt = ()=>{
    let t0=new Date()*1;
    initDate();
    initSections();
    // console.log(g_CanvasDateList);
    // console.log(g_CanvasDateInfo);
    // console.log(sections);
    g_sectionDaysList.forEach((days, i)=>{        
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