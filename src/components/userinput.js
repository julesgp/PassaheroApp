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
				<form className="initialForm" onSubmit={this.props.forSubmition}>

					<div className='inputPlaces'>
						<div className="inputOrigin">
							<p>FROM</p>
							<Autocomplete className="originUser"
							    style={{width: '100%'}} onPlaceSelected={this.props.originSelected}
							    types={['(cities)']}/>
						</div>
						<div className='inputDestination'>
							<p>TO</p>
							<Autocomplete className="originUser"
							    style={{width: '100%'}} onPlaceSelected = {this.props.destinationSelected} types={['(cities)']}/>
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