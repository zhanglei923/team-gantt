let handleTdClick=(td)=>{
    //td=$(td);
    let tdid = td.getAttribute('id')
    let rowid = td.getAttribute('rowidx');
    let tddate = td.getAttribute('date')
    console.log(tdid, rowid, tddate)//)
    showDateInfo(tdid, rowid, tddate)
}

let initEvent = ()=>{
    $('#root').on('click', 'td[id].day', (e)=>{
        handleTdClick(e.currentTarget);
    })
}