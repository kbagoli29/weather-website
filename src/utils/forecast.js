const request = require('request');
const forecast = (latitude,longitude,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=167dcf1d7f84a1313cbcf8a4e4d061c1&query=' + latitude+','+longitude;
    request({url:url,json:true},(error,response)=>{
        if(error)
        {
            callback('Unable to Connect to Internet',undefined);
        }
        else if(response.body.error)
        {
            callback('Incorrect coordinates passed',undefined);
        }
        else
        {
            callback(undefined,{
                temperature : response.body.current.temperature,
                feelsLike : response.body.current.feelslike,
                weatherDescription:response.body.current.weather_descriptions,
                humidity:response.body.current.humidity
            });
        }
    });
};
module.exports = forecast;