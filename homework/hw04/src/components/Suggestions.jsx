import React, {useState, useEffect} from "react";
import { getDataFromServer } from "../server-requests";
import Suggestion from  "./Suggestion.jsx";


export default function Suggestions({ token }) {
   
   const [followSuggestions, setFollowSuggestions] = useState([]);

   useEffect(() => {
      async function getSuggestions(){ 
        const data = await getDataFromServer(token, "api/suggestions");
        
        setFollowSuggestions(data || []);
      }
      getSuggestions();
     },
    []);

    function outputSuggestion(account){
        return <Suggestion account={account} token={token} key={account.id}/>;
    }

    return (
        <div className="mt-4 justify-between">
            <p className="text-base text-violet-900 font-bold mb-4">
                Suggestions for you
            </p>
            
            {followSuggestions.map(outputSuggestion)}            
    
        </div>
    );
}
