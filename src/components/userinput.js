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

	render() {
		return (
			<section className='mainWrapper inputContainer'>
				<form className="initialForm" onSubmit={this.props.formSubmited}>
					<div className='inputPlaces'>
						<div className="inputOrigin">
							<h3>From</h3>
							<Autocomplete className="originUser"
							    onPlaceSelected={this.props.originSelected}
							    types={['(cities)']} placeholder="Location"/>
						</div>
						<div className='inputDestination'>
							<h3>To</h3>
							<Autocomplete className="destinationUser" onPlaceSelected = {this.props.destinationSelected} types={['(cities)']} placeholder="Destination"/>
						</div>

						<div className='inputBudget'>
							<h3>Budget</h3>
							<input type= "text" placeholder="CAD" onChange={this.props.handleChange} value={this.props.budgetAmount} className="budgetInfo"/>
						</div>
					</div>
				</form>
				<button className="findFlights" onClick={this.props.findFlights}>Calculate</button>
			</section>
		)
	}
}