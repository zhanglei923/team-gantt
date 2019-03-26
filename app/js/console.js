let showDateInfo=(tddate)=>{
    let nowmom = moment();
    let todaydate = nowmom.format('YYYY-MM-DD');
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
    let reportHtml = `
        Days=${betweendays.length},
        Working days=${betweenworkingdays.length}
    `
    //console.log(betweendays, betweenrestdays, betweenworkingdays)
    document.getElementById('betweendays_report').innerHTML = reportHtml;
}