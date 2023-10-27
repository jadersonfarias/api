const { verify } = require("jsonwebtoken");
const AppError = require("../utils/appError");
const authConfig = require("../configs/auth");

function ensureAuthenticated(request, response, next) {
  const authHeader = request.headers.authorization; // cabeçalho do token aki está o token

  if (!authHeader) {
    //se não estiver nada dentro ele para aki
    throw new AppError("JWT token não informado", 401);
  }

  const [, token] = authHeader.split(" "); // BEARER o split está quebrando o array e pegando tudo da segunda posição

  try {
    const { sub: user_id } = verify(token, authConfig.jwt.secret); //sub server para criar um apelido no caso aki user_id e o verify server para verificar se é um token valido

    request.user = {
      //coloca o user id na requisição
      id: Number(user_id), //volta ela para número
    };

    return next();
  } catch {
    throw new AppError("JWT token inválido", 401);
  }
}

module.exports = ensureAuthenticated;
