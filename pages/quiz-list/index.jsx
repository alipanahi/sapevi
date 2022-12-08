import React, { Component } from "react";
import MainHeader from "../../components/MainHeader";
import BreadCrumb from "../../components/BreadCrumb";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHourglassStart,
  faListCheck,
  faLayerGroup,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import QuizCardView from "../../components/QuizCardView";

const Home = () => {
  return (
    <div className="main-bg-color">
      <div className="container py-3">
        <MainHeader />

        <main className="main-bg-color">
          <div className="row">
            <BreadCrumb />
            <QuizCardView
              img="https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80"
              title="Computer"
              desc="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas
                    facere dignissimos nihil quibusdam illum id assumenda animi a
                    suscipit minus dolorem error molestiae, quasi, autem vitae
                    aspernatur odio magnam facilis."
              questions="10"
              time="5"
              level="Beginer"
            />
            <QuizCardView
              img="https://images.unsplash.com/photo-1457369804613-52c61a468e7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8c3Rvcnl8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
              title="Story"
              desc="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas
                    facere dignissimos nihil quibusdam illum id assumenda animi a
                    suscipit minus dolorem error molestiae, quasi, autem vitae
                    aspernatur odio magnam facilis."
              questions="20"
              time="10"
              level="Beginer"
            />
            <QuizCardView
              img="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8c3BvcnR8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
              title="Sport"
              desc="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas
                    facere dignissimos nihil quibusdam illum id assumenda animi a
                    suscipit minus dolorem error molestiae, quasi, autem vitae
                    aspernatur odio magnam facilis."
              questions="50"
              time="25"
              level="Beginer"
            />
            <QuizCardView
              img="https://images.unsplash.com/photo-1516116216624-53e697fedbea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8UHJvZ3JhbW1pbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
              title="Programming"
              desc="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas
                    facere dignissimos nihil quibusdam illum id assumenda animi a
                    suscipit minus dolorem error molestiae, quasi, autem vitae
                    aspernatur odio magnam facilis."
              questions="10"
              time="15"
              level="Beginer"
            />
            <QuizCardView
              img="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8TWF0aHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
              title="Math"
              desc="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas
                    facere dignissimos nihil quibusdam illum id assumenda animi a
                    suscipit minus dolorem error molestiae, quasi, autem vitae
                    aspernatur odio magnam facilis."
              questions="10"
              time="20"
              level="Beginer"
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
