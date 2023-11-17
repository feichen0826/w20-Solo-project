import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { fetchAllCampaignsAsync } from '../../store/campaignReducer';
import { fetchAllCategoryAsync } from '../../store/categoryReducer';
import banner from './banner.jpg'
import './ViewCampaignsList.css'

const ViewCampaignsList = () => {
    const dispatch = useDispatch();
    const allCampaigns = useSelector((state) => state.campaign.campaigns);
    const allCategories = useSelector((state)=> state.category.category)
    const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('mostFunded');
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);
  const [isFavorited, setIsFavorited] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
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

      // if(allCampaigns.length === 0 || !allCampaigns){
      //   return null
      // }
      // if(allCategories.length === 0){
      //   return null
      // }
      const handleFavoriteClick = (e) => {
        // e.stopPropagation();
        // setIsFavorited((prevState) => !prevState);
      };

      const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
      };

      const handleSortChange = (e) => {
        setSortOption(e.target.value);
      };

      useEffect(() => {
        if (allCampaigns.length === 0 || !allCampaigns || allCategories.length === 0) {
          return;
        }

        const filteredCampaigns = allCampaigns.filter(
          (campaign) =>
          (campaign.title && campaign.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (campaign.description && campaign.description.toLowerCase().includes(searchTerm.toLowerCase()))
        );

        const sortedCampaigns = filteredCampaigns.sort((a, b) => {
          if (sortOption === 'mostFunded') {
            return b.currentFunding - a.currentFunding;
          } else if (sortOption === 'mostRecent') {
            return new Date(b.startDate) - new Date(a.startDate);
          }
        });
        setFilteredCampaigns(sortedCampaigns);
      }, [allCampaigns, sortOption, searchTerm, allCategories]);

      const uppercaseCategories = (categories) => {
        return categories.map((category) => category.toUpperCase()).join(', ');
      };

      const handleCategoryClick = (index) => {
        setActiveCategory(index);
      };
  return (
    <>
    <div className="banner">
      <img src={banner} className= 'banner-bg-image'></img>
      <h1 className="banner-title">VisionFund Campaigns</h1>
      <p className="banner-description">Fund new and groundbreaking projects, including hits from VisionFund InDemand.</p>
    </div>
    <div className="view-campaigns-list">

      <div className="campaigns-grid">
        <div className='left-column-container'>
        <div className="search-bar-sort-by-container">
        <div className="search-container">
            <i className="fas fa-search search-icon"></i>
            <input
                type="text"
                placeholder="Search for campaigns"
                className="search-input"
                value={searchTerm}
                onChange={handleSearchChange}
            />
            </div>

          <div className="sort-by">
            <label className="sort-label">Sort by:</label>
            <select className="sort-select" value={sortOption} onChange={handleSortChange}>
              <option value="mostFunded">Most Funded</option>
              <option value="mostRecent">Most Recent</option>
            </select>
          </div>
          </div>
          <div className='campaign-column'>
          {filteredCampaigns.map((campaign, index) => (
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

        <div className="right-column">

          <div className="category-list">
            <p className='filter-result'>Filter results</p>
            <p className='filter-result-category'>CATEGORY</p>
            <div className='all-categories-container'>
            <Link to="/view-campaigns">
                <p className={`category-name ${activeCategory === null ? 'active' : ''}`}>All categories</p>
              </Link>
              </div>
            {allCategories.map((category, index) => (
              <Link to={`/${category.id}/campaigns`} key={index} className={`category-name ${activeCategory === null ? 'active' : ''}`} onClick={() => handleCategoryClick(index)}>
                <p className="category-name">{category.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ViewCampaignsList;
