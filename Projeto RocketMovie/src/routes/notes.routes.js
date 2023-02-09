const {Router} = require('express');
const notesRoutes = Router();

const NotesControllers = require("../controllers/NotesControllers");
const notesControllers = new NotesControllers;

notesRoutes.get("/", notesControllers.index)
notesRoutes.post("/:user_id", notesControllers.create);
notesRoutes.get("/:note_id", notesControllers.show);
notesRoutes.delete("/:user_id", notesControllers.delete)
/*


*/

module.exports = notesRoutes;




