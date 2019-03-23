let holidays = [
    {startDate: '2019-04-05', duration: 3, workingWeekendDays:['2019-04-04']},
    {startDate: '2019-05-01', duration: 4, workingWeekendDays:[]},
    {startDate: '2019-06-07', duration: 3, workingWeekendDays:[]},
    {startDate: '2019-09-13', duration: 3, workingWeekendDays:[]},
    {startDate: '2019-10-01', duration: 7, workingWeekendDays:[]},
    {startDate: '2019-12-31', duration: 3, workingWeekendDays:[]},
];
let holidayDays = {};
let displayDays = 360;
let sectionDays = 60;
let canvasDateList = [];
let canvasDateInfo = {};
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
    })
    console.log(holidayDays)
}
let initDate = ()=>{
    extractHolidays();
    let startmom = moment(moment().format('YYYY-MM-DD')+'T00:00:00').subtract(10, 'days');
    for(let i=0;i<displayDays;i++){
        let mom = startmom.add(1, 'days');
        let dateTxt = mom.format('YYYY-MM-DD')
        let dateId = 'd_'+mom.format('YYYY-MM-DD')
        let dateShortText = mom.format('MMDD');
        let day = mom.date();
        let dayText = mom.format('DD');
        let month = mom.month()+1;
        let monthText = mom.format('M');
        let isHoliday = !!holidayDays[dateTxt];
        let isToday = mom.isSame(moment(), 'day');
        let isWeekend = (mom.day()===6 || mom.day()===0 || mom.day()===7);
        let dayofWeekend = mom.day() === 0 ? 7 : mom.day();

        let info = {
            timestamp: mom.valueOf(),
            dateShortText,
            day,
            dayText,
            month,
            monthText,
            isHoliday,
            isToday,
            isWeekend,
            dayofWeekend
        }
        canvasDateList.push(dateId);
        canvasDateInfo[dateId] = info;
    }
}
let sections = [];
let initSections = ()=>{
    let section = [];
    let count=0;
    for(let i=0;i<canvasDateList.length;i++){
        let id = canvasDateList[i];
        let info = canvasDateInfo[id];
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
        let info = canvasDateInfo[id];
        headhtml += `<th class="${info.isToday?'today':''}">
                        ${info.monthText}<br>
                        ${info.dayText}<br>
                        ${weekdayCN[info.dayofWeekend]}
                    </th>`
    }
    headhtml += '</tr>'

    $(`#gantt_section_thead${i}`).html(headhtml)
    
    let bodyhtml = `<tr><td>R%RowIdx%</td>`;
    for(let j=0;j<sec.length;j++){
        let dateid = sec[j];
        let dateinfo = canvasDateInfo[dateid]
        let monthzebra = dateinfo.month%2;
        bodyhtml += `<td id="r%RowIdx%_${dateid}" align="center"
                            class="day 
                                monthzebra${monthzebra} 
                                ${dateinfo.isWeekend?'weekend':''} 
                                ${dateinfo.isToday?'today':''}
                                ${dateinfo.isHoliday?'holiday':''}
                                "
                            >
                                ${dateinfo.isWeekend?'-':''}
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
    // console.log(canvasDateList);
    // console.log(sections);
    sections.forEach((sec, i)=>{        
        renderSection(sec, i);
    })
    initEvent();
    let t1=new Date()*1;
    console.log(t1-t0)
}
$(initGantt)