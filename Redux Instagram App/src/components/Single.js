import React from 'react';
import {Link} from 'react-router';
import Photo from './Photo';
import Comments from './Comments';

const Single = (props) =>{
	const {postId} = props.params;
	const index = props.posts.findIndex((post)=>
		 	post.code === props.params.postId);
	const post = props.posts[index];
	const postComments = props.comments[postId] || [];
return	(
		<div className="single-photo">
			<Photo {...props} post={post} index={index}/>
			<Comments postComments={postComments} {...props}/>
		</div>
	);

}


export default Single;