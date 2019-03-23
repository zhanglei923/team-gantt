let initGantt = ()=>{
    let html = `<tr>`;
    let canvasDateList = [];
    let canvasDateInfo = {}
    let firstmom = moment('2019-01-01T00:00:00');
    firstmom.subtract(1, 'days');

    let headhtml = `<tr>`
    headhtml += `<th>-</th>`
    for(let j=0;j<365;j++){
        headhtml += `<th>${j+1}</th>`
        let mom = firstmom.add(1, 'days');
        let dateId = 'id_'+mom.format('YYYYMMDD')
        let info = {
            month: mom.month(),
            isToday:mom.isSame(moment(), 'day'),
            isWeekend: (mom.day()===6 || mom.day()===0 || mom.day()===7)
        }
        let dateText = mom.format('MM.DD');
        if(info.month<10) dateText=dateText.replace(/^0/,'')
        
        canvasDateInfo[dateId] = info;
        canvasDateList.push({dateId, dateText});
    }
    //console.log(canvasDateList)
    for(let i=0;i<10;i++){
        let dateinfo, dateid;
        html += `<td>${i+1}</td>`
        for(let j=0;j<canvasDateList.length;j++){
            dateid = canvasDateList[j].dateId;
            dateinfo = canvasDateInfo[dateid]
            html += `<td id="${canvasDateList[j].dateId}"
                        class="${dateinfo.isToday?'today':''} ${dateinfo.isWeekend?'weekend':''}"
                        >${canvasDateList[j].dateText}</td>`
        }
        html += `</tr><tr>`
    }
    html += `</tr>`
    headhtml += `</tr>`
    $('#gantt_canvas_thead').html(headhtml)
    $('#gantt_canvas_tbody').html(html)
}
$(initGantt)