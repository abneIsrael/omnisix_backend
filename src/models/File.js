const mongoose = require('mongoose');

const File = new mongoose.Schema({
    title: {
        type: String,
        required: true
    }, 
    path:{ //guardara o caminho de onde encontrar o arquivo
        type: String,
        required: true
    },
    
}, {
    timestamps: true, //cria campos createdAt e updatedAt
    toObject: {virtuals: true}, //toda vez que a instancia de files for convertida em um objeto, gera um campo virtual
    toJSON: {virtuals: true},   //toda vez que a instancia de files for convertida em um JSON, gera um campo virtual
});

//define o campo virtual com o nome url, e com um conteudo
File.virtual("url").get(function() {
    const url = process.env.URL || 'http://localhost:3000'; // a variavel URL definiremos la no heroku

    return `${url}/files/${encodeURIComponent(this.path)}`;
})

module.exports = mongoose.model('File', File);