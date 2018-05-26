import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import IngredientsReducer from './ingredients';
import { loadingBarReducer } from 'react-redux-loading-bar'

const rootReducer = combineReducers({
	routing: routerReducer,
  	loadingBar: loadingBarReducer,
  	ingredients: IngredientsReducer
});

export default rootReducer;