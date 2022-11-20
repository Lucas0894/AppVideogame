const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const {Videogame, Genero} = require('../db')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
 const getInfoApi = async ()=> {
    
    const urlApi = await Promise.all([
     axios.get('https://api.rawg.io/api/games?key=d70f87b28873446ca834ef641ebac996'),
     axios.get('https://api.rawg.io/api/games?key=d70f87b28873446ca834ef641ebac996&page=2'),
     axios.get('https://api.rawg.io/api/games?key=d70f87b28873446ca834ef641ebac996&page=3'),
     axios.get('https://api.rawg.io/api/games?key=d70f87b28873446ca834ef641ebac996&page=4'),
     axios.get('https://api.rawg.io/api/games?key=d70f87b28873446ca834ef641ebac996&page=5')]);
    
    const apiInfo = urlApi.map(el => {
        return el.data.results.map(el => {
            return {
            id: el.id,
            name: el.name,
            description: el.description,
            released: el.released,
            rating: el.rating,
            background_image: el.background_image, 
            platforms: el.platforms.map(el => el.platform.name),
            genres: el.genres.map(el => el.name).join(', ')

        }})
        
    })
    return apiInfo.flat(3)
 }


 const getDbInfo = async ()=>{
    
    let videogamesDb = await Videogame.findAll({
        include: {
            model: Genero,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    })
    
    videogamesDb= videogamesDb.map(e=>e.toJSON());
    console.log(videogamesDb)
    videogamesDb.map(el => {
        el.generos = el.generos.map(e => e.name).join(", ")
    })
    return videogamesDb;
}

// const getDbInfo = async ()=>{
//     return await Videogame.findAll({
//         include: {
//             model: Genero,
//             attributes: ['name'],
//             through: {
//                 attributes: []
//             }
//         }
//     })
// }

const getAllVideogames = async ()=>{
    const apiInfo = await getInfoApi();
    const dbInfo = await getDbInfo();
    const todaInfo = apiInfo.concat(dbInfo);
    return todaInfo;
}

router.get('/videogames', async (req, res)=>{
    const name = req.query.name;
    const totalVideogames = await getAllVideogames();
    if(name) {
        let videoName = totalVideogames.filter(el => el.name.toLowerCase().includes(name.toLowerCase()));
        if(videoName.length){
            res.status(200).send(videoName);
        }else{
            res.status(404).send('El videojuego ingresado no existe')
        }
    }else{
        res.status(200).send(totalVideogames);
    }
})

router.get('/genres', async (req,res) => {
    const apigenres = await Promise.all([
        axios.get('https://api.rawg.io/api/games?key=d70f87b28873446ca834ef641ebac996'),
        axios.get('https://api.rawg.io/api/games?key=d70f87b28873446ca834ef641ebac996&page=2'),
        axios.get('https://api.rawg.io/api/games?key=d70f87b28873446ca834ef641ebac996&page=3'),
        axios.get('https://api.rawg.io/api/games?key=d70f87b28873446ca834ef641ebac996&page=4'),
        axios.get('https://api.rawg.io/api/games?key=d70f87b28873446ca834ef641ebac996&page=5')]);
    
    const apiInfo = apigenres.map(el => {
       return el.data.results.map(el => el.genres.map(el => el.name))
    })
    
    console.log(apiInfo.flat(3))
    const gen = apiInfo.flat(3)
    console.log(gen)
    const genTotal = gen.map(el => {
        return el
    })
    console.log(gen)
    genTotal.forEach(el => {
        Genero.findOrCreate({
            where: {name: el}
        })
    })
    
    const allGenres = await Genero.findAll();
    console.log(allGenres)
    res.send(allGenres)
})

router.post('/videogames', async (req, res) =>{
    let {
        name,
        description,
        released,
        rating,
        image,
        platforms,
        createdinDb,
        genero
    } = req.body;
    
    let createdVideogame = await Videogame.create({
        name,
        description,
        released,
        rating,
        image,
        platforms,
        createdinDb
    })
    let genreDB = await Genero.findAll({
        where: {
            name: genero
        }
    })
    console.log(genreDB)
    createdVideogame.addGenero(genreDB);
    res.send('Videojuego creado con exito')
    console.log(createdVideogame)
})

router.get('/videogame/:id', async (req, res)=>{
    const {id} = req.params;
    const videogamesTotal = await getAllVideogames();
    if(id){
        let videogamesId =videogamesTotal.filter(el => el.id == id);
        if(videogamesId.length){
            res.status(200).json(videogamesId);
        }else{
            res.status(404).send('No se encontro el id')
        }
    }
})


module.exports = router;



// router.post('/recipes', async (req,res) => {
//     let {
//         title,
//         image,
//         summary,
//         healthScore,
//         analyzedInstructions,
//         createdInDb,
//         diet,
//     } = req.body;
//     let createdFood = await Recipe.create({
//         title,
//         image,
//         summary,
//         healthScore,
//         analyzedInstructions,
//         createdInDb
//     })

//     let dietDb = await Diet.findAll({
//         where: {
//             name: diet
//         }
//     })

//     createdFood = createdFood.addDiet(dietDb)
//     res.send('Receta creada con exito')
// })



// router.get('/diets', async (req, res) =>{
//     const urlApi = await Promise.all([
//         axios.get('https://api.spoonacular.com/recipes/complexSearch?&addRecipeInformation=true&apiKey=83ae99652cd24bfc8ad87b61398596c7'),
//         axios.get('https://api.spoonacular.com/recipes/complexSearch?&addRecipeInformation=true&apiKey=83ae99652cd24bfc8ad87b61398596c7&offset=1'),
//         axios.get('https://api.spoonacular.com/recipes/complexSearch?&addRecipeInformation=true&apiKey=83ae99652cd24bfc8ad87b61398596c7&offset=2'),
//         axios.get('https://api.spoonacular.com/recipes/complexSearch?&addRecipeInformation=true&apiKey=83ae99652cd24bfc8ad87b61398596c7&offset=3'),
//         axios.get('https://api.spoonacular.com/recipes/complexSearch?&addRecipeInformation=true&apiKey=83ae99652cd24bfc8ad87b61398596c7&offset=4'),
//         axios.get('https://api.spoonacular.com/recipes/complexSearch?&addRecipeInformation=true&apiKey=83ae99652cd24bfc8ad87b61398596c7&offset=5'),
//         axios.get('https://api.spoonacular.com/recipes/complexSearch?&addRecipeInformation=true&apiKey=83ae99652cd24bfc8ad87b61398596c7&offset=6'),
//         axios.get('https://api.spoonacular.com/recipes/complexSearch?&addRecipeInformation=true&apiKey=83ae99652cd24bfc8ad87b61398596c7&offset=7'),
//         axios.get('https://api.spoonacular.com/recipes/complexSearch?&addRecipeInformation=true&apiKey=83ae99652cd24bfc8ad87b61398596c7&offset=8'),
//         axios.get('https://api.spoonacular.com/recipes/complexSearch?&addRecipeInformation=true&apiKey=83ae99652cd24bfc8ad87b61398596c7&offset=9')
//     ]);