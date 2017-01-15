/**
 * Created by Owner on 1/4/2017.
 */
import React from 'react';
import {connect} from 'react-redux';
import {Table,Pagination} from 'react-bootstrap';
import {push} from 'react-router-redux';

import UserListElement from './UserListElement';
import UserDelete from './UserDelete';
class UserList extends React.Component{

  changePage(page){
    this.props.dispatch(push("/?page=" + page));

  }
  render(){
    const {users} = this.props;
    const per_page = 10;
    const pages = Math.ceil(users.length/per_page);
    const current_page = this.props.page;
    const start_offset = (current_page-1) * per_page;
    let counter = 0;
    return (
      <div>
        <Table bordered responsive striped>
          <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Job</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
          </thead>
          <tbody>
          {users.map((user,index)=>{
            if(index >= start_offset && counter < per_page){
              counter++;
              return (<UserListElement key={user.id} user={user}/>);
            }
          })}
          </tbody>
        </Table>

        <Pagination className="user-pagination pull-right" bsSize="medium"
                    maxButtons={10} first last next prev boundaryLinks
                    items={pages} activePage={current_page} onSelect={this.changePage.bind(this)}/>

        <UserDelete/>
      </div>
    );
  }
}

function mapStateToProps(state){
  return{
    users:state.users.list,
    page:Number(state.routing.locationBeforeTransitions.query.page) || 1
  };
}

export default connect(mapStateToProps)(UserList);
