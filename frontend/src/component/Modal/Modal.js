import React from "react";
import "./modal.css";

const Modal = props => (
  <div className="reqmodal">
    <header className="modal__header">
      <h1>{props.title}</h1>
    </header>
    <section className="modal__content">{props.children}</section>
    <section className="modal__actions">
      {props.canCancel && (
        <button className="btn btn-primary but" onClick={props.onCancel}>
          Cancel
        </button>
      )}
      {props.canReject && (
        <button className="btn btn-primary but" onClick={props.onReject}>
          Reject
        </button>
      )}
      {props.canConfirm && (
        <button className="btn btn-primary but" onClick={props.onConfirm}>
          Confirm
        </button>
      )}
    </section>
  </div>
);

export default Modal;
