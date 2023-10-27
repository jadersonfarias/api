const fs = require("fs"); //ajuda a lidar com manipulação de arquivo /node.js
const path = require("path");
const uploadConfig = require("../configs/upload");

class DiskStorage {
  async saveFile(file) {
    await fs.promises.rename(
      //rename para mudar o arquivo de lugar / fs.promises = precisa esperar o processo assim não travando a aplicação
      path.resolve(uploadConfig.TMP_FOLDER, file),
      path.resolve(uploadConfig.UPLOADS_FOLDER, file)
    );

    return file;
  }

  async deleteFile(file) {
    const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file); //buscar a pasta la na pasta upload
    try {
      await fs.promises.stat(filePath); //retorna  o stat do processo se o arquivo está corrompido
    } catch {
      return;
    }

    await fs.promises.unlink(filePath); //unlink serve para DELETAR UM ARQUIVO DE UMA PASTA ESPECÍFICAS
  }
}

module.exports = DiskStorage;
