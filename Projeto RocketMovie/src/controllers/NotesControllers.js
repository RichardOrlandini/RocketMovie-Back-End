const knex = require("../../knexfile");

class NotesControllers {


    async create(request, response){
        const {title, description, tags} = request.body;
        const { user_id} = request.params;

        const note_id = await knex("notes").insert({
            title,
            description,
            user_id
        });

        const tagsInsert = tags.map(name => {
            return {
                note_id,
                name,
                user_id
            }
        });

        knex("tags").insert(tagsInsert);

        response.json();



    }



    async index(request, response){
        const { user_id  } = request.query;

        const notes = await knex(notes).where({user_id}).orderBy("title");
    }

    async show(request, response){

    }

    async delete(request, responde){
        
    }



}

module.exports = NotesControllers;