import React from "react";
import MainHeader from "../../components/layout.js/main-header";
import "bootstrap/dist/css/bootstrap.css";

const ProfilePage = (props) => {
  return (
    <div className="container py-3">
      <MainHeader />
      <header>
        <div className="pricing-header p-3 pb-md-4 mx-auto text-center">
          <h1 className="display-4 fw-normal">Profile</h1>
          <p className="fs-5 text-muted">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est sequi
            rem voluptatum, inventore assumenda velit officia repudiandae esse
            quaerat neque pariatur perspiciatis eveniet, dicta harum commodi
            placeat eum repellat illo!
          </p>
        </div>
      </header>
    </div>
  );
};

export default ProfilePage;
