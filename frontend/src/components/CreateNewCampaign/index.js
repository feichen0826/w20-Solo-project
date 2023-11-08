import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {createCampaignAsync} from '../../store/campaignReducer'
import { useHistory } from "react-router-dom";
import './CreateNewCampaign.css'

const CreateNewCampaign = () => {
    const dispatch = useDispatch()
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [story, setStory] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [imgUrl, setImgUrl] = useState(null);
  const [errors, setErrors] = useState({});
  const [fundingGoal, setFundingGoal] = useState(0);
  const [currentFunding, setCurrentFunding] = useState(0);
  const [numBackers, setNumBackers] = useState(0);
  const [categories, setCategories] = useState([]);
   const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!title) {
      newErrors.title = "Campaign Title is required.";
    }
    if (!description) {
      newErrors.description = "Campaign Tagline is required.";
    }

    if (!category) {
      newErrors.category = "Category is required.";
    }

    if (!story) {
      newErrors.story = "Campaign Story is required.";
    }

    if (!startDate) {
      newErrors.startDate = "Start Date is required.";
    }

    if (!endDate) {
      newErrors.endDate = "End Date is required.";
    }

    if (!fundingGoal) {
      newErrors.fundingGoal = 'Valid Funding Goal is required.';
    }

    if (!currentFunding ) {
      newErrors.currentFunding = 'Valid Current Funding is required.';
     }

    if (!numBackers) {
     newErrors.numBackers = 'Valid Number of Backers is required.';
     }


    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    const createdCampaign = await dispatch(
        createCampaignAsync({
            title,
            description,
            category,
            story,
            startDate,
            endDate,
            imgUrl,
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

  // Add a function to handle image file selection
  const handleImageUpload = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      setImgUrl(selectedImage);
    }
  };

  const handleAddCategory = () => {
    if (category && !categories.includes(category)) {
      setCategories([...categories, category]);
      setCategory(''); // Clear the category input
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
          <label>Campaign Title</label>
          <p>What is the title of your campaign?</p>
          <input
            type="text"
            placeholder="My Campaign Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          {errors.title && <span className="error">{errors.title}</span>}
        </div>

        <div className="form-group">
          <label>Campaign Tagline</label>
          <p>Provide a short description that best describes your campaign to your audience.</p>
          <input
            type="text"
            placeholder="My Campaign Tagline"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          {errors.description && <span className="error">{errors.description}</span>}
        </div>

        <div className="form-group">
          <label>Category</label>
          <p>To help backers find your campaign, select a category that best represents your project.</p>
          <select value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="">Select a Category</option>
            <option value="Technology">Technology</option>
            <option value="Education">Education</option>
            <option value="Health">Health</option>
            <option value="Business">Business</option>
            <option value="Environment">Environment</option>
            <option value="Sports">Sports</option>
          </select>
          {errors.category && <span className="error">{errors.category}</span>}
          <button onClick={handleAddCategory}>+ Add Category</button>
        </div>

        {categories.length > 0 && (
        <div>
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
          <label>Campaign Story</label>
          <p>Tell potential contributors more about your campaign. Provide details that will motivate people to contribute. A good pitch is compelling, informative, and easy to digest.</p>
          <textarea
            value={story}
            onChange={(e) => setStory(e.target.value)}
            required
          />
          {errors.story && <span className="error">{errors.story}</span>}
        </div>

        <div className="form-group">
          <label>Campaign Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
          {errors.startDate && <span className="error">{errors.startDate}</span>}
        </div>

        <div className="form-group">
          <label>Campaign End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
          {errors.endDate && <span className="error">{errors.endDate}</span>}
        </div>

        <div className="form-group">
            <label>Image</label>
            <p>Add a image to appear on the top of your campaign page. Campaigns with images raise 2000% more than campaigns without images.</p>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
        </div>

        <div className="form-group">
          <label>Campaign Goal Amount & Currency</label>
          <p>How much money would you like to raise for this campaign?</p>
          <input
            type="number"
            placeholder="$"
            value={fundingGoal}
            onChange={(e) => setFundingGoal(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Current Funding</label>
          <p>How much money has been raised for this campaign?</p>
          <input
            type="number"
            placeholder="$"
            value={currentFunding}
            onChange={(e) => setCurrentFunding(e.target.value)}
            required
          />
          {errors.currentFunding && <span className="error">{errors.currentFunding}</span>}
        </div>


        <div className="form-group">
          <label>Number of Backers</label>
          <p>How many backers have supported this campaign?</p>
          <input
            type="number"
            value={numBackers}
            onChange={(e) => setNumBackers(e.target.value)}
            required
          />
          {errors.numBackers && <span className="error">{errors.numBackers}</span>}
        </div>
      </div>

      <button onClick={handleSubmit}>Create Campaign</button>
    </div>
  );
};

export default CreateNewCampaign;
