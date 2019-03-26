let getColumn = (date)=>{
    return {
        title: $(`th[date="${date}"]`),
        days:$(`tr>td.day[date="${date}"]`)
    };
}
let getRow = (idx)=>{
    return $(`tr[rowIdx="${idx}"]`);
}