import React, { Component } from 'react';
import './SelectInput.css';

class SelectInput extends Component {
	state = {
		value: 0
	}

	render() {
		const { data, handleChange, defaultIndex } = this.props;

		return (
			<div>
				<select className="form-control" id="exampleFormControlSelect1" onChange={handleChange} defaultValue={defaultIndex} >
					{
						data.map((name, key) => {
							// map 產出來的元素記得給 key
							return <option key={`select-${key}`} value={key}>{name}</option>
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
