

import React, { useState } from 'react';
import { useParams, useHistory } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import {  useDispatch, useSelector } from 'react-redux';
import './ContributionPayment.css'

const ContributionPayment = () => {
    const { campaignId } = useParams();
    const history = useHistory()
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const pledgeAmount = queryParams.get('pledgeAmount');
    const singleCampaign = useSelector((state) => state.campaign.campaignDetails);
    const currentUser = useSelector((state)=> state.session.user)
  const [contributionAmount, setContributionAmount] = useState(pledgeAmount);

  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [zipCode, setZipCode] = useState('');

  const handleContribution = async (e) => {
    e.preventDefault();
     const newErrors ={};
    // Contribution Amount validation
  if (!contributionAmount || parseFloat(contributionAmount) <= 0) {
    newErrors.contributionAmount = 'Contribution amount must be greater than 0';
  }

  // Card Number validation
  if (!cardNumber || !/^\d{16}$/.test(cardNumber)) {
    newErrors.cardNumber = 'Card number must be 16 digits';
  }

  // Expiry Date validation
  if (!expiryDate) {
    newErrors.expiryDate = 'Expiry date is required';
  }

  // CVC validation
  if (!cvc || !/^\d{3}$/.test(cvc)) {
    newErrors.cvc = 'CVC must be 3 digits';
  }

  // Zip Code validation
  if (!zipCode || !/^\d{5}$/.test(zipCode)) {
    newErrors.zipCode = 'Zip code must be 5 digits';
  }

  // Check if there are any errors
  if (Object.keys(newErrors).length === 0) {
    // Handle errors, you can set them in state or display a message
    history.push(`/payment-success?amount=${contributionAmount}`)
  }




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
    <div className="input-container">
    <span className="dollar-sign">$</span>
    <input
      className="input-field"
      type="text"
      placeholder="0.00"
      value={contributionAmount}
      onChange={(e) => {
        const inputValue = e.target.value;
        if (/^\d*\.?\d*$/.test(inputValue)) {
          setContributionAmount(inputValue);
        }
      }}
    />
  </div>
  </div>

  <div className="form-group">
    <div className="input-label">
      Card Number:
    </div>
    <input
    className="input-field"
    type="text"
    placeholder="XXXX XXXX XXXX XXXX"
    value={cardNumber}
    onChange={(e) => {
      const inputValue = e.target.value;
      // Allow only digits and limit to 16 characters
      const sanitizedValue = inputValue.replace(/\D/g, '').slice(0, 16);
      setCardNumber(sanitizedValue);
    }}
  />
  </div>

  <div className="form-group">
    <div className="input-label">
      Expiry Date:
    </div>
    <input
      className="input-field"
      type="month"
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
    placeholder="123"
    maxLength={3}
    value={cvc}
    onChange={(e) => {
      const inputValue = e.target.value;
      // Allow only digits and limit to 3 characters
      const sanitizedValue = inputValue.replace(/\D/g, '').slice(0, 3);
      setCvc(sanitizedValue);
    }}
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
      placeholder="Enter Zip Code"
      onChange={(e) => {
        const inputValue = e.target.value
        const sanitizedValue = inputValue.replace(/\D/g, '').slice(0, 5);

        setZipCode(sanitizedValue);
      }}
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
