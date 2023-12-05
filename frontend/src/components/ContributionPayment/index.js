

import React, { useState } from 'react';
import { useParams, useHistory } from "react-router-dom";
import {  useDispatch, useSelector } from 'react-redux';

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
    <div>
      <h2>You're Contributing to</h2>
      <p>
        {singleCampaign.title}
        <br />
        <div className='campaign-user-container'>
          {currentUser && currentUser.profileImage && (
            <div className='campaign-profile-image-container'>
              <img className='campaign-profile-image' src={currentUser.profileImage} alt='profile' />
            </div>
          )}
            <div className='campaign-username-city-container'>
            {currentUser && currentUser.username && (
            <div className="campaign-username">{currentUser.username}</div>
            )}
             {currentUser && currentUser.city && (
            <div className="campaign-city">{currentUser.city}, United States</div>
            )}
            </div>
          </div>
      </p>
      <div>
        <label>
          Contribution Amount:
          <input
            type="text"
            value={contributionAmount}
            onChange={(e) => setContributionAmount(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Card Number:
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Expiry Date:
          <input
            type="text"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          CVC:
          <input
            type="text"
            value={cvc}
            onChange={(e) => setCvc(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Zip Code:
          <input
            type="text"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
          />
        </label>
      </div>

      <div>
        <button onClick={handleContribution}>Submit Contribution</button>
      </div>
    </div>
  );
};

export default ContributionPayment;
