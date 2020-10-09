const Sequelize  = require('sequelize');
const sequelize = require('./database')

const Game = sequelize.define( 'games', { 

    titulo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    ano:{
        type: Sequelize.INTEGER,
        allowNull: false

    },
    preco:{
        type:Sequelize.DOUBLE,
    

    }
});

Game.sync({force:false})

module.exports = Game;