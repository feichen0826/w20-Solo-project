import React, { useEffect, useState } from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import {fetchCampaignDetailsAsync} from '../../store/campaignReducer'
import { fetchAllCampaignsAsync } from '../../store/campaignReducer';
import { fetchAllCategoryAsync } from '../../store/categoryReducer';
import {fetchUserDetailsAsync} from '../../store/session'
import { useParams, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import BackThisProject from '../BackThisProject';
import arrow from './arrow.png'
import black from './black.png'
import { Modal, useModal } from "../../context/Modal";

import './CampaignDetailPage.css'

const CampaignDetailPage = () => {
    const [currentIndex, setCurrentIndex] = useState(9);

const dispatch = useDispatch();
const { closeModal } = useModal();
const { campaignId } = useParams();
const [isFavorited, setIsFavorited] = useState(false);
const singleCampaign = useSelector((state) => state.campaign.campaignDetails);

const allCampaigns = useSelector((state) => state.campaign.campaigns);
const allCategories = useSelector((state)=> state.category.category)
const currentUser = useSelector((state)=> state.session.user)
console.log(currentUser)
const [isPopupOpen, setPopupOpen] = useState(false);
const [startIndex, setStartIndex] = useState(0);
const [visibleCampaigns, setVisibleCampaigns] = useState(4);
const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(true);

const handleSeeOptionsClick = () => {
  setPopupOpen(true);
};

const handleClosePopup = () => {
  // e.preventDefault();
    closeModal();
};

const [userDetailsFetched, setUserDetailsFetched] = useState(false);

useEffect(() => {
  if (currentUser && !userDetailsFetched) {
    dispatch(fetchUserDetailsAsync());
    setUserDetailsFetched(true);
  }
}, [dispatch, currentUser, userDetailsFetched]);


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

  // const relatedCampaigns = allCampaigns.filter(
  //   (campaign) =>
  //    campaign.id !== singleCampaign.id
  //     // campaign.categories.some((category) =>
  //     //   singleCampaign.categories.map((cat) => cat.id).includes(category.id)
  //     //)
  // )
  const handleBackClick = () => {
    setStartIndex((prevIndex) => Math.min(prevIndex + 4, allCampaigns.length - 4));
  };

  const handleForwardClick = () => {
    setStartIndex((prevIndex) => Math.max(0, prevIndex - 4));
  };

  const percentage = (singleCampaign.currentFunding / singleCampaign.fundingGoal) * 100;
const progressBarWidth = percentage > 100 ? 100 : percentage;

console.log(currentUser)
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
        <div className='campaign-user-container-box'>
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
        <div className='campaign-stats-container'>
        <p className="campaign-stat">{singleCampaign.numBackers} backers</p>
        <div className="campaign-stats">


          <div className='funding-percentage-info-container'>
                  <div className='usd-container'>
                    <div className="funding-details">${singleCampaign.currentFunding}</div>
                    <div className='usd-raised'>USD raised </div>
                  </div>
                    <div className='funding-percentage2'>{((singleCampaign.currentFunding / singleCampaign.fundingGoal) * 100).toFixed(2)}%</div>
                </div>
                <div className="percentage-bar">
                <div className="fill" style={{ width: `${progressBarWidth.toFixed(2)}%` }}></div>
                </div>
                <div className="days-left-container">
                  <i className="far fa-clock"></i>
                  <p className="days-left">{calculateDaysLeft(singleCampaign.startDate, singleCampaign.endDate)}</p>
                </div>
        </div>
        <div className='buttons-container'>
           {/* <button onClick={handleSeeOptionsClick}>See Options</button> */}
        {/* <button className='see-options-button'>See options</button> */}
        {currentUser && currentUser.user && (
            <OpenModalButton
            buttonText="See options"

            modalComponent= {
              <BackThisProject
              campaignId={singleCampaign.id}
              currentUser={currentUser}
              />
            }

  />
            )}



        {/* <button className='follow-button'><i className="far fa-heart"></i> Follow</button> */}
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
    </>
  );
};

export default CampaignDetailPage;
