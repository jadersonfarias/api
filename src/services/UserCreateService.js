const AppError = require("../utils/AppError");

const { hash } = require("bcryptjs");


class UserCreateService{
    constructor(userRepository){
        this.userRepository = userRepository // deixa  a função global nesta class
    }

    async execute({name, email, password}){

        const checkUserExist = await this.userRepository.findByEmail(email)    //await database.get( "SELECT * FROM users WHERE email = (?)",  [email]); está parte foi lá para o repositories
    
        if (checkUserExist) {
        throw new AppError("este e-mail está em uso.");
        }

        const hashdpassword = await hash(password, 8);
        const userCreated = await this.userRepository.create({name, email, password: hashdpassword})

        return userCreated;
    }
 }



module.exports = UserCreateService;