import React from "react";

function Request(props) {
  return (
    <tr>
      <th scope="row">{props.id}</th>
      <td>{props.first_name}</td>
      <td>{props.surname}</td>
      <td>{props.email}</td>
      <td>{props.opportunity}</td>
      <td>
        <button className="btn btn-primary" onClick={props.clickHandler}>
          Detail
        </button>
      </td>
    </tr>
  );
}

export default Request;
