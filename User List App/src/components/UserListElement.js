/**
 * Created by Owner on 1/4/2017.
 */
import React from 'react';
import {Button, Glyphicon} from 'react-bootstrap';
import {connect} from 'react-redux';
import {Link} from 'react-router';
class UserListElement extends React.Component{

  constructor(props){
    super(props);
  }

  modalDeleteShow(id,username,event){

    this.props.dispatch({
      type:"users.modalDeleteShow",
      username:username,
      id:id
    });
  }

  render(){
    const user=this.props.user;
    return (
      <tr>
        <td>{user.id}</td>
        <td>{user.username}</td>
        <td>{user.job}</td>
        <td><Link to={`/user-edit/${user.id}`}><Button bsSize="small">
          Edit <Glyphicon glyph="edit"/>
        </Button></Link>
        </td>
        <td><Button onClick={this.modalDeleteShow.bind(this,user.id,user.username)} bsSize="xsmall" data-id={user.id} data-username={user.username}>
          Delete <Glyphicon glyph="remove-circle"/>
        </Button>
        </td>
      </tr>
    );
  }
}

const connected = connect()(UserListElement);
export default connected;
