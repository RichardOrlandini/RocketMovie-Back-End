
const UserRepository = require("../repositories/UserRepository");
const UserCreateServices = require("../services/UserCreateServices");
const knex = require("../database/knex");

class UsersControllers {
    
   async create(request, response){
        const {name, email, password} = request.body;
        
        const userRepository = new UserRepository();
        const userCreateServices = new UserCreateServices(userRepository)
        await userCreateServices.execute({ name, email, password});
            
        return response.status(201).json()
    }
    
    async update(request, response) {
      const { name, email, password, new_password, avatar } = request.body;
      const user_id = request.user.id;

      const userRepository = new UserRepository();
      const userCreateService =  new UserCreateService(userRepository);

      await userCreateService.executeUpdate({name, email, password, new_password,  user_id});

      if (avatar){
        const user_update = await knex('users').where('id', user_id).update({
          avatar
        })
      }
      return response.json()
    }

    async delete(request, response){
        const { id } = request.params;

        await knex("notes").where({ id: id }).delete();
        
        return response.json();
        
   }
}

module.exports = UsersControllers;