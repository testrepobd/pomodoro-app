import {createStore,compose} from 'redux';
import {syncHistoryWithStore} from 'react-router-redux';
import {browserHistory} from 'react-router';

//import root reducer (combines all reducers)
import rootReducer from './reducers/index';

//import data (as opposed to an API that serves our data)
import comments from './data/comments';
import posts from './data/posts';

//the initial state that's used on main page load
const defaultState = {
	posts,
	comments
};
//Create the store with a starting state and the root reducer, which has access to the state and is able to update it
const store = createStore(rootReducer,defaultState);

export const history = syncHistoryWithStore(browserHistory,store);

export default store;