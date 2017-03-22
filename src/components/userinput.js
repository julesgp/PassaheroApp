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
							<p>From</p>
							<Autocomplete className="originUser"
							    onPlaceSelected={this.props.originSelected}
							    types={['(cities)']} placeholder="Enter Location"/>
						</div>
						<div className='inputDestination'>
							<p>To</p>
							<Autocomplete className="destinationUser" onPlaceSelected = {this.props.destinationSelected} types={['(cities)']} placeholder="Enter Destination"/>
						</div>
					</div>

					<div className='inputBudget'>
						<p>Budget</p>
						<input type= "text" placeholder="CAD" onChange={this.props.handleChange} value={this.props.budgetAmount} className="budgetInfo"/>
					</div>
				</form>
				<button className="findFlights" onClick={this.props.findFlights}>Budget</button>
			</section>
		)
	}
}