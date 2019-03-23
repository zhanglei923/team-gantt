let initGantt = ()=>{
    let t0=new Date()*1;
    let canvasDateList = [];
    let canvasDateInfo = {}
    let firstmom = moment();
    firstmom.subtract(10, 'days');
    for(let i=0;i<200;i++){
        let mom = firstmom.add(1, 'days');
        let dateId = 'id_'+mom.format('YYYYMMDD')
        let dateText = mom.format('MMDD');
        let day = mom.date();
        let dayText = mom.format('DD');
        let month = mom.month()+1;
        let monthText = mom.format('MMM');
        let info = {
            dateText,
            dayText,
            month,
            monthText,
            isToday:mom.isSame(moment(), 'day'),
            isWeekend: (mom.day()===6 || mom.day()===0 || mom.day()===7)
        }
        canvasDateInfo[dateId] = info;
        canvasDateList.push(dateId);
    }

    let headhtml = `<tr><th>/</th>`
    for(let i=0;i<canvasDateList.length;i++){
        let id = canvasDateList[i];
        let info = canvasDateInfo[id];
        headhtml += `<th>${info.monthText}<br>${info.dayText}</th>`
    }
    headhtml += '</tr>'

    $('#gantt_canvas_thead').html(headhtml)
    
    let bodyhtml = `<tr><td>R%RowIdx%</td>`;
    for(let j=0;j<canvasDateList.length;j++){
        let dateid = canvasDateList[j];
        let dateinfo = canvasDateInfo[dateid]
        let monthzebra = dateinfo.month%2;
        bodyhtml += `<td id="r%RowIdx%_${dateid}"
                    class="day monthzebra${monthzebra} ${dateinfo.isToday?'today':''}"
                    >${dateinfo.isWeekend?'W':''}</td>`
    }
    bodyhtml += '</tr>'
    
    let bigbodyhtml = ''
    for(let i=0;i<10;i++){
        let s = bodyhtml;
        s = s.replace(/%RowIdx%/g, i)
        
        bigbodyhtml += s
    }
    $('#gantt_canvas_tbody').html(bigbodyhtml)


    let t1=new Date()*1;
    console.log(t1-t0)
}
$(initGantt)