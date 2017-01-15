import React, { Component } from 'react';
import './App.css';
import './css/weather-icons.css'

class WeatherApp extends Component{
  constructor(props){
    super(props)
    this.state={
      temp:'',
      humidity:'',
      windSpeed:'',      
      summary:'',
      icon:'',
      location:""
    }
  }
  
  //Use global navigator object to request user's location
  getLocation(){
    let lat = 43.6532 //defaults to Toronto if user rejects geolocation
    let lng = -79.3832
   if("geolocation" in navigator){
      navigator.geolocation.getCurrentPosition((position)=>{
        lat = position.coords.latitude
        lng = position.coords.longitude
      })
    }
    
    let location = lat + "," + lng
    return location
  }

  //Uses google API to convert lat,long to "city,state/province,country". Final location is formatted to "City, state/province"
  setCity(){
    let coords = this.getLocation()
    let locationApi = "http://maps.googleapis.com/maps/api/geocode/json?latlng="+coords+"&sensor=true"
    
    fetch(locationApi).then((response)=>{
      return response.json()
    }).then((data)=>{
      let cityFull = data.results[5].formatted_address
      let city = [cityFull.split(",")[0],cityFull.split(",")[1]].join(" ")
      this.setState({location:city})
    })
  }
  //Uses a weather API based on user's current location to set weather app's state
  setWeather(){
    let coords = this.getLocation()
    let weatherApi = "https://crossorigin.me/https://api.darksky.net/forecast/c031fbbd4164d564987c5fbe0e1a3bd3/" + coords
  
    fetch(weatherApi)
    .then((response) => {
      return response.json()
    }).then((data) => {
      return data.currently
    }).then((values) => {
      this.setState({
        temp:parseInt(values.apparentTemperature,10),         //all values retrieved based on current time
        precip:(values.precipProbability).toFixed(2),
        windSpeed:parseInt(values.windSpeed,10),
        summary:values.summary,
        icon:values.icon
      })
    })
  }

  componentWillMount(){                                       //prepare states before rendering
   this.setCity()
   this.setWeather()
  }

  render(){
    return (
      <div>
        <h1>{this.state.location}</h1>
        <h2>{this.state.summary}</h2>
        <Icon icon={this.state.icon}/>
        <Info temp={this.state.temp} precipitation={this.state.precip} summary={this.state.summary} wind={this.state.windSpeed}/>
      </div>
      )
  }
}


//Component is stateless and depends on its prop to display appropriate weather icon
const Icon = (props) => {
  let supportedIcons = {
    "clear-day":"wi-day-sunny",
    "clear-night":"wi-night-clear",
    "rain":"wi-rain",
    "snow":"wi-snow",
    "sleet":"wi-sleet",
    "wind":"wi-strong-wind",
    "cloudy":"wi-cloud",
    "fog":"wi-fog",
    "partly-cloudy-day":"wi-day-cloudy",
    "partly-cloudy-night":"wi-night-cloudy"
  }
  let name = "wi " + supportedIcons[props.icon] + " largeIcon"
  return(
    <i className={name}></i>
    )
}

//Component is stateless and depends on its prop to display appropriate weather stats
const Info = (props) => {
  return (
    <div className="info">
      <div className="temperature">{props.temp}&deg;</div>
      <div className="other">
        <div className="precipitation"><i className="wi wi-raindrop"></i>{(props.precipitation)*100} %</div>
        <div className="wind"><i className="wi wi-windy"></i>{props.wind} mph</div>
      </div>
    </div>
    )
}

export default WeatherApp;
