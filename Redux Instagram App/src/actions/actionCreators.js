//Action creators that emit actions to reducers and pass on their payloads to help update state

//increment number of likes
export function increment(index){
	return {
		type:"INCREMENT_LIKES",
		index
	};
}

//add comment
export function addComment(author,postId,comment){
	return {
		type:"ADD_COMMENT",
		postId,
		author,
		comment
	}
}
//remove comment
export function removeComment(postId,index){
	return {
		type:"REMOVE_COMMENT",
		postId,
		index
	}
}