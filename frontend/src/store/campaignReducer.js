import { csrfFetch } from "./csrf";

// Action types
const FETCH_ALL_CAMPAIGNS = 'campaign/fetchAllCampaigns';
const FETCH_CAMPAIGN_DETAILS = 'campaign/fetchCampaignDetails';
const CREATE_CAMPAIGN = 'campaign/createCampaign';
const DELETE_CAMPAIGN = 'campaign/deleteCampaign';


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

export const deleteCampaign = (campaignId) => {
  return {
    type: DELETE_CAMPAIGN,
    campaignId,
  };
};



// Thunk action
export const fetchAllCampaignsAsync = () => async (dispatch) => {
  const response = await fetch('/api/campaigns');
  const campaignsData = await response.json();
  dispatch(fetchAllCampaigns(campaignsData));
};

export const fetchCampaignDetailsAsync = (campaignId) => async (dispatch) => {
  const response = await fetch(`/api/campaigns/${campaignId}`);
  console.log(response)
  if ( response.ok ) {
    const campaignDetails = await response.json();
    dispatch(fetchCampaignDetails(campaignDetails));
    return campaignDetails;
  }else {
    return "Error"
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

//   if (response.ok) {
//     const createdCampaign = await response.json();
//     const imageUploadResponse = await dispatch(
//       uploadCampaignImageAsync(createdCampaign.id, campaignData.imageUrl)
//     );

//     return createdCampaign;
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

    if (response.ok) {
      const responseBody = await response.json();
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
  switch (action.type) {
    case FETCH_ALL_CAMPAIGNS:
      return {
        ...state,
        campaigns: action.campaigns,
      };
    case FETCH_CAMPAIGN_DETAILS:
       const newState = {...state};
        newState.campaignDetails = action.campaignDetails
      return newState
    case CREATE_CAMPAIGN:
      return {
        ...state,
        campaigns: [...state.campaigns, action.campaign],
      };
    case DELETE_CAMPAIGN:
      const updatedCampaigns = state.campaigns.filter(
        (campaign) => campaign.id !== action.campaignId
      );
      return {
        ...state,
        campaigns: updatedCampaigns,
      };
    default:
      return state;
  }
};

export default campaignReducer;
