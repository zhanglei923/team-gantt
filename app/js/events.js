let handleTdClick=(td)=>{
    //td=$(td);
    let tdid = td.getAttribute('id')
    let rowid = td.getAttribute('rowidx');
    let date = td.getAttribute('date');

    $('tr>td').removeClass('selected_day')
    $(`tr>td[id$="${date}"]`).addClass('selected_day')
    console.log(tdid, rowid, date, td.className)//)
    showDateInfo(date)
}

let initEvent = ()=>{
    $('#root').on('mousedown', 'td[id].day', (e)=>{
        console.log(e)
        if(e.ctrlKey){
            handleTdClick(e.currentTarget);

            e.preventDefault();
            return false;
        }else{

        }
            
    })
}