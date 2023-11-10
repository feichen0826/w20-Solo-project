import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./Navigation.css";
import logo from "./logo.png";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className="navigation">
		<div>
        <NavLink exact to="/">
          <img className=" navigation-logo" src={logo} alt="Logo" />
        </NavLink>
		</div>
    <div className="navbar-auth">
      <div className='navbar-user'>
        {sessionUser && isLoaded ? (
          <>
          <NavLink to="create-campaign" className='start-a-campaign'>Start a campaign</NavLink>
          {sessionUser.username}
          <div>
            <ProfileButton user={sessionUser} />
          </div>

          </>

        ) : (
          <>
            <OpenModalButton
              buttonText="Log In"

              modalComponent={<LoginFormModal />}
            />
            <OpenModalButton
              buttonText="Sign Up"

              modalComponent={<SignupFormModal />}
              tealBackground={true}
            />
          </>
        )}
      </div>
      </div>
      {/* {isLoaded && (

          <ProfileButton user={sessionUser} />

      )} */}
    </div>
  );
}

export default Navigation;
