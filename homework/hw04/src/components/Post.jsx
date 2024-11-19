import React, { useState, useRef, useEffect}  from "react";
import { getDataFromServer } from "../server-requests.jsx";
import Bookmark from "./Bookmark.jsx"
import Like from "./Like.jsx"
import AddComment from "./AddComment.jsx";



export default function Post ({postData, refresh, token}) {
    
    const[post, setPost] = useState(postData);
    
    const commentRef = useRef(null);
    const [commentPosted, setCommentPosted] = useState(false);
    
 
    // I spent a lot of time trying to get posts to rerender indivudially but I couldn't figure it out
    // so I Am currently just rerendering all of the posts and that seems to be working. 
    async function getPost() {
        const data = await getDataFromServer(token, "/api/posts/" + postData.id);
        console.log(data);
        setPost(data);
    }
    
    function  displayComments(post) {
        function renderComment(comment) {
            return (
             <p className="text-sm mb-3">
               <strong>{comment.user.username}</strong> {comment.text}
             </p>);
        }

        if (post.comments.length > 1) {
            return (
            <div>
            <button aria-label="view all comments button" className="text-sm mb-3"> view all {post.comments.length} comments </button>
                  {renderComment(post.comments[post.comments.length - 1])}
             </div>     
            );
        } else if (post.comments.length === 1) {
            return renderComment(post.comments[0]);
        } else {
            return null; 
        }
    }

    
// this function totally from chat gpt 
async function handleAddComment(event) {
    event.preventDefault();
    const newComment = commentRef.current.value; // Step 2: Access the input field value
    if (newComment) {
        await AddComment({token, postData: post, newComment});
        await refresh();
        commentRef.current.value = ""; 
        commentRef.current.focus();
        setCommentPosted(true);

        // Optionally, reset the state after 2 seconds to change the color back
        setTimeout(() => {
            setCommentPosted(false);
        }, 2000);  // 2 seconds
    }
 }

    


    return (
		<section className="bg-white border mb-10">
			<div className="p-4 flex justify-between">
                    <h3 className="text-lg font-Comfortaa font-bold"> {postData.user.username} </h3>
                    <button aria-label="options button" className="icon-button"><i className="fas fa-ellipsis-h"></i></button>
                </div>
      
				<img src={postData.image_url} alt={postData.alt_text || "no alt text avalible for this posts image"} width="300" height="300"
                    className="w-full bg-cover"/>
				<div className="p-4 pb-2">
                    <div className="flex justify-between text-2xl mb-3">
                        <div className="flex gap-2"> 
		
							<Like refresh={refresh} isLiked={postData.current_user_like_id} postID={postData.id} token={token}/>
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
                    {displayComments(postData)}
                    <p className="uppercase text-gray-500 text-xs">{
                      postData.display_time
                    }
                    </p>
                    <div className={`-mx-4 mt-2 pt-2 -pb-3 border-t rainbow-border t-2 min-w-[100%] rainbow-border`}>
                    
                    <form  onSubmit={handleAddComment}  className="flex justify-between items-center  px-4 p-1 ">
                    
                    <div className="flex items-center gap-3 min-w-[80%]">
                        
                        <i className="far fa-smile text-lg"></i>
                        <input title="text input for comment" ref={commentRef} id={`comment${postData.id}`} type="text" className="min-w-[90%] mr-3 focus:outline-none" placeholder="Add a comment..."/>
        
                </div>
                <button aria-label="post comment button" type="submit" className="text-green-900">Post</button>
                </form>

                
                </div> 
                </div>
		</section>
	)
}