let escapeHtml=(txt)=>{
    return (txt + '')
                    .replace(/&/g, '&amp;')
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;')
                    .replace(/'/g, '&#039;')
                    .replace(/"/g, '&quot;')
                    .replace(/\n/g, '<br />');
}
let isValidDate = (date)=>{
    if(!/^20[1-9][1-9]\-[01][0-9]\-[0123][0-9]/.test(date)) return false;
    if(!moment(date)._isValid) return false;
    return true;
}
(()=>{
    var queryJson, str;
    $.query = function (name) {
        if (!queryJson) {
            queryJson = {};
            str = location.search.slice(1) + '&' + location.hash.slice(1);
            if (str) {
                $.each(str.split('&'), function (i, s, key, value) {
                    s = s.split('='), key = s[0], value = s[1];
                    if (key in queryJson) {
                        if ($.isArray(queryJson[key])) {
                            queryJson[key].push(value);
                        } else {
                            queryJson[key] = [queryJson[key], value];
                        }
                    } else {
                        queryJson[key] = value;
                    }
                });
            }
        }
        return queryJson[name];
    };
})()