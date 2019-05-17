import React, { Component } from "react";
import "./opportunity.css";
import Opportunity from "./Opportunity/Opportunity";
const host = process.env.HOST;
class Opportunities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opportunities: [],
      isLoading: true
    };
  }
  componentDidMount() {
    fetch("/api/opportunities")
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
          opportunities: [...data.opportunity],
          isLoading: false
        });
        console.log(this.state.opportunities);
      });
  }

  render() {
    if (this.state.isLoading) {
      return <span>Loading... </span>;
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
