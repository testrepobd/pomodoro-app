/**
 * Created by Owner on 1/4/2017.
 */
export default function users(state={},action){
  switch(action.type){
    case "users.modalDeleteShow":
      return modalDeleteShow(state,action);
    case "users.modalDeleteHide":
      return modalDeleteHide(state);
    case "user.Delete":
      return modalDeleteUser(state,action);
    case "user.edit":
      return editUser(state,action);
    case "user.add":
      return addUser(state,action);
    default:
      return state;
  }
}

function modalDeleteShow(state={},action){
  let new_state = JSON.parse(JSON.stringify(state));
  new_state.modal = new_state.modal ? new_state.modal : {};
  new_state.modal.list_delete = {
    show:true,
    id:action.id,
    username:action.username
  };
  return new_state;
}

function addUser(state={},action){
  const gen_id = Math.ceil((Math.random() * 1000000));
  let new_state = JSON.parse(JSON.stringify(state));
  new_state.list = [
    ...new_state.list.slice(0),
    {
      id:gen_id,
      job:action.job,
      username:action.username
    }
  ];

  return new_state;
}

function editUser(state={},action){
  let new_state = JSON.parse(JSON.stringify(state));
  for(const index in new_state.list){
    if(new_state.list[index].id === action.id){
      new_state.list[index] = {
        ...new_state.list[index],
        username:action.username,
        job:action.job
      };
    }
  }

  return new_state;
}

function modalDeleteUser(state={},action){
  let new_state = JSON.parse(JSON.stringify(state));
  new_state.list = new_state.list.filter((user)=>{
    return user.id !== action.id;
  });
  console.log(new_state,state,action);
  return new_state;
}

function modalDeleteHide(state={}){
  let new_state = JSON.parse(JSON.stringify(state));
  new_state.modal.list_delete = {
    id:0,
    show:false,
    username:''
  };
  return new_state;
}
