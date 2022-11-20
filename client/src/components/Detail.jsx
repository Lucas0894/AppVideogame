import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import StyleDetail from "./Detail.module.css"


export default function Detail(){
    const dispatch = useDispatch()
    
    const {id} = useParams();
    
    useEffect(()=> {
        dispatch(getDetail(id));
    }, [dispatch, id]);
    
    const myVideogame = useSelector((state) => state.details)
   
   
    
    console.log(myVideogame)


    return (
        <div className={StyleDetail.completoB}>
            {
                myVideogame? 
                <div className={StyleDetail.contenido}>
                    <h1 className={StyleDetail.titulos}>{myVideogame.map(el => el.name)}</h1>
                    <img src={myVideogame.map(el => el.background_image? el.background_image:  el.image)} width='300px' height='200px'/>
                    <h3 className={StyleDetail.subtitulos}>Description: {myVideogame.map(el => el.description)}</h3>
                    <h3 className={StyleDetail.subtitulos}>Release: {myVideogame.map(el => el.released)}</h3>
                    <h3 className={StyleDetail.subtitulos}>Rating: {myVideogame.map(el => el.rating)}</h3>        
                    <h3 className={StyleDetail.subtitulos}>Platforms: {myVideogame.map(el => el.platforms.join(', '))}</h3>
                </div>: <h1>Loading...</h1>
            }
            <Link to='/home'>
                <button className={StyleDetail.buttonDetail}>Volver</button>
            </Link>
        </div>
    )
}

