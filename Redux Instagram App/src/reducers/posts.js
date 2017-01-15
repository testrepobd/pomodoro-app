//reducers accept an action and a copy of the current state
// in order to produce the next state

function postsReducer(state=[],action){
	const index = action.index;
	switch(action.type){
		case "INCREMENT_LIKES":
			return [
				...state.slice(0,index),
				{...state[index],likes:state[index].likes+1},
				...state.slice(index+1),
			];
			break;
	}
	return state;
}

export default postsReducer;