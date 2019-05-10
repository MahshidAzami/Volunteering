import React, { Component } from "react";
import "./opportunity.css";

class Opportunities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opportunities: null,
      isLoading: true
    };
  }
  componentDidMount() {
    fetch(`http://localhost:5000/opportunities`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          opportunities: [...data.opportunity],
          isLoading: false
        });
        console.log(this.state.opportunities[0]);
      });
  }

  render() {
    if (this.state.isLoading) {
      return <span>Loading... 👽</span>;
    } else {
      return (
        <div className="card-deck container section">
          {this.state.opportunities.map(o => {
            return (
              <div className="card opportus">
                <img
                  className="card-img-top"
                  src={o.pic}
                  alt="Card image cap"
                />
                <div className="card-body ">
                  <h5 className="card-title">{o.title}</h5>
                  <h5 className="card-title">Time : {o.time_frame}</h5>
                  <p className="card-text">{o.duty}</p>
                  <a href="" className="btn btn-primary">
                    Apply
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      );
    }
  }
}

export default Opportunities;
