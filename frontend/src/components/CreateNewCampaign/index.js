import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {createCampaignAsync} from '../../store/campaignReducer'
import { useHistory } from "react-router-dom";
import ErrorMessage from './ErrorMessage';
import './CreateNewCampaign.css'

const CreateNewCampaign = () => {
    const dispatch = useDispatch()
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState([]);
  const [story, setStory] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [image, setImage] = useState('');
  const [errors, setErrors] = useState({});
  const [fundingGoal, setFundingGoal] = useState(0);
  const [currentFunding, setCurrentFunding] = useState(0);
  const [numBackers, setNumBackers] = useState(0);
  const [categories, setCategories] = useState([]);
   const history = useHistory();
   const currentUser = useSelector((state) => state.session.user);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!title || title.length < 5) {
      newErrors.title = "Campaign Title must be at least 5 characters.";
    }

    // Validate description
    if (!description || description.length < 10) {
      newErrors.description = "Campaign Tagline must be at least 10 characters.";
    }

    // Validate story
    if (!story || story.length < 50) {
      newErrors.story = "Campaign Story must be at least 50 characters.";
    }

    // Validate startDate
    if (!startDate) {
      newErrors.startDate = "Start Date is required.";
    }

    // Validate endDate
    if (!endDate) {
      newErrors.endDate = "End Date is required.";
    } else {
      const startDateObj = new Date(startDate);
      const endDateObj = new Date(endDate);

      // Check if endDate is after startDate
      if (endDateObj <= startDateObj) {
        newErrors.endDate = "End date must be after the start date.";
      }

      // Check if endDate is in the future
      const currentDate = new Date();
      if (endDateObj <= currentDate) {
        newErrors.endDate = "End date must be in the future.";
      }
    }

    // Validate fundingGoal
    if (!fundingGoal || Number(fundingGoal) < 0) {
      newErrors.fundingGoal = "Funding Goal must be greater than 0.";
    }

    // Validate currentFunding
    if (currentFunding < 0) {
      newErrors.currentFunding = "Current Funding must be greater than or equal to 0.";
    }

    // Validate numBackers
    if (numBackers < 0) {
      newErrors.numBackers = "Number of Backers must be greater than or equal to 0.";
    }
console.log(errors)

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    const createdCampaign = await dispatch(
        createCampaignAsync({
            userId:currentUser.id,
            title,
            description,
            category:categories,
            story,
            startDate,
            endDate,
            image,
            fundingGoal,
            currentFunding,
            numBackers, }));
    console.log(createdCampaign)
    if(createdCampaign){
        history.push(`/campaign/${createdCampaign.id}`)
    }else{
        return "Error"
    }
  };
  //   dispatch(createCampaignAsync({
  //           userId:currentUser.id,
  //           title,
  //           description,
  //           category,
  //           story,
  //           startDate,
  //           endDate,
  //           image,
  //           fundingGoal,
  //           currentFunding,
  //           numBackers,
  //   })).then(()=>{
  //     setTitle("");
  //     setDescription("");
  //     setCategory("");
  //     setStory("");
  //     setStartDate('');
  //     setEndDate('');
  //     setImage(null);
  //     setFundingGoal(0);
  //     setCurrentFunding(0);
  //     setNumBackers(0)
  //   }).catch(async(res)=>{
  //     const data = await res.json();
  //     if (data && data.errors) {
  //       newErrors = data.errors;
  //       setErrors(newErrors);
  //     }
  //   })
  // };
  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleAddCategory = () => {
    if (category && !categories.includes(category)) {
      setCategories([...categories, category]);
      setCategory('');
    }
  };

  const handleRemoveCategory = (categoryToRemove) => {
    const updatedCategories = categories.filter((cat) => cat !== categoryToRemove);
    setCategories(updatedCategories);
  };

  return (
    <div className="create-new-campaign">
      <h1>Campaign Content</h1>
      <h2>Content</h2>
      <p>Make a good first impression: introduce your campaign objectives and entice people to learn more. This basic information will represent your campaign on your campaign page, on your campaign card, and in searches.</p>

      <div className="form-container">
        <div className="form-group">
        <label className="form-label">Campaign Title</label>
          <p className="form-description">What is the title of your campaign?</p>
          <input
            type="text"
            placeholder="My Campaign Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <ErrorMessage message={errors.title} />

        </div>

        <div className="form-group">
        <label className="form-label">Campaign Tagline</label>
          <p className="form-description">Provide a short description that best describes your campaign to your audience.</p>
          <input
            type="text"
            placeholder="My Campaign Tagline"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <ErrorMessage message={errors.description} />
        </div>

        <div className="form-group">
        <label className="form-label">Category</label>
          <p className="form-description">To help backers find your campaign, select a category that best represents your project.</p>
          <select value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="">Select a Category</option>
            <option value="Technology">Technology</option>
            <option value="Education">Education</option>
            <option value="Health">Health</option>
            <option value="Business">Business</option>
            <option value="Environment">Environment</option>
            <option value="Sports">Sports</option>
          </select>
          {/* {errors.category && <span className="error">{errors.category}</span>} */}
          <ErrorMessage message={errors.category} />
          <button onClick={handleAddCategory} className="add-category-button">+ Add Category</button>

        </div>

        {categories.length > 0 && (
          <div className="selected-categories">
            <p>Selected Categories:</p>
            <ul>
              {categories.map((cat) => (
                <li key={cat}>
                  {cat}
                  <button onClick={() => handleRemoveCategory(cat)}>Remove</button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="form-group">
        <label className="form-label">Campaign Story</label>
          <p className="form-description">Tell potential contributors more about your campaign. Provide details that will motivate people to contribute. A good pitch is compelling, informative, and easy to digest.</p>
          <textarea
            value={story}
            onChange={(e) => setStory(e.target.value)}
            required
            className="form-input"
          />
          {/* {errors.story && <span className="error">{errors.story}</span>} */}
          <ErrorMessage message={errors.story} />
        </div>

        <div className="form-group">
          <label className="form-label">Campaign Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
          {/* {errors.startDate && <span className="error">{errors.startDate}</span>} */}
          <ErrorMessage message={errors.startDate} />
        </div>

        <div className="form-group">
          <label className="form-label">Campaign End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
          {/* {errors.endDate && <span className="error">{errors.endDate}</span>} */}
          <ErrorMessage message={errors.endDate} />
        </div>

        <div className="form-group">
            <label className="form-label">Image</label>
            <p className="form-description">Add a image to appear on the top of your campaign page. Campaigns with images raise 2000% more than campaigns without images.</p>
            <input type="file"  onChange={(e)=>setImage(e.target.files[0])} />
        </div>

        <div className="form-group">
          <label className="form-label">Campaign Goal Amount & Currency</label>
          <p className="form-description">How much money would you like to raise for this campaign?</p>
          <input
            type="number"

            value={fundingGoal}
            onChange={(e) => setFundingGoal(e.target.value)}
            required
          />
          <ErrorMessage message={errors.fundingGoal} />
        </div>

        <div className="form-group">
          <label className="form-label">Current Funding</label>
          <p className="form-description">How much money has been raised for this campaign?</p>
          <input
            type="number"
            value={currentFunding}
            onChange={(e) => setCurrentFunding(e.target.value)}
            required
          />
          <ErrorMessage message={errors.currentFunding} />
        </div>


        <div className="form-group">
          <label className="form-label">Number of Backers</label>
          <p className="form-description">How many backers have supported this campaign?</p>
          <input
            type="number"
            value={numBackers}
            onChange={(e) => setNumBackers(e.target.value)}
            required
          />
          <ErrorMessage message={errors.numBackers} />
        </div>
      </div>

      <button onClick={handleSubmit}>Create Campaign</button>
    </div>
  );
};

export default CreateNewCampaign;
