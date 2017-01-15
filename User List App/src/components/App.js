/**
 * Created by Owner on 1/4/2017.
 */
import React from 'react';
import Menu from './Menu';
export default class App extends React.Component{

  render(){

    return (
      //display these users in a table
      <div className="container">
        <div className="row">
          <Menu />
        </div>
        <div className="row">
          {this.props.children}
        </div>
      </div>
      );
  }
}
