let getDayInfo = (date)=>{
    return g_CanvasDateInfo[date];
}
let getDayElem = (rowidx, date)=>{
    return $(`tr[rowIdx="${rowidx}"]>td[date="${date}"]`);
}
let getColumnElem = (date)=>{
    return {
        title: $(`th[date="${date}"]`),
        days:$(`tr>td.day[date="${date}"]`)
    };
}
let getRow = (rowidx)=>{
    return $(`tr[rowIdx="${rowidx}"]>td[date]`);
}
let g_choosingRowIdx=null;
let g_choosingDates=[]
let resetChooseDay=()=>{
    g_choosingRowIdx=null;
    g_choosingDates=[];
    $('td').removeClass('choosed_day').html('')
}
let chooseDay=(rowidx, date, td)=>{
    let datemom = moment(date);
    if(g_choosingDates.length===0) g_choosingRowIdx = rowidx;
    let ok = true;
    if(g_choosingDates.length>0){
        g_choosingDates.forEach((d)=>{
            if(!datemom.isAfter(moment(d))) ok=false;
        })
    }
    if(ok)g_choosingDates.push(date)
    //console.warn(g_choosingDates)
    if(g_choosingDates.length>1){
        let d1 = g_choosingDates[g_choosingDates.length-2]
        let d2 = g_choosingDates[g_choosingDates.length-1];
        //console.log(d1, d2)
        showDaysInbetween(g_choosingRowIdx, d1, d2)
    }
    g_choosingDates.forEach((d)=>{
        $(`tr[rowidx="${g_choosingRowIdx}"]>td[date="${d}"]`).addClass('choosed_day')
    })
}
let unChooseDay=(rowidx, date)=>{

}
let showDaysInbetween=(rowidx, startDate, endDate)=>{
    $('tr>td').html('')
    let startMom = moment(startDate+'T00:00:00');
    let endMom = moment(endDate+'T00:00:00');
    if(!endMom.isAfter(startMom)) return;
    let countDays=0;
    let countWorkingDays=0;
    for(let i=0;i<1000;i++){
        startMom.add(1, 'days');
        let daytxt = startMom.format('YYYY-MM-DD')
        let dayinfo = getDayInfo(daytxt)
        if(!dayinfo) break;
        let isWorkDay = dayinfo.isWorkDay;
        countDays++;
        if(isWorkDay) countWorkingDays++;
        console.log(dayinfo)
        if(startMom.isAfter(endMom,'day')){
            console.warn(startMom.format())
            break;
        }
        let td=getDayElem(rowidx, daytxt);
        if(td)td.html(`${countDays}<br>${countWorkingDays}`)
        //console.log(startMom.format('YYYY-MM-DD'))
    }

}