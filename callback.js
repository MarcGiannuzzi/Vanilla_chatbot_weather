var colors = require('colors');
colors.enable();


const weather = require("./weather_module/index").Weather
var weatherDate = require("./weather_module/index").WeatherDate
var week = ['monday', 'tuesday', 'wednesdya', 'thursday', 'friday', 'saturday', 'sunday']

var today_week_number = (new Date()).getDay() - 1;
var today_number = (new Date()).getDate();



var country, temperature, temperature_max, temperature_max, humidity;
                  



var display = function(humidity, temperature, temperature_min, temperature_max){
    console.log("\n")
    console.log("Weather data loaded");


    console.log(`Humidity : ${humidity}`.underline.blue)

    console.log(`The average temperature will be : ${temperature} degrees celcius`.underline.yellow);
    if(temperature < 8){
        console.log("It is gonna be cold, cover yourself !".underline.red)
    }
    else if(temperature > 25){
        console.log("It is gonna be hot, don't cover yourself too much if you don't want to sweat !")
    }
    else{
        console.log("The temperature will be warm.")
        console.log(`The lowest temperature will be : ${temperature_min} degrees celcius`);
        console.log(`The minimum temperature will be  : ${temperature_max} degrees celcius`);
    }

    console.log(`The humidity will get to : ${humidity}`.underline.gray)
}

var getIndexOfDate = function(in_days,  data){
    var list = data.list;
    var ctr = 0;
    var dic = list[ctr]
    var day_time = dic.dt_txt;
    var day = day_time.slice(8, 10);

    while(day != today_number + in_days){
        var dic = list[ctr]
        var day_time = dic.dt_txt;
        var day = day_time.slice(8, 10);
        // console.log( today_number + in_days)
        // console.log(day)
        ctr += 1;
    }


    return ctr
}


var includesNumber = function(str){
    var result = false;
    for(let i = 0; i < str.length; i++){
        if(str.includes(i)){
            result = true
        }
    }
    return result;
}


var cb = function(dict){
//console.log("Intent");
//console.log(dict.intent);
//console.log(dict.entities);
var nbr_days = 0;
    for(var i = 0; i < dict.entities.length; i++){
        if(dict.entities[i] !== null){
            //console.log(i);
            // console.log(dict.entities[i]);
            if(i === 0){
                switch (dict.entities[i].greeting.toLowerCase()){
                    case('hi'):
                        console.log("Hi, how are you ? ");
                        break;
                    case('hello'):
                        console.log("Hello, how are you ? ");
                        break;
                    case('hey'):
                        console.log("Hey, how are you ? ");
                        break;
                    default:
                        console.log("Hola ! How are you ?")	
                }
            }

            if(i == 4){
                switch (dict.entities[i].mood.toLowerCase()){
                    case('m good'):
                        console.log("Great ! ");
                        break;
                    case('sad'):
                        console.log("Hope you'll feel better soon... ");
                        break;
                    case('fine'):
                        console.log("Great ! ");
                        break;
                    default:
                        console.log("OKOK..")
                }
            }

            if(i == 5){
                console.log("You know, I am just a robot...")
            }

            if(i == 1){
                    console.log("I hope I will see you soon ! ");
                    process.exit()
            }


            if(i == 6){
                var date = dict.entities[i].date
                //console.log(`date:${date}`)
                //console.log(`date type:${typeof(date)}`)
                //console.log(dict.entities[i].date);


                // If we have a string number in the date
                if(!includesNumber(date)){
                    console.log("xxxxxxxxxxxxxx")
                    if(date == "monday" || date == "tuesday" || date == "wednesday" || date == "thursday" || date == "friday" || date == "saturday" || date == "sunday"){
                        console.log("1111")
                        switch(date.toLowerCase()){
                            case("monday"):
                                result= today_week_number-0
                                break;
                            case("tuesday"):
                                result=today_week_number-1
                                break;
                            case("wednesday"):
                                result=today_week_number-2
                                break;
                            case("thursday"):
                                result=today_week_number-3
                                break;
                            case("friday"):
                                result=today_week_number-4
                                break;
                            case("saturday"):
                                result = today_week_number-5
                                break;
                            case("sunday"):today_week_number-6
                                result=6;
                                break;
                            default:
                                result=7;
                                break;
                        }
                        nbr_days =  7 - Math.abs(result);
                    }
                    else{
                        console.log("22222")
                        let words = date.split(" ")
                        var str_day = words[0]
                        var nbr = 0
                        switch(str_day.toLowerCase()){
                            case("one" ):
                                nbr= 1
                                break;
                            case("two"):
                                nbr=2
                                break;
                            case("three"):
                                nbr=3
                                break;
                            case("four"):
                                nbr=4
                                break;
                            case("five"):
                                nbr=5
                                break;
                            case("six"):
                                nbr = 6
                                break;
                            case("seven"):
                                nbr=7;
                                break;
                            default:
                                nbr=0;
                                break;
                        }
                        nbr_days = nbr
                    
                    }
                }
                   
                else{
                    var words = date.split(" ")
                    nbr_days =  Number(words[1])
                }
                    
            }
                         

            if(i === 7){
                
                var in_city = dict.entities[i].city
                var city = in_city.slice(3, in_city.length);
                // console.log(city)
                


                console.log(`nbr_days: ${nbr_days}`);
                console.log("\n\n\n")
                if(nbr_days == 0){
                    var curr_weather = weather(city).then(function(values){
                        //console.log(values);
                        country = values.sys.country
                        temperature = values.main.temp - 273;
                        temperature_min = values.main.temp_min- 273;
                        temperature_max = values.main.temp_max - 273;
                        humidity = values.main.humidity
                        console.log(`\nHere is the temperature for ${city}, ${country} :`)
                        display(humidity, temperature, temperature_min, temperature_max)
                    
                    }, function(){console.log("Error");});
                }
                else{
                    var curr_weather = weatherDate(city, nbr_days).then(function(values){
                        //console.log(values);
                        index_date = getIndexOfDate(nbr_days, values)
                        //console.log(`indexdate:${index_date}`)


                        country = values.city.country
                        temperature = values.list[index_date].main.temp - 273;
                        temperature_min = values.list[index_date].main.temp_min- 273;
                        temperature_max = values.list[index_date].main.temp_max - 273;
                        humidity = values.list[index_date].main.humidity
                        console.log(`\nHere is the temperature for ${city}, ${country} in ${nbr_days} days :`)
                        display(humidity, temperature, temperature_min, temperature_max)




                    }, function(){console.log("Error");});
            }


                        
            }    

                
        }
            

    }
}
	






module.exports = cb;


