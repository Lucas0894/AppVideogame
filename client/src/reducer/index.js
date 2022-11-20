

const initialState = {
    videogames: [],
    details: [],
    allVideogames : [],
    genres: []
    
}



function rootReducer(state=initialState, action){
switch(action.type){
    case 'GET_VIDEOGAMES':
        return {
            ...state,
            videogames: action.payload,
            allVideogames: action.payload
        }
    case 'POST_VIDEOGAME':
        return {
            ...state
        }

        case 'GET_DETAILS':
            return {
                ...state,
                details: action.payload
            }

        
        
        case 'FILTER_BY_GENRE':
            const allVideogames = state.allVideogames;
            const statusFilt = action.payload === 'All'? allVideogames: allVideogames.filter(el => el.generos? el.generos.includes(action.payload): el.genres.includes(action.payload) )
            return {
                ...state,
            videogames: statusFilt
        }
        case 'GET_GENRES': 
        return {
        ...state,
        genres: action.payload

    }
    case 'FILTER_CREATED':
        const createdFilter = action.payload === 'Created'? state.allVideogames.filter(el => el.createdinDb): state.allVideogames.filter(el => !el.createdinDb)
        return {
            ...state,
            videogames: action.payload === 'All'? state.allVideogames: createdFilter 
        }
        
        case 'ORDER_BY_NAME':
        let sortOrder = action.payload === 'asc'?
        state.allVideogames.sort(function(a,b){
            if(a.name > b.name && a.rating > b.rating){
                return 1
            }
            if(b.name > a.name && b.rating > a.rating){
                return -1
            }
            return 0
        }): state.allVideogames.sort(function(a,b){
            if(a.name > b.name && a.rating > b.rating){
                return -1
            }
            if(b.name > a.name && b.rating > a.rating){
                return 1
            }
            return 0
        })
        return {
            ...state,
            videogames: sortOrder
        }
        

    case 'ORDER_BY_RATING':
        let sortRating = action.payload === 'asc'?
        state.allVideogames.sort(function(a,b){
            if(a.rating > b.rating){
                return 1
            }
            if(b.rating > a.rating){
                return -1
            }
            return 0
        }): state.allVideogames.sort(function(a,b){
            if(a.rating > b.rating){
                return -1
            }
            if(b.rating > a.rating){
                return 1
            }
            return 0
        })
        return {
            ...state,
            videogames: sortRating
        }

    case 'GET_VIDEOGAMES_BY_NAME':
        return {
            ...state,
            videogames: action.payload
        }
        
        
        
        default: return state
        
        

}
}

export default rootReducer

// export default rootReducer

// const initialState = {
//     altVideogames: []
//     videogames: [],
// }

// function rootReducer(state=initialState, action){
// switch(action.type){
//     case 'GET_VIDEOGAMES':
//         return {
//             ...state,
//             videogames: action.payload,
            
//         }
//     case 'FILTER_BY_GENRE':
//         const allVideogames = state.videogames;
        
//         const statusFilt = action.payload === 'All'? allVideogames: allVideogames.filter(el => el.genres.includes(action.payload))
//         console.log(statusFilt)
//         return {
//             ...state,
//             altVideogames: statusFilt
//         }