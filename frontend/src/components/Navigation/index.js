import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./Navigation.css";
import logo from "./logo.png";
import { useHistory } from "react-router-dom";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const history=useHistory()
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
          <div onClick={()=>{history.push('/create-campaign')}}  className='start-a-campaign'>Start a campaign</div>
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
