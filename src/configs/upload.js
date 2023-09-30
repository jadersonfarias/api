const path = require("path")
const multer = require("multer")
const Crypto = require("crypto")

const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp"); //serve para conectar com a pasta tmp
const UPLOADS_FOLDER = path.resolve(TMP_FOLDER, "uploads");

const MULTER = { // serve par lidar com o upload
    storage: multer.diskStorage({
        destination: TMP_FOLDER,
        filename(request, file, callback){
            const fileHash  = Crypto.randomBytes(10).toString("hex"); //filehash ser ve para garantir que o número seja único
            const filename = `${fileHash}-${file.originalname}` //originalname tbm ajuda há ter nomes iguais

            return callback(null, filename);
        },
    }),
}


module.exports = {
    TMP_FOLDER,
    UPLOADS_FOLDER,
    MULTER,
}



//npm install multer 