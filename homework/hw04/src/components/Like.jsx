import React from "react";
import { deleteDataFromServer, postDataToServer } from "../server-requests";


export default function Like( { token, refresh, isLiked, postID } ) {
	async function createLike() {
		const sendData = {post_id: postID,};
		const respData = await postDataToServer(token, "/api/likes/", sendData);
		refresh();
	}
	async function deleteLike() {
		const sendData = {post_id: postID,};
		const respData = await deleteDataFromServer(token, "/api/likes/" + isLiked, sendData);
		refresh();
	}	
	return( 
		<button aria-label="bookmark button" onClick={!!isLiked ? deleteLike : createLike} >
			<i className={!!isLiked ? "fa-solid fa-heart text-red-700" : "far fa-heart"}></i>
		</button>
	);
}