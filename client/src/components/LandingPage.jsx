import React from "react";
import { Link } from "react-router-dom";
import LandingStyle from "./LandingPage.module.css"


export default function LandingPage(){
    return(
        <div className={LandingStyle.bodyLanding}>
            <h1 className={LandingStyle.tituloPrincipal}>Welcome to my Videogame Page</h1>
            <Link to="/home">
            <button className={LandingStyle.ButtonStart}>Start</button>
            </Link>
        </div>

    )
}