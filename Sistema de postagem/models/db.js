const Sequelize = require('sequelize') 

//Conexao com banco de dados MySql
const sequelize = new Sequelize
(
    'postapp', 'root', '12345678',
    { 
        host: 'localhost', 
        dialect: 'mysql' 
    }
)

//Expostando o MODEL para conseguir usar em outros arquivos
module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}