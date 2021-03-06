var colorArr = ['AliceBlue','AntiqueWhite','Aqua','Aquamarine','Azure','Beige','Bisque','Black','BlanchedAlmond',
'Blue','BlueViolet','Brown','BurlyWood','CadetBlue','Chartreuse','Chocolate','Coral','CornflowerBlue',
'Cornsilk','Crimson','Cyan','DarkBlue','DarkCyan','DarkGoldenRod','DarkGray','DarkGreen','DarkKhaki',
'DarkMagenta','DarkOliveGreen','Darkorange','DarkOrchid','DarkRed','DarkSalmon','DarkSeaGreen','DarkSlateBlue',
'DarkSlateGray','DarkTurquoise','DarkViolet','DeepPink','DeepSkyBlue','DimGray','DodgerBlue','Feldspar',
'FireBrick','FloralWhite','ForestGreen','Fuchsia','Gainsboro','GhostWhite','Gold','GoldenRod','Gray',
'Green','GreenYellow','HoneyDew','HotPink','IndianRed','Indigo','Ivory','Khaki','Lavender','LavenderBlush',
'LawnGreen','LemonChiffon','LightBlue','LightCoral','LightCyan','LightGoldenRodYellow','LightGrey',
'LightGreen','LightPink','LightSalmon','LightSeaGreen','LightSkyBlue','LightSlateBlue','LightSlateGray',
'LightSteelBlue','LightYellow','Lime','LimeGreen','Linen','Magenta','Maroon','MediumAquaMarine','MediumBlue',
'MediumOrchid','MediumPurple','MediumSeaGreen','MediumSlateBlue','MediumSpringGreen','MediumTurquoise',
'MediumVioletRed','MidnightBlue','MintCream','MistyRose','Moccasin','NavajoWhite','Navy','OldLace','Olive',
'OliveDrab','Orange','OrangeRed','Orchid','PaleGoldenRod','PaleGreen','PaleTurquoise','PaleVioletRed',
'PapayaWhip','PeachPuff','Peru','Pink','Plum','PowderBlue','Purple','Red','RosyBrown','RoyalBlue',
'SaddleBrown','Salmon','SandyBrown','SeaGreen','SeaShell','Sienna','Silver','SkyBlue','SlateBlue',
'SlateGray','Snow','SpringGreen','SteelBlue','Tan','Teal','Thistle','Tomato','Turquoise','Violet',
'VioletRed','Wheat','White','WhiteSmoke','Yellow','YellowGreen'];

let daysdata = {holidays:[],importantdays:{}};
$.ajax({
                method: "GET",
                async: false,
                url: "/action/imortantdays",
                dataType:'json'
            }).done(function( data ) {
                console.log(data)
                daysdata = data;
            });

let test_holidays = [
    {startDate: '2019-04-05', duration: 3, alteredWorkingDays:[]},
    {startDate: '2019-05-01', duration: 4, alteredWorkingDays:['2019-04-28', '2019-05-05']},
    {startDate: '2019-06-07', duration: 3, alteredWorkingDays:[]},
    {startDate: '2019-09-13', duration: 3, alteredWorkingDays:[]},
    {startDate: '2019-10-01', duration: 7, alteredWorkingDays:['2019-09-29','2019-10-12']},
    {startDate: '2019-12-30', duration: 3, alteredWorkingDays:['2019-12-28','2019-12-29']},
];
test_holidays = test_holidays.concat(daysdata.holidays)
let g_sprintSchedules = {
}
let test_ImportantWorkingDay = {
    '2019-03-11': [{desc:'1904Sp3', level:'important'}],
    '2019-03-22': [{desc:'1904Sp3结束', level:'important', is:'end'}],
    '2019-03-25': [{desc:'1904sp4', level:'important'}],
    '2019-04-04': [{desc:'1904Sp4结束', level:'important', is:'end'}],
    '2019-04-08': [{desc:'1904Intg', level:'important'},{desc:'1904腾讯云压测', level:'notice'}],
    '2019-04-19': [{desc:'1904Intg结束', level:'important', is:'end'}],
    '2019-04-23': [{desc:'1904Staging', level:'notice'}],
    '2019-04-27': [{desc:'1904Gray', level:'notice'}],
    '2019-04-28': [{desc:'1904腾讯云UAT', level:'notice', offset_y:1}],
    '2019-04-29': [{desc:'1907Sp0', level:'important'}],
    '2019-04-30': [{desc:'1904ApiTest', level:'notice', offset_y:2}],
    '2019-05-04': [{desc:'1904沙盒', level:'notice'}],
    '2019-05-10': [{desc:'1907Sp0结束', level:'important', is:'end'}],
    '2019-05-11': [{desc:'1904Prod', level:'notice'}],
    '2019-05-13': [{desc:'1907Sp1', level:'important'}],
    '2019-05-19': [{desc:'1904大企业pod', level:'notice'}],
    '2019-05-22': [{desc:'1904腾讯云UAT', level:'notice', offset_y:1}],
    '2019-05-24': [{desc:'1907Sp1结束', level:'important', is:'end'}],
    '2019-05-25': [{desc:'1904腾讯云', level:'notice'}],
    '2019-05-27': [{desc:'1907Sp2', level:'important'}],
    '2019-06-06': [{desc:'1907Sp2结束', level:'important', is:'end'}],
    '2019-06-10': [{desc:'1907Sp3', level:'important'}],
    '2019-06-21': [{desc:'1907Sp3结束', level:'important', is:'end'}],
    '2019-06-24': [{desc:'1907Sp4', level:'important'}],
    '2019-07-05': [{desc:'1907Sp4结束', level:'important', is:'end'}],
    '2019-07-08': [{desc:'1907Intg', level:'important'}],
    '2019-07-19': [{desc:'1907Intg结束', level:'important', is:'end'}],
    '2019-09-02': [{desc:'1910集成', level:'important'}],
    '2019-09-20': [{desc:'1910集成', level:'important', is:'end'}],
    '2019-09-23': [{desc:'预发布', level:'important'}],
    '2019-10-11': [{desc:'预发布', level:'important', is:'end'}],

    '2019-10-08': [{desc:'SP0', level:'important'}],
    '2019-10-18': [{desc:'SP0', level:'important', is:'end'}],
    
    '2019-10-21': [{desc:'SP1', level:'important'}],
    '2019-11-01': [{desc:'SP1', level:'important', is:'end'}],
    
    '2019-11-04': [{desc:'SP2', level:'important'}],
    '2019-11-15': [{desc:'SP2', level:'important', is:'end'}],
    
    '2019-11-18': [{desc:'GA&PLAN', level:'important'}],
    '2019-11-22': [{desc:'GA&PLAN', level:'important', is:'end'}],

    '2019-11-25': [{desc:'SP1', level:'important'}],
    '2019-12-06': [{desc:'SP1', level:'important', is:'end'}],
    
    '2019-12-09': [{desc:'SP2', level:'important'}],
    '2019-12-20': [{desc:'SP2', level:'important', is:'end'}],

    '2019-12-23': [{desc:'GA&PLAN', level:'important'}],
    '2019-12-27': [{desc:'GA&PLAN', level:'important', is:'end'}]
};
Object.assign(test_ImportantWorkingDay, daysdata.importantdays)
let test_Schedules = {
    'adsfasdfdsf12': {
        start: '2019-01-10', 
        end: '2019-05-08',
        subject: '0000000',
        rowIdx: 4
    },
    'ads22fasdfdsf12': {
        start: '2019-04-10', 
        end: '2019-04-30',
        subject: 'aaaaaaaa',
        rowIdx: 5
    },
    'iop123423433poui': {
        start: '2019-04-20', 
        end: '2019-06-21',
        subject: 'bbbbbbbb',
        rowIdx: 6
    },
    'iop1234ff423poui': {
        start: '2019-04-01', 
        end: '2019-09-23',
        subject: 'cccccccc',
        rowIdx: 7
    }
}
Object.assign(test_ImportantWorkingDay, g_sprintSchedules)
let test_TaskData = {
    'task_1': {
        rowIdx: 0,
        startDate: null,
        endDate: moment().subtract(2,'days').format('YYYY-MM-DD'),
        days: 3,
        subject: 'This is a demo',
    }
}; 

//===========
let updateImportantDaysData=()=>{
    for(let date in g_ImportantWorkingDay){
        g_ImportantWorkingDay[date].forEach((d)=>{
            d.id=('iwd'+Math.random()).replace(/\./g,'')
            if(!d.is) d.is = 'start';
        })
    }
    console.log('g_ImportantWorkingDay', g_ImportantWorkingDay)
}
let getAllImportantDays=()=>{
    let arr = [];
    for(let date in g_ImportantWorkingDay){
        g_ImportantWorkingDay[date].forEach((d)=>{
            d.date = date;
            arr.push(d);
        })
    }
    return arr;
}