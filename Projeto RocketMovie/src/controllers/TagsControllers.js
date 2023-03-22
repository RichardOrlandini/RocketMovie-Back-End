const knex = require("../database/knex");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");


class TagsControllers {
    async index(request, response){ // listar todas as tags cadastradas do usuario

        const user_id = request.user.id;

        const tags =  await knex("tags").where({user_id})

        return response.json(tags);
    }

    async delete(request, response){
        const {tag_id} = request.query;

        await knex("tags").where("id", tag_id).delete();

        return response.json();
    }
}

module.exports = TagsControllers;