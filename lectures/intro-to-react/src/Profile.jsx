 import "./Profile.css";
 import React from "react";

 export default function Profile({ name, picture }) {
     return (
         <section className="profile">
             <h3> {name} Goes here! </h3>
             <img alt="profile pic" src="{picture}"> sda </img>
         </section>
     );
 }
