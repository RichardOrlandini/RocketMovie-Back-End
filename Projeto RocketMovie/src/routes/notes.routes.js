const {Router} = require('express');
const notesRoutes = Router();
const NotesControllers = require("../controllers/NotesControllers");
const notesControllers = new NotesControllers;



notesRoutes.post("/:id", notesControllers.create)

/*
notesRoutes.get("/", notesControllers.index)
notesRoutes.get("/", notesControllers.show)
notesRoutes.delete("/", notesControllers.delete)
*/

module.exports = notesRoutes;




