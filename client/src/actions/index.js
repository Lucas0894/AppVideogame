import axios from "axios"



export function getVideogames(){
    return async function(dispatch){
        try {
            const respVid = await axios.get("http://localhost:3001/videogames")
            return dispatch({
                type: "GET_VIDEOGAMES",
                payload: respVid.data
            })
        } catch (error) {
            console.log(error)
        }
        
        
            
        
    }
}

export function getGenres(){
    return async function(dispatch){
        try {
            const respgen = await axios.get('http://localhost:3001/genres')
            return dispatch({
                type: 'GET_GENRES',
                payload: respgen.data
            })
            
        } catch (error) {
            console.log(error)
            
        }
    }
}

export function postVideogame(body){
    return async function(dispatch){
        try {
            const getinfo = await axios.post('http://localhost:3001/videogames', body)
            console.log(getinfo)
            return getinfo
        } catch (error) {
            console.log(error)
            
        }
}}

export function getNameVideogame(payload){
    return async function(dispatch){
        try {
         return await fetch(`http://localhost:3001/videogames?name=${payload}`)
         .then(respond => respond.json())
         .then(data=> 
            dispatch({
                type: 'GET_VIDEOGAMES_BY_NAME',
                payload: data
            }))   
        } catch (error) {
            console.log(error)
        }
    }

}

export function filterVideogamesByGenres(payload){
    console.log(payload)
    return{
        type: 'FILTER_BY_GENRE',
        payload
    }
}

export function filterCreated(payload){
      console.log(payload)
      return {
        type: 'FILTER_CREATED',
        payload
      }
}

export function orderByName(payload){
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
}

export function orderByRating(payload){
    return {
        type: 'ORDER_BY_RATING',
        payload
    }
}

export function getDetail(id){
    return async function(dispatch){
        try {
            var json = await axios.get('http://localhost:3001/videogame/'+id)
            return dispatch({
                type: 'GET_DETAILS',
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }

}

