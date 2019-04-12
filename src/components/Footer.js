import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './Footer.css';
import logo from './logo.png';

class Footer extends Component {
	render() {
		return (
			<div>
				<footer>
					<div className="bg-light fd_1">
						<div className="fd_2">
							<div className="columns">
								<div className="column">
									<h5>購買</h5>
									<Link className="nav-link" to="">所有商品分類</Link>
									<Link className="nav-link" to="">品品學堂</Link>
									<Link className="nav-link" to="">找靈感</Link>
									<Link className="nav-link" to="">逛櫥窗</Link>
									<Link className="nav-link" to="">設計誌</Link>
									<Link className="nav-link" to="">Pinkoi 禮物卡</Link>
								</div>
								<div className="column">
									<h5>販售</h5>
									<Link className="nav-link" to="">我要開設計館</Link>
									<Link className="nav-link" to="">設計館問與答</Link>
								</div>
								<div className="column">
									<h5>幫助 / 政策</h5>
									<Link className="nav-link" to="">問與答</Link>
									<Link className="nav-link" to="">公告</Link>
									<Link className="nav-link" to="">服務條款</Link>
									<Link className="nav-link" to="">退貨政策</Link>
								</div>
								<div className="column">
									<h5>關於 Pinkoi</h5>
									<Link className="nav-link" to="">關於我們</Link>
									<Link className="nav-link" to="">媒體報導</Link>
									<Link className="nav-link" to="">工作機會</Link>
								</div>
								<div className="column">
									<h5>追蹤 Pinkoi</h5>
									<Link className="nav-link" to="">Instagram</Link>
									<Link className="nav-link" to="">Line</Link>
									<Link className="nav-link" to="">Facebook</Link>
									<Link className="nav-link" to="">Youtube</Link>
								</div>
							</div>
						</div>
						<div className="fd_3"  >
							<div className="columns" >
								<div className="column" style={{ width: "60%", textAlign: "left" }}>
									<img src={logo} className="logo" alt="logo" />用好設計實現美感生活
								</div>
								<div className="column" style={{ width: "30%", textAlign: "left" }}>
									<h6>© 2019 Pinkoi. All Rights Reserved. </h6>
								</div>
								<div className="column" style={{ width: "10%", textAlign: "left" }}>
									<Link className="nav-link" to="">繁體中文台灣</Link>
								</div>
							</div>
						</div>
					</div>
				</footer>
			</div>
		);
	}
}

export default Footer;
