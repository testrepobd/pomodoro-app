/**
 * Created by Owner on 1/5/2017.
 */
import React from 'react';
import {Field,reduxForm} from 'redux-form';
import {PageHeader,Form,FormGroup,FormControl,Col,Button,InputGroup,Glyphicon,HelpBlock} from 'react-bootstrap';
import {connect} from 'react-redux';
import {goBack} from 'react-router-redux';
class UserEdit extends React.Component{


  constructor(props){
    super(props);
    const form_label = props.initialValues.id > 0 ? "edit" : "add";
    this.state = {
      label:form_label
    };
  }

  renderName(props){
    return (
      <FormGroup validationState={!props.meta.touched ? null : (props.meta.error ? "error" : "success")}>
        <Col sm={2}>
          Username
        </Col>
        <Col sm={8}>
          <FormControl type="text" id="username" {...props.input} placeholder="Username"/>
          <FormControl.Feedback />
          <HelpBlock>
            {props.meta.touched && props.meta.error ? props.meta.error : null}
          </HelpBlock>
        </Col>
      </FormGroup>
    );
  }

  renderJob(props){
    return (
      <FormGroup>
        <Col sm={2}>
          Job
        </Col>
        <Col sm={8}>
          <InputGroup>
            <FormControl type="text" name="job" placeholder="Job" {...props.input} />
            <InputGroup.Addon>
              <Glyphicon glyph="briefcase" />
            </InputGroup.Addon>
          </InputGroup>
        </Col>
      </FormGroup>
    );
  }

  formSubmit(values){
    console.log("val",values);
    if(values.username && values.job){
      this.props.dispatch({
        type:`user.${this.state.label}`,
        username:values.username,
        job:values.job,
        id:values.id
      });
    }
    this.props.dispatch(goBack());
  }

  render(){
    return (
      <div>
      <PageHeader>{this.state.label === "edit" ? "Edit User" : "Add User"}</PageHeader>
        <Form horizontal onSubmit={this.props.handleSubmit(this.formSubmit.bind(this))}>
          <Field name="username" component={this.renderName}/>
          <Field name="job" component={this.renderJob} />
          <FormGroup>
            <Col smOffset={2} sm={8}>
              <Button type="submit" disabled={this.props.invalid || this.props.submitting}>Save User</Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

function mapStateToProps(state,own_props){

  let user = {
    username:'',
    job:'',
    id:0
  };

  for(const index in state.users.list){
    if(state.users.list[index].id === Number(own_props.params.id)){
      user = state.users.list[index];
      console.log(user);
    }
  }

  return {
    initialValues:user
  };
}

UserEdit = reduxForm({
  form:'user-edit',
  validate:function(values){
    const errors = {};
    if(!values.username){
      errors.username="Username is required!"
    }

    return errors;
  }
})(UserEdit);

export default connect(mapStateToProps)(UserEdit);
