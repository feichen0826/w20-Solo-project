import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { fetchAllCampaignsAsync } from '../../store/campaignReducer';
import { fetchAllCategoryAsync } from '../../store/categoryReducer';
import './ViewCampaignsList.css'

const ViewCampaignsList = () => {
    const dispatch = useDispatch();
    const allCampaigns = useSelector((state) => state.campaign.campaigns);
    const allCategories = useSelector((state)=> state.category.category)
    const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('mostFunded');
    console.log(allCampaigns)

    useEffect(() => {
       dispatch(fetchAllCampaignsAsync());
       dispatch(fetchAllCategoryAsync())
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

      if(allCampaigns.length === 0 || !allCampaigns){
        return null
      }
      if(allCategories.length === 0){
        return null
      }


      const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
      };

      const handleSortChange = (e) => {
        setSortOption(e.target.value);
      };

   const filteredCampaigns = allCampaigns.filter((campaign) =>
    campaign.title && campaign.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

      const sortedCampaigns = filteredCampaigns.sort((a, b) => {
        if (sortOption === 'mostFunded') {
          return b.currentFunding - a.currentFunding;
        } else if (sortOption === 'date') {
          return new Date(a.startDate) - new Date(b.startDate);
        }
        return 0;
      });

  return (
    <div className="view-campaigns-list">
      <div className="banner">
        <h1 className="banner-title">VisionFund Campaigns</h1>
        <p className="banner-description">Fund new and groundbreaking projects, including hits from VisionFund InDemand.</p>
      </div>
      <div className="campaigns-grid">
        <div className="left-column">
        <input type="text"
          placeholder="Search for campaigns"
          className="search-input"
          value={searchTerm}
          onChange={handleSearchChange}
          />
          <div className="sort-by">
            <label className="sort-label">Sort by:</label>
            <select className="sort-select" value={sortOption} onChange={handleSortChange}>
              <option value="mostFunded">Most Funded</option>
              <option value="date">Date</option>
            </select>
          </div>
          <div className='campaign-column'>
          {allCampaigns.map((campaign, index) => (
            <Link to={`/campaign/${campaign.id}`} key={index} className="campaign-container">
              <img src={campaign.imgUrl} alt="Campaign" className="campaign-image2" />
              <div className='view-campaign-copy'>
              <p className='funding'>Funding</p>
              <div>
              <i class="far fa-heart"></i>
              </div>
              <h3 className="campaign-title">{campaign.title}</h3>
              <p className="campaign-description">{campaign.description}</p>
              <p className="funding-details">
                Funding: ${campaign.currentFunding} ({((campaign.currentFunding / campaign.fundingGoal) * 100).toFixed(2)}%)
              </p>
              <p className="days-left">{calculateDaysLeft(campaign.startDate, campaign.endDate)}</p>
              <p className="categories">{campaign.categories}</p>
              </div>
            </Link>
          ))}
          </div>
        </div>

        <div className="right-column">

          <div className="category-list">
            {allCategories.map((category, index) => (
              <Link to={`/${category.id}/campaigns`} key={index} className="category">
                <p className="category-name">{category.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCampaignsList;
