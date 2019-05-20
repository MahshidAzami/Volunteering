import React, { Component } from "react";
import "./opportunity.css";
import Opportunity from "./Opportunity/Opportunity";
import { NavLink } from "react-router-dom";

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
        <div>
          <div className="card-deck container section">
            {this.state.opportunities.map(o => {
              return (
                <Opportunity
                  key={o.title}
                  pic={o.pic}
                  title={o.title}
                  time_frame={o.time_frame}
                  duty={o.duty}
                />
              );
            })}
          </div>
          <NavLink to="/Apply" className="btn btn-primary">
            Apply
          </NavLink>
        </div>
      );
    }
  }
}

export default Opportunities;
