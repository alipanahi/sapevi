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
import Link from "next/link";

const QuizCardView = (props) => {
  return (
    <div className="col-sm-1 col-md-4 pt-3">
      <div className="card mb-3 border-0 shadow-sm">
        <Image
          src={props.img}
          className="card-img-top"
          alt="computer"
          width={100}
          height={200}
        />
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text text-secondary">{props.desc}</p>
          <p className="card-text">
            <small className="text-muted">
              <FontAwesomeIcon icon={faListCheck} /> &nbsp; Questions: &nbsp;{" "}
              {props.questions}
            </small>
          </p>
          <p className="card-text">
            <small className="text-muted">
              <FontAwesomeIcon icon={faHourglassStart} /> &nbsp; Time: &nbsp;{" "}
              {props.time}
            </small>
          </p>
          <p className="card-text">
            <small className="text-muted">
              <FontAwesomeIcon icon={faLayerGroup} /> &nbsp; Level: &nbsp;
              {props.level}
            </small>
          </p>
          {props.btn && <div className="text-end">
            <Link href={`/quiz-list/${props.id}/info`}>
              <button className="btn btn-sm btn-outline-primary mx-1">
                Read
              </button>
            </Link>
            <button className="btn btn-sm btn-outline-primary">
              <FontAwesomeIcon icon={faEllipsis} />
            </button>
          </div>
          }
        </div>
      </div>
    </div>
  );
};

export default QuizCardView;
