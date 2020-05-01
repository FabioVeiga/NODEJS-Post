
const express = require('express')
const app = express()
const handlebars = require('express-handlebars')//rececbe o modulo handlebars
const bodyParser = require('body-parser')
const Post = require('./models/Post')


//Configuracoes
    //Template handlebars
    //configurando indicar pro express que o handlebars sera  template end
        app.engine('handlebars', handlebars({defaultLayout: 'main'}))//main eh o template padra da aplicacao
        app.set('view engine','handlebars')
    //Configurando o body parser
        app.use(bodyParser.urlencoded({defaultLayout: false}))
        app.use(bodyParser.json())
    //Rotas
        //HOMe
        app.get('/',function(require, resposta){
            //para exibir o conteudo que esta na tabela do model POST
            //usando o THEN para receber o OBJ para passar para VIEW
            //ordenando, colocar a propriedade ORDER dentro do FINDALL
            Post.findAll({order:[['id','ASC']]}).then(function(posts){      
                /*com a chave pode passar qq coisa para dentro da VIEW*/          
                resposta.render('home', {posts: posts})
            })
        })
        //Cadastro Postagem
        app.get('/cadPost',function(requisicao, resposta){
            resposta.render('formularioPosts')//ira rendereizar o arquivo
        })
        //recebe Post
        //se o formulario que voce esta recebendo eh um POST deve-se alterar o method
        app.post('/addPost', function(requisicao, resposta){
            Post.create({
                //pegando os dados que esta vindo de um formulario
                titulo: requisicao.body.titulo, //pega o dado pelo nome do campo (o body eh o que esta configurado no layout main do handl)
                conteudo: requisicao.body.conteudo
            }).then(function(){ //then eh a sequencia do que foi executado acima COM SUCESSO
                //quando sucesso sera redirecionado para outro page
                resposta.redirect('/') //para principal
                //resposta.send('Post criado com sucesso!')
            }).catch(function(erro){ //SE ERRO
                resposta.send('Houve algum erro: ' + erro)
            })
        })
        //deletar com parametro ID
        app.get('/deletar/:id', function(requisicao, resposta){
            Post.destroy(
                {where: 
                    {
                        'id': requisicao.params.id
                    }
            }).then(function(){
                resposta.redirect('/')
            }).catch(function(erro){
                resposta.send('Houve algum erro: ' + erro)
            })
        })
        //resgate dos dados para editar post
        app.get('/editar/:id',function(requisicao, resposta){
            Post.findAll({where:{'id':requisicao.params.id}}).then(function(posts){
                resposta.render('editar', {posts: posts})
            }).catch(function(erro){
                resposta.send("Houve erro: " + erro)
            })
        })
        //recebe os dados da edicao e atualiza no bando
        app.post('/editarPost/:id', function(requisicao, resposta){
            Post.update(
                {
                    titulo: requisicao.body.titulo,
                    conteudo: requisicao.body.conteudo
                },{
                    where:{
                        id: requisicao.params.id
                    }
                }
            ).then(function (){
                resposta.redirect('/')
            }).catch(function(erro){
                resposta.send("Houve erro: " + erro)
            })
        })


app.listen(8081,function(){
    console.log(`Servidor rodando na URL http://localhost:8081`)
})

//endereco: localhost:8081