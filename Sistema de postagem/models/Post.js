const db = require('./db') //expostando o module

//Tabela do module Post
const Post = db.sequelize.define('posts', {
    titulo:{
        type: db.Sequelize.STRING
    },
    conteudo:{
        type: db.Sequelize.TEXT
    }
})

//exutar o comando de sync somente uma vez
//Post.sync({force: true})

//Expostando o model POST para conseguir usar em outros arquivos
module.exports = Post