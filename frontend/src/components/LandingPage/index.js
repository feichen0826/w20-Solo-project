import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// import { fetchRandomCampaigns, fetchPopularCampaigns } from './redux/campaignActions';

// import BackIcon from './path/to/back-icon.svg';
// import ForwardIcon from './path/to/forward-icon.svg';

const categories = [
  { name: 'Art', icon: 'art-icon.png' },
  { name: 'Technology', icon: 'tech-icon.png' },
  { name: 'Health', icon: 'health-icon.png' },
  { name: 'Food', icon: 'food-icon.png' },
  { name: 'Environment', icon: 'environment-icon.png' },
  { name: 'Sports', icon: 'sports-icon.png' },
];

const LandingPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const dispatch = useDispatch();
//   const randomCampaign = useSelector((state) => state.campaigns.randomCampaign);
//   const popularCampaigns = useSelector((state) => state.campaigns.popularCampaigns);

  useEffect(() => {
    // dispatch(fetchRandomCampaigns());
    // dispatch(fetchPopularCampaigns());
  }, [dispatch]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImageIndex((currentImageIndex + 1) % randomCampaign.length);
//     }, 5000);

//     return () => {
//       clearInterval(interval);
//     };
//   }, [currentImageIndex, randomCampaign]);

  const calculateDaysLeft = (startDate, endDate) => {
    const currentDate = new Date();
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

//   const handleBackClick = () => {
//     setCurrentImageIndex((currentImageIndex - 1 + randomCampaign.length) % randomCampaign.length);
//   };

//   const handleForwardClick = () => {
//     setCurrentImageIndex((currentImageIndex + 1) % randomCampaign.length);
//   };

  return (
    <div className="landing-page">
      <h1>Find it first on VisionFund</h1>
      <p>Vision Fund is where early adopters and innovation seekers find lively, imaginative tech before it hits the mainstream.</p>
      <button>EXPLORE CAMPAIGNS</button>

      {/* <div className="rotating-images-container">
        <img src={randomCampaign[currentImageIndex].image} alt="Random Campaign" />
        <div className="campaign-info">
          <h2>{randomCampaign[currentImageIndex].title}</h2>
          <p>{randomCampaign[currentImageIndex].description}</p>
          <a href="/campaign-detail">See Campaign</a>
          <div>
            <img src={BackIcon} alt="Back" onClick={handleBackClick} />
            <img src={ForwardIcon} alt="Forward" onClick={handleForwardClick} />
          </div>
        </div>
      </div> */}

      <h2>Popular Projects</h2>
      <div className="horizontal-scrollable-bar">
        {/* {popularCampaigns.map((campaign, index) => (
          <div key={index} className="campaign-container">
            <img src={campaign.image} alt="Campaign" />
            <h3>{campaign.title}</h3>
            <p>{campaign.description}</p>
            <p>Funding: {campaign.currentFunding} ({campaign.percentFunded}%)</p>
            <p>{calculateDaysLeft(campaign.startDate, campaign.endDate)}</p>
            <div>
              <img src={BackIcon} alt="Back" />
              <img src={ForwardIcon} alt="Forward" />
            </div>
          </div>
        ))} */}
      </div>

      <h2>Which categories interest you?</h2>
      <p>Discover projects just for you and get great recommendations when you select your interests. Or explore our top categories.</p>
      <div className="category-icons">
        {/* {categories.map((category, index) => (
          <div key={index} className="category">
            <img src={category.icon} alt={category.name} />
            <p>{category.name}</p>
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default LandingPage;
