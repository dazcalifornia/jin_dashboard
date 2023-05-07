import { createStore } from 'redux';

// Initial state
const initialState = {
  isAuthenticated: false,
  loginMessage: ''
};

// Define reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return { ...state, isAuthenticated: true, loginMessage: action.payload };
    default:
      return state;
  }
};

// Create store
const store = createStore(reducer);

export default store;

