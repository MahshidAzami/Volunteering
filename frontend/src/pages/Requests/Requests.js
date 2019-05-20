import React, { Component } from "react";
// import "./Requests.css";
import Request from "./Request";

class Requests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requests: [],
      isLoading: true
    };
  }
  componentDidMount() {
    console.log("hi");
    fetch("/api/requests")
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
          Requests: [...data.requests],
          isLoading: false
        });
        console.log(this.state.requests);
      });
  }

  render() {
    if (this.state.isLoading) {
      return <span>Loading... </span>;
    } else {
      return (
        <div>
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Surname</th>
                <th scope="col">Email</th>
                <th scope="col">Member</th>
                <th scope="col">Opportunity</th>
              </tr>
            </thead>
            {this.state.Requests.map(o => {
              return (
                <tbody>
                  <Request
                    key={o.id}
                    id={o.id}
                    first_name={o.first_name}
                    surname={o.surname}
                    email={o.email}
                    member={o.member}
                    opportunity={o.opportunity}
                  />
                </tbody>
              );
            })}
          </table>
        </div>
      );
    }
  }
}

export default Requests;
