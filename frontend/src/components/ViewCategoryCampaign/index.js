import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { fetchAllCampaignsAsync } from '../../store/campaignReducer';
import { fetchAllCategoryAsync } from '../../store/categoryReducer';
import { Link } from "react-router-dom";

const ViewCategoryCampaign = () => {
      const dispatch = useDispatch();
    const paramId = useParams();

    const categoryId = parseInt(paramId.categoryId)
  const allCampaigns = useSelector((state) => state.campaign.campaigns);
  const allCategories = useSelector((state)=> state.category.category)
  console.log(allCampaigns)
  console.log(allCategories)

  useEffect(() => {
    dispatch(fetchAllCampaignsAsync());
    dispatch(fetchAllCategoryAsync())
 }, [dispatch]);

 if(allCampaigns.length === 0 || !allCampaigns){
  return null
}
if(allCategories.length === 0){
  return null
}


const categoryCampaigns = allCategories.filter((category) => category.id === categoryId);
//const categoryCampaigns = allCampaigns.filter((campaign) => campaign.category === categoryId);
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


console.log()
  return (

    <div>
      <h1>VisionFund Campaigns</h1>
        <p>Fund new and groundbreaking projects, including hits from VisionFund InDemand.</p>
      {categoryCampaigns[0].Campaigns.map((campaign) => (

        <div key={campaign.id}>
           <img src={campaign.imgUrl} alt="Campaign" />
            <h3>{campaign.title}</h3>
            <p>{campaign.description}</p>
            <p>Funding: ${campaign.currentFunding}  ({((campaign.currentFunding / campaign.fundingGoal) * 100).toFixed(2)}%)</p>
            <p>{calculateDaysLeft(campaign.startDate, campaign.endDate)}</p>
            <p>{campaign.categories}</p>

        </div>


      ))}
  <div className="left-column">
              {allCategories.map((category, index) => (
              <Link to={`/${category.id}/campaigns`} key={index} className="category">
              <div>
                <p>{category.name}</p>
              </div>
              </Link>
            ))}
          </div>
    </div>
  );
};

export default ViewCategoryCampaign;
