const multer = require('multer');
const path = require('path');
const crypto = require('crypto') //gera ids unicos em formato de hashes(conjunto de caracteres)

module.exports = {
    dest: path.resolve(__dirname, '..', '..', 'tmp'), //destino dos arquivos a serem salvos

    storage: multer.diskStorage({ //tipo de armazenamento: fisico, nuvem, bd
        
        //destino dos arquivos
        destination: (req, file, callback) => {

            callback(null, path.resolve(__dirname, '..', '..', 'tmp'))

        }, 

        //nome com que os arquivos serao salvos, isso ira gerar um id unico hexadecimal de 16 caracteres e adicionar ao inicio do nome horiginal do arquivo
        filename: (req, file, callback) => {
            
            crypto.randomBytes(16, (err, hash) => {

                if (err) {
                    callback(err);

                } else {
                    
                    file.key = `${hash.toString('hex')}-${file.originalname}`;

                    callback(null, file.key);

                }

            })

        }, 
    }) 

}