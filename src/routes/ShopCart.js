import _ from 'lodash';
import React, { Component } from 'react';
import SelectInput from "../components/input/SelectInput";
import './ShopCart.css';
import StoreService from '../services/Store';

class ShopCart extends Component {
	constructor() {
		super();
		this.state = {
			stores: null,
			transport: [],
			price: 0,
			transport_price: 0,
			stores_checkout: [],
		}
		this.getStores();
	}

	async getStores() {
		const stores = await StoreService.get();
		this.setState({ stores });
	}

	getJsonItem = (key) => {
		let storage = window.localStorage;
		if (JSON.parse(storage.getItem(key))) {
			return JSON.parse(storage.getItem(key));
		} else {
			return [];
		}
	}

	setJsonItem = (key, val) => {
		let storage = window.localStorage;
		storage.setItem(key, JSON.stringify(val));
	}

	clearJsonItem = (key, clearNo) => {
		const Items = this.getJsonItem(key);
		// 盡量寫絕對等於, eslint 會嗆你XD
		const clearNoItem = _.filter(Items, (f) => f.no !== clearNo);
		this.setJsonItem(key, clearNoItem);
	}

	batchClearJsonItem = (key, storeID) => {
		const { products } = this.props;
		const cart = this.getJsonItem("cart");
		_.map(cart, (p) => {
			const product = _.filter(products, { 'id': p.id, 'store': storeID }); //照理來說這段應由api搜尋
			if (!_.isEmpty(product)) return this.clearJsonItem(key, p.no);
		})
	}

	filterStoreName = (ID) => {
		const { stores } = this.state;
		return _.find(stores, s => s.id === ID);
	}


	handleTransport = (e, id) => {
		const index = parseInt(e.target.value);
		const { stores, transport } = this.state;
		const { stores_checkout } = this.state;
		let content = [];
		content.id = id;
		content.price = _.find(stores, s => s.id === id).transport[index - 1].price;
		let TF = true;
		_.map(transport, (t) => {
			if (t.id === content.id) {
				t.price = content.price;
				TF = false;
			}
		})
		if (TF) {
			transport.push(content);
		}
		this.setState({ transport });
		this.calculatedTransport(stores_checkout);
	}

	handleNumber = (e, no) => {
		const num = parseInt(e.target.value) + 1;
		const { stores_checkout } = this.state;
		let cart = this.getJsonItem("cart");

		cart = _.map(cart, (c) => {
			// 盡量寫絕對等於, eslint 會嗆你XD
			if (c.no === no) {
				c.num = num
			}
			return c;
		})
		this.setJsonItem("cart", cart);
		this.calculatedAmount(stores_checkout);
	}


	storeCheckout = (e, storeID) => {
		const { stores_checkout } = this.state;
		const sc = [
			// 盡量寫絕對等於, eslint 會嗆你XD
			..._.filter(stores_checkout, (s) => s.id !== storeID),
			{ id: storeID, TF: e }
		];
		this.setState({
			stores_checkout: sc
		});
		this.calculatedAmount(sc);
	}

	calculatedAmount = (stores_checkout) => {
		const { products } = this.props;
		const cart = this.getJsonItem("cart");
		let price = 0;
		_.map(cart, (c) => {
			const product = _.find(products, { 'id': c.id });
			const stores_checkout_find = !_.isEmpty(product) && _.find(stores_checkout, (s) => s.id === product.store_id);
			if (!_.isEmpty(stores_checkout_find) && stores_checkout_find.TF) {
				price += product.price * c.num;
			}
		})
		this.setState({ price });
		this.calculatedTransport(stores_checkout);
	}

	calculatedTransport = (stores_checkout) => {
		const { transport } = this.state;
		let transport_price = 0;
		_.map(transport, (t) => {
			const stores_checkout_find = _.find(stores_checkout, (s) => s.id === t['id']);
			if (!_.isEmpty(stores_checkout_find) && stores_checkout_find.TF) {
				transport_price += t.price;
			}
		})
		this.setState({ transport_price });
	}

	renderStore = (storeID, key) => {
		const { products } = this.props;
		const cart = this.getJsonItem("cart");
		const storeData = this.filterStoreName(storeID);

		let transport = [];
		transport.push("選擇運送方式");
		!_.isEmpty(storeData) && _.map(storeData.transport, (list) => {
			transport.push(list.name + " NT$ " + list.price);
		});

		return (
			<div className="card mt-4" key={`store-${key}`}>
				<div className="card-header">
					<div className="row">
						<div className="col-md-1 text-right">
							<input type="checkbox" style={{ zoom: "180%" }} onChange={(e) => {
								this.storeCheckout(e.target.checked, storeID);
							}} />
						</div>
						<div className="col-md-2 text-left">
							<h4>{!_.isEmpty(storeData) && storeData.store}</h4>
						</div>
						<div className="col-md-9 text-right">
							<button onClick={() => {
								this.batchClearJsonItem("cart", storeID);
								window.location.reload();
							}}>X</button>
						</div>
					</div>
				</div>
				<div className="card-body">
					{
						_.map(cart, (p, key) => {
							const product = _.filter(products, { 'id': p.id, 'store_id': storeID }); //照理來說這段應由api搜尋
							if (!_.isEmpty(product)) return this.renderProduct(product[0], p.format, p.num, p.no);
						})
					}
				</div>
				<div className="card-footer">
					<div className="text-left"><h5>選擇運送方式</h5></div>
					{!_.isEmpty(storeData) &&
						<SelectInput data={transport} handleChange={(e) => this.handleTransport(e, storeData.id)} />
					}
				</div>
			</div>
		);
	}

	renderProduct = (product, format, num, no) => {
		return (
			<div className="row" key={`product-${no}`}>
				<div className="col-lg-2">
					<img className="card-img-top img-fluid" src={product.picture} style={{ width: '100px', padding: '10px' }} alt="" />
				</div>
				<div className="col-lg-5 text-left">
					<h3 className="card-title">{product.name}{product.format[format].name}</h3>
				</div>
				<div className="col-lg-2 text-left">
					<SelectInput data={Array.from(new Array(product.format[format].num), (val, index) => index + 1)} handleChange={(e) => this.handleNumber(e, no)} defaultIndex={num - 1} />
				</div>
				<div className="col-lg-2">
					<h2>${product.price}</h2>
				</div>
				<div className="col-lg-1 text-right">
					<button onClick={() => {
						this.clearJsonItem("cart", no);
						window.location.reload();
					}}>X</button>
				</div>
			</div>
		);
	}

	renderProductList = () => {
		const { products } = this.props;
		const cart = this.getJsonItem("cart");
		//_.uniq(array)去除重複
		let cartStore = null;
		if (!_.isNull(products)) {//照理來說這段應由api搜尋
			cartStore = _.uniq(_.map(cart, (p) => { return _.filter(products, { 'id': p.id })[0].store_id }));
		}
		return (
			<div>
				{
					!_.isNull(products) &&
					cartStore.map((storeID, key) => {
						return this.renderStore(storeID, key);
					})
				}
			</div>
		);
	}

	renderShoppingCart = () => {
		const { price, transport_price } = this.state;
		return (
			<div className="card mt-4">
				<img className="card-img-top img-fluid" alt="" />
				<div className="card-header">
					<h3 className="card-title text-left">訂單摘要</h3>
				</div>
				<div className="card-body">
					<div className="row">
						<div className="col-lg-6 text-left">
							<h4>商品總計</h4>
						</div>
						<div className="col-lg-6 text-right">
							<h4>NT${price}</h4>
						</div>
					</div>
					<div className="row">
						<div className="col-lg-6 text-left">
							<h4>運費總計</h4>
						</div>
						<div className="col-lg-6 text-right">
							<h4>NT${transport_price}</h4>
						</div>
					</div>
				</div>
				<div className="card-footer">
					<div className="row">
						<div className="col-lg-6 text-left">
							<h4>結帳總金額 :</h4>
						</div>
						<div className="col-lg-6 text-right">
							<h4>NT${price + transport_price}</h4>
						</div>
					</div>
				</div>
			</div>
		);
	}

	render() {
		return (
			<div id="Cart">
				<div className="row">
					<div className="col-lg-8">
						{this.renderProductList()}
					</div>
					<div className="col-lg-4">
						{this.renderShoppingCart()}
					</div>
				</div>
			</div>
		);
	}
}



export default ShopCart;
