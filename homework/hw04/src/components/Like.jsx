import React, {useState} from "react";
import { deleteDataFromServer, postDataToServer } from "../server-requests";


export default function Like( { token, isLiked, postID } ) {

	const[stateLikeID, setStateLikeID] = useState(isLiked);

	async function createLike() {
		const sendData = {
			post_id: postID,
		};
		const respData = await postDataToServer(token, "/api/likes/", sendData);
		setStateLikeID(respData.id);
	}
	async function deleteLike() {
		const sendData = {
			post_id: postID,
		};
		const respData = await deleteDataFromServer(token, "/api/likes/" + stateLikeID, sendData);
		setStateLikeID(null);
	}	
	return( 
		<button aria-label="bookmark button" onClick={!!stateLikeID ? deleteLike : createLike} >
			<i className={!!stateLikeID ? "fa-solid fa-heart text-red-700" : "far fa-heart"}></i>
		</button>
	);
}