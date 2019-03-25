let handleTdClick=(td)=>{
    console.log(td.getAttribute('id'))//)
}

let initEvent = ()=>{
    $('#root').on('click', 'td[id].day', (e)=>{
        handleTdClick(e.currentTarget);
    })
}