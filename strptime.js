var FORMAT_REGEXES = {
    'Y': new RegExp('^[0-9]+'), //year
    'd': new RegExp('^[0-9]{1,2}'), //date in month
    'm': new RegExp('^[0-9]{1,2}'), //month
    'H': new RegExp('^[0-9]{1,2}'), //hour
    'M': new RegExp('^[0-9]{1,2}'), //minutes
    'a': new RegExp('^(Mon|Tue|Wed|Thu|Fri|Sat|Sun)') //day of week
}

var DAYS_TO_IDX = {
    'Sun': 0,
    'Mon': 1,
    'Tue': 2,
    'Wed': 3,
    'Thu': 4,
    'Fri': 5,
    'Sat': 6,
}


function parseDate(datestring, format){
    var parseDict = {}
    str_idx = 0;
    for(f_idx = 0; f_idx < format.length; f_idx++){
        form = format[f_idx]

        if(form == '%'){
            form = format[++f_idx]
            
            var data = FORMAT_REGEXES[form].exec(datestring.substring(str_idx))
            console.log(datestring.substring(str_idx))
            console.log(data)
            if(!data){
                return null
            }
            data = data[0] //return first match
            console.log(data.length)
            str_idx += data.length+1
            var parsed;
            console.log(form)
            if(form == 'a'){
                parsed = data
            }
            else{
                parsed = parseInt(data, 10) //10 means we convert to base 10
                if(isNaN(parsed)){
                console.log("NaN")
                return null
            }
            }
            
            parseDict[form] = parsed

            console.log(parseDict)


        }

    }
    return parseDict

}

function strptime(datestring, format){
    var parsed = parseDate(datestring, format)
    console.log(parsed)

    if(!parsed) return null
    var date = new Date(0,0,0,0,0) //days are 1-indexed but months are 0-indexed!

    if(parsed['Y']){
        date.setFullYear(parsed['Y'])
    }
    if(parsed['m']){
        if(parsed['m'] > 12 || parsed['m'] < 1) return null
        date.setMonth(parsed['m']-1) //months are 0-indexed
    }
    if(parsed['d']){
        if(parsed['d'] > 31 || parsed['d'] < 1) return null
        if(date.getDate() < parsed['d']) return null //if number of days in month is less than date, return null. ie Feb 30th is invalid
        date.setDate(parsed['d'])
    }

    if(parsed['H']){
        if(parsed['H'] > 23 || parsed['H'] < 0) return null
        date.setHours(parsed['H'])
    }
    if(parsed['M']){
        if(parsed['M'] > 59 || parsed['M'] < 0) return null
        date.setMinutes(parsed['M'])
    }
    if(parsed['a']){
        if(parsed['d'] && date.getDay() != DAYS_TO_IDX[parsed['a']]) return null

        if(!parsed['d']){
            //if date not specified but day of week is, we get first occurence of the day in the specified month
            dateOfMonth = 1
            date.setDate(dateOfMonth)
            dayOfFirst = date.getDay()
            dateOfMonth += 7 + DAYS_TO_IDX[parsed['a']] - dayOfFirst
            if(DAYS_TO_IDX[parsed['a']] - dayOfFirst >=0) dateOfMonth -= 7

            date.setDate(dateOfMonth)
        }
    }

    return date

}


form = "%a %m %Y"
datestr = "Mon 8 2022"
console.log(strptime(datestr, form))


//console.log(FORMAT_REGEXES['a'].exec("Mon 2022"))
//console.log(FORMAT_REGEXES['Y'].exec("2022"))




