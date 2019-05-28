import React, { Component } from "react";

class ApplicationForm extends Component {
  constructor(props) {
    super(props);
    this.nameEl = React.createRef();
    this.surnameEl = React.createRef();
    this.emailEl = React.createRef();
    this.memberEl = React.createRef();
    this.noteEl = React.createRef();
    this.opportunityEl = React.createRef();
  }

  submitHandler = event => {
    event.preventDefault();
    const name = this.nameEl.current.value;
    const surname = this.surnameEl.current.value;
    const email = this.emailEl.current.value;
    // const member = this.memberEl.current.value;
    const note = this.noteEl.current.value;
    const opportunity = this.opportunityEl.current.value;

    const requestBody = {
      first_name: name,
      surname: surname,
      email: email,
      //   member: member,
      note: note,
      opportunity: opportunity
    };

    fetch("/api/apply", {
      method: "POST",
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
  };
  render() {
    return (
      <div className="container">
        <form onSubmit={this.submitHandler}>
          <div className="row">
            <div className="col">
              <label htmlFor="inputEmail4">First Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="First name"
                ref={this.nameEl}
              />
            </div>
            <div className="col">
              <label htmlFor="inputEmail4">Last Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Last name"
                ref={this.surnameEl}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlInput1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="name@example.com"
              ref={this.emailEl}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlSelect1">
              Which group you wish to apply for :
            </label>
            <select
              className="form-control"
              id="exampleFormControlSelect1"
              ref={this.opportunityEl}
            >
              <option>Computer</option>
              <option>Cleaning</option>
              <option>Children</option>
              <option>Pray Ministary</option>
              <option>Translation</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">
              Why you are intrested to join this group :
            </label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="8"
              ref={this.noteEl}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default ApplicationForm;
