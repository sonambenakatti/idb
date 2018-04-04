import React, { Component } from 'react';
import {Router, Route, Link, RouteHandler, Redirect} from 'react-router';
import {Select} from 'react-select';
import 'react-select/dist/react-select.css';

class CoffeeShops extends Component {

constructor (props) {
  console.log(props);
  super(props);
  this.state = {
    full_data: [],
    coffeeshops: [],
    navigate: false,
    selectedShop: [],
    navigateTo: "",
    item: "",
    currentPage: 1,
    shopsPerPage: 9,
    totalPages: 1,
    cities_list: [],
    selectedCity: '',
    selectedPrice: '',
    selectedRating: '',
    selectedSort: ''
  };
};

componentDidMount(props) {
  console.log(document.domain)
  fetch('/getcoffeeshops').then(results =>{
    console.log(results)
    return results.json();
  }).then(data=>{
    console.log("DATA")
    console.log(data)
    this.setState({full_data: data})
    let shops = data.map((shop) =>{
      return(
        <div id="shop_instance" key={shop.shop_name} onClick={() =>{this.setState({navigate: true, navigateTo: "/shop", selectedShop: shop})}}>
          <li className="col">
              <img src={shop.shop_picture} style={{width: 300, height: 300}} alt="Photo1"/>
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
        {value: city.city_id, label: city.city_name}
      )
    })
    this.setState({cities_list: cities});
  })
}

handleCityChange(selectedCity){
  console.log("INSIDE HANDLE CITY");
  this.setState({ selectedCity });
  //console.log(`Selected: ${selectedCity.label}`);
  if (selectedCity === null) {
    this.resetToAllData();
  } else if (selectedCity) {
    var value = selectedCity.value;
    console.log(value);
    let shops = this.state.full_data.map((shop) =>{
      if (shop.city_id === value) {
        return(
          <div id="shop_instance" key={shop.shop_name} onClick={() =>{this.setState({navigate: true, navigateTo: "/shop", selectedShop: shop})}}>
            <li className="col">
                <img src={shop.shop_picture} style={{width: 300, height: 300}} alt="Photo1"/>
                <span className="picText">
                <span><b>{shop.shop_name}</b><br /><br />{shop.shop_address}<br />{shop.shop_price}<br />{shop.shop_rating + "/5"}</span></span>
            </li>
          </div>
        )
      }
    })
    this.setState({coffeeshops: shops});
  }
  this.setState({currentPage: 1})
}

handleSortChange(selectedSort) {
  this.setState({ selectedSort });
  if(selectedSort === null) {
    this.resetToAllData();
  } else if (selectedSort) {
      var value = selectedSort.value;
      fetch('/coffeeshops/sort/' + value).then(results => {
        return results.json();
      }).then(data => {
          let shops = data.map((shop) => {
            return(
              <div id="shop_instance" key={shop.shop_name} onClick={() =>{this.setState({navigate: true, navigateTo: "/shop", selectedShop: shop})}}>
                <li className="col">
                    <img src={shop.shop_picture} style={{width: 300, height: 300}} alt="Photo1"/>
                    <span className="picText">
                    <span><b>{shop.shop_name}</b><br /><br />{shop.shop_address}<br />{shop.shop_price}<br />{shop.shop_rating + "/5"}</span></span>
                </li>
              </div>
            );
          })
        this.setState({coffeeshops: shops})
      })
    }
}

handlePriceChange(selectedPrice){
  this.setState({ selectedPrice });
  //console.log(`Selected: ${selectedPrice.label}`);

  if (selectedPrice == null) {
    this.resetToAllData();
  } else if (selectedPrice) {
    var value = selectedPrice.value;
    let shops = this.state.full_data.map((shop) =>{
      if (shop.shop_price === value) {
        return(
          <div id="shop_instance" key={shop.shop_name} onClick={() =>{this.setState({navigate: true, navigateTo: "/shop", selectedShop: shop})}}>
            <li className="col">
                <img src={shop.shop_picture} style={{width: 300, height: 300}} alt="Photo1"/>
                <span className="picText">
                <span><b>{shop.shop_name}</b><br /><br />{shop.shop_address}<br />{shop.shop_price}<br />{shop.shop_rating + "/5"}</span></span>
            </li>
          </div>
        )
      }
    })
    this.setState({coffeeshops: shops});
  }
  this.setState({currentPage: 1})
}

handleRatingChange(selectedRating){
  this.setState({ selectedRating });
  //console.log(`Selected: ${selectedRating.label}`);

  if (selectedRating == null) {
    this.resetToAllData();
  } else if (selectedRating) {
    var value = selectedRating.value;
    let shops = this.state.full_data.map((shop) =>{
      if (shop.shop_rating >= value) {
        return(
          <div id="shop_instance" key={shop.shop_name} onClick={() =>{this.setState({navigate: true, navigateTo: "/shop", selectedShop: shop})}}>
            <li className="col">
                <img src={shop.shop_picture} style={{width: 300, height: 300}} alt="Photo1"/>
                <span className="picText">
                <span><b>{shop.shop_name}</b><br /><br />{shop.shop_address}<br />{shop.shop_price}<br />{shop.shop_rating + "/5"}</span></span>
            </li>
          </div>
        )
      }
    })
    this.setState({coffeeshops: shops});
  }
  this.setState({currentPage: 1})
}

resetToAllData() {
  let shops = this.state.full_data.map((shop) =>{
      return(
        <div id="shop_instance" key={shop.shop_name} onClick={() =>{this.setState({navigate: true, navigateTo: "/shop", selectedShop: shop})}}>
          <li className="col">
              <img src={shop.shop_picture} style={{width: 300, height: 300}} alt="Photo1"/>
              <span className="picText">
              <span><b>{shop.shop_name}</b><br /><br />{shop.shop_address}<br />{shop.shop_price}<br />{shop.shop_rating + "/5"}</span></span>
          </li>
        </div>
      )
  })
  this.setState({coffeeshops: shops});
  this.setState({currentPage: 1})

}

// invoked when user clicks a page number on the bottom.
handleClick(pageNumber, arr, event) {
  console.log(event.target.id)
  console.log(pageNumber)
    if(pageNumber <= 1) {
      document.getElementById("prev").style.visibility="hidden";
    } else {
      document.getElementById("prev").style.visibility="visible";
    }
    if(pageNumber >= Math.ceil(arr.length / this.state.shopsPerPage)) {
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

  console.log("INSIDE RENDER")

  const { coffeeshops, currentPage, shopsPerPage } = this.state;
  console.log(coffeeshops)

  const concat_shops = [];
  const shops = this.state.coffeeshops.map((coffeeshops, index) => {
    if (coffeeshops) {
      concat_shops.push(coffeeshops)
    }
  });

  // Logic for displaying shops
  const indexOfLastShop = currentPage * shopsPerPage;
  const indexOfFirstShop = indexOfLastShop - shopsPerPage;
  const currentShops = concat_shops.slice(indexOfFirstShop, indexOfLastShop);

  // Logic for displaying page numbers
  const pageNumbers = [];
  const nextPageNumbers = currentPage + 7 <= Math.ceil(concat_shops.length / shopsPerPage)? currentPage + 7 : Math.ceil(concat_shops.length / shopsPerPage)
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
          style={this.state.currentPage === number ? {color:'orange'} : {}}
          onClick={this.handleClick.bind(this, number, concat_shops)}
        >
          {number}
        </li>
      );
    });

    const SelectPackage = require('react-select');
    const Select = SelectPackage.default;
    const {selectedCity} = this.state;
    const {selectedPrice} = this.state;
    const {selectedRating} = this.state;
    const {selectedSort} = this.state;

    const cityValue = selectedCity && selectedCity.value;
    const priceValue = selectedPrice && selectedPrice.value;
    const ratingValue = selectedRating && selectedRating.value;
    const sortValue = selectedSort && selectedSort.value

    return (
      <div>
        <div className="filters-and-grid">
        <div className="filter-container">
        <div className="filter">
          <h6>Choose a City to Explore</h6>
          <Select
              name="form-field-name"
              value={cityValue}
              onChange={this.handleCityChange.bind(this)}
              options={this.state.cities_list}
          />
        </div>
        <div className="filter">
          <h6>Filter by Price Range</h6>
          <Select
              name="form-field-name"
              value={priceValue}
              onChange={this.handlePriceChange.bind(this)}
              options={[
                {value: '$', label: '$'},
                {value: '$$', label: '$$'},
                {value: '$$$', label: '$$$'},
                {value: '$$$$', label: '$$$$'},
              ]}
          />
        </div>
        <div className="filter">
          <h6>Filter by Rating</h6>
          <Select
              name="form-field-name"
              value={ratingValue}
              onChange={this.handleRatingChange.bind(this)}
              options={[
                {value: '0', label: '0+'},
                {value: '1', label: '1+'},
                {value: '2', label: '2+'},
                {value: '3', label: '3+'},
                {value: '4', label: '4+'},
              ]}
          />
        </div>
        <div className="filter">
          <h6>Sort by price</h6>
          <Select
              name="form-field-name"
              value={sortValue}
              onChange={this.handleSortChange.bind(this)}
              options={[
                {value: 'priceasc', label: 'Low - High'},
                {value: 'pricedesc', label: 'High - Low'},
              ]}
          />
        </div>
        <div className="filter">
          <h6>Sort by rating</h6>
          <Select
              name="form-field-name"
              value={sortValue}
              onChange={this.handleSortChange.bind(this)}
              options={[
                {value: 'ratingasc', label: 'Low - High'},
                {value: 'ratingdesc', label: 'High - Low'},
              ]}
          />
        </div>
        <div className="filter">
          <h6>Sort alphabetically</h6>
          <Select
              name="form-field-name"
              value={sortValue}
              onChange={this.handleSortChange.bind(this)}
              options={[
                {value: 'atoz', label: 'A - Z'},
                {value: 'ztoa', label: 'Z - A'},
              ]}
          />
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
        <div className="col-md-12 text-center">
        <ul className="page-list">
          <li
            id="prev"
            style={this.state.currentPage <= 1 ? {visibility:'hidden'} : {}}
            onClick={this.handleClick.bind(this, this.state.currentPage - 1, concat_shops)}> &lt;prev
          </li>
            {renderPageNumbers}
          <li
            id="next"
            style={this.state.currentPage >= Math.ceil(concat_shops.length / this.state.shopsPerPage) ? {visibility:'hidden'} : {}}
            onClick={this.handleClick.bind(this, this.state.currentPage + 1, concat_shops)}> next&gt;
          </li>
        </ul>
        </div>
      </div>
    </div>
    );
  }
}

export default CoffeeShops;
