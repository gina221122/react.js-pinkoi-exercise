import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './Home.css';

import PropTypes from 'prop-types';

class Home extends Component {

	renderProduct(item) {
		return (
			<div className="col-lg-2 col-md-6 mb-4" key={item.id}>
				<div className="card h-100">
					<Link to={{
						pathname: `/product/${item.id}`,
						state: { item }
					}}><img className="card-img-top" src={item.picture} alt="" /></Link>
					<div className="card-body">
						<h4 className="card-title">
							<Link to={{
								pathname: `/product/${item.id}`,
								state: { item }
							}}>{item.name}</Link>
						</h4>
						<h5>${item.price}</h5>
						<p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur!</p>
					</div>
				</div>
			</div>
		);
	}

	render() {
		const { products } = this.props
		return (
			<div>

				<div id="Home">

					<div className="row">

						<div className="col-lg-12">

							<div id="carouselExampleIndicators" className="carousel slide my-4" data-ride="carousel">
								<ol className="carousel-indicators">
									<li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
									<li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
									<li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
								</ol>
								<div className="carousel-inner" role="listbox">
									<div className="carousel-item active">
										<img className="d-block img-fluid" src="http://placehold.it/2048x350" alt="First slide" />
									</div>
									<div className="carousel-item">
										<img className="d-block img-fluid" src="http://placehold.it/2048x350" alt="Second slide" />
									</div>
									<div className="carousel-item">
										<img className="d-block img-fluid" src="http://placehold.it/2048x350" alt="Third slide" />
									</div>
								</div>
								<a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
									<span className="carousel-control-prev-icon" aria-hidden="true"></span>
									<span className="sr-only">Previous</span>
								</a>
								<a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
									<span className="carousel-control-next-icon" aria-hidden="true"></span>
									<span className="sr-only">Next</span>
								</a>
							</div>

							<div className="row">
								{products !== null && products.map((item) => this.renderProduct(item))}
							</div>

						</div>

					</div>

				</div>
			</div>
		);
	}
}

Home.defaultProps = {
	products: []
}

Home.propTypes = {
	products: PropTypes.array,
}

export default Home;
