import React, { useState, useEffect }  from "react";
import { getDataFromServer } from "../server-requests";


export default function Stories({ token }) {
    const [storyList, setStoryList] = useState([]);
    useEffect(() => {
        async function getStories() {
            const data = await getDataFromServer(token, "/api/stories");
            setStoryList(data);
        }
        getStories();
    }, []);
    return (
        <header className="flex gap-6 bg-white border p-2 overflow-hidden mb-6">
              {storyList.map((story) => <div key={story.id} className="flex flex-col justify-center items-center">
                    <img src={story.user.thumb_url} className="min-w-[50px] min-h-[50px] rounded-full border-4 border-gray-300" alt={story.user.username + "'s story picture"}/>
                    <p className="text-xs text-purple-900">{story.user.username}</p>
                </div>)}
        </header>
    );
}
