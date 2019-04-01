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
    g_chooseDate1=null;
    $('td').removeClass('choosed_day').removeClass('choosed_day1').removeClass('choosed_day2')
    $('tr>td>.diffdays').remove()
}
let g_chooseDate1;
let chooseDay=(rowidx, date, td)=>{
    if(!g_chooseDate1){
        g_choosingRowIdx = rowidx;
        g_chooseDate1 = date;
        td.addClass('choosed_day1') 
    }else{
        let d1 = moment(g_chooseDate1);
        let d2 = moment(date);
        $('td').removeClass('choosed_day2');
        let rowtd = getDayElem(g_choosingRowIdx, date)
        rowtd.addClass('choosed_day2') 
        if(d2.isAfter(d1)){
            showDaysInbetween(g_choosingRowIdx, d1, d2)
        }else{
            $('td').removeClass('choosed_day2');
        }
    }
}
let chooseDay2=(rowidx, date, td)=>{
    let datemom = moment(date);
    if(g_choosingDates.length===0) g_choosingRowIdx = rowidx;
    let ok = true;
    if(g_choosingDates.length>0){
        for(let i=0;i<g_choosingDates.length;i++){
            let d=g_choosingDates[i];
            if(datemom.isBefore(moment(d))) g_choosingDates[i]=null;
        }
    }
    g_choosingDates.push(date)
    g_choosingDates = _.compact(g_choosingDates)
    g_choosingDates = _.uniq(g_choosingDates)
    console.log(g_choosingDates)
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
    $('tr>td>.diffdays').remove()
    let startMom = moment(startDate);
    let endMom = moment(endDate);
    if(!endMom.isAfter(startMom)) return;
    let countDays=1;
    let countWorkingDays=1;
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
        if(td)td.html(`<div class="diffdays">${countDays}<br>${countWorkingDays}</div>`)
        //console.log(startMom.format('YYYY-MM-DD'))
    }

}