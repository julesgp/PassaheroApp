import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/header.js';
import UserInput from './components/userinput.js';
import FlighInfo from './components/flightinfo.js';
import {ajax,when} from 'jquery';
const _under = require('underscore');
const FontAwesome = require('react-fontawesome');

// Helper Functions
const getCurrentDate = () => {
    var todayFlight = new Date();
    let dd = todayFlight.getDate()+1;
    let mm = todayFlight.getMonth()+1;
    let yyyy = todayFlight.getFullYear();
    if(dd<10) {
        dd='0'+dd
    }
    if(dd === 32){
        dd = '01';
    }
    if(mm<10) {
        mm='0'+mm
    }
    todayFlight =  `${yyyy}-${mm}-${dd}`;
    return todayFlight;
}

// APP starts here...
class App extends React.Component {
    constructor() {
        super();
        this.state ={
            budget: "",
            flight: [],
            originPlace: {},
            destinationPlace:{},
            originCityCode: "",
            destinationCityCode: "",
            showForm: true,
            animationDisplay:false,
            headerDisplay: true,
            date: getCurrentDate()
        }

        this.handleOriginSelected = this.handleOriginSelected.bind(this);
        this.handleDestinationSelected = this.handleDestinationSelected.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.preventSubmition = this.preventSubmition.bind(this);
        this.submisionCompleted = this.submisionCompleted.bind(this);
        this.getCityCode = this.getCityCode.bind(this);
        this.getFlightInfo = this.getFlightInfo.bind(this);
        this.checkErrors = this.checkErrors.bind(this);
    }

    handleChange(e){
        this.setState({
            budget: e.target.value
        });
    }

    preventSubmition(e){
        e.preventDefault();
    }

    formSubmited(e){
        e.preventDefault();
    }

    // Inputs Autocomplete Functions

    handleOriginSelected(place) {
        var picture = place.photos[0];
        const pictureWidth = picture.width;
        const pictureHeight = picture.height;
        const pictureUrl = picture.getUrl({'maxWidth': 300, 'maxHeight': 300});
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

    // Ajax Call Functions
    getCityCode(name, category){
        const iataKey = 'f418faed-5b39-458e-975c-0c6e5747e88e';
        return ajax({
            url: 'http://proxy.hackeryou.com',
            dataType: 'json',
            method: 'GET',
            data: {
                reqUrl: 'https://iatacodes.org/api/v6/autocomplete',
                params: {   
                    query: name, 
                    api_key: iataKey,
                }
            }
        })
    }

    getFlightInfo(origin, dest, date){
        const amadeusKey = 'J2j1J7uww5Hd7wFAdkOgeMw8Ay3e1VKD';
        ajax({
            url: 'http://api.sandbox.amadeus.com/v1.2/flights/low-fare-search',
            dataType: 'json',
            method: 'GET',
            data: {  
                origin: origin, 
                destination: dest, 
                departure_date: date,
                number_of_results: '3', 
                currency: 'CAD',
                apikey: amadeusKey
            }
        }).then((data)=>{
            var flightInfoList = [];
            const farePrice = data.results[0].fare.total_price;
            const airline = data.results[0].itineraries[0].outbound.flights[0].marketing_airline;
            const flightNum = data.results[0].itineraries[0].outbound.flights[0].flight_number;
            flightInfoList.push(farePrice);
            flightInfoList.push(airline);
            flightInfoList.push(flightNum);
            var newBudget = this.state.budget - farePrice;
            var finalNewBudget = newBudget.toFixed(2);
            this.setState({
                animationDisplay: false,
                headerDisplay: false,
                flight: flightInfoList,
                currentBudget: finalNewBudget
            });
            this.resultContainer.classList.remove("invisible");
            this.resultContainer.classList.add("visible");
            this.resultContainer.classList.add("resultContainer");
        });
    }

    checkErrors(){
        if(_under.isEmpty(this.state.originPlace) === true || _under.isEmpty(this.state.destinationPlace) === true || _under.isEmpty(this.state.budget) === true){
            return true;
        }else{
            return false;
        }
    }
    // Submitted Form
    submisionCompleted(e){
        e.preventDefault();
        console.log('button has been pressed');
        if(this.checkErrors() === true){
            console.log('there are ERRORS');
        }
        if(this.checkErrors() === false){
            console.log('there are NO erros');
            this.setState({
                showForm: false,
                animationDisplay: true,
            });
            const cityNameOrigin = this.state.originPlace.name;
            const cityNameDestination = this.state.destinationPlace.name;
            const promise1 = this.getCityCode(cityNameOrigin, 'origin');
            const promise2 = this.getCityCode(cityNameDestination, 'destination');
            when(promise1, promise2)
                .then((origin, destination) => {
                    const originCity = origin[0].response.airports_by_cities[0].code;
                    const destCity = destination[0].response.airports_by_cities[0].code;
                    this.setState({
                        originCityCode: originCity,
                        destinationCityCode: destCity
                    });
                    this.getFlightInfo(originCity, destCity, this.state.date);
                });
        }
    }

    reloadPage(){
        location.reload();
    }
    render() {
        let displayForm = "";
        if(this.state.showForm === true){
            displayForm = (
                <UserInput originSelected={this.handleOriginSelected} handleChange={this.handleChange} destinationSelected = {this.handleDestinationSelected} budgetAmount={this.state.budget}
                formSubmition={this.formSubmited} prevention={this.preventSubmition}
                findFlights={this.submisionCompleted}/>
            )
        }

        let animationDisplay = "";
        if(this.state.animationDisplay === true){
            animationDisplay = (
                <div className="loadingContainer">
                     <FontAwesome name="circle" className="loadingOne"/>
                     <FontAwesome name="circle" className="loadingTwo"/>
                     <FontAwesome name="circle" className="loadingThree"/>
                </div>   
            )
        }

        let headerDisplay = "";
        if(this.state.headerDisplay === true){
            headerDisplay = (
                <Header />   
            )
        }
        return (
            <div className="mainDiv">
                {headerDisplay}
                {displayForm}
                {animationDisplay}
               <section className="invisible" ref={ ref => this.resultContainer = ref}>
                    <div className="cityPicture">
                        <img src={this.state.destinationPlace.image} alt={this.state.destinationPlace.name}/>
                    </div>

                    <div className="infoFlight">
                        <div className="flightWrapper">
                            
                            <div className="infoTitle">
                                <div className="infoAirports">
                                    <h2 className="medBlueCol">{this.state.originCityCode} - {this.state.destinationCityCode}</h2>
                                    <h4> {this.state.originPlace.name} - {this.state.destinationPlace.name}</h4>
                                </div>

                                <div className="infoGeneral">
                                    <p> Flight: <span className="medBlueCol"> {this.state.flight[1]} {this.state.flight[2]} </span></p>
                                    <p> Date: <span className="medBlueCol"> {this.state.date} </span></p>
                                </div>

                                <div className="infoPrice">
                                    <h2>CAD <span className="medBlueCol">{this.state.flight[0]}</span></h2>
                                </div>
                            </div>

                            <div className="moreBudget">
                                <div className="infoBudget">
                                    <p>Money left: </p>
                                    <p className="budgetNum">{this.state.currentBudget}</p>
                                </div>

                                <div className="moreFlights">
                                    <button className="buttonBudget" onClick={this.reloadPage}>Budget More ></button>
                                </div>
                            </div>
                        </div>
                    </div>
               </section>
            </div>
        )
    }
}
ReactDOM.render(<App />, document.getElementById('app'));