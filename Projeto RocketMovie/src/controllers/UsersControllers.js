const AppError = require("../utils/AppError");
const knex = require("../database/knex");

class UsersControllers {
    
   async create(request, response){
        const {name, email, password} = request.body;

        const userExist = await knex("users").where({email});

        if (userExist.length === 0 ){

            await knex("users").insert({
                name,
                email,
                password
            });
            
            return response.status(201).json()

        }else{
            throw new AppError("Este E-mail já esta em uso.")
        }
        
    }




   async delete(request, response){
        const { id } = request.params;

        await knex("notes").where({ id: id }).delete();

        return response.json();
        
   }

   async update(request, responde){

   }

}

module.exports = UsersControllers;