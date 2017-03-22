import React from 'react';
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete';

export default class SimpleForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      address: 'San Francisco, CA' ,
    };
    this.onChange(address){
      this.setState({ address });
    } 
  }

  handleFormSubmit = (event) => {
  }

  render() {
    return (
      <form onSubmit={this.handleFormSubmit}>
        <PlacesAutocomplete value={this.state.address} onChange={this.onChange}/>
        <button type="submit">Submit</button>
      </form>
    )
  }
}