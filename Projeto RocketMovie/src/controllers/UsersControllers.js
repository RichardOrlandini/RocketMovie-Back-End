
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
        
      const user_id = request.user.id
      const { name, email, password, new_password, avatar} = request.body
  
      const userExists = await knex('users').where({ email })

      if (userExists.length === 1 && userExists[0].id !== user_id) {
        throw new AppError('Email já cadastrado')
      }
  
      if (password && new_password) {
        const validUserPassword = await knex
          .select('password')
          .from('users')
          .where('id', user_id)
  
        const checkOldPassword = await compare(
          password,
          validUserPassword[0].password
        )
        const att_password = await hash(new_password, 8)
        if (!checkOldPassword) {
          throw new AppError('A senha antiga nao confere')
        }
  
        const user_update = await knex('users').where('id', user_id).update({
          password: att_password
        })
      }
      
      if (avatar){
        const user_update = await knex('users').where('id', user_id).update({
          avatar
        })

      }
      const user_update = await knex('users').where('id', user_id).update({
        name,
        email,
      })
  
      return response.json()
    }

    async delete(request, response){
        const { id } = request.params;

        await knex("notes").where({ id: id }).delete();
        
        return response.json();
        
   }
}

module.exports = UsersControllers;