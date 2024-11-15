import React, {useState} from "react";
import { deleteDataFromServer, postDataToServer } from "../server-requests";

export default function Bookmark({ token, isBookmarked, postID}){
	const[stateBookmarkID, setStateBookmarkID] = useState(isBookmarked);

	async function createBookmark() {	
		const sendData = {
			post_id: postID,
		};
		const respData = await postDataToServer(token, "/api/bookmarks/", sendData);
		setStateBookmarkID(respData.id);

	}
	async function deleteBookmark() {
		const sendData = {
			post_id: postID,
		};
		const respData = await deleteDataFromServer(token, "/api/bookmarks/" + stateBookmarkID, sendData);
		setStateBookmarkID(null);
	}

	return( 
		<button aria-label="bookmark button" onClick={!!stateBookmarkID ? deleteBookmark : createBookmark}>
			<i className={!!stateBookmarkID ? "fa-solid fa-bookmark" : "far fa-bookmark"}></i>
		</button>
	);
}