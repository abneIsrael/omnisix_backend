const mongoose = require('mongoose');

const Box = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    files: [{ type: mongoose.Schema.Types.ObjectId, ref: "File" }] //Pega o atributo id de uma entidade na tabela File (ou seja as forenKeys), e armazena num array
}, {
    timestamps: true //cria campos createdAt e updatedAt
});

module.exports = mongoose.model('Box', Box);