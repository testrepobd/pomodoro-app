import React from 'react';
//Component that handles comment rendering, submission and deletion by substituting submission events
//with the action creator/reducer relation created whenever user tries to add(submit)/remove comment
class Comments extends React.Component{

	renderComment(comment,index){
		return (
			<div className="comment" key={index}>
				<strong>{comment.user}</strong>
				{comment.text}
				<button 
				className='remove-comment' 
				onClick={this.props.removeComment.bind(this,this.props.params.postId,index)}>
				&times;
				</button>			
			</div>
			);
	}
	//When form is submitted pass along necessary info to action creator so that reducer can create the next state
	handleSubmit(event){
		event.preventDefault();
		const comment = this.refs.comment.value;
		const author = this.refs.author.value;
		const {postId} = this.props.params;

		this.props.addComment(author,postId,comment);
		this.refs.commentForm.reset();

	}
	//Used composition in render to handle rendering each comment as map iterates across the comments as opposed to cluttering 
	//or creating another component just for single Comment
	render(){
		return (
			<div className="comments">
				{this.props.postComments.map((this.renderComment),this)}
				<form className='comment-form' ref='commentForm' onSubmit={this.handleSubmit.bind(this)}>
					<input type='text' ref='author' placeholder='author'/>
					<input type='text' ref='comment' placeholder='comment'/>
					<input type='submit' hidden/>
				</form>
			</div>
			);
	}
}

export default Comments;