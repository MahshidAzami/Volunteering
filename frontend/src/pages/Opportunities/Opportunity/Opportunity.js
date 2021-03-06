import React from "react";

function Opportunity(props) {
  return (
    <div className="card opportus">
      <img className="card-img-top" src={props.pic} alt="Card cap" />
      <div className="card-body ">
        <h5 className="card-title">{props.title}</h5>
        <h5 className="card-title">Time : {props.time_frame}</h5>
        <p className="card-text">{props.duty}</p>
      </div>
    </div>
  );
}

export default Opportunity;
