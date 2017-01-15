//Reducers that consume actions corresponding to commenting and produce a new state with added/removed comments

//Receives all comments from all posts and only passes the target post comments
function commentSReducer(state=[],action){
	if(typeof action.postId !== "undefined")
	{
		return {
				...state,
				[action.postId]: commentReducer(state[action.postId],action)

				};
	}
	return state;
}

//Create and return the next state to calling reducer above with added/removed comment based on action type
function commentReducer(state=[],action){
	switch(action.type)
	{
		case "ADD_COMMENT":
			return [
				...state.slice(0),
				{
					user:action.author,
					text:action.comment
				}];
		case "REMOVE_COMMENT":
			return [
				...state.slice(0,action.index),
				...state.slice(action.index+1)
					];
		default:
			return state;
	}
}

export default commentSReducer;