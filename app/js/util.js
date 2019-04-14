let isValidDate = (date)=>{
    if(!/^20[1-9][1-9]\-[01][1-9]\-[0123][1-9]/.test(date)) return false;
    if(!moment(date)._isValid) return false;
    return true;
}