const knex = require("../database/knex");

class UserRepository {
    async findByEmail(email){
        
        const user = await knex('users').where({email}).first(); 

        return user;
    };

    async create({name, email, password}){

        const userId = await knex("users").insert({ // assim que faz a inserção o knex devolve o id, despejamos ele na variavel userId
            name,
            email,
            password
        });
        return {id: userId};
    };
}
module.exports = UserRepository;