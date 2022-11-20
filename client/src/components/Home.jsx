import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogames, filterVideogamesByGenres, filterCreated, orderByName, orderByRating} from "../actions"
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import estilos from "./Home.module.css"




export default function Home(){

    const dispatch = useDispatch()
    
    const allVideogames = useSelector ((state)=> (state.videogames))
    const [orden, setOrden] = useState('')
    const [currentPage, setCurrentPage] =useState(1);
    const [videogamesPerPage, setVideogamesPerPage] = useState(15)
    const indexOfLastVideogame = currentPage * videogamesPerPage;
    const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage;
    const currentVideogames = allVideogames.slice(indexOfFirstVideogame, indexOfLastVideogame);
    console.log(currentVideogames)
    const paginado = (pageNum)=>{
        setCurrentPage(pageNum)
    }

    useEffect(()=>{
        dispatch(getVideogames())
    },[dispatch])

    function handleClick(e){
        e.preventDefault();
        dispatch(getVideogames())
    }

    function handleSort(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }

    function handleSortRating(e){
        e.preventDefault();
        dispatch(orderByRating(e.target.value))
        setCurrentPage(1)
        setOrden(`Ordenado ${e.target.value}`)
    }



    function handleFilterGenres(e){
        dispatch(filterVideogamesByGenres(e.target.value))
    }

    function handleFilterCreated(e){
        dispatch(filterCreated(e.target.value))
    }

    return (
        
        <div>
            
            <div className={estilos.navbar}>
                

            <Link to= '/videogame' className={estilos.buttonBar}>Create Videogame</Link>
            
            <button className={estilos.buttonBar} onClick={e=> {handleClick(e)}}>Back to all Videogames</button>
                
                <select className={estilos.selector} onChange={e=> handleSort(e)}>
                    <option className={estilos.options} value='asc'>Ascendente</option>
                    <option className={estilos.options} value='desc'>Descendente</option>
                </select>

                <select className={estilos.selector} onChange={e=> handleSortRating(e)}>
                    <option className={estilos.options} value="asc">Ascending Rating</option>
                    <option className={estilos.options} value="desc">Descending Rating</option>
                </select>

                <select className={estilos.selector} onChange={e=> handleFilterGenres(e)}>
                    <option className={estilos.options} value='All'>All Genres</option>
                    <option className={estilos.options} value="Action">Action</option>
                    <option className={estilos.options} value="Adventure">Adventure</option>
                    <option className={estilos.options} value="RPG">RPG</option>
                    <option className={estilos.options} value="Shooter">Shooter</option>
                    <option className={estilos.options} value="Puzzle">Puzzle</option>
                    <option className={estilos.options} value="Indie">Indie</option>
                    <option className={estilos.options} value="Platformer">Platformer</option>
                    <option className={estilos.options} value="Massively Multiplayer">Massively Multiplayer</option>
                    <option className={estilos.options} value="Sports">Sports</option>
                    <option className={estilos.options} value="Racing">Racing</option>
                    <option className={estilos.options} value="Simulation">Simulation</option>
                    <option className={estilos.options} value="Arcade">Arcade</option>
                    <option className={estilos.options} value="Fighting">Fighting</option>
                    <option className={estilos.options} value="Strategy">Strategy</option>
                    <option className={estilos.options} value="Casual">Casual</option>
                    <option className={estilos.options} value="Family">Family</option>
                </select>

                <select className={estilos.selector} onChange={e=> handleFilterCreated(e)}>
                    <option className={estilos.options} value="All">All</option>
                    <option className={estilos.options} value="Created">Created</option>
                    <option className={estilos.options} value='api'>Existing</option>
                </select>

                <SearchBar/>

                </div>
                <div className={estilos.central}>
                

                <h1>Gameland</h1>

                <Paginado
                videogamesPerPage={videogamesPerPage}
                allVideogames={allVideogames.length}
                paginado = {paginado}
                 />

                 
                  <div className={estilos.card}>
                {
                    currentVideogames?.map(c => {
                        return (
                        <div>
                        <Link to={"/home/" + c.id} className={estilos.Linketiqueta}>
                        <Card name={c.name} rating={c.rating} image={c.background_image? c.background_image: c.image} genres={c.generos? c.generos: c.genres} key={c.id} 
                        />
                        
                        
                            
                        </Link>
                        
                        </div>
                        )})
                }
                </div>
                <Link to={"/"}>
                <button className={estilos.Buttonback}>Back</button>
                </Link>
                
                </div>
            
        </div>
    )
}







