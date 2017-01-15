import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import postsReducer from './posts';
import commentsReducer from './comments';

const rootReducer = combineReducers({
	posts:postsReducer,
	comments:commentsReducer,
	routing:routerReducer
});

export default rootReducer;