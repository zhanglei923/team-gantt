let initGantt = ()=>{
    let html = `<tr>`;
    let dateMap = [];
    let firstmom = moment('2019-01-01T00:00:00');
    firstmom.subtract(1, 'days');

    let headhtml = `<tr>`
    headhtml += `<th>-</th>`
    for(let j=0;j<365;j++){
        headhtml += `<th>${j+1}</th>`
        let mom = firstmom.add(1, 'days');
        dateMap.push(mom.format('MM-DD'))
    }
    //console.log(dateMap)
    for(let i=0;i<10;i++){
        html += `<td>${i+1}</td>`
        for(let j=0;j<dateMap.length;j++){
            html += `<td>${dateMap[j]}</td>`
        }
        html += `</tr><tr>`
    }
    html += `</tr>`
    headhtml += `</tr>`
    $('#gantt_canvas_thead').html(headhtml)
    $('#gantt_canvas_tbody').html(html)
}
$(initGantt)