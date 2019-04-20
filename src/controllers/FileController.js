const Box = require('../models/Box');
const File = require('../models/File');

class FileController {

    async create(req, res) {
        // console.log(req.file);

        const box = await Box.findById(req.params.id);

        const file = await File.create({
            title: req.file.originalname,
            path: req.file.key,
        });

        box.files.push(file);

        await box.save();

        req.io.sockets.in(box._id).emit('file', file); //sockets->acessa todos os usuarios conectados a aplicacao que estao na box._id

        return res.json(file);
    }

}

module.exports = new FileController(); //retorna uma instancia dessa classe