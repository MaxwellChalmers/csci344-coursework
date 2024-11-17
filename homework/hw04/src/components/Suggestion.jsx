import React, { useState } from "react";
import { postDataToServer, deleteDataFromServer } from "../server-requests";


export default function Suggestion({ account, token, ID}) {
	const [isFollowed, setIsFollowed] = useState(false);
	const [followID, setFollowID] = useState(null);
	
	async function onClick(){
		if(isFollowed){
			await deleteDataFromServer(token, "api/following/" + followID);
			setIsFollowed(false);
			setFollowID(null);
		} else {
			const followResp = await postDataToServer(token, "api/following", {user_id: account.id,})
			console.log(followResp.status, followResp.ok, followResp);
			setFollowID(followResp.id);
			setIsFollowed(true);
		}
	}
	
	return (
		<section class="flex justify-around items-center mb-4 gap-4">
					<img src={account.thumb_url} className="rounded-full" alt={`${account.username}'s profile picture`} />
					<div class="w-[180px]">
						<p class="font-bold text-sm">{account.username}</p>
						<p class="text-red-900 text-xs">suggested for you</p>
					</div>
					<button class="text-yellow-900 text-sm py-2 min-w-[80px]" onClick={onClick} aria-label="follow button"> {isFollowed ? "unfollow" : "follow  "}</button>
		</section>  
    );
}