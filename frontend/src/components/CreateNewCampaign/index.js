import React, { useState } from 'react';
import './CreateNewCampaign.css'

const CreateNewCampaign = () => {
  const [campaignTitle, setCampaignTitle] = useState('');
  const [campaignTagline, setCampaignTagline] = useState('');
  const [category, setCategory] = useState('');
  const [campaignStory, setCampaignStory] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!campaignTitle) {
      newErrors.campaignTitle = "Campaign Title is required.";
    }
    if (!campaignTagline) {
      newErrors.campaignTagline = "Campaign Tagline is required.";
    }

    if (!category) {
      newErrors.category = "Category is required.";
    }

    if (!campaignStory) {
      newErrors.campaignStory = "Campaign Story is required.";
    }

    if (!startDate) {
      newErrors.startDate = "Start Date is required.";
    }

    if (!endDate) {
      newErrors.endDate = "End Date is required.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }


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
            value={campaignTitle}
            onChange={(e) => setCampaignTitle(e.target.value)}
            required
          />
          {errors.campaignTitle && <span className="error">{errors.campaignTitle}</span>}
        </div>

        <div className="form-group">
          <label>Campaign Tagline</label>
          <p>Provide a short description that best describes your campaign to your audience.</p>
          <input
            type="text"
            placeholder="My Campaign Tagline"
            value={campaignTagline}
            onChange={(e) => setCampaignTagline(e.target.value)}
            required
          />
          {errors.campaignTagline && <span className="error">{errors.campaignTagline}</span>}
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
        </div>

        <div className="form-group">
          <label>Campaign Story</label>
          <p>Tell potential contributors more about your campaign. Provide details that will motivate people to contribute. A good pitch is compelling, informative, and easy to digest.</p>
          <textarea
            value={campaignStory}
            onChange={(e) => setCampaignStory(e.target.value)}
            required
          />
          {errors.campaignStory && <span className="error">{errors.campaignStory}</span>}
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
      </div>

      <button onClick={handleSubmit}>Create Campaign</button>
    </div>
  );
};

export default CreateNewCampaign;
