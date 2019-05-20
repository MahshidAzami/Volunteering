import React from "react";

function Request(props) {
  return (
    <tr>
      <th scope="row">{props.id}</th>
      <td>{props.first_name}</td>
      <td>{props.surname}</td>
      <td>{props.email}</td>
      <td>{props.member}</td>
      <td>{props.opportunity}</td>
    </tr>
  );
}

export default Request;
