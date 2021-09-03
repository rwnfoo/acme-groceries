import { createStore, combineReducers } from 'redux';

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

  }
  return state;
}

const reducers = combineReducers({
  groceries: groceriesReducer,
  view: viewReducer
});

const store = createStore(reducers);

export default store;


