import React from 'react';
import {Link} from 'react-router';
import Photo from './Photo';
//Dumb component (stateless) that just passes along props its received from parent (Main)
const PhotoGrid = (props) => {
	return (
		<div className="photo-grid">
			{props.posts.map((post,index)=>
				<Photo 
				{...props}
				key={index} 
				index={index}
				post={post}
				/>
				)}
		</div>
	)

}

export default PhotoGrid;