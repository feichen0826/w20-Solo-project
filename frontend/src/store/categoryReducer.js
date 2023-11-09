import { csrfFetch } from "./csrf";

// Action types
const FETCH_ALL_CATEGORY = 'category/fetchAllCategory';
const FETCH_CATEGORY_DETAILS = 'category/fetchCategoryDetails';

// Action creator
const fetchAllCategory = (category) => {
    return {
      type: FETCH_ALL_CATEGORY,
      category,
    };
  };

  const fetchCategoryDetails = (categoryDetails) => {
    return {
      type: FETCH_CATEGORY_DETAILS,
      categoryDetails,
    };
  };

  // Thunk action
export const fetchAllCategoryAsync = () => async (dispatch) => {
    const response = await csrfFetch('/api/categories');
    const categoryData = await response.json();
    console.log(response)
    console.log(categoryData)
    dispatch(fetchAllCategory(categoryData));
  };

  export const fetchCategoryDetailsAsync = (categoryId) => async (dispatch) => {
    const response = await csrfFetch(`/api/categories/${categoryId}`);
    console.log(response)
    if ( response.ok ) {
      const categoryDetails = await response.json();
      dispatch(fetchCategoryDetails(categoryDetails));
      return categoryDetails;
    }else {
      return "Error"
    }
  };

  // Reducer
const initialState = {
    category: [],
    categoryDetails: [],
  };

  const categoryReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
      case FETCH_ALL_CATEGORY:
        return {
          ...state,
          category: action.category,
        };
      case FETCH_CATEGORY_DETAILS:
         newState = {...state};
          newState.categoryDetails = action.categoryDetails
        return newState
        default:
            return state;
        }
      };

      export default categoryReducer;
