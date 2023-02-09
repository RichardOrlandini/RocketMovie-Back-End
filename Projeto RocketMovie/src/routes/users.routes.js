const {Router} = require('express');
const usersRoutes = Router();
const UsersControllers  = require('../controllers/UsersControllers');
const usersControllers = new UsersControllers();


usersRoutes.post("/", usersControllers.create);
usersRoutes.delete("/:id", usersControllers.delete);
usersRoutes.put("/:user_id", usersControllers.update);



module.exports = usersRoutes;
