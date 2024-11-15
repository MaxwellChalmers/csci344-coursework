import React from "react";
import Bookmark from "./Bookmark.jsx"
import Like from "./Like.jsx"

export default function Post ({postData, token}) {
	return (
		<section className="bg-white border mb-10">
			<div className="p-4 flex justify-between">
                    <h3 className="text-lg font-Comfortaa font-bold"> {postData.user.username} </h3>
                    <button aria-label="options button" className="icon-button"><i className="fas fa-ellipsis-h"></i></button>
                </div>
      
				<img src={postData.image_url} alt={postData.alt_text || "no alt text avalible for this posts image"} width="300" height="300"
                    className="w-full bg-cover"/>
				<div className="p-4">
                    <div className="flex justify-between text-2xl mb-3">
                        <div className="flex gap-2"> 
		
							<Like isLiked={postData.current_user_like_id} postID={postData.id} token={token}/>
                            <button aria-label="comment button" ><i className="far fa-comment"></i></button>
                            <button aria-label="share button"><i className="far fa-paper-plane"></i></button>
                        </div>
                        <div>
							<Bookmark isBookmarked={postData.current_user_bookmark_id} postID={postData.id} token={token}/>
							
                    </div>
				</div>
                    <p className="font-bold mb-3">{postData.likes.length} likes </p>
                    <div className="text-sm mb-3">
                        <p>
                            <strong>{postData.user.username + " "}</strong>
                            	{postData.caption + " "} 
                            <button aria-label="expand caption button" className="button">more</button>
                        </p>
                    </div>
                     comment XD 
                    <p className="uppercase text-gray-500 text-xs">{
                      postData.display_time
                    }</p>
                </div> 
		</section>
	)
}