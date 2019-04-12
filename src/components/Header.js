import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './Header.css';
import logo from './logo.png';

class Header extends Component {
	render() {
		return (

			<div>
				<nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
					<Link className="navbar-brand" to="/"><img src={logo} className="home_logo" alt="logo" /></Link>
					<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarResponsive">
						<ul className="navbar-nav ml-auto">
							<li className="nav-item active">
								<Link className="nav-link" to="/">Home</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/product/">Product</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/cart/">購物車</Link>
							</li>
						</ul>
					</div>
				</nav>

				<nav className="navbar navbar-expand-lg navbar-light bg-light">
					<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarNavDropdown">
						<ul className="navbar-nav">
							<li className="nav-item">
								<Link className="nav-link" to="/">Home</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/">Home</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/">Home</Link>
							</li>
							<li className="nav-item dropdown">
								<Link className="nav-link" to="/">Home</Link>
								<div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
									<Link className="nav-link" to="/">Home</Link>
									<Link className="nav-link" to="/">Home</Link>
									<Link className="nav-link" to="/">Home</Link>
								</div>
							</li>
						</ul>
					</div>
				</nav>
			</div>
		);
	}
}

export default Header;
