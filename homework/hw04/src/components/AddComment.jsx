import { postDataToServer } from "../server-requests";

export default async function AddComment({ token, postData, newComment}) {
	return postDataToServer(token,"api/comments" ,
	{
		post_id: postData.id,
		text: newComment,
	}
	); 
	
}

