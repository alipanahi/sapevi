import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Image from "next/image";

const CardView = (props) => {
  console.log("from tags", props.tag);
  return (
    <div className="col-sm-6 col-md-6 col-lg-3 pt-3">
      <div className="card mb-3 border-0 shadow-sm">
        <Image
          src={props.img}
          className="card-img-top"
          alt="computer"
          width={300}
          height={190}
        />
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text text-secondary">{props.desc}</p>
          <p className="card-text">
            <small className="text-muted"># {props.tag}</small>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardView;
