import React from 'react';
const FontAwesome = require('react-fontawesome');

export default class Header extends React.Component{
	render() {
		return (
			<header>
				<div className='headerStyle'>
					<div className="mainHeader">
						<h1>PassaHero</h1>
						<p>Budget your journey</p>
					</div>
				</div>
			</header>
		)
	}
}