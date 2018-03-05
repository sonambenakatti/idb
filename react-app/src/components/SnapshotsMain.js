import React, { Component } from 'react';

class SnapshotsMain extends Component {

    constructor() {
      super();
      this.state = {
        photos: []
      };
    };

    componentDidMount() {
      fetch('/api/v1.0/snapshots').then(results =>{
        console.log(results)
        return results.json();
      }).then(data=>{
          console.log(data)
          console.log(data.snapshots)
          let snapshots = data.snapshots.map((snapshot) =>{
            return(
              <div key={snapshot.name} className="col">
                <li>
                  <a href="/snapshots/photoId">
                    <img src={snapshot.imageUrl} style={{width: 300, height: 300}} alt="Photo1" />
                    <span className="picText"><span> name <br /><br />location<br />Price:<br />Rating:</span></span>
                  </a>
                </li>
              </div>
            )
          })
          this.setState({photos: snapshots});
          console.log("state", this.state.photos);
        })
    }

    render() {
      console.log(this.state.photos);
      return (
        <div className = "Snapshots">
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
                  {this.state.photos}
                </ul>
              </div>
            </div>
          </section>
        </div>
      );
  }
}

export default SnapshotsMain;
