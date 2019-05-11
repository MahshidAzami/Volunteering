import React, { Component } from "react";
import "./opportunity.css";
import Opportunity from "../Opportunity/Opportunity";

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
              <Opportunity
                key={o.title}
                pic={o.pic}
                title={o.title}
                time_fram={o.time_fram}
                duty={o.duty}
              />
            );
          })}
        </div>
      );
    }
  }
}

export default Opportunities;
