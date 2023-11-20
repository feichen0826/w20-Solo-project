import React, { useEffect, useState } from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import {fetchCampaignDetailsAsync} from '../../store/campaignReducer'
import { fetchAllCampaignsAsync } from '../../store/campaignReducer';
import { fetchAllCategoryAsync } from '../../store/categoryReducer';
import { useParams, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import './CampaignDetailPage.css'

const CampaignDetailPage = () => {
const dispatch = useDispatch();
const { campaignId } = useParams();
const [isFavorited, setIsFavorited] = useState(false);
const singleCampaign = useSelector((state) => state.campaign.campaignDetails);

const allCampaigns = useSelector((state) => state.campaign.campaigns);
const allCategories = useSelector((state)=> state.category.category)
console.log(allCampaigns)

useEffect(() => {
  dispatch(fetchAllCampaignsAsync());
  dispatch(fetchAllCategoryAsync())
}, [dispatch]);

  useEffect(() => {
    dispatch(fetchCampaignDetailsAsync(campaignId))
  }, [dispatch, campaignId]);
  const categoryCampaigns = allCategories
  //const categoryCampaigns = allCampaigns.filter((campaign) => campaign.category === categoryId);

  if(allCampaigns.length === 0 || !allCampaigns){
    return null
  }
  if(allCategories.length === 0){
    return null
  }

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

  const handleFavoriteClick = (e) => {
    // e.stopPropagation();
    // setIsFavorited((prevState) => !prevState);
  };

  const uppercaseCategories = (categories) => {
    return categories.map((category) => category.toUpperCase()).join(', ');
  };

  const relatedCampaigns = allCampaigns.filter(
    (campaign) =>
     campaign.id !== singleCampaign.id
      // campaign.categories.some((category) =>
      //   singleCampaign.categories.map((cat) => cat.id).includes(category.id)
      //)
  )

  return (
    <>
    <div className="campaign-detail-page">
    <div className="campaign-image-container">
      <div>
      <img src={singleCampaign.imgUrl ? singleCampaign.imgUrl : singleCampaign.image} alt="Campaign" className="campaign-image3" />
      </div>

      <div className="campaign-details">
        <p className='campaign-detail-funding'>FUNDING</p>
        <h2 className="campaign-title1">{singleCampaign.title}</h2>
        <p className="campaign-description">{singleCampaign.description}</p>
        <div className="campaign-stats">
          <p className="campaign-stat">Username: {singleCampaign.userId}</p>

          <p className="campaign-stat">Backers: {singleCampaign.numBackers}</p>
          <div className='funding-percentage-info-container'>
                  <div className='usd-container'>
                    <div className="funding-details">${singleCampaign.currentFunding}</div>
                    <div className='usd-raised'>USD raised </div>
                  </div>
                    <div className='funding-percentage'>{((singleCampaign.currentFunding / singleCampaign.fundingGoal) * 100).toFixed(2)}%</div>
                </div>
                <div className="percentage-bar">
                  <div className="fill" style={{ width: `${((singleCampaign.currentFunding / singleCampaign.fundingGoal) * 100).toFixed(2)}%`}}></div>
                </div>
                <div className="days-left-container">
                  <i className="far fa-clock"></i>
                  <p className="days-left">{calculateDaysLeft(singleCampaign.startDate, singleCampaign.endDate)}</p>
                </div>
        </div>
        {/* <button className="see-options-button">See Options</button> */}
      </div>
    </div>
    <div className="story-section">
      <div className='story-title-container'>
      <p className="story-title">STORY</p>
      </div>
      <p className="campaign-story">{singleCampaign.story}</p>
    </div>

    <div className="campaign-category">
      <div className="category-info">{singleCampaign.categories && singleCampaign.Categories.map(category => category.name).join(', ')}</div>
    </div>
    </div>
    <div className='may-interest-container-background-grey'>

      <div className='campaign-column-container'>
      <div className='may-interest-container'>
      <p className='may-interest'>You may also be interested in</p>
      </div>
    <div className='campaign-column-campaign-detail'>
      {relatedCampaigns.map((campaign, index) => (
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
    </>
  );
};

export default CampaignDetailPage;
