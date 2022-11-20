import React from "react";
import estPaginado from './Paginado.module.css'


export default function Paginado({videogamesPerPage, allVideogames, paginado}){
    const pageNum = [];
    for(let i= 1; i <= Math.ceil(allVideogames/videogamesPerPage); i++){
        pageNum.push(i)
    }
    return(
        <nav>
            <ul  className={estPaginado.list}>
                
                {
                    pageNum && pageNum.map(number => (
                        <li className={estPaginado.lis}>
                        <a className={estPaginado.ac} onClick={()=>paginado(number)}>{number}</a>
                        </li>
                    ))
                }
                
            </ul>
        </nav>
    )
}