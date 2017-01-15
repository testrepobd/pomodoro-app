/**
 * Created by Owner on 1/4/2017.
 */
import {combineReducers} from 'redux';
import users from './users';
import {routerReducer} from 'react-router-redux';
import {reducer as formReducer} from 'redux-form';

export const reducers = combineReducers({
  routing:routerReducer,
  form:formReducer,
  users:users
});
