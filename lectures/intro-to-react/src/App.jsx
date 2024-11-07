import Profile from  "./Profile.jsx";
import React from "react";

 export default function App() {

     return (
         <>
             <header>
                 <h1>My First App</h1>
             </header>
             <main>
                 <p>Hello React!</p>
		 <Profile name="bob" picture="https://picsum.photos/id/216/100/100" />
		 <Profile name="billy" picture="https://picsum.photos/id/216/100/100" />
 		 <Profile name="rob" picture="https://picsum.photos/id/216/100/100"/>
		 <Profile name="mr. krabs" picture="https://picsum.photos/id/216/100/100"/>
             </main>
         </>
     );
 }
