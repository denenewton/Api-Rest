const express = require('express')
const app = express()
const Game = require('./database/Game')
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

  Game.findAll({ raw: true }).then(games => {

    res.statusCode = 200;
    res.json(games);
    console.log(games)

  }).catch((erro) => {
    console.log('Erro: ' + erro)
  })

})

app.get('/game/:id', (req, res) => {

  if (isNaN(req.params.id)) {

    res.sendStatus(400)  //status code bad request

  } else {

    var id = parseInt(req.params.id)

    Game.findByPk(id).then(game => {
      if (game != undefined) {

        res.statusCode = 200 // ok
        res.json(game) //mandamos o game encontrado para o front-end...

      } else {

        res.sendStatus(404); // not found
      }
    })


  }
})

app.post('/game', (req, res) => {

  var { titulo, ano, preco } = req.body

  if (titulo == undefined || ano == undefined || preco == undefined) {

    res.sendStatus(400)

  } else if (isNaN(preco) || isNaN(ano)) {

    send.statusCode(400) // bad resquest

  } else { //se tiver tudo ok gravamos as informcoes no banco

    Game.create({
      titulo: titulo,
      ano: ano,
      preco: preco
    })

    res.sendStatus(200)  // ok  
  }
})

app.delete('/game/:id', (req, res) => {

  if (isNaN(req.params.id) || req.params.id == undefined) {

    res.sendStatus(400) // bad request

  } else {

    var id = parseInt(req.params.id)

    Game.destroy({

      where: { id: id }

    }).then(() => {

      res.sendStatus(200)

    })

  }
})

app.put('/game/:id', (req, res) => {

  if (isNaN(req.params.id)) {
    res.sendStatus(400) // bad resquest..
  } else {
    var id = parseInt(req.params.id)
    // var game = DB.games.find(g => g.id == id)
    Game.findByPk(id).then(game => {

      if (game == undefined) {
        res.sendStatus(404) // not to fond

      } else {
        var { titulo, ano, preco } = req.body

        Game.update({

          titulo: titulo,
          ano: ano,
          preco: preco

        },
          {
            where: { id: id }
          })

        res.sendStatus(200)

      }
    }).catch(erro => {
      console.log('Ocorreu um erro na edicao: ' + erro)
    })
  }

})


app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001.')
})