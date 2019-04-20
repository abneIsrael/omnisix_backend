require('dotenv').config();

const express = require('express');

const cors = require('cors');

const mongoose = require('mongoose');

const path = require('path');

const app = express(); //guarda as informacoes da aplicacao

app.use(cors());//habilita outros aplicativos de outros servidores acessarem o app

//Configura o Socket io (de maneira resumida, veja como se faz no bruto)
const server = require('http').Server(app);
const io = require('socket.io')(server);


io.on("connection", socket => { //parametro socket representa a conexao do cliente com o server
    console.log('socket io conection Ok!');

    socket.on('connectRoom', box => { //define uma rota realtime (1 param) e uma acao para essa rota (2 param)
        socket.join(box); //concta cada usuario que acessou esta rota, a uma sala especifica, isolandoo dos outros usuarios
    });

});

const mongoURL = process.env.MONGOURL || MONGODB_URL_CONNECTION;
mongoose.connect(mongoURL, {
    useNewUrlParser: true
}); //estabelece conexao com MongoBD


//Modulos/Midlewares

/**
 * Intercepta todas as requisicoes, 
 * adiciona uma instancia do realtime
 * depois redireciona a requisicao
 * para a rota solicitada.
 */
app.use((req, res, next) => {
    req.io = io; //define um atributo io dentro da requisicao e adiciona uma instancia do realtime, assim toda a aplicacao tera acesso ao realtime
    
    return next(); //reencaminha a requisicao para a rota q o usuario acessou
});
app.use(express.json()); //permite que as requisicoes/respostas do servidor sejam feitas em json
app.use(express.urlencoded({ extended: true })); //permite enviar arquivos para o servidor
app.use('/files', express.static( path.resolve(__dirname, '..', 'tmp') ) );// redireciona a rota /files para a pasta tmp do projeto

app.use(require('./routes'));

// app.listen(3000, ()=>{
//     console.log("Server is Running :D");
// }); //roda o app nessa porta

//torna nossa aplicacao node capaz de receber requisicoes http e ws(websocket)
server.listen(process.env.PORT, ()=>{ //configuramos a variavel PORT no Heroku
    console.log("Server is Running :D");
}); //roda o app nessa porta