/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import './App.css';

import { BrowserRouter as Router, Route } from "react-router-dom"

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './routes/Home';
import Product from './routes/Product';
import ShopCart from './routes/ShopCart';

import ProductService from './services/Product';

class App extends Component {
  constructor() {
    super();
    this.state = {
      products: null
    }
    this.getProducts();
  }

  async getProducts() {
    const products = await ProductService.get();
    this.setState({ products });
  }

  renderRoute(props, Component) {
    return <Component {...props} products={this.state.products} />;
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Route path="/" exact render={(props) => this.renderRoute(props, Home)} />
          <Route path="/product" render={(props) => this.renderRoute(props, Product)} />
          <Route path="/cart" render={(props) => this.renderRoute(props, ShopCart)} />
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
