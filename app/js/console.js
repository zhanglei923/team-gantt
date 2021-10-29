let getDaysInfo = (startdate, enddate)=>{
    //console.warn(startdate, enddate)
    let startmom = moment(startdate);
    let endmom = moment(enddate);
    let days = startmom.diff(endmom, 'days');
    days = Math.abs(days);
    days = days+1;
    let alldays = [];
    let workingdays = [];
    let restdays = [];

    for(let i=0;i<days;i++){
        let mom = moment(startdate).add(i, 'days');
        let dayfmt = mom.format('YYYY-MM-DD');
        let info = g_CanvasDateInfo[dayfmt];
        if(info){
            if(info.isWorkDay){
                workingdays.push(dayfmt)
            }else{
                restdays.push(dayfmt)
            }
        }else{
            //
        }
    }
    return {
        workingdays, restdays
    }
}
let showDateInfo=(startdate, tddate)=>{
    let startmom;
    startmom = startdate ? moment(startdate) : moment();
    let todaydate = startmom.format('YYYY-MM-DD');
    let start = false;
    let betweendays = []
    let betweenrestdays = []
    let betweenworkingdays = []
    for(let i=0;i<g_CanvasDateList.length;i++){
        let date = g_CanvasDateList[i];
        if(date === todaydate) start = true;
        if(start){
            betweendays.push(date)
            if(g_CanvasDateInfo[date].isWorkDay){
                betweenworkingdays.push(date)
            }else{
                betweenrestdays.push(date)
            }
            if(date ===tddate){break;}
        }
    }
    let isAfter = moment(tddate).isAfter(todaydate);
    let isSame = moment(tddate).isSame(todaydate);
    let btw = isSame ? '=' : (isAfter?'-&gt;':'&lt;-')
    let reportHtml = `
        <div style="display:none;">[${tddate}]&nbsp;</div>Today ${todaydate}(${getDayInfo(todaydate).textofWeekend}) ${btw} To ${tddate}(${getDayInfo(tddate).textofWeekend}),
        Days=${betweendays.length},
        Working days=${betweenworkingdays.length}
    `
    //console.log(betweendays, betweenrestdays, betweenworkingdays)
    document.getElementById('betweendays_report').innerHTML = reportHtml;
}