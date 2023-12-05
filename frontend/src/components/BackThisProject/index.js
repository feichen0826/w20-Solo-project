import React, { useState, useRef, useEffect } from 'react';
import './BackThisProject.css';
import { Modal, useModal } from "../../context/Modal";
import { useHistory } from 'react-router-dom';

const BackThisProject = ({campaignId}) => {
  const [pledgeAmount, setPledgeAmount] = useState(0);
  const { closeModal } = useModal();
  const history = useHistory();



  const handleContinueClick = (e) => {
    e.preventDefault();
    if (pledgeAmount > 0) {
      console.log(`Pledge Amount: ${pledgeAmount}`);
      closeModal();
      history.push(`/campaign/${campaignId}/contributions`);
    } else {

      alert('Please enter a pledge amount greater than 0.');
    }
  };




  return (

    <div className="popup-container">
      <div className="popup-content">
        <h2>Back this project</h2>


        <div className='input-container-container'>
        <div className="input-container">
          <span className="dollar-sign">$</span>
          <input
            type="number"
            value={pledgeAmount}
            onChange={(e)=> setPledgeAmount(e.target.value)}
            placeholder="Enter your pledge"
            required
          />
          <span className="currency">USD</span>
        </div>
        <button className="continue-button" onClick={handleContinueClick}>
          Continue
        </button>
        </div>
        <p className="popup-description">
          Support this project by entering your pledge amount below. You can change or cancel it at any time.
        </p>
      </div>
    </div>
  );
};

export default BackThisProject;
