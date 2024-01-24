

import React, { useState } from 'react';
import { useParams, useHistory } from "react-router-dom";
import {  useDispatch, useSelector } from 'react-redux';
import './ContributionPayment.css'

const ContributionPayment = () => {
    const { campaignId } = useParams();
    const singleCampaign = useSelector((state) => state.campaign.campaignDetails);
    const currentUser = useSelector((state)=> state.session.user)
  const [contributionAmount, setContributionAmount] = useState('');

  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [zipCode, setZipCode] = useState('');
  const handleContribution = () => {

  };

  return (
    <div className="contribution-payment-container">
    <div className="left-column">
      <h4>You're Contributing to</h4>
      <h2>
        {singleCampaign.title}
        </h2>
        <div className='campaign-user-container'>
          {currentUser && currentUser.user && currentUser.user.profileImage && (
            <div className='campaign-profile-image-container'>
              <img className='campaign-profile-image' src={currentUser.user.profileImage} alt='profile' />
            </div>
          )}
            <div className='campaign-username-city-container'>
            {currentUser && currentUser.username && (
            <div className="campaign-username">{currentUser.username}</div>
            )}
             {currentUser && currentUser.user && currentUser.user.city && (
            <div className="campaign-city">{currentUser.user.city}, United States</div>
            )}
            </div>
          </div>
          </div>

          <div className="right-column">
  <div className="form-group">
    <div className="input-label">
      Contribution Amount:
    </div>
    <input
      className="input-field"
      type="text"
      value={contributionAmount}
      onChange={(e) => setContributionAmount(e.target.value)}
    />
  </div>

  <div className="form-group">
    <div className="input-label">
      Card Number:
    </div>
    <input
      className="input-field"
      type="text"
      value={cardNumber}
      onChange={(e) => setCardNumber(e.target.value)}
    />
  </div>

  <div className="form-group">
    <div className="input-label">
      Expiry Date:
    </div>
    <input
      className="input-field"
      type="text"
      value={expiryDate}
      onChange={(e) => setExpiryDate(e.target.value)}
    />
  </div>

  <div className="form-group">
    <div className="input-label">
      CVC:
    </div>
    <input
      className="input-field"
      type="text"
      value={cvc}
      onChange={(e) => setCvc(e.target.value)}
    />
  </div>

  <div className="form-group">
    <div className="input-label">
      Zip Code:
    </div>
    <input
      className="input-field"
      type="text"
      value={zipCode}
      onChange={(e) => setZipCode(e.target.value)}
    />
  </div>

  <div className="form-group">
    <button className="submit-button" onClick={handleContribution}>
      Submit Contribution
    </button>
  </div>
</div>


    </div>
  );
};

export default ContributionPayment;
