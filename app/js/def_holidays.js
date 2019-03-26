let holidays = [
    {startDate: '2019-04-05', duration: 3, workingWeekendDays:[]},
    {startDate: '2019-05-01', duration: 4, workingWeekendDays:['2019-04-28', '2019-05-05']},
    {startDate: '2019-06-07', duration: 3, workingWeekendDays:[]},
    {startDate: '2019-09-13', duration: 3, workingWeekendDays:[]},
    {startDate: '2019-10-01', duration: 7, workingWeekendDays:['2019-09-29']},
    {startDate: '2019-12-31', duration: 3, workingWeekendDays:[]},
];
let g_ImportantWorkingDay = {
    '2019-04-11': {desc:'1904腾讯云压测', level:'notice'},
    '2019-04-23': {desc:'1904 Staging.', level:'notice'},
    '2019-04-30': {desc:'1904 api-test', level:'notice'},
    '2019-05-22': {desc:'1904 腾讯云UAT', level:'notice'},
    '2019-05-25': {desc:'1904腾讯云', level:'notice'},

    '2019-03-22': {desc:'1904 Sp3 End', level:'important'},
    '2019-04-04': {desc:'1904 Sp4 End', level:'important'},
    '2019-04-19': {desc:'1904 Intg', level:'important'},
    '2019-04-27': {desc:'1904 Gray', level:'important'},
    '2019-05-04': {desc:'1904 沙盒', level:'important'},
    '2019-05-11': {desc:'1904 Prod', level:'important'},
    '2019-05-24': {desc:'1907 Sp1', level:'important'},
};