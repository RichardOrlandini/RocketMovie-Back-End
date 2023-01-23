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

        return response.json(notes);
    }

    async show(request, response){
        const {user_id, note_id} = request.query;

        const note = await knex(notes).where({note_id: id});

    }

    async delete(request, response){

        const {note_id} = request.query

        await knex("notes").where("id", note_id).delete();

        return response.json()
    } 
}

module.exports = NotesControllers;