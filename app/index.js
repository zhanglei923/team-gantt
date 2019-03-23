let initGantt = ()=>{
    let t0=new Date()*1;
    let canvasDateList = [];
    let canvasDateInfo = {}
    let firstmom = moment();
    firstmom.subtract(10, 'days');
    for(let i=0;i<165;i++){
        let mom = firstmom.add(1, 'days');
        let dateId = 'id_'+mom.format('YYYYMMDD')
        let dateText = mom.format('MMDD');
        let month = mom.month()+1;
        let info = {
            dateText,
            month,
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
        headhtml += `<th>${info.dateText}</th>`
    }
    headhtml += '</tr>'
    $('#gantt_canvas_thead').html(headhtml)
    
    let bodyhtml = `<tr><td>R%RowIdx%</td>`;
    for(let j=0;j<canvasDateList.length;j++){
        dateid = canvasDateList[j];
        dateinfo = canvasDateInfo[dateid]
        bodyhtml += `<td id="r%RowIdx%_${canvasDateList[j].dateId}"
                    class="${dateinfo.isToday?'today':''} ${dateinfo.isWeekend?'weekend':''}"
                    >
                    ${'.'}
                    </td>`
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