import React, { Component } from "react";
import "./Apply.css";
import ApplicationForm from "../../component/ApplicationForm";

class Apply extends Component {
  state = {
    isLogin: true
  };

  render() {
    if (this.state.isLoading) {
      return <span>Loading... </span>;
    } else {
      return (
        <div>
          <ApplicationForm />
        </div>
      );
    }
  }
}
///
export default Apply;
