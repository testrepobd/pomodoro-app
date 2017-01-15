/**
 * Created by Owner on 1/4/2017.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore,applyMiddleware,compose} from 'redux';
import {Provider} from 'react-redux';
import {Router,IndexRoute,Route,browserHistory} from 'react-router';
import {syncHistoryWithStore,routerMiddleware} from 'react-router-redux'

import './stylesheets/main.scss';
import App from './components/App';
import {reducers} from './reducers/index';
import Home from './pages/Home';
import UserEdit from './pages/UserEdit';
import NotFound from './pages/NotFound';

//create initial state
let users = [];
for(let i = 1;i<=28;i++){
  users.push({
    id:i,
    username:`John ${i}`,
    job:`Employee ${i}`
  });
}
const defaultState = {
  users:{
    list:users
    }
  };

let middleware = applyMiddleware(routerMiddleware(browserHistory));
const store = createStore(reducers,defaultState,middleware);



const history = syncHistoryWithStore(browserHistory,store);
const router = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App} >
        <IndexRoute component={Home}/>
        <Route path="/user-edit(/:id)" component={UserEdit}/>
        <Route path="*" component={NotFound}/>
      </Route>
    </Router>
  </Provider>
);
ReactDOM.render(
router,document.getElementById('app'));
