const {Router} = require('express');
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const NotesControllers = require("../controllers/NotesControllers");

const notesRoutes = Router();
const notesControllers = new NotesControllers;

notesRoutes.use(ensureAuthenticated);

notesRoutes.get("/", notesControllers.index)
notesRoutes.post("/", notesControllers.create);
notesRoutes.get("/:note_id", notesControllers.show);
notesRoutes.delete("/:id", notesControllers.delete)
/*


*/

module.exports = notesRoutes;




