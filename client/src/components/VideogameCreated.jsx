import React from "react";
import { useState ,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { postVideogame, getGenres } from "../actions/index";
import estelitos from './VideogameCreated.module.css'






export default function VideogameCreated(){
    const dispatch = useDispatch()
    const [errors, setErrors] = useState({})
    const genres = useSelector((state) => state.genres)

    function validate(input){
        let errors ={}
        if(!input.name){
            errors.name = 'Se requiere ingresar el nombre'
        }else if(!input.description){
            errors.description = 'Se requiere ingresar la descripcion'
        }else if(!input.released){
            errors.released = 'Se requiere ingresar la fecha de lanzamiento'
        }else if(!input.image){
            errors.image = 'Se requiere ingresar la imagen'
        }else if(input.platforms.length === 0){
            errors.platforms = 'Se requiere ingresar las plataformas'
        }else if(input.genero.length === 0){
            errors.genero = 'Se requiere ingresar los generos'
        }
         return errors
    }
    
    const history = useHistory()

    const [input, setInput] = useState({
        name: "",
        description: "",
        released: "",
        image: "",
        rating: 0,
        platforms: [],
        genero: []
    })

    useEffect(()=>{
        dispatch(getGenres())
    }, [dispatch])

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        console.log(input)
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    
    function handleChecked(e){
        if(e.target.checked){
            setInput({
            ...input,
            platforms: [...input.platforms, e.target.value]
            })
        }
        
    }
    function handleDelete(el){
        
        setInput({
            ...input,
            genero: input.genero.filter(gn => gn !== el)
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        console.log(input)
        dispatch(postVideogame(input))
        alert('Videojuego Creado')
        setInput({
        name: "",
        description: "",
        released: "",
        image: "",
        rating: 0,
        platforms: [],
        genero: []
        })
        history.push('/home')

    }

    function handleSelect(e){
        setInput({
            ...input,
            genero: [...input.genero, e.target.value]
        })

    }

    return (
        <div className={estelitos.general}>
            
            <form onSubmit={e=> handleSubmit(e)} className={estelitos.transparente}>
            <h1 className={estelitos.headertext}>Create Videogame</h1>
            <div>
                <div className={estelitos.divs}>
                    <label className={estelitos.headerSubtext}>Name: </label>
                    <br/>
                    <input type='text'
                    value={input.name}
                    name='name'
                    onChange={e=>handleChange(e)} className={estelitos.inputs}/>
                    {errors.name && (
                        <p className={estelitos.errors}>{errors.name}</p>
                    )}
                </div>
                <div className={estelitos.divs}>
                    <label className={estelitos.headerSubtext}>Released: </label>
                    <br/>
                    <input type="date"
                    value={input.released}
                    name='released'
                    onChange={e=>handleChange(e)}
                    className={estelitos.inputs} />
                    {errors.released && (
                        <p className={estelitos.errors}>{errors.released}</p>
                    )}
                </div>
                <div className={estelitos.divs}>
                    <label className={estelitos.headerSubtext}>Rating: </label>
                    <br/>
                    <input type='number' min="0" max="5" step="0.01"
                    value={input.rating}
                    name="rating"
                    onChange={e=>handleChange(e)} className={estelitos.inputs}/>
                    {errors.rating && (
                        <p className={estelitos.errors}>{errors.rating}</p>
                    )}
                </div>
                <div className={estelitos.divs}>
                    <label className={estelitos.headerSubtext}>Image: </label>
                    <br/>
                    <input type="text"
                    value={input.image}
                    name='image'
                    onChange={e=>handleChange(e)} className={estelitos.inputs}/>
                    {errors.image && (
                        <p className={estelitos.errors}>{errors.image}</p>
                    )}
                </div>

                </div>
                <div className={estelitos.divs}>
                    <label className={estelitos.headerSubtext}>Platforms: </label>
                    <br/>
                    <label className={estelitos.labels}><input type="checkbox" 
                    value='PlayStation 4'
                    onChange={e=> handleChecked(e)}/>PlayStation 4</label>
                    <label className={estelitos.labels}><input type="checkbox" 
                    value='Xbox 360'
                    onChange={e=> handleChecked(e)}/>Xbox 360</label>
                    <label className={estelitos.labels}><input type="checkbox" 
                    value='PC'
                    onChange={e=> handleChecked(e)}/>PC</label>
                    <label className={estelitos.labels}><input type="checkbox" 
                    value='Xbox One'
                    onChange={e=> handleChecked(e)}/>Xbox One</label>
                    <label className={estelitos.labels}><input type="checkbox" 
                    value='macOS'
                    onChange={e=> handleChecked(e)}/>macOS</label>
                    <label className={estelitos.labels}><input type="checkbox" 
                    value='Linux'
                    onChange={e=> handleChecked(e)}/>Linux</label>
                    <label className={estelitos.labels}><input type="checkbox" 
                    value='IOS'
                    onChange={e=> handleChecked(e)}/>iOS</label>
                    <label className={estelitos.labels}><input type="checkbox" 
                    value='PlayStation 3'
                    onChange={e=> handleChecked(e)}/>PlayStation 3</label>
                    <label className={estelitos.labels}><input type="checkbox" 
                    value='PlayStation 5'
                    onChange={e=> handleChecked(e)}/>PlayStation 5</label>

                    {errors.platforms && (
                        <p className={estelitos.errors}>{errors.platforms}</p>
                    )}
                    
                </div>
                
                <div className={estelitos.divs}>
                    
                <label className={estelitos.headerSubtext}>Genres: </label>
                <br/>
                    <select onChange={e => handleSelect(e)} className={estelitos.genresInputs}>
                        
                        {genres && genres.map(gn =>(
                            <option value={gn.name}>{gn.name}</option>
                        ))}
                    </select>

                    {errors.genero && (
                        <p className={estelitos.errors}>{errors.genero}</p>
                    )}
                   
                {input.genero.map(el => 
                        <div className={estelitos.deletee}>
                            <p className={estelitos.deleteeInputs}>{el}</p>
                            <button className={estelitos.buttonx} onClick={() => handleDelete(el)}>x</button>
                        </div>)}
                </div>

                
                <div className={estelitos.divs}>
                    <label className={estelitos.headerSubtext}>Description: </label>
                    <br/>
                    <textarea type="text"
                    value={input.description}
                    name='description'
                    onChange={e=>handleChange(e)} className={estelitos.textarea}/>
                    {errors.description && (
                        <p className={estelitos.errors}>{errors.description}</p>
                    )}
                </div>
                
                <Link to='/home'>
                <button className={estelitos.buttons}>Back</button>
            </Link>
            
            {errors.name || errors.description || errors.rating || errors.image || errors.platforms || errors.genero || errors.released? <p className={estelitos.errors}>Faltan campos obligatorios</p> : <button className={estelitos.buttons} type="submit">Send</button>}

            </form>

        </div>
    )
}