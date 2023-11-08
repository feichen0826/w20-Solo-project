import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCampaignAsync, fetchCampaignDetailsAsync } from '../../store/campaignReducer';
import { useHistory } from 'react-router-dom';
import './EditCampaignForm.css';

const EditCampaignForm = ({ campaignId }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [campaign, setCampaign] = useState({
    title: '',
    description: '',
    category: '',
    story: '',
    startDate: '',
    endDate: '',
    imgUrl: null,
    fundingGoal: 0,
    currentFunding: 0,
    numBackers: 0,
    categories: [], // Categories selected for the campaign
  });

  const [errors, setErrors] = useState({});
  const [categoriesList, setCategoriesList] = useState([]); // The list of available categories

  // Load the existing campaign data and available categories when the component mounts
  useEffect(() => {
    // Fetch campaign data
    dispatch(fetchCampaignDetailsAsync(campaignId))
      .then((campaignData) => {
        if (campaignData) {
          // Set the campaign data in the local state
          setCampaign(campaignData);
        } else {
          // Handle not found or error condition
        }
      })
      .catch((error) => {
        console.error(error);
        // Handle the error, e.g., show an error message
      });

    // Fetch available categories from your API and set them in the categoriesList state
    // You can fetch this list from your server
    // Example:
    // fetchCategoriesList()
    //   .then((categories) => setCategoriesList(categories))
    //   .catch((error) => {
    //     console.error(error);
    //     // Handle the error, e.g., show an error message
    //   });
  }, [dispatch, campaignId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Your validation and error handling logic here

    const updatedCampaign = await dispatch(updateCampaignAsync(campaignId, campaign));

    if (updatedCampaign) {
      history.push(`/campaign/${campaignId}`);
    } else {
      return 'Error';
    }
  };

  const handleImageUpload = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      // Update the imgUrl in the campaign state with the selected image
      setCampaign({ ...campaign, imgUrl: selectedImage });
    }
  };

  // Handle adding/removing categories
  const handleAddCategory = () => {
    const newCategory = campaign.category;
    if (newCategory && !campaign.categories.includes(newCategory)) {
      // Update the categories array
      const updatedCategories = [...campaign.categories, newCategory];
      setCampaign({ ...campaign, categories: updatedCategories });
      setCampaign({ ...campaign, category: '' }); // Clear the category input
    }
  };

  const handleRemoveCategory = (categoryToRemove) => {
    const updatedCategories = campaign.categories.filter((cat) => cat !== categoryToRemove);
    setCampaign({ ...campaign, categories: updatedCategories });
  };

  return (
    <div className="edit-campaign-form">
    <h1>Campaign Content</h1>
      <h2>Content</h2>
      <p>Make a good first impression: introduce your campaign objectives and entice people to learn more. This basic information will represent your campaign on your campaign page, on your campaign card, and in searches.</p>

      <div className="form-container">
        <div className="form-group">
          <label>Campaign Title</label>
          <p>What is the title of your campaign?</p>
          <input
            type="text"
            value={campaign.title}
            onChange={(e) => setCampaign({ ...campaign, title: e.target.value })}
            required
          />
          {errors.title && <span className="error">{errors.title}</span>}
        </div>

        <div className="form-group">
          <label>Campaign Tagline</label>
          <p>Provide a short description that best describes your campaign to your audience.</p>
          <input
            type="text"
            value={campaign.description}
            onChange={(e) => setCampaign({ ...campaign, description: e.target.value })}
            required
          />
          {errors.description && <span className="error">{errors.description}</span>}
        </div>

        {/* Other campaign attribute form fields (e.g., story, startDate, endDate, fundingGoal, etc.) */}

        {/* Form field for selecting categories */}
        <div className="form-group">
        <label>Category</label>
        <p>To help backers find your campaign, select a category that best represents your project.</p>
          <select value={campaign.category} onChange={(e) => setCampaign({ ...campaign, category: e.target.value })}>
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

        {/* List of selected categories */}
        {campaign.categories.length > 0 && (
          <div>
            <p>Selected Categories:</p>
            <ul>
              {campaign.categories.map((cat) => (
                <li key={cat}>
                  {cat}
                  <button onClick={() => handleRemoveCategory(cat)}>Remove</button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="form-group">
          <label>Campaign Image</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </div>
      </div>
      <button onClick={handleSubmit}>Save Changes</button>
    </div>
  );
};

export default EditCampaignForm;
