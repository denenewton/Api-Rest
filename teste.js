const express = require('express')
const app = express()
const sequelize = require('./database/database')
const  Game = require('./database/Game')
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(cors())

//configuracoa body-parse

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Bem vindo a esta api.')
})

app.get('/games', (req, res) => {

  Game.findAll().lean().then((games)=>{
    console.log(games)
    var game={
        id: games.id,
        titulo: games.titulo,
        ano: games.ano,
        preço: games.preço
    }
    res.statusCode = 200;
    res.json(game);
   // console.log(game)
  }).catch((erro)=>{
     console.log('Erro: ' + erro)
  })


 // res.json(DB.games);
 // console.log(DB.games)
})

app.get('/game/:id', (req, res) => {

  if (isNaN(req.params.id)) {

    res.sendStatus(400)  //status code bad request

  } else {

    var id = parseInt(req.params.id)
    //var game = DB.games.filter( game => game.id == id)
    var game = DB.games.find(game => game.id == id)

    if (game != undefined) {

      res.statusCode = 200 // ok
      res.json(game)

    } else {

      res.sendStatus(404); // not found
    }
  }
})

app.post('/game', (req, res) => {

  var { titulo, ano, preço } = req.body

  if (titulo == undefined || ano == undefined || preço == undefined) {
    res.sendStatus(400)
  } else if (isNaN(preço) || isNaN(ano)) {

    send.statusCode(400) // bad resquest

  } else {

    Game.create({
      titulo:titulo,
      ano: ano,
      preço: preço
    })

    DB.games.push({
      id: Math.trunc(Date.now() * 0.001),
      titulo,
      ano,
      preço
    })

    res.sendStatus(200)  // ok  
  }
})

app.delete('/game/:id', (req, res) => {

  if (isNaN(req.params.id) || req.params.id == undefined) {

    res.sendStatus(400) // bad request

  } else {

    var id = parseInt(req.params.id)
    var index = DB.games.findIndex(g => g.id == id) //verifica pelo index se o elemento existe

    if (index == -1) {
      res.sendStatus(404)// not to fond
    } else {
      DB.games.splice(index, 1)
      res.sendStatus(200)
    }

  }
})

app.put('/game/:id', (req, res) => {

  if (isNaN(req.params.id)) {
    res.sendStatus(400) // bad resquest..
  } else {
    var id = parseInt(req.params.id)
    var game = DB.games.find(g => g.id == id)
    if (game == undefined) {
      res.sendStatus(404) // not to fond

    } else {
      var { titulo, ano, preço } = req.body

      if (titulo != undefined) {
        game.titulo = titulo

      }
      if (ano != undefined) {
        game.ano = ano
      }
      if (preço != undefined) {
        game.preço = preço
      }

      res.sendStatus(200)

    }

  }


})

var DB = {
  games: [

    {
      id: 1723435675,
      titulo: 'Call of dudy Mw',
      ano: 2019,
      preço: 20
    },

    {
      id: 1534543924,
      titulo: 'Sea of thieves',
      ano: 2018,
      preço: 40

    },
    {
      id: 1134359643,
      titulo: 'Minecraft 4.4',
      ano: 2013,
      preço: 23

    },
    {
      id: 7234217897,
      titulo: 'Duolingo',
      ano: 2018,
      preço: 0

    }

  ]
}



app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001.')
})