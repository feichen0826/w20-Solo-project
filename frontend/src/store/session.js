// frontend/src/store/session.js
import { csrfFetch } from "./csrf";

const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";
const FETCH_USER_DETAILS = 'session/fetchUserDetails'

const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

const fetchUserDetails = (userDetails) =>{
  return {
    type:FETCH_USER_DETAILS,
    userDetails
  }
}

export const login = (credential, password ) => async (dispatch) => {

  const response = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

export const fetchUserDetailsAsync =()=> async(dispatch)=>{
  const response = await csrfFetch(`/api/session`);
  console.log(response)
  if(response.ok){
    const userDetails = await response.json();
    dispatch(fetchUserDetails(userDetails))
    return userDetails
  } else {
    return "Error"
  }

}
export const restoreUser = () => async (dispatch) => {
    const response = await csrfFetch("/api/session");
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
  };

  export const signup = (user) => async (dispatch) => {
    const { username, firstName, lastName, email, password } = user;
    const response = await csrfFetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        username,
        firstName,
        lastName,
        email,
        password,
      }),
    });
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
  };

  export const logout = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
      method: 'DELETE',
    });
    dispatch(removeUser());
    return response;
  };

const initialState = {  user: { profileImage: null, city: null } };

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    case FETCH_USER_DETAILS:
      newState = { ...state, user: { ...state.user, ...action.userDetails } };
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;
