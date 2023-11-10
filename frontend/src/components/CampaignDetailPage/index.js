import React, { useEffect, useState } from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import {fetchCampaignDetailsAsync} from '../../store/campaignReducer'
import { useParams, useHistory } from "react-router-dom";
import './CampaignDetailPage.css'

const CampaignDetailPage = () => {
const dispatch = useDispatch();
const { campaignId } = useParams();
  const singleCampaign = useSelector((state) => state.campaign.campaignDetails);
    console.log(singleCampaign)

  // Fetch username associated with the campaign's userId
  useEffect(() => {
    // Make an API call to fetch the username based on the userId from your database
    // Update the 'username' state with the fetched username
    dispatch(fetchCampaignDetailsAsync(campaignId))
  }, [dispatch, campaignId]);

  if(singleCampaign ===  undefined){
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

  return (
    <div className="campaign-detail-page">
    <div className="campaign-image-container">
      <div>
      <img src={singleCampaign.imgUrl ? singleCampaign.imgUrl : singleCampaign.image} alt="Campaign" className="campaign-image3" />
      </div>

      <div className="campaign-details">
        <h2 className="campaign-title1">{singleCampaign.title}</h2>
        <p className="campaign-description">{singleCampaign.description}</p>
        <div className="campaign-stats">
          <p className="campaign-stat">Username: {singleCampaign.userId}</p>
          <p className="campaign-stat">Funding Goal: ${singleCampaign.fundingGoal}</p>
          <p className="campaign-stat">Current Funding: ${singleCampaign.currentFunding}</p>
          <p className="campaign-stat">Backers: {singleCampaign.numBackers}</p>
          <p className="campaign-stat">
            Funding: ${singleCampaign.currentFunding} ({((singleCampaign.currentFunding / singleCampaign.fundingGoal) * 100).toFixed(2)}%)
          </p>
          <p className="campaign-stat">Days Left: {calculateDaysLeft(singleCampaign.startDate, singleCampaign.endDate)}</p>
        </div>
        <button className="see-options-button">See Options</button>
      </div>
    </div>
    <div className="story-section">
      <h2 className="story-title">Story</h2>
      <p className="campaign-story">{singleCampaign.story}</p>
    </div>

    <div className="campaign-category">
      <p className="category-info">Category: {singleCampaign.categories}</p>
    </div>
  </div>
  );
};

export default CampaignDetailPage;
