let initGantt = ()=>{
    let html = `<tr>`;
    let dateMap = [];
    let firstmom = moment('2019-01-01T00:00:00');
    firstmom.subtract(1, 'days');
    for(let j=0;j<365;j++){
        let mom = firstmom.add(1, 'days');
        dateMap.push(mom.format('MM-DD'))
    }
    //console.log(dateMap)
    for(let i=0;i<20;i++){
        html += `<td>${i+1}</td>`
        for(let j=0;j<dateMap.length;j++){
            html += `<td>${dateMap[j]}</td>`
        }
        html += `</tr><tr>`
    }
    html += `</tr>`


    $('#gantt_canvas').html(html)
}
$(initGantt)