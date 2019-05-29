import React, { Component } from "react";
// import "./Requests.css";
import Request from "./Request";
import AuthContext from "../../context/Authcontext";
import Modal from "../../component/Modal/Modal";
import Backdrop from "../../component/Backdrop/Backdrop";

class Requests extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);

    this.state = {
      selectedReq: null,
      requests: [],
      isLoading: true,
      responding: false
    };
  }

  respondingHandler = id => {
    this.setState(prevState => {
      const selectedReq = prevState.requests.find(request => request.id === id);
      return { selectedReq: selectedReq, responding: true };
    });
  };

  modalConfirmHandler = () => {
    this.setState({ responding: false });
    const requestBody = {
      id: this.state.selectedReq.id,
      email: this.state.selectedReq.email,
      first_name: this.state.selectedReq.first_name,
      opportunity: this.state.selectedReq.opportunity,
      response: "confirmed"
    };

    fetch("/api/aprove", {
      method: "PUT",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.status !== 200 || res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .catch(err => {
        console.log(err);

        ///display a message to user : try latar
      });
    this.setState({ selectedReq: null });
  };

  modalRejectHandler = () => {
    this.setState({ responding: false });
    const requestBody = {
      id: this.state.selectedReq.id,
      email: this.state.selectedReq.email,
      first_name: this.state.selectedReq.first_name,
      opportunity: this.state.selectedReq.opportunity,
      response: "confirmed"
    };

    fetch("/api/reject", {
      method: "PUT",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.status !== 200 || res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .catch(err => {
        console.log(err);

        ///display a message to user : try latar
      });
    this.setState({ selectedReq: null });
  };

  modalCancelHandler = () => {
    this.setState({ responding: false });
  };

  componentDidMount() {
    fetch("/api/requests", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.context.token
      }
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          requests: [...data.requests],
          isLoading: false
        });
      });
  }

  render() {
    if (this.state.isLoading) {
      return <span>Loading... </span>;
    } else {
      return (
        <React.Fragment>
          {this.state.responding && <Backdrop />}
          {this.state.responding && (
            <Modal
              title="Request"
              canCancel
              canReject
              canConfirm
              onCancel={this.modalCancelHandler}
              onConfirm={this.modalConfirmHandler}
              onReject={this.modalRejectHandler}
            >
              <p>Respond</p>
            </Modal>
          )}
          <div>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Name</th>
                  <th scope="col">Surname</th>
                  <th scope="col">Email</th>
                  <th scope="col">Opportunity</th>
                  <th scope="col">Respond</th>
                </tr>
              </thead>
              {this.state.requests.map(o => {
                return (
                  <tbody>
                    <Request
                      key={o.id}
                      reQid={o.id}
                      first_name={o.first_name}
                      surname={o.surname}
                      email={o.email}
                      opportunity={o.opportunity}
                      clickHandler={() => this.respondingHandler(o.id)}
                    />
                  </tbody>
                );
              })}
            </table>
          </div>
        </React.Fragment>
      );
    }
  }
}

export default Requests;
