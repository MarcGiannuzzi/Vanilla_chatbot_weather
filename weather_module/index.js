'use strict';

const axios = require("axios")
const apikey = "0fe88e88085dd6319878b7e0bcaa6cef";
var weatherConditions;

const getWeather = location => {
    return new Promise(async(resolve, reject) => {
        try{
             weatherConditions = await(axios.get(
                `http://api.openweathermap.org/data/2.5/weather`,
                {params:{
                    appid:apikey,
                    q:location, 
                }}
                ));
            //console.log(weatherConditions.data)
            resolve(weatherConditions.data);
            }
        catch(error){
            reject(error);
        }
    });
}

const getWeatherDate = (location, nbr_days) => {
    return new Promise(async(resolve, reject) => {
        try{
             weatherConditions = await(axios.get(
                `http://api.openweathermap.org/data/2.5/forecast`,
                {params:{
                    appid:apikey,
                    q:location, 
                }}
                ));
            //console.log(weatherConditions.data)
            resolve(weatherConditions.data);
            }
        catch(error){
            reject(error);
        }
    });
}


module.exports = {
    Weather:getWeather,
    WeatherDate:getWeatherDate
}