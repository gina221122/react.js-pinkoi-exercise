import _ from 'lodash';
import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import SelectInput from "../components/input/SelectInput";

class Product extends Component {

    state = {
        format_num: null,
        format: 0,
        num: 1,
    }

    handleFormat = (e) => {
        const p = this.props.location.state.item;
        const format = e.target.value - 1;
        this.setState({
            format,
            format_num: p.format[format].num
        });
    }

    handleNumber = (e) => {
        const num = parseInt(e.target.value) + 1;
        this.setState({ num });
    }

    onShopCart = () => {
        const p = this.props.location.state.item;
        const { format, num } = this.state;
        let cart = [];
        if (this.getJsonItem("cart")) {
            cart = this.getJsonItem("cart");
        }
        let content = {};
        content.no = cart.length;
        content.id = p.id;
        content.format = format;
        content.num = num;
        cart.push(content);
        this.setJsonItem("cart", cart);
    }

    getJsonItem = (key) => {
        let storage = window.localStorage;
        return JSON.parse(storage.getItem(key));
    }

    setJsonItem = (key, val) => {
        let storage = window.localStorage;
        storage.setItem(key, JSON.stringify(val));
    }


    render() {
        if (!this.props.location.state) return <Redirect to="/" />
        const p = this.props.location.state.item;
        const { format_num } = this.state;
        let format = [];
        format.push("請選擇商品規格");
        // 改用 forEach 會更好
        p.format.forEach((list) => {
            // 盡量不要在 map 做這類事情, 
            // map function 會要求回傳東西, eslint 會噴錯
            format.push(list.name);
        });

        return (

            <div className="">
                <div className="row">
                    <div className="col-lg-8">
                        <div className="card mt-4">
                            <img className="card-img-top img-fluid" src={p.picture} alt="" />
                            <div className="card-body">
                                <h3 className="card-title">{p.name}</h3>
                                <h4>${p.price}</h4>
                                <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente dicta fugit fugiat hic aliquam itaque facere, soluta. Totam id dolores, sint aperiam sequi pariatur praesentium animi perspiciatis molestias iure, ducimus!</p>
                                <span className="text-warning">&#9733; &#9733; &#9733; &#9733; &#9734;</span>
                                4.0 stars
							</div>
                        </div>
                        <div className="card card-outline-secondary my-4">
                            <div className="card-header">
                                Product Reviews
							</div>
                            <div className="card-body">
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis et enim aperiam inventore, similique necessitatibus neque non! Doloribus, modi sapiente laboriosam aperiam fugiat laborum. Sequi mollitia, necessitatibus quae sint natus.</p>
                                <small className="text-muted">Posted by Anonymous on 3/1/17</small>
                                <hr />
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis et enim aperiam inventore, similique necessitatibus neque non! Doloribus, modi sapiente laboriosam aperiam fugiat laborum. Sequi mollitia, necessitatibus quae sint natus.</p>
                                <small className="text-muted">Posted by Anonymous on 3/1/17</small>
                                <hr />
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis et enim aperiam inventore, similique necessitatibus neque non! Doloribus, modi sapiente laboriosam aperiam fugiat laborum. Sequi mollitia, necessitatibus quae sint natus.</p>
                                <small className="text-muted">Posted by Anonymous on 3/1/17</small>
                                <hr />
                                <Link to="/" className="btn btn-success">Leave a Review</Link>
                            </div>
                        </div>

                    </div>
                    <div className="col-lg-4">
                        <h1 className="my-4">{p.name}</h1>
                        <h1 className="my-3">${p.price}</h1>
                        <SelectInput data={format} handleChange={this.handleFormat} />
                        <h5>數量</h5>
                        <SelectInput data={Array.from(new Array(_.isNull(format_num) ? p.num : format_num), (val, index) => index + 1)} handleChange={this.handleNumber} />
                        { /** class 沒改到 clasName, 盡量不要讓 F12 噴 warning */}
                        <button type="button" className="btn btn-danger" onClick={this.onShopCart}>加到購物車</button>

                    </div>

                </div>

            </div>
        );
    }
}

export default Product;
