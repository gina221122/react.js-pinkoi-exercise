import React, { Component } from 'react';
import './SelectInput.css';

class SelectInput extends Component {
	state = {
		value:0 
	}

	render() {
		const { data, handleChange, defaultIndex } = this.props;
		
		return (
			<div>
				<select className="form-control" id="exampleFormControlSelect1" onChange={handleChange} defaultValue={defaultIndex} >
					{
						data.map((name, key) => {
							return <option value={key}>{name}</option>
						})
					}
				</select>
			</div>
		);
	}
}


SelectInput.defaultProps = {
	data: [],
	defaultIndex: 0,
}
export default SelectInput;
