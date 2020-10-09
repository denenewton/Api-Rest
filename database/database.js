const Sequelize = require('sequelize')

const sequelize = new Sequelize('apigames', 'root', 'tigre225',{
    host: 'localhost',
    dialect: "mysql",
    timezone: '-03:00'
  })
  
  sequelize.authenticate().then(()=>{
    console.log('Conexao com banco estabelecida')
  })

  module.exports = sequelize;
  