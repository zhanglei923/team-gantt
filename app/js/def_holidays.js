let test_holidays = [
    {startDate: '2019-04-05', duration: 3, alteredWorkingDays:[]},
    {startDate: '2019-05-01', duration: 4, alteredWorkingDays:['2019-04-28', '2019-05-05']},
    {startDate: '2019-06-07', duration: 3, alteredWorkingDays:[]},
    {startDate: '2019-09-13', duration: 3, alteredWorkingDays:[]},
    {startDate: '2019-10-01', duration: 7, alteredWorkingDays:['2019-09-29']},
    {startDate: '2019-12-31', duration: 3, alteredWorkingDays:[]},
];
let test_ImportantWorkingDay = {
    '2019-04-11': {desc:'1904腾讯云压测', level:'notice'},
    '2019-04-23': {desc:'1904Staging.', level:'notice'},
    '2019-04-30': {desc:'1904Api-test', level:'notice'},
    '2019-05-22': {desc:'1904腾讯云UAT', level:'notice'},
    '2019-05-25': {desc:'1904腾讯云', level:'notice'},

    '2019-03-22': {desc:'1904Sp3', level:'important'},
    '2019-04-04': {desc:'1904Sp4', level:'important'},
    '2019-04-19': {desc:'1904Intg', level:'important'},
    '2019-04-27': {desc:'1904Gray', level:'important'},
    '2019-05-04': {desc:'1904沙盒', level:'important'},
    '2019-05-11': {desc:'1904Prod', level:'important'},
    '2019-05-24': {desc:'1907Sp1', level:'important'},
};
let test_TaskData = {
    'task_1': {
        rowIdx: 0,
        startDate: null,
        endDate: '2019-03-26',
        days: 3,
        subject: 'AAAAAAA AAAAAAA AAAAAAA',
    },
    'task_2': {
        rowIdx: 1,
        startDate: null,
        endDate: '2019-04-16',
        days: 30,
        subject: 'BBBBBBB BBBBBBBB BBBBBB',
    },
    'task_3': {
        rowIdx: 2,
        startDate: null,
        endDate: '2019-05-16',
        days: 90,
        subject: 'CCCCCCCC CCCCCCCC CCCCCCCC',
    }
};    