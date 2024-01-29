
import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import {fetchCampaignDetailsAsync} from '../../store/campaignReducer'
import { fetchAllCampaignsAsync } from '../../store/campaignReducer';
import { useParams, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import arrow from './arrow.png'
import black from './black.png'
import payment from './payment.png'
import './PaymentSuccess.css'

const PaymentSuccess = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [isFavorited, setIsFavorited] = useState(false);
  const queryParams = new URLSearchParams(location.search);
  const contributedAmount = queryParams.get('amount');
  const [startIndex, setStartIndex] = useState(0);
  const allCampaigns = useSelector((state) => state.campaign.campaigns);


  useEffect(() => {
    dispatch(fetchAllCampaignsAsync());
  }, [dispatch]);

  if(allCampaigns.length === 0 || !allCampaigns){
    return null
  }

  const calculateDaysLeft = (startDate, endDate) => {
    const currentDate = new Date();
    startDate = new Date(startDate);
    endDate = new Date(endDate);
    if (endDate < currentDate) {
      return 'Ended';
    } else if (endDate > currentDate && startDate <= currentDate) {
      const daysRemaining = Math.floor((endDate - currentDate) / (1000 * 60 * 60 * 24));
      return `${daysRemaining} days left`;
    } else if (startDate > currentDate) {
      const formattedStartDate = startDate.toLocaleDateString('en-US');
      return `Started on ${formattedStartDate}`;
    }
  };

  const handleBackClick = () => {
    setStartIndex((prevIndex) => Math.min(prevIndex + 4, allCampaigns.length - 4));
  };

  const handleForwardClick = () => {
    setStartIndex((prevIndex) => Math.max(0, prevIndex - 4));
  };
  const handleFavoriteClick = (e) => {
    // e.stopPropagation();
    // setIsFavorited((prevState) => !prevState);
  };
  const uppercaseCategories = (categories) => {
    return categories.map((category) => category.toUpperCase()).join(', ');
  };



  return (
    <div>
    <div className="payment-success-container">
    <img className="payment" src={payment} alt="Payment Successful" />
    <h2 className="success-heading">Payment Successful!</h2>
    <p className="success-message">You have successfully contributed: ${contributedAmount}</p>
    </div>
    <div className='may-interest-container-background-grey'>

      <div className='campaign-column-container'>
      <div className='may-interest-container'>
      <p className='may-interest'>You may also be interested in</p>
      <div className='icon-container'>
      <div className="navigation-icons">
          <span className="back-icon" onClick={handleForwardClick}>
          <img className="go-back-button" src={black} alt="Go Back" />

          </span>

        </div>
        <div className="navigation-icons">

        <span className="next-icon" onClick={handleBackClick}>

        <img className="move-forward-button" src={black} alt="Move Forward" />
        </span>
      </div>
      </div>
      </div>
    <div className='campaign-column-campaign-detail'>


      </div>
      </div>
      <div className= "campaign-columns-container">

<div className='campaign-columns-container2'>
      {allCampaigns.slice(startIndex, startIndex + 4).map((campaign, index) => (
        <Link to={`/campaign/${campaign.id}`} key={index} className="campaign-container">
          <img src={campaign.imgUrl} alt="Campaign" className="campaign-image" />
          <div className="campaign-info-container">
            <div className='funding-container'>
              <p className='funding'>FUNDING</p>
                <div className='save-favorite' onClick={(e) => handleFavoriteClick(e)}>
                <i className={`far fa-heart ${isFavorited ? 'favorited' : ''}`}></i>
                </div>
            </div>
            <div className='campaign-copy-container'>

                <h3 className="campaign-title">{campaign.title}</h3>
                <p className="campaign-description">{campaign.description}</p>


            </div>
            <div className='funding-details-container'>
                <p className="campaign-categories">{uppercaseCategories(campaign.categories)}</p>
                <div className='funding-percentage-info-container'>
                  <div className='usd-container'>
                    <div className="funding-details">${campaign.currentFunding.toLocaleString()}</div>
                    <div className='usd-raised'>USD raised </div>
                  </div>
                    <div className='funding-percentage'>{((campaign.currentFunding / campaign.fundingGoal) * 100).toFixed(2)}%</div>
                </div>
                <div className="percentage-bar">
                  <div className="fill" style={{ width: `${((campaign.currentFunding / campaign.fundingGoal) * 100).toFixed(2)}%`}}></div>
                </div>
                <div className="days-left-container">
                  <i className="far fa-clock"></i>
                  <p className="days-left">{calculateDaysLeft(campaign.startDate, campaign.endDate)}</p>
                </div>

            </div>
          </div>
        </Link>
      ))}
      </div>

      </div>
    </div>
  </div>
  );
};

export default PaymentSuccess;
