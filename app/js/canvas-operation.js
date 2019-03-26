let getDay = (rowidx, date)=>{
    return $(`tr[rowIdx="${rowidx}"]>td[date="${date}"]`);
}
let getColumn = (date)=>{
    return {
        title: $(`th[date="${date}"]`),
        days:$(`tr>td.day[date="${date}"]`)
    };
}
let getRow = (rowidx)=>{
    return $(`tr[rowIdx="${rowidx}"]>td[date]`);
}