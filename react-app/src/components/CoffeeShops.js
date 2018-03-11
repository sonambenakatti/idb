import React, { Component } from 'react';

class CoffeeShops extends Component {

constructor () {
  super();
  this.state = {
    coffeeshops: [],
    navigate: false,
    selectedShop: [],
    navigateTo: "/shop",
    item: ""
  };
};

componentDidMount() {
  fetch('/api/v1.0/coffeeshops').then(results =>{
    console.log(results)
    return results.json();
  }).then(data=>{
    console.log(data)
    let shops = data.map((shop) =>{
      return(
        <div key={shop.shop_name} className="col">
          <li>
            <a href={"/shop/" + shop.shop_yelp_id}>
              <img src={shop.shop_picture} style={{width: 300, height: 300}} alt="Photo1"
              onClick={() => this.setState({navigate: true, navigateTo: '/shop/{shop.shop_yelp_id}', selectedShop: shop})}/>
              <span className="picText"><span>Name {shop.shop_name}<br /><br />Address: {shop.shop_address}<br />Price: {shop.shop_price}<br />Rating: {shop.shop_rating}</span></span>
            </a>
          </li>
        </div>
      )
    })
    this.setState({coffeeshops: shops});
    console.log("state", this.state.coffeeshops);
  })
}

render() {
    console.log(this.state.coffeeshops);
    if (this.state.navigate) {
        console.log(this.state.item);
        return <Redirect to={{pathname: this.state.navigateTo, state: {item: item}}} push={true} />;
    }

    if (this.state.navigate) {
      console.log(this.state.selectedShop);
      return <Redirect to={{pathname: this.state.navigateTo, state: {selectedShop: this.state.selectedShop}}} push={true} />;
    }

    return (
      <div className = "CoffeeShops">
        {/*location dropdown*/}
        <div className="container">
          <div className="dropdown">
            <button id="city-btn" className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" onclick="myFunction()">Choose City
              <span className="caret" /></button>
            <ul className="dropdown-menu">
              <input className="form-control" id="myInput" type="text" placeholder="Search.." />
              <li><a href="#">Austin, TX</a></li>
            </ul>
          </div>
        </div>
        <section className="page-section">
          <div className="container">
            <div className="row">
              <ul className="img-list">
                {this.state.coffeeshops}
              </ul>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default CoffeeShops;
