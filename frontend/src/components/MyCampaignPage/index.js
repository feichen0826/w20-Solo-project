import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { fetchAllCampaignsAsync } from '../../store/campaignReducer';
import { NavLink } from 'react-router-dom';
import { useParams, useHistory } from "react-router-dom";
import './MyCampaignPage.css'

const MyCampaignPage = () => {
const history = useHistory();
const dispatch = useDispatch();
const currentUser = useSelector((state) => state.session.user);
const allCampaigns = useSelector((state) => state.campaign.campaigns);
console.log(currentUser)
useEffect(() => {
    dispatch(fetchAllCampaignsAsync());
 }, [dispatch]);

 const handleDropdownChange = (e, campaignId, history) => {
  const selectedOption = e.target.value;
  if (selectedOption === 'Edit Campaign') {
    history.push(`/campaigns/${campaignId}/edit`);
  }
};

 const userCampaigns = allCampaigns.filter(campaign => campaign.userId === currentUser.id);
  return (
    <div className="my-campaign-page">
      <h1>{currentUser.username}</h1>
      <nav>
        <NavLink to="/my-campaigns">Campaigns</NavLink>
        <NavLink to="/my-contributions">Contributions</NavLink>
      </nav>

      <div className="campaign-list">
        {userCampaigns.map((campaign) => (
          <div key={campaign.id} className="campaign-container">
            <img src={campaign.imgUrl} alt="Campaign" />
            <div className="campaign-info">
              <h2>{campaign.title}</h2>
              <p>By {currentUser.username}</p>
              <div className="dropdown">
                <select defaultValue="Actions" onChange={(e) => handleDropdownChange(e, campaign.id, history)}>
                  <option value="Actions" disabled>Actions</option>
                  <option value="Edit Campaign">Edit Campaign</option>
                  <option value="Delete Campaign">Delete Campaign</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCampaignPage;
