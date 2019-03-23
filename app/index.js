let displayDays = 360;
let sectionDays = 90;
let canvasDateList = [];
let canvasDateInfo = {};
let initDate = ()=>{
    let startmom = moment(moment().format('YYYY-MM-DD')+'T00:00:00').subtract(10, 'days');
    for(let i=0;i<displayDays;i++){
        let mom = startmom.add(1, 'days');
        let dateId = 'd_'+mom.format('YYYYMMDD')
        let dateText = mom.format('MMDD');
        let day = mom.date();
        let dayText = mom.format('DD');
        let month = mom.month()+1;
        let monthText = mom.format('M');
        let info = {
            timestamp: mom.valueOf(),
            dateText,
            day,
            dayText,
            month,
            monthText,
            isToday:mom.isSame(moment(), 'day'),
            isWeekend: (mom.day()===6 || mom.day()===0 || mom.day()===7)
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
        headhtml += `<th>${info.monthText}<br>${info.dayText}</th>`
    }
    headhtml += '</tr>'

    $(`#gantt_section_thead${i}`).html(headhtml)
    
    let bodyhtml = `<tr><td>R%RowIdx%</td>`;
    for(let j=0;j<sec.length;j++){
        let dateid = sec[j];
        let dateinfo = canvasDateInfo[dateid]
        let monthzebra = dateinfo.month%2;
        bodyhtml += `<td id="r%RowIdx%_${dateid}"
                            class="day monthzebra${monthzebra} ${dateinfo.isToday?'today':''}"
                            >
                                ${dateinfo.isWeekend?'W':''}
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