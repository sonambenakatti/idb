import React, { Component } from 'react';
import {Router, Route, Link, RouteHandler, Redirect} from 'react-router';

class CoffeeShops extends Component {

constructor (props) {
  super(props);
  this.state = {
    coffeeshops: [],
    navigate: false,
    selectedShop: [],
    navigateTo: "",
    item: "",
    currentPage: 1,
    shopsPerPage: 9,
    totalPages: 1,
    cities_list: []
  };
};

componentDidMount(props) {
  console.log(document.domain)
  fetch('/getcoffeeshops').then(results =>{
    console.log(results)
    return results.json();
  }).then(data=>{
    console.log(data)
    let shops = data.map((shop) =>{
      return(
        <div id="shop_instance" key={shop.shop_name} onClick={() =>{this.setState({navigate: true, navigateTo: "/shop", selectedShop: shop})}}>
          <li className="col">
              <img src={shop.shop_picture} style={{width: 300, height: 300}} alt="Photo1"
              />
              <span className="picText">
              <span><b>{shop.shop_name}</b><br /><br />{shop.shop_address}<br />{shop.shop_price}<br />{shop.shop_rating + "/5"}</span></span>
          </li>
        </div>
      )
    })
    this.setState({coffeeshops: shops});
    this.getCities();
  })
}

getCities() {
  fetch('/getcities').then(results =>{
    console.log(results)
    return results.json();
  }).then(data=>{
    console.log(data)
    let cities = data.map((city) =>{
      return(
        <li><a href="#">{city.city_name}</a></li>
      )
    })
    this.setState({cities_list: cities});
  })
}

// invoked when user clicks a page number on the bottom.
handleClick(pageNumber, event) {
  console.log(event.target.id)
  console.log(pageNumber)
    if(pageNumber <= 1) {
      document.getElementById("prev").style.visibility="hidden";
    } else {
      document.getElementById("prev").style.visibility="visible";
    }

    if(pageNumber >= Math.ceil(this.state.coffeeshops.length / this.state.shopsPerPage)) {
      document.getElementById("next").style.visibility="hidden";
    } else {
      document.getElementById("next").style.visibility="visible";
    }
    console.log("set state")
    this.setState({
      currentPage: pageNumber
    });
  }

render() {

  const { coffeeshops, currentPage, shopsPerPage } = this.state;

  // Logic for displaying todos
  const indexOfLastShop = currentPage * shopsPerPage;
  const indexOfFirstShop = indexOfLastShop - shopsPerPage;
  const currentShops = coffeeshops.slice(indexOfFirstShop, indexOfLastShop);
  //console.log("CURRENT SHOPS" + currentShops +" : "+ coffeeshops)
  // Logic for displaying page numbers
  const pageNumbers = [];
  const nextPageNumbers = currentPage + 7 <= Math.ceil(coffeeshops.length / shopsPerPage)? currentPage + 7 : Math.ceil(coffeeshops.length / shopsPerPage)
  const prevPageNumber = currentPage - 2 >= 1 ? currentPage - 2: 1
  for (let i = prevPageNumber; i <= nextPageNumbers; i++) {
    pageNumbers.push(i);
  }

    if (this.state.navigate) {
      console.log("REDIRCT" + this.state.selectedShop.shop_name)
      return <Redirect to={{pathname: this.state.navigateTo, state: {shop: this.state.selectedShop}}} push={true} />;
    }

    const renderShops = currentShops.map((coffeeshops, index) => {
      return <li key={index}>{coffeeshops}</li>;
    });

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li
          key={number}
          id={number}
          onClick={this.handleClick.bind(this, number)}
        >
          {number}
        </li>
      );
    });

    return (
      <div>
        {/*location dropdown*/}
        <div className="filters-and-grid">
        <div className="filter-container">
          <div className="dropdown">
            <button id="city-btn" className="btn btn-primary dropdown-toggle" type="button"
            data-toggle="dropdown">
            Choose a City to Explore
              <span className="caret" /></button>
            <ul className="dropdown-menu"  x-placement="bottom-start">
              {this.state.cities_list}
            </ul>
          </div>
        </div>
        <section className="page-section">
          <div className="container">
            <div className="row">
              <ul className="img-list">
                <div className="row">
                  {renderShops}
                </div>
              </ul>
            </div>
          </div>
        </section>
        </div>
        <div className="col-md-12 text-center">
        <ul className="page-list">
          <li
            id="prev"
            style = {{visibility: "hidden"}}
            onClick={this.handleClick.bind(this, this.state.currentPage - 1)}> &lt;prev
          </li>
            {renderPageNumbers}
          <li
            id="next"
            onClick={this.handleClick.bind(this, this.state.currentPage + 1)}> next&gt;
          </li>
        </ul>
        </div>

      </div>
    );
  }
}

export default CoffeeShops;
