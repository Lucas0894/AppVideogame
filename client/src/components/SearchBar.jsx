import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameVideogame } from "../actions";
import stylus from "./SearchBar.module.css"


export default function SearchBar(){
    const dispatch = useDispatch()
    const [name, setName] = useState("");

    function handleInputChange(e){
        e.preventDefault();
        setName(e.target.value)
        
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(getNameVideogame(name))
        // setName((state)=> state = {name:""})
    }


    return(
        <div className={stylus.gen}>
            <input className={stylus.inputss} type="text" placeholder="Search..." onChange={e => handleInputChange(e)} />
            <button className={stylus.buttonSolo} type="submit" onClick={e => handleSubmit(e)}>Search Videogame</button>
        </div>
    )
}





