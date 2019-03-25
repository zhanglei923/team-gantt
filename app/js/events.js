let handleTdClick=(td)=>{
    //td=$(td);
    let tdid = td.getAttribute('id')
    let rowid = td.getAttribute('rowidx');
    let tddate = td.getAttribute('date');

    $('tr>td').removeClass('selected_day')
    $('#'+tdid).addClass('selected_day')
    console.log(tdid, rowid, tddate, td.className)//)
    showDateInfo(tdid, rowid, tddate)
}

let initEvent = ()=>{
    $('#root').on('click', 'td[id].day', (e)=>{
        handleTdClick(e.currentTarget);
    })
}