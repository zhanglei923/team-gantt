let handleTdClick=(td)=>{
    //td=$(td);
    let tdid = td.getAttribute('id')
    let rowidx = td.getAttribute('rowidx');
    let date = td.getAttribute('date');

    $('tr>td').removeClass('selected_day').removeClass('selected_daycol')
    $(`tr>td[id$="${date}"]`).addClass('selected_daycol')
    let daytd = getDay(rowidx, date);
    daytd.addClass('selected_day')
    console.log(tdid, rowidx, date, td.className)//)
    showDateInfo(null, date)
}
let hoveringrowidx, hoveringdate;
let handleTdMouseOver=(td)=>{
    //td=$(td);
    let tdid = td.getAttribute('id')
    let rowidx = td.getAttribute('rowidx');
    let date = td.getAttribute('date');
    if(date === hoveringdate && rowidx === hoveringrowidx) return;
    hoveringrowidx = rowidx;
    hoveringdate = date;
    $('tr').removeClass('hovering')
    $('td[date].hovering').removeClass('hovering')
    //console.log(rowidx,date)
    let coldays = getColumn(date).days;
    let rowdays = getRow(rowidx);
    // rowdays.addClass('hovering')
    // coldays.addClass('hovering')
}

let initEvent = ()=>{
    $('#root').on('mousedown', 'td[id].day', (e)=>{
        if(e.ctrlKey){
        }else{
            handleTdClick(e.currentTarget);
        }
        e.preventDefault();
        return false;            
    })
    $('#root').on('mousemove', 'td[id].day', (e)=>{
        handleTdMouseOver(e.currentTarget);
    })
}