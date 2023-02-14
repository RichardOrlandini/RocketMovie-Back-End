const AppError = require("../utils/AppError");
const {  hash } = require("bcryptjs");

class UserCreateServices {

    constructor(userRepository){
        this.userRepository = userRepository;
    }

    async execute({ name, email, password}){
        if (!name || !email || !password){
            throw new AppError("Informe nome, email e senha.");
        }

        const emailExist = await this.userRepository.findByEmail(email);

        if (emailExist) {
            throw new AppError("Este email já  está em uso!")
        }

        const newPassword = await hash(password, 8);

        await this.userRepository.create({ name, email, password:newPassword});
    }
}

module.exports = UserCreateServices