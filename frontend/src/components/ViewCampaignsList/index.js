import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { fetchAllCampaignsAsync } from '../../store/campaignReducer';
import './ViewCampaignsList.css'

const ViewCampaignsList = () => {
    const dispatch = useDispatch();
    const allCampaigns = useSelector((state) => state.campaign.campaigns);
    console.log(allCampaigns)

    useEffect(() => {
       dispatch(fetchAllCampaignsAsync());
    }, [dispatch]);

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

      if(allCampaigns.length === 0){
        return null
      }


  return (
    <div className="view-campaigns-list">
      <div className="banner">
        <h1>VisionFund Campaigns</h1>
        <p>Fund new and groundbreaking projects, including hits from VisionFund InDemand.</p>
      </div>
      <div className="columns">
        <div className="left-column">
        {allCampaigns.map((campaign, index) => (
          <Link to={`/campaign/${campaign.id}`} key={index} className="campaign-container">

            <img src={campaign.imgUrl} alt="Campaign" />
            <h3>{campaign.title}</h3>
            <p>{campaign.description}</p>
            <p>Funding: ${campaign.currentFunding}  ({((campaign.currentFunding / campaign.fundingGoal) * 100).toFixed(2)}%)</p>
            <p>{calculateDaysLeft(campaign.startDate, campaign.endDate)}</p>
            </Link>
        ))}
        </div>
        <div className="right-column">
          <input type="text" placeholder="Search for campaigns" />
          <div className="sort-by">
            <label>Sort by:</label>
            <select>
              <option value="mostFunded">Most Funded</option>
              <option value="date">Date</option>
            </select>
          </div>
          <div className="campaigns-grid">
            {/* Render campaign containers here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCampaignsList;
