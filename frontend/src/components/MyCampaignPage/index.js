import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { fetchAllCampaignsAsync } from '../../store/campaignReducer';
import { NavLink } from 'react-router-dom';
import { useParams, useHistory } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import DeleteConfirmationModal from "../DeleteConfirmationModal";
import './MyCampaignPage.css'

const MyCampaignPage = () => {
const history = useHistory();
const dispatch = useDispatch();
const currentUser = useSelector((state) => state.session.user);
const allCampaigns = useSelector((state) => state.campaign.campaigns);
const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(true);
const [campaignToDelete, setCampaignToDelete] = useState(null);

console.log(currentUser)
useEffect(() => {
    dispatch(fetchAllCampaignsAsync());
 }, [dispatch]);

 const handleDropdownChange = (e, campaignId, history) => {
  const selectedOption = e.target.value;
  if (selectedOption === 'Edit Campaign') {
    history.push(`/campaigns/${campaignId}/edit`);
  }else if (selectedOption === 'Delete Campaign') {
    setCampaignToDelete(campaignId);
    setShowDeleteConfirmation(true);
  }
};
if(allCampaigns.length === 0 || !currentUser ){
  return null
}

 const userCampaigns = allCampaigns.filter(campaign => campaign && campaign.userId === (currentUser?.id || null));

  return (
    <div className="my-campaign-page">
      <h1 id="username">{currentUser.username}</h1>
      <nav>
        <NavLink to="/my-campaigns" id="campaigns-link">
          Campaigns
        </NavLink>
        <NavLink to="/my-contributions" id="contributions-link">
          Contributions
        </NavLink>
      </nav>

      <div className="campaign-list">
        {userCampaigns.map((campaign) => (
          <div key={campaign.id} className="campaign-container1">
            <img src={campaign.imgUrl} alt="Campaign" />
            <div className="campaign-info">
              <h2 id={`title-${campaign.id}`}>{campaign.title}</h2>
              <p>By {currentUser.username}</p>
              <div className="dropdown">
                <select
                  defaultValue="Actions"
                  onChange={(e) => handleDropdownChange(e, campaign.id, history)}
                  id={`dropdown-${campaign.id}`}
                >
                  <option value="Actions" disabled>
                    Actions
                  </option>
                  <option value="Edit Campaign">Edit Campaign</option>
                  {/* <option value="Delete Campaign" >Delete Campaign</option> */}
                </select>
              </div>
              {campaign && showDeleteConfirmation && (
                <OpenModalButton
                  className="delete-button"
                  buttonText="Delete Campaign"
                  modalComponent={
                    <DeleteConfirmationModal
                      show={showDeleteConfirmation}
                      onCancel={() => setShowDeleteConfirmation(false)}
                      campaignId={campaign.id}
                    />
                  }
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCampaignPage;
