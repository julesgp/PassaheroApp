import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/header.js';
import UserInput from './components/userinput.js';
import FlighInfo from './components/flightinfo.js';
import {ajax} from 'jquery';

const getCurrentDate = () => {
    var todayFlight = new Date();
    let dd = todayFlight.getDate();
    let mm = todayFlight.getMonth()+1; //January is 0!
    let yyyy = todayFlight.getFullYear();
    if(dd<10) {
        dd='0'+dd
    }
    if(mm<10) {
        mm='0'+mm
    }
    todayFlight =  `${yyyy}-${mm}-${dd}`;
    return todayFlight;
}

class App extends React.Component {
    constructor() {
        super();
        this.state ={
            budget: "",
            flight: [],
            originPlace: {},
            destinationPlace:{},
            date: getCurrentDate()
        }

        this.handleOriginSelected = this.handleOriginSelected.bind(this);
        this.handleDestinationSelected = this.handleDestinationSelected.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.formSubmited = this.formSubmited.bind(this);
    }

    handleChange(e){
        this.setState({
            budget: e.target.value
        });
    }

    handleOriginSelected(place) {
        var picture = place.photos[0];
        const pictureWidth = picture.width;
        const pictureHeight = picture.height;
        const pictureUrl = picture.getUrl({'maxWidth': pictureHeight, 'maxHeight': pictureWidth});
        console.log(pictureUrl);
        const cityName = place.name;
        const originPlace = {
            name: cityName,
            image: pictureUrl
        };
        this.setState({
            originPlace: originPlace
        });
    }

    handleDestinationSelected(place) {
        var picture = place.photos[0];
        const pictureWidth = picture.width;
        const pictureHeight = picture.height;
        const pictureUrl = picture.getUrl({'maxWidth': pictureHeight, 'maxHeight': pictureWidth});
        console.log(place.name);
        console.log(pictureUrl);
        const cityName = place.name;
        const destinationPlace = {
            name: cityName,
            image: pictureUrl
        };
        this.setState({
            destinationPlace: destinationPlace
        });
    }

    formSubmited(e){
        e.preventDefault();
        console.log("I have been submitted!");
    }

    render() {
        return (
            <div>
               <Header />
               <UserInput originSelected={this.handleOriginSelected} handleChange={this.handleChange} destinationSelected = {this.handleDestinationSelected} budgetAmount={this.state.budget}
               forSubmition={this.formSubmited}/>
            </div>
        )
    }

    componentDidMount() {
        const iataKey = 'f418faed-5b39-458e-975c-0c6e5747e88e';
        const amadeusKey = 'J2j1J7uww5Hd7wFAdkOgeMw8Ay3e1VKD';

        //AJAX CALL FOR FINDING CITY CODE
        ajax({
            url: 'http://proxy.hackeryou.com',
            dataType: 'json',
            method: 'GET',
            data: {
                reqUrl: 'https://iatacodes.org/api/v6/autocomplete',
                params: {   
                    query: 'Palo Alto', //to be changed
                    api_key: 'f418faed-5b39-458e-975c-0c6e5747e88e',
                }
            }
        }).then((data)=>{
            const date = getCurrentDate();
            console.log("Date is --------");
            console.log(date);
            console.log("----------");
            console.log(data);
            console.log(data.response.airports_by_cities[0].code);
            console.log(data.response.airports_by_cities[0].name);
        });

        // AJAX CALL FOR LOW FARE 
        ajax({
            url: 'http://api.sandbox.amadeus.com/v1.2/flights/low-fare-search',
            dataType: 'json',
            method: 'GET',
            data: {  
                origin: 'YYZ', // to be changed
                destination: 'BOS', // to be changed 
                departure_date: '2017-04-02', // to be changed
                number_of_results: '3', 
                currency: 'CAD',
                apikey: 'J2j1J7uww5Hd7wFAdkOgeMw8Ay3e1VKD'
            }
        }).then((data)=>{
            console.log("hello");
            console.log(data);
            console.log(data.results[0].fare.total_price);
            console.log(data.results[0].itineraries[0].outbound.flights[0].flight_number);
            console.log(data.results[0].itineraries[0].outbound.flights[0].marketing_airline);
        });
    }
}
ReactDOM.render(<App />, document.getElementById('app'));