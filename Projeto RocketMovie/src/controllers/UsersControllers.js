const AppError = require("../utils/AppError");
const knex = require("../database/knex");
const { compare, hash } = require("bcryptjs");
const { response } = require("express");


class UsersControllers {
    
   async create(request, response){
        const {name, email, password} = request.query;
        
        console.log(name,email,password)

        if (!name || !email || !password){
            throw new AppError("Informe nome, email e senha.");
        }
        
        const nameExist = await knex("users").where({name}).first();
        if (nameExist){
            throw new AppError("Nome já existe.")
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
        const {name, email, password, old_password} = request.query;
        const {user_id} = request.query;
        console.log(name,email,password, old_password);

        const userExist = await knex("users").where("id", "=", user_id).first();

        if(!userExist){
            throw new AppError("Usuário não cadastrado");
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