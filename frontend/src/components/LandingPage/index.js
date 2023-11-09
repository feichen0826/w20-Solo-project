import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { fetchAllCampaignsAsync } from '../../store/campaignReducer';
import { fetchAllCategoryAsync } from '../../store/categoryReducer';
import './LandingPage.css'

// import BackIcon from './path/to/back-icon.svg';
// import ForwardIcon from './path/to/forward-icon.svg';

// const categories = [
//   { name: 'Art', icon: 'art-icon.png' },
//   { name: 'Technology', icon: 'tech-icon.png' },
//   { name: 'Health', icon: 'health-icon.png' },
//   { name: 'Food', icon: 'food-icon.png' },
//   { name: 'Environment', icon: 'environment-icon.png' },
//   { name: 'Sports', icon: 'sports-icon.png' },
// ];

const LandingPage = () => {
  const [currentIndex, setCurrentIndex] = useState(9);
  const [intervalId, setIntervalId] = useState(null);
  const dispatch = useDispatch();
  const allCampaigns = useSelector((state) => state.campaign.campaigns);
  console.log(allCampaigns)
  const allCategories = useSelector((state)=> state.category.category)
  console.log(allCategories)

  useEffect(() => {
     dispatch(fetchAllCampaignsAsync());
     dispatch(fetchAllCategoryAsync())
  }, [dispatch]);



  const startCarousel = () => {
    const id = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === 16 ? 9 : prevIndex + 1));
    }, 5000);
    setIntervalId(id);
  };

  const stopCarousel = () => {
    clearInterval(intervalId);
  };

  useEffect(() => {
    startCarousel();

    return () => {
      stopCarousel();
    };
  }, []);

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

//   const handleBackClick = () => {
//     setCurrentImageIndex((currentImageIndex - 1 + randomCampaign.length) % randomCampaign.length);
//   };

//   const handleForwardClick = () => {
//     setCurrentImageIndex((currentImageIndex + 1) % randomCampaign.length);
//   };

  return (
    <div className="landing-page">
    <h1 className="landing-title">Find it first on VisionFund</h1>
    <p className="landing-description">Vision Fund is where early adopters and innovation seekers find lively, imaginative tech before it hits the mainstream.</p>
    <Link to="/view-campaigns">
      <button className="explore-button">EXPLORE CAMPAIGNS</button>
    </Link>

    <div className="rotating-images-container">
      <img src={allCampaigns[currentIndex].imgUrl} alt="Random Campaign" className="campaign-image" />
      <div className="campaign-info">
        <h2 className="campaign-title">{allCampaigns[currentIndex].title}</h2>
        <p className="campaign-description">{allCampaigns[currentIndex].description}</p>
        {/* <Link to={`/campaign/${allCampaigns[currentIndex].campaignId}`} className="see-campaign-link">
          See Campaign
        </Link> */}
        <div>

        </div>
      </div>
    </div>

    <h2 className="popular-projects-title">Popular Projects</h2>
    <div className="horizontal-scrollable-bar">
      {allCampaigns.slice(4, 8).map((campaign, index) => (
        <Link to={`/campaign/${campaign.id}`} key={index} className="campaign-container">
          <img src={campaign.imgUrl} alt="Campaign" className="campaign-image" />
          <h3 className="campaign-title">{campaign.title}</h3>
          <p className="campaign-description">{campaign.description}</p>
          <p className="funding-details">Funding: ${campaign.currentFunding}  ({((campaign.currentFunding / campaign.fundingGoal) * 100).toFixed(2)}%)</p>
          <p className="days-left">{calculateDaysLeft(campaign.startDate, campaign.endDate)}</p>
          <p className="campaign-categories">{campaign.categories}</p>
        </Link>
      ))}
    </div>

    <h2 className="interest-categories-title">Which categories interest you?</h2>
    <p className="interest-categories-description">Discover projects just for you and get great recommendations when you select your interests. Or explore our top categories.</p>
    <div className="category-icons">
      {allCategories.map((category, index) => (
        <Link to={`/${category.id}/campaigns`} key={index} className="category">
          <div className="category-container">
            <p className="category-name">{category.name}</p>
          </div>
        </Link>
      ))}
    </div>
  </div>
);
  //   <div className="landing-page">
  //     <h1>Find it first on VisionFund</h1>
  //     <p>Vision Fund is where early adopters and innovation seekers find lively, imaginative tech before it hits the mainstream.</p>
  //     <Link to="/view-campaigns">
  //       <button>EXPLORE CAMPAIGNS</button>
  //     </Link>

  //       <div className="rotating-images-container">
  //         <img src={allCampaigns[currentIndex].imgUrl} alt="Random Campaign" />
  //           <div className="campaign-info">
  //             <h2>{allCampaigns[currentIndex].title}</h2>
  //             <p>{allCampaigns[currentIndex].description}</p>
  //             <Link to={`/campaign/${allCampaigns[currentIndex].campaignId}`}>
  //               See Campaign
  //             </Link>
  //             <div>
  //               {/* <img src={BackIcon} alt="Back" onClick={handleBackClick} />
  //               <img src={ForwardIcon} alt="Forward" onClick={handleForwardClick} /> */}
  //             </div>
  //           </div>
  //       </div>

  //     <h2>Popular Projects</h2>
  //     <div className="horizontal-scrollable-bar">
  //       {allCampaigns.slice(4, 8).map((campaign, index) => (
  //         <Link to={`/campaign/${campaign.id}`} key={index} className="campaign-container">

  //           <img src={campaign.imgUrl} alt="Campaign" />
  //           <h3>{campaign.title}</h3>
  //           <p>{campaign.description}</p>
  //           <p>Funding: ${campaign.currentFunding}  ({((campaign.currentFunding / campaign.fundingGoal) * 100).toFixed(2)}%)</p>
  //           <p>{calculateDaysLeft(campaign.startDate, campaign.endDate)}</p>
  //           <p>{campaign.categories}</p>
  //           </Link>
  //       ))}
  //     </div>


  //     <h2>Which categories interest you?</h2>
  //     <p>Discover projects just for you and get great recommendations when you select your interests. Or explore our top categories.</p>
  //     <div className="category-icons">
  //       {allCategories.map((category, index) => (
  //         <Link to={`/${category.id}/campaigns`} key={index} className="category">
  //         <div>
  //           <p>{category.name}</p>
  //         </div>
  //         </Link>
  //       ))}
  //     </div>
  //   </div>
  // );
};

export default LandingPage;
