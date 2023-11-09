import { csrfFetch } from "./csrf";

// Action types
const FETCH_ALL_CAMPAIGNS = 'campaign/fetchAllCampaigns';
const FETCH_CAMPAIGN_DETAILS = 'campaign/fetchCampaignDetails';
const CREATE_CAMPAIGN = 'campaign/createCampaign';
const DELETE_CAMPAIGN = 'campaign/deleteCampaign';
const UPDATE_CAMPAIGN = 'campaign/updateCampaign';


// Action creator
const fetchAllCampaigns = (campaigns) => {
  return {
    type: FETCH_ALL_CAMPAIGNS,
    campaigns,
  };
};

const fetchCampaignDetails = (campaignDetails) => {
  return {
    type: FETCH_CAMPAIGN_DETAILS,
    campaignDetails,
  };
};

const createCampaign = (campaign) => {
  return {
    type: CREATE_CAMPAIGN,
    campaign,
  };
};

const updateCampaign = (campaignId, campaignData) =>{
  return {
    type: UPDATE_CAMPAIGN,
    campaignId,
    campaignData
  };
}

export const deleteCampaign = (campaignId) => {
  return {
    type: DELETE_CAMPAIGN,
    campaignId,
  };
};



// Thunk action
export const fetchAllCampaignsAsync = () => async (dispatch) => {
  const response = await csrfFetch('/api/campaigns');
  const campaignsData = await response.json();
  dispatch(fetchAllCampaigns(campaignsData));
};

export const fetchCampaignDetailsAsync = (campaignId) => async (dispatch) => {
  const response = await csrfFetch(`/api/campaigns/${campaignId}`);

  if ( response.ok ) {
    const campaignDetails = await response.json();
    dispatch(fetchCampaignDetails(campaignDetails));
    return campaignDetails;
  }else {
    return "Error"
  }
};

export const createCampaignAsync = (campaignData) => async (dispatch) => {

  const{title, description,category, story,startDate, endDate, image, fundingGoal, currentFunding, numBackers} = campaignData
  console.log(campaignData)
  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("category", category);
  formData.append("story", story);
  formData.append("startDate", startDate);
  formData.append("endDate", endDate);
  formData.append("fundingGoal", fundingGoal);
  formData.append("currentFunding", currentFunding);
  formData.append("numBackers", numBackers);



  if (image) {
    const imageUrl = image;
    formData.append("imgUrl", imageUrl);
  }

  const response = await csrfFetch('/api/campaigns', {
    method: 'POST',
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  });

  console.log(response)
  if (response.ok) {
    const createdCampaign = await response.json();
    dispatch(createCampaign(createdCampaign.campaign));
    return createdCampaign;
  } else {
    const errors = await response.json();
    return errors;
  }
};

// export const createCampaignAsync = (campaignData) => async (dispatch) => {

//   const response = await csrfFetch('/api/campaigns', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(campaignData),
//   });
//   console.log(response)
//   if (response.ok) {
//     const createdCampaign = await response.json();
//       dispatch(createCampaign(createdCampaign))
//       console.log(createdCampaign)
//     return createdCampaign;
//   } else {
//     const errors = await response.json();
//     return errors;
//   }
// };
export const updateCampaignAsync = (campaignId, campaignData) => async (dispatch) => {
  const {
    title,
    description,
    category,
    story,
    startDate,
    endDate,
    image,
    fundingGoal,
    currentFunding,
    numBackers,
  } = campaignData;

  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("category", category);
  formData.append("story", story);
  formData.append("startDate", startDate);
  formData.append("endDate", endDate);
  formData.append("fundingGoal", fundingGoal);
  formData.append("currentFunding", currentFunding);
  formData.append("numBackers", numBackers);

  if (image) {
    const imageUrl = image;
    formData.append("imgUrl", imageUrl);
  }

  const response = await csrfFetch(`/api/campaigns/${campaignId}`, {
    method: 'PUT',
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  });

  console.log(response);

  if (response.ok) {
    const updatedCampaign = await response.json();
    dispatch(updateCampaign(updatedCampaign.campaign));
    return updatedCampaign;
  } else {
    const errors = await response.json();
    return errors;
  }
};


// export const updateCampaignAsync = (campaignId, campaignData) => async (dispatch) => {
//   const response = await csrfFetch(`/api/campaigns/${campaignId}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(campaignData),
//   });

//   if (response.ok) {
//     const updatedCampaign = await response.json();
//     dispatch(updateCampaign(updatedCampaign));
//     return updatedCampaign;
//   } else {
//     const errors = await response.json();
//     return errors;
//   }
// };


export const deleteCampaignAsync = (campaignId) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/campaigns/${campaignId}`, {
      method: 'DELETE',
    });
    console.log(response)
    if (response.ok) {
      dispatch(deleteCampaign(campaignId));
    } else if (response.status === 404) {
      console.error('Campaign not found');
    } else {
      console.error('Error deleting campaign:', response.status);
    }
  } catch (error) {
    console.error('Error deleting campaign:', error);
  }
};

// Reducer
const initialState = {
  campaigns: [],
  campaignDetails: [],
};

const campaignReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case FETCH_ALL_CAMPAIGNS:
      return {
        ...state,
        campaigns: action.campaigns,
      };
    case FETCH_CAMPAIGN_DETAILS:
       newState = {...state};
        newState.campaignDetails = action.campaignDetails
      return newState
    case CREATE_CAMPAIGN:
      return {
        ...state,
        campaigns: [...state.campaigns, action.campaign],
      };
    case UPDATE_CAMPAIGN:
        newState = { ...state };
          newState.campaignDetails[action.campaignId] = {
            ...newState.campaignDetails[action.campaignId],
            ...action.campaignData,
          };
    return newState;

    case DELETE_CAMPAIGN:
      newState = { ...state };
      delete newState.campaigns[action.campaignId];
      return newState;
    // case DELETE_CAMPAIGN:
    //   const updatedCampaigns = state.campaigns.filter(
    //     (campaign) => campaign.id !== action.campaignId
    //   );
    //   return {
    //     ...state,
    //     campaigns: updatedCampaigns,
    //   };
    default:
      return state;
  }
};

export default campaignReducer;
