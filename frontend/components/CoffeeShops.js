import React, { Component } from 'react';
import {Router, Route, Link, RouteHandler, Redirect} from 'react-router';
import {Select} from 'react-select';
import 'react-select/dist/react-select.css';

class CoffeeShops extends Component {

constructor (props) {
  console.log(props);
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
    cities_list: [],
    selectedCity: {
      value: undefined,
      label: undefined
    },
    selectedPrice: {
      value: undefined,
      label: undefined
    },
    selectedRating: {
      value: undefined,
      label: undefined
    },
    selectedSort: {
      value: undefined,
      label: undefined,
    },
    sort_by: undefined,
    sort_attr: undefined
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
    this.fetchData(data);
    this.getCities();
  })
}

fetchData(data) {
  let shops = data.map((shop) =>{
    return(
      <div id="shop_instance" key={shop.shop_name} onClick={() =>{this.setState({navigate: true, navigateTo: "/shop", selectedShop: shop})}}>
        <li className="col">
            <img src={shop.shop_picture} style={{width: 300, height: 300}} alt={shop.shop_name}/>
            <span className="picText">
            <span><b>{shop.shop_name}</b><br /><br />{shop.shop_address}<br />{shop.shop_price}<br />{shop.shop_rating + "/5"}</span></span>
        </li>
      </div>
    )
  })
  this.setState({coffeeshops: shops});
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

handleCityChange(selectedCity) {
  if (selectedCity == null) {
    this.state.selectedCity = {
      value: undefined,
      label: undefined
    };
  } else if (selectedCity) {
    this.state.selectedCity = selectedCity;
    this.setState({selectedCity: selectedCity});
  }
  this.update();
}

handleSortChange(selectedSort) {
  if (selectedSort == null) {
    this.state.selectedSort = {
      value: undefined,
      label: undefined
    };
    this.state.sort_attr = undefined
    this.state.sort_by = undefined;
    this.setState({selectedSortBy: undefined});
  } else if (selectedSort){
    var sortArray = selectedSort.value.split("/");
    var sort = sortArray[0];
    var sortby = sortArray[1];
    this.state.sort_attr = sort;
    this.state.sort_by = sortby;
    this.setState({sort_attr: sort});
    this.setState({sort_by: sortby});
    this.setState({ selectedSort });
  }
  this.update();
}

handlePriceChange(selectedPrice) {
  if (selectedPrice == null) {
    this.state.selectedPrice = {
      value: undefined,
      label: undefined
    };
  } else if (selectedPrice) {
    this.state.selectedPrice = selectedPrice;
    this.setState({selectedPrice: selectedPrice});
  }
  this.update();
}

handleRatingChange (selectedRating) {

  if (selectedRating == null) {
    this.state.selectedRating = {
      value: undefined,
      label: undefined
    };
  } else if (selectedRating) {
    this.state.selectedRating = selectedRating;
    this.setState({selectedRating: selectedRating});
  }
  this.update();

}

update () {
  var cityfilter = this.state.selectedCity.value;
  var sort = this.state.sort_attr;
  var sortby = this.state.sort_by;
  var ratfilter = this.state.selectedRating.value;
  var pricefilter = this.state.selectedPrice.value;

  fetch('/coffeeshops_filter_sort/?sort=shop_' + sort + '&sortby=' + sortby +'&cityfilter=' + cityfilter + '&ratfilter=' + ratfilter
    + '&pricefilter=' + pricefilter).then(results => {
    console.log(results)
    return results.json();
  }).then(data => {
    console.log(data.length)
    this.fetchData(data);
    console.log(data.length)
    if(data.length == 0) {
        console.log("No results!");
        shops = [<div></div>, this.returnNoResults()];
    }
  })
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
          className='page-item'
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
    const sortValue = selectedSort && selectedSort.value;

    console.log(this.state.selectedCity);

    return (
      <div>
        <div className="filters-and-grid">
        <div className="filter-container-shops">
        <div className="filter">
          <h6>Choose a City to Explore</h6>
          <Select
              id="cityfilter"
              name="form-field-name"
              value={cityValue}
              onChange={this.handleCityChange.bind(this)}
              options={this.state.cities_list}
          />
        </div>
        <div className="filter">
          <h6>Filter by Price Range</h6>
          <Select
              id="pricefilter"
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
              id="ratingfilter"
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
        <div>
          <h6>Sort By</h6>
          <Select
              id="sort"
              name="form-field-name"
              value={sortValue}
              onChange={this.handleSortChange.bind(this)}
              options={[
                {value: 'name/asc', label: 'Name: A - Z'},
                {value: 'name/desc', label: 'Name: Z - A'},
                {value: 'price/asc', label: 'Price: Low - High'},
                {value: 'price/desc', label: 'Price: High - Low'},
                {value: 'rating/asc', label: 'Rating: Low - High'},
                {value: 'rating/desc', label: 'Rating: High - Low'},
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
            id="<<"
            style={this.state.currentPage <= 1 ? {visibility:'hidden'} : {}}
            onClick={this.handleClick.bind(this, 1, concat_shops)}> &lt;&lt;
          </li>
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
          <li
            id=">>"
            style={this.state.currentPage  >= Math.ceil(concat_shops.length / this.state.shopsPerPage) ? {visibility:'hidden'} : {}}
            onClick={this.handleClick.bind(this, Math.ceil(concat_shops.length / this.state.shopsPerPage), concat_shops)}> &gt;&gt;
          </li>
        </ul>
        </div>
      </div>
    </div>
    );
  }
}

export default CoffeeShops;
