const appError = require("../utils/AppError");

const { hash, compare } = require("bcryptjs");

const sqliteConnection = require("../database/sqlite");

class usersController {
  async create(request, response) {
    const { name, email, password } = request.body;

    const database = await sqliteConnection();
    const checkUserExist = await database.get(
      "SELECT * FROM users WHERE email = (?)",
      [email]
    );
    if (checkUserExist) {
      throw new appError("este e-mail está em uso.");
    }

    const hashdpassword = await hash(password, 8);

    await database.run(
      "INSERT  INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashdpassword]
    );

    return response.status(201).json();
  }

  async update(request, response) {
    const { name, email, password, old_password } = request.body;
    // const { id } = request.params; depois que o token está ativo não precisa más passar o id

    const user_id = request.user.id;

    const database = await sqliteConnection();
    const user = await database.get(
      `SELECT * FROM users WHERE id = ${user_id}`
    );
    if (!user) {
      throw new appError("usuario não encontrado");
    }

    const userWithUpdatedEmail = await database.get(
      "SELECT * FROM users WHERE email = (?)",
      [email]
    );

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new appError("Este e-mail já está em uso.");
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new appError("a senha antiga não confere.");
      }

      user.password = await hash(password, 8);
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if (password && !old_password) {
      throw new appError("você precisa digitar a nova senha");
    }

    await database.run(
      `
    UPDATE users SET
    name = ?,
    email = ?,
    password = ?,
    updated_at = DATETIME('NOW')
    WHERE id = ?`,
      [user.name, user.email, user.password, user_id]
    );

    return response.json();
  }
}

module.exports = usersController;

/*
      if(!name){
        throw new appError('nome é obrigatorio')
      }

        response.status(201).json({name, email,  password });
    }
*/
