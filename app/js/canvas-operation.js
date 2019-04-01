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
let chooseDay=(rowidx, date)=>{

}
let unChooseDay=(rowidx, date)=>{

}
let showDaysInbetween=(rowidx, startDate, endDate)=>{
    $('tr>td').html('')
    let startMom = moment(startDate+'T00:00:00');
    let endMom = moment(endDate+'T00:00:00');
    for(let i=0;i<1000;i++){
        startMom.add(1, 'days');
        if(startMom.isAfter(endMom,'day')){
            console.warn(startMom.format())
            break;
        }
        console.log(startMom.format('YYYY-MM-DD'))
    }

}