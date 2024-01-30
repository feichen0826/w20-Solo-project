import React, { useState, useRef, useEffect } from 'react';
import './BackThisProject.css';
import { useModal } from "../../context/Modal";
import { useHistory } from 'react-router-dom';
import { fetchCampaignDetailsAsync } from '../../store/campaignReducer';
import { useDispatch } from 'react-redux';

const BackThisProject = ({campaignId}) => {
  const [pledgeAmount, setPledgeAmount] = useState('');
  const history = useHistory();
  const  dispatch = useDispatch()
  const { closeModal } = useModal();



  const handleContinueClick = async (e) => {
    e.preventDefault();
    if (pledgeAmount > 0) {
      closeModal();
      // await dispatch(fetchCampaignDetailsAsync(campaignId));
      history.push(`/campaign/${campaignId}/contributions?pledgeAmount=${pledgeAmount}`);
    } else {

      alert('Please enter a pledge amount greater than 0.');
    }
  };




  return (


      <div className="popup-content">
        <h2>Back this project</h2>


        <div className='input-container-container'>
        <div className="input-container">
          <span className="dollar-sign">$</span>
          <input
      className="input-field"
      type="text"
      placeholder="0.00"
      value={pledgeAmount}
      onChange={(e) => {
        const inputValue = e.target.value;
        if (/^\d*\.?\d*$/.test(inputValue)) {
          setPledgeAmount(inputValue);
        }
      }}
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

  );
};

export default BackThisProject;
