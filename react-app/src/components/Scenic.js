import React, { Component } from 'react';

class Scenic extends Component {

render() {
  return (
      <div>
 
        {/*location dropdown*/}
        <div className="container">
          <div className="dropdown">
            <button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Choose City
              <span className="caret" /></button>
            <ul className="dropdown-menu">
              <input className="form-control" id="myInput" type="text" placeholder="Search.." />
              <li><a href="#">Austin, TX</a></li>
              {/*       <li><a href="#">CSS</a></li>
        <li><a href="#">JavaScript</a></li>
        <li><a href="#">jQuery</a></li>
        <li><a href="#">Bootstrap</a></li>
        <li><a href="#">Angular</a></li> */}
            </ul>
          </div>
        </div>
        <section className="page-section">
          <div className="container">
            <div className="row">
              <ul className="img-list">
                <li className="col">
                  <a href="/scenic/{{placeID1}}" placeid="{{placeID1}}">
                    <img src="https://photos.smugmug.com/Galleries/All/i-hbc4Wbr/4/5477538c/L/DJI_0021-cware-L.jpg" style={{width: 300, height: 300}} alt="Photo 1" />
                    <span className="picText"><span>{'{'}{'{'}name1{'}'}{'}'}<br />Rating: {'{'}{'{'}rating1{'}'}{'}'}</span></span>
                  </a>
                </li>
                <li className="col">
                  <a href="/scenic/{{placeID2}}" placeid="{{placeID2}}">
                    <img src="https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/scenic-overlook-of-austin-mark-weaver.jpg" style={{width: 300, height: 300}} alt="Photo 2" />
                    <span className="picText"><span>{'{'}{'{'}name2{'}'}{'}'}<br />Rating: {'{'}{'{'}rating2{'}'}{'}'}</span></span>
                  </a>
                </li>
                <li className="col">
                  <a href="/scenic/{{placeID3}}" placeid="{{placeID3}}">
                    <img src="https://s3.amazonaws.com/gs-waymarking-images/897c10a2-3419-4794-b4c3-fc9403decb45_d.jpg" style={{width: 300, height: 300}} alt="Photo 3" />
                    <span className="picText"><span>{'{'}{'{'}name3{'}'}{'}'}<br />Rating: {'{'}{'{'}rating3{'}'}{'}'}</span></span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>
        {'{'}% endblock %{'}'}
      </div>
    );
  }
});
}
}

export default Scenic;