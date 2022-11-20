import React from "react";
import estCard from "./Card.module.css"



export default function Card({image, name, genero, genres, rating}){
    return (
        <div className={estCard.contentedor}>
            <h3>{name}</h3>
            <h5>{genero}</h5>
            <h5>{genres}</h5>
            <h5>{rating}</h5>
            <img src={image} alt="img not found" />
        </div>
    )


}