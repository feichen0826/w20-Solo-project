import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./Navigation.css";
import logo from "./logo.png";
import VisionFund from "./VisionFund.png"
import { useHistory } from "react-router-dom";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const history=useHistory()
  return (
    <div className="navigation">

        <NavLink exact to="/">
          	<div className="logo-container">
          <img className="vision-fund-logo" src={VisionFund} />
          <img className="navigation-logo" src={logo} alt="Logo" />
          </div>
        </NavLink>

    <div className="navbar-auth">
      <div className='navbar-user'>
        {sessionUser && isLoaded ? (
          <>
          <div onClick={()=>{history.push('/create-campaign')}}  className='start-a-campaign'>Start a campaign</div>
          {sessionUser.username}
          <div>
            <ProfileButton user={sessionUser} />
          </div>

          </>

        ) : (
          <div className='login-and-signup'>
            <OpenModalButton
              buttonText="Log In"

              modalComponent={<LoginFormModal />}
            />
            <OpenModalButton
              buttonText="Sign Up"
              modalComponent={<SignupFormModal />}
              tealBackground={true}
            />
          </div>
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
