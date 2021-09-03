import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from "redux-thunk"
import axios from "axios"

const LOAD = "LOAD"
const UPDATE = "UPDATE"
const CREATE = "CREATE"
const SET_VIEW = "SET_VIEW"

// const initialState = {
//   groceries: [],
//   view: ''
// };

const groceriesReducer = (state = [], action) => {
  if(action.type === LOAD){
    // state = {...state, groceries: action.groceries };
    state = action.groceries;
  }
  if(action.type === UPDATE){
    //state = {...state, groceries: state.groceries.map(grocery => grocery.id === action.grocery.id ? action.grocery : grocery )};
    state = state.map(grocery => grocery.id === action.grocery.id ? action.grocery : grocery )
  }
  if(action.type === CREATE){
    //state = {...state, groceries: [...state.groceries, action.grocery ]}
    state = [...state, action.grocery]
  }
  return state;
}

const viewReducer = (state = '', action) => {
  if(action.type === SET_VIEW){
    //state = {...state, view: action.view};
    state = action.view
  }
  return state;
}

const reducers = combineReducers({
  groceries: groceriesReducer,
  view: viewReducer
});

export const createGrocery = (name) => {
  return async function(dispatch) {
    const grocery = (await axios.post('/api/groceries', { name })).data;
    dispatch({ type: CREATE, grocery })
  }
}

export const toggleGrocery = (grocery) => {
  return async function(dispatch){
    const updated = (await axios.put(`/api/groceries/${grocery.id}`, { purchased: !grocery.purchased })).data;
    dispatch({ type: UPDATE, grocery: updated});
  }
}

export const createRandomGrocery = () => {
  return async function(dispatch){
    const grocery = (await axios.post('/api/groceries/random')).data;
    dispatch({ type: CREATE, grocery });

  }
}

const store = createStore(
  reducers,
  applyMiddleware(thunk)
);

export default store;


