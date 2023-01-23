const knex = require("../../knexfile");

class TagsControllers {
    async index(request, response){
        const {user_id} = request.query;

        const tags =  knex("tags").where("id", user_id).then(a => console.log(a))

        return response.json(tags);
    }

    async delete(request, response){
        const {tag_id} = request.query;

        await knex("tags").where("id", tag_id).delete()
    }
}

module.exports = TagsControllers;