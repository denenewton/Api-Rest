const Sequelize = require('sequelize')

const sequelize = new Sequelize('apigames', 'root', '',{
    host: 'localhost',
    dialect: "mysql",
    timezone: '-03:00'
  })
  
  sequelize.authenticate().then(()=>{
    console.log('Conexao com banco estabelecida')
  })

  module.exports = sequelize;
  
