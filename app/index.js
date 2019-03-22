let initGantt = ()=>{
    let html = `<tr>`;
    for(let i=0;i<20;i++){
        html += `<td>${i+1}</td>`
        for(let j=0;j<365;j++){
            html += `<td>${j+1}</td>`
        }
        html += `</tr><tr>`
    }
    html += `</tr>`


    $('#gantt_canvas').html(html)
}
$(initGantt)