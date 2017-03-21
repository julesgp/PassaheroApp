import React from 'react';
import Autocomplete from 'react-google-autocomplete';

export default class InputField extends React.Component{
	constructor(){
		super();
		this.state ={
			visibility: true,
			visibilityClass: ""
		}
	}
	formSubmited(e){
	    e.preventDefault();
	    console.log("I have been submitted");
	    // if (e.keyCode === 13) {
	    //     e.preventDefault(); // Let's stop this event.
	    //     e.stopPropagation();
	    // }
	    // console.log("I have been submitted");
	    // // console.log("I have been submitted!");
	    // // if(_underScore.isEmpty(this.state.destinationPlace) == true){
	    // //     console.log('destination is empty');
	    // // }
	    // // if(_underScore.isEmpty(this.state.originPlace) == true){
	    // //     console.log('origin is empty');
	    // // }
	}

	render() {
		return (
			<section className='mainWrapper inputContainer'>
				<form className="initialForm" onSubmit={this.formSubmited}>

					<div className='inputPlaces'>
						<div className="inputOrigin">
							<p>FROM</p>
							<Autocomplete className="originUser"
							    style={{width: '100%'}} onPlaceSelected={this.props.originSelected}
							    types={['(cities)']} onEnterKeyDown={this.formSubmited}/>
						</div>
						<div className='inputDestination'>
							<p>TO</p>
							<Autocomplete className="originUser"
							    style={{width: '100%'}} onPlaceSelected = {this.props.destinationSelected} types={['(cities)']} onEnterKeyDown={this.formSubmited}/>
						</div>
					</div>

					<div className='inputBudget'>
						<p>BUDGET</p>
						<input type= "text" placeholder="$$$" onChange={this.props.handleChange} value={this.props.budgetAmount}/>
						<button className="findFlights">Find it</button>
					</div>
				</form>
			</section>
		)
	}
}