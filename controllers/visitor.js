const visitor = require('../models/visitor')
const moment = require('moment');
const visitors = require('../models/visitor');

const getHighest = (visitorEntry) => {
    let max = Object.keys(visitorEntry).reduce(function(a, b){ return parseInt(visitorEntry[a]) > parseInt(visitorEntry[b]) ? a : b });
    return max
}

const getLowest = (visitorEntry) => {
    let max = Object.keys(visitorEntry).reduce(function(a, b){ return parseInt(visitorEntry[a]) < parseInt(visitorEntry[b]) ? a : b });
    return max
}

const getTotal = (visitorEntry) => {
    let sum = 0
    Object.keys(visitorEntry).forEach(entry => {
        if(entry !== 'month'){
            sum = sum + parseInt(visitorEntry[entry])
        }
    });
    return sum
}
module.exports.getMuseumVisitors = (req,res) => {
    console.log(req.query);
    let {date,ignore} = req.query
    console.log(ignore)
    if(date){
        let formattedDate = moment(Number(date)).format('YYYY-MM-DDT00:00:00.000');
        console.log(formattedDate);
        let attendance = {}
        let visitorEntry = visitors.find( x => x.month == formattedDate)
        if(visitorEntry){
            attendance.month = moment(Number(date)).format('MMM')
            attendance.year = moment(Number(date)).format('YYYY')
            
            if(ignore){
                attendance.ignored = {}
                attendance.ignored.museum = ignore
                attendance.ignored.visitors = visitorEntry[ignore]
                delete visitorEntry[ignore]
            }

            attendance.highest  = {}
            attendance.highest.museum = getHighest(visitorEntry)
            attendance.highest.visitors = visitorEntry[ getHighest(visitorEntry)]
            attendance.lowest  = {}
            attendance.lowest.museum = getLowest(visitorEntry,ignore)
            attendance.lowest.visitors = visitorEntry[ getLowest(visitorEntry)]
            attendance.total = getTotal(visitorEntry)
        }
        res.send(attendance)
    }
    else{

    }



   //  /api/visitors?date=1404198000000
   // expected op 

//    {
//     "attendance": {
//       "month": "Jul",
//       "year": "2014",
  
//       "highest": {
//         "museum": "america_tropical_interpretive_center",
//         "visitors": 13490
//       },
  
//       "lowest": {
//         "museum": "hellman_quon",
//         "visitors": 120
//       },
  
//       "ignored": {
//         "museum": "avila_adobe",
//         "visitors": 32378
//       },
  
//       "total": 28157
//     }
//   }


}