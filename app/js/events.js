let handleTdClick=(td)=>{
    //td=$(td);
    let tdid = td.getAttribute('id')
    let rowid = td.getAttribute('rowidx');
    let date = td.getAttribute('date')
    console.log(tdid, rowid, date)//)
}

let initEvent = ()=>{
    $('#root').on('click', 'td[id].day', (e)=>{
        handleTdClick(e.currentTarget);
    })
}