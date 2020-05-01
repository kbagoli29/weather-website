const express = require('express');
const path = require('path');
const hbs = require('hbs');
const request = require('request');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

const app = express();

const port = process.env.PORT || 3000;//used in heroku

//Define path for express
const publicDirectory = path.join(__dirname,'../public');
const viewsDirectory = path.join(__dirname,'../templates/views');
const partialsDirectory = path.join(__dirname,'../templates/partials')

app.use(express.static(publicDirectory));//This is created,so that static files are download on client side
app.set('view engine','hbs');//setting our template engine as hbs
app.set('views',viewsDirectory);//sets views directory of template engine 

hbs.registerPartials(partialsDirectory);

app.get('',(req,res)=>{
    res.render('index',{
        heading:'Weather',
        title:'Weather App',
        name:'Karthik'
    });
});

app.get('/help',(req,res)=>{
    res.render('help',{
        name:'Karthik',
        title:'Help Page',
        heading:'HELP'
    });
});


app.get('/about',(req,res)=>{
    res.render('about',{
        heading:'ABOUT',
        name:'Karthik',
        title:'About Page'
    });
});

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'No address provided'
        });
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({
                error:'Incorrect address provided'
            })
        }
        forecast(latitude,longitude,(error,response)=>{
            if(error){
                res.send({error:'Cant load forecast'});
            }
            res.send({
                forecast:response.weatherDescription,
                location,
                address:req.query.address,
                feelsLike:response.feelsLike,
                temperature:response.temperature,
                humidity:response.humidity
            })
        });
    });
});
    

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'you must provide search term'
        });
    }
    console.log(req.query.search);
    res.send({
        product:[]
    });
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404 PAGE',
        name:'KARTHIK',
        heading:'404 PAGE'
    });
});

app.listen(port,()=>{
    console.log('Server started correctly on port number '+port);
});

console.log('Hi');