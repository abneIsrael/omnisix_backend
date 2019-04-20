const Box = require('../models/Box');

class BoxController {

    async create(req, res) {
        const box = await Box.create({ title: req.body.title }); //cria uma entidade box na tabela e retorna uma instacia dessa entidade recem criada

        return res.json(box);
    }

    async show(req, res) {
        const box = await Box.findById(req.params.id).populate('files');

        return res.json(box);
    }

}

module.exports = new BoxController(); //retorna uma instancia dessa classe