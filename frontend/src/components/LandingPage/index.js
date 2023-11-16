import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { fetchAllCampaignsAsync } from '../../store/campaignReducer';
import { fetchAllCategoryAsync } from '../../store/categoryReducer';
import arrow from './arrow.png'
import black from './black.png'
import './LandingPage.css'
import technology from './technology.png'
import business from './business.png'
import education from './education.png'
import health from './health.png'
import sport from './sport.png'
import environment from './environment.png'

// import BackIcon from './path/to/back-icon.svg';
// import ForwardIcon from './path/to/forward-icon.svg';

const categoryIcons = {
  Technology: technology,
  Education:education,
  Health:health,
  Environment:environment,
  Business:business,
  Sports:sport


};

const LandingPage = () => {
  const [currentIndex, setCurrentIndex] = useState(9);
  const [startIndex, setStartIndex] = useState(0);
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

  const handlePrevClickConstrained = () => {
  setCurrentIndex((prevIndex) => Math.max(9, (prevIndex - 1) % allCampaigns.length));
};

const handleNextClickConstrained = () => {
  setCurrentIndex((prevIndex) => Math.min(9 + 7, (prevIndex + 1) % allCampaigns.length));
};


 const handleNextClick = () => {
    setStartIndex((prevIndex) => Math.min(prevIndex + 4, allCampaigns.length - 4));
  };

  const handlePrevClick = () => {
    setStartIndex((prevIndex) => Math.max(0, prevIndex - 4));
  };

  return (
    <div className="landing-page">
    <h1 className="landing-title">Find it first on VisionFund</h1>
    <p className="landing-description1">Vision Fund is where early adopters and innovation seekers find lively, imaginative tech before it hits the mainstream.</p>
    <Link to="/view-campaigns">
      <button className="explore-button">EXPLORE CAMPAIGNS</button>
    </Link>

    <div className="rotating-images-container">
    <div className="overlay"></div>
      <img src={allCampaigns[currentIndex].imgUrl} alt="Random Campaign" className="campaign-image1" />

      <div className="campaign-info1">
      <button className='vision-fund-picks'>FEATURED</button>
        <h2 className="campaign-title">{allCampaigns[currentIndex].title} </h2>
        <p className="campaign-description1">{allCampaigns[currentIndex].description}</p>
        <Link to={`/campaign/${allCampaigns[currentIndex].id}`} className="see-campaign-link">
          See Campaign
        </Link>
        <div>

        </div>
        <div className='arrow-container'>
        <div className="arrow-icons">
        <span className="arrow-left" onClick={handlePrevClickConstrained}>
          <img className="go-back-button" src={arrow} alt="Go Back" />
        </span>
        <span className="arrow-right" onClick={handleNextClickConstrained}>
          <img className="move-forward-button" src={arrow} alt="Move Forward" />
        </span>
      </div>
        <p className='campaign-number'>{currentIndex - 8} /8</p>
        </div>
      </div>
    </div>

<div className="popular-project-container">
  <div className='popular-project-title-container'>
    <h2 className="popular-projects-title">Popular Projects</h2>
    </div>

    <div className="horizontal-scrollable-bar">
    <div className="navigation-icons">
          <span className="back-icon" onClick={handlePrevClick}>
          <img className="go-back-button" src={black} alt="Go Back" />

          </span>

        </div>
      {allCampaigns.slice(startIndex, startIndex + 4).map((campaign, index) => (
        <Link to={`/campaign/${campaign.id}`} key={index} className="campaign-container">
          <img src={campaign.imgUrl} alt="Campaign" className="campaign-image" />
          <div className="campaign-info-container">
            <div className='funding-container'>
            <p className='funding'>Funding</p>
              <div className='save-favorite'>
              <i class="far fa-heart"></i>
              </div>
          </div>
          <div className='campaign-copy-container'>
          <div className='campaign-title-description-container'>
          <h3 className="campaign-title">{campaign.title}</h3>

          <p className="campaign-description">{campaign.description}</p>
          </div>
          <div className='funding-details-container'>
          <p className="funding-details">Funding: ${campaign.currentFunding}  ({((campaign.currentFunding / campaign.fundingGoal) * 100).toFixed(2)}%)</p>
          <p className="days-left">{calculateDaysLeft(campaign.startDate, campaign.endDate)}</p>
          <p className="campaign-categories">{campaign.categories}</p>
          </div>
          </div>
          </div>
        </Link>
      ))}
       <div className="navigation-icons">

          <span className="next-icon" onClick={handleNextClick}>

          <img className="move-forward-button" src={black} alt="Move Forward" />
          </span>
        </div>
    </div>
    </div>

    <div className = 'data-container'>
    <h1 className='data-title'>Project by project,</h1>
    <h1 className='data-title'>we're changing the way new ideas come to life.</h1>
    <div className="project-statistics">

      <div className="statistic">

        <h3>1B+</h3>
        <p>Total raised across all projects, from dance to design.</p>
      </div>
      <div className="statistic">
        <h3>11MM+</h3>
        <p>Contributions from our amazing community of backers for 650k+ projects.</p>
      </div>
      <div className="statistic">
        <h3>223</h3>
        <p>Countries & territories are home to Indiegogo users.</p>
      </div>
      <div className="statistic">
        <h3>18,983%</h3>
        <p>The most a campaign has exceeded its goal … so far!</p>
      </div>
    </div>
</div>

    <h2 className="interest-categories-title">Which categories interest you?</h2>
    <p className="interest-categories-description">Discover projects just for you and get great recommendations when you select your interests. Or explore our top categories.</p>
    <div className="category-icons">
      {allCategories.map((category, index) => (
        <Link to={`/${category.id}/campaigns`} key={index} className="category">
          <div className="category-container">
            <div >
          <img src={categoryIcons[category.name]} alt={category.name} className='category-icon'/>
           </div>
            <p className="category-name">{category.name}</p>
          </div>
        </Link>
      ))}
    </div>



    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h4>Contact Us</h4>
            <p>
                <i class="fas fa-envelope"></i>
               feichen0826@gmail.com
            </p>
            <p>
                <i class="fas fa-phone"></i>
                (310) 218 8694
            </p>

          </div>
          <div className="col-md-6">
            <h4>Follow Us</h4>

            <div className="social-icons">
            <a href="https://www.linkedin.com/in/fei-chen-651612193" target="_blank" rel="noopener noreferrer" className="small-link">
                <i className="fab fa-linkedin">
</i>www.linkedin.com/in/fei-chen-651612193
              </a>

            </div>
          </div>
        </div>
        <hr />
        <div className="row">

          <div className="col-md-6">
            <p className="copyright">&copy; 2023 VisionFund. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  </div>


);

};

export default LandingPage;
