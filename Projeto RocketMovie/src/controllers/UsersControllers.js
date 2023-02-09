const AppError = require("../utils/AppError");
const knex = require("../database/knex");
const { compare, hash } = require("bcryptjs");


class UsersControllers {
    
   async create(request, response){
        const {name, email, password} = request.body;

        if (!name || !email || !password){
            throw new AppError("Informe nome, email e senha.");
        }

        const emailExist =  await knex('users').where({email}).first(); 
        if (emailExist) {
            throw new AppError("Este email já  está em uso!")
        }

        const newPassword = await hash(password, 8); 

        await knex("users").insert({
            name,
            email,
            password : newPassword
        })
            
        return response.status(201).json()
            
        
        
    }
    
    async update(request, response){
        const {name, email, password, old_password} = request.body;
        const user_id = request.user.id;

        const user = await knex("users").where({id: user_id}).first() //.then(d => console.log(d))
        
        if (!user){
            throw new AppError("Usuário não encontrado")
        }

        const userEmailExists = await knex('users').where({ email })

        if (userEmailExists.length === 1 && userEmailExists[0].id !== user_id) {
          throw new AppError('Este email já cadastrado.')
        } 

        user.name = name ?? user.name;
        user.email = email ?? user.email;
        
        if (password && !old_password){
            throw new AppError("Informe a senha antiga")
        }

        if (password && old_password) {

        const checkOldPassword = await compare(old_password, user.password);
    
        if (!checkOldPassword){
            throw new AppError("A senha antiga não confere");
          }

          user.password = await hash(password, 8);
          
          await knex("users").where({id: user.id}).update({
            name: user.name,
            email: user.email,
            password: user.password
    
          });
        }

        return response.json();
    }

    async delete(request, response){
        const { id } = request.params;

        await knex("notes").where({ id: id }).delete();
        
        return response.json();
        
   }
}

module.exports = UsersControllers;