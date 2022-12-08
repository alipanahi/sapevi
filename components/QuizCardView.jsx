import React, { Component } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHourglassStart,
  faListCheck,
  faLayerGroup,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

const QuizCardView = (props) => {
  return (
    <div className="col-3 pt-3">
      <div class="card mb-3 border-0 shadow-sm">
        <Image
          src={props.img}
          className="card-img-top"
          alt="computer"
          width={100}
          height={200}
        />
        <div class="card-body">
          <h5 class="card-title">{props.title}</h5>
          <p class="card-text text-secondary">{props.desc}</p>
          <p class="card-text">
            <small class="text-muted">
              <FontAwesomeIcon icon={faListCheck} /> &nbsp; Questions: &nbsp;{" "}
              {props.questions}
            </small>
          </p>
          <p class="card-text">
            <small class="text-muted">
              <FontAwesomeIcon icon={faHourglassStart} /> &nbsp; Time: &nbsp;{" "}
              {props.time}m
            </small>
          </p>
          <p class="card-text">
            <small class="text-muted">
              <FontAwesomeIcon icon={faLayerGroup} /> &nbsp; Level: &nbsp;
              {props.level}
            </small>
          </p>
          <div className="text-end">
            <button className="btn btn-sm btn-outline-primary mx-1">
              Start
            </button>
            <button className="btn btn-sm btn-outline-primary">
              <FontAwesomeIcon icon={faEllipsis} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizCardView;
