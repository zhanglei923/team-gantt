let holidays = [
    {startDate: '2019-04-05', duration: 3, workingWeekendDays:['2019-04-04']},
    {startDate: '2019-05-01', duration: 4, workingWeekendDays:[]},
    {startDate: '2019-06-07', duration: 3, workingWeekendDays:[]},
    {startDate: '2019-09-13', duration: 3, workingWeekendDays:[]},
    {startDate: '2019-10-01', duration: 7, workingWeekendDays:[]},
    {startDate: '2019-12-31', duration: 3, workingWeekendDays:[]},
];

let tipWorkingDays = {
    '2019-03-22': {id:'v1904_sp3_end', date:'2019-03-22',desc:'1904sp3End'},
    '2019-04-04': {id:'v1904_sp4_end', date:'2019-04-04',desc:'1904sp4End'},
    '2019-04-19': {id:'v1904_intg', date:'2019-04-19',desc:'1904Intg'},
    '2019-04-26': {id:'v1904_gray_prod', date:'2019-04-26',desc:'1904GrayProd'},
    '2019-05-10': {id:'v1907_sp0', date:'2019-05-10',desc:'1907sp0'},
    '2019-05-24': {id:'v1907_sp1', date:'2019-05-24',desc:'1907sp1'},
};
let importantWorkingDay = {
    '2019-03-22': {id:'v1904_sp3_end', date:'2019-03-22',desc:'1904sp3End'},
    '2019-04-04': {id:'v1904_sp4_end', date:'2019-04-04',desc:'1904sp4End'},
    '2019-04-19': {id:'v1904_intg', date:'2019-04-19',desc:'1904Intg'},
    '2019-04-26': {id:'v1904_gray_prod', date:'2019-04-26',desc:'1904GrayProd'},
    '2019-05-10': {id:'v1907_sp0', date:'2019-05-10',desc:'1907sp0'},
    '2019-05-24': {id:'v1907_sp1', date:'2019-05-24',desc:'1907sp1'},
};
//------
let holidayDays = {};
let workingWeekendDays = {};
let displayDays = 360;
let sectionDays = 7*9;
let g_CanvasDateList = [];
let g_CanvasDateInfo = {};
let weekdayCN = ['', '一','二','三','四','五','六','日']
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
    console.log(holidayDays, workingWeekendDays)
}
let initDate = ()=>{
    extractHolidays();
    let todayMom = moment();
    let thisweekday = todayMom.day();
    let startmom = moment(todayMom.format('YYYY-MM-DD')+'T00:00:00').subtract(thisweekday+7, 'days');
    for(let i=0;i<displayDays;i++){
        let mom = startmom.add(1, 'days');
        let dateTxt = mom.format('YYYY-MM-DD')
        let dateId = 'd_'+dateTxt
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

        let isImportantWorkingDay = importantWorkingDay[dateTxt];

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
            daysFromToday,
            isBeforeToday,
            isAfterToday,
        }
        g_CanvasDateList.push(dateId);
        g_CanvasDateInfo[dateId] = info;
    }
}
let sections = [];
let initSections = ()=>{
    let section = [];
    let count=0;
    for(let i=0;i<g_CanvasDateList.length;i++){
        let id = g_CanvasDateList[i];
        let info = g_CanvasDateInfo[id];
        section.push(id)
        count++;
        if(count >= sectionDays){
            sections.push(section);
            section=[];
            count=0;
            continue;
        }
    }
    let html = ''
    sections.forEach((sec, i)=>{
        html += `<table id="gantt_section${i}" class="gantt_section">
                    <thead id="gantt_section_thead${i}"></thead>
                    <tbody id="gantt_section_tbody${i}"></tbody>
                 </table>`
    })
    document.getElementById('root').innerHTML = html;
}
let renderSection = (sec, i)=>{    
    let headhtml = `<tr><th>\\</th>`
    for(let i=0;i<sec.length;i++){
        let id = sec[i];
        let dateinfo = g_CanvasDateInfo[id];
        headhtml += `<th class="${dateinfo.isToday?' is-today':''}
                                ${dateinfo.isBeforeToday?'isBeforeToday':''}
                                ${dateinfo.isImportantWorkingDay?' important-workingday':''}">
                        <div>${dateinfo.monthText}</div>
                        <div>${dateinfo.dayText}</div>
                        <div class="${dateinfo.isWeekend?'weekend':''}">${weekdayCN[dateinfo.dayofWeekend]}</div>
                    </th>`
    }
    headhtml += '</tr>'

    $(`#gantt_section_thead${i}`).html(headhtml)
    
    let bodyhtml = `<tr id="r%RowIdx%"><td>r%RowIdx%</td>`;
    for(let i=0;i<sec.length;i++){
        let dateid = sec[i];
        let dateinfo = g_CanvasDateInfo[dateid];
        let dateTxt = dateinfo.dateTxt;
        let monthzebra = dateinfo.month%2;
        bodyhtml += `<td id="r%RowIdx%_${dateid}" align="center"
                            class="day monthzebra${monthzebra} row%RowIdx%
                                ${dateinfo.isBeforeToday?'isBeforeToday':''}
                                ${dateinfo.isWeekend&&!dateinfo.isWorkDay?' weekend':''} 
                                ${dateinfo.isToday?' is-today':''} ${dateinfo.isHoliday?' holiday':''}
                                ${dateinfo.isImportantWorkingDay?' important-workingday':''}"
                                ${dateinfo.isImportantWorkingDay?(' is-important-workingday="'+dateinfo.isImportantWorkingDay.id+'"'):''}
                            >
                                ${dateinfo.isWeekend?'':''}
                            </td>`
    }
    bodyhtml += '</tr>';

    let bigbodyhtml = ''
    for(let i=0;i<10;i++){
        let s = bodyhtml;
        s = s.replace(/%RowIdx%/g, i)
        
        bigbodyhtml += s
    }
    $(`#gantt_section_tbody${i}`).html(bigbodyhtml)
}
let initEvent = ()=>{
    $('#root').on('click', '[id].day', (e)=>{
        handleTdClick(e.currentTarget);
    })
}
let initGantt = ()=>{
    let t0=new Date()*1;
    initDate();
    initSections();
    // console.log(g_CanvasDateList);
    // console.log(sections);
    sections.forEach((sec, i)=>{        
        renderSection(sec, i);
    })
    initEvent();
    let t1=new Date()*1;
    console.log(t1-t0)
}
$(initGantt)