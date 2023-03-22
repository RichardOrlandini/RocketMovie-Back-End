const {Router} = require('express');
const UsersControllers  = require('../controllers/UsersControllers');
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const UserAvatarController = require('../controllers/UserAvatarControllers')



const usersRoutes = Router();
const usersControllers = new UsersControllers();
const userAvatarController = new UserAvatarController();

usersRoutes.post("/", usersControllers.create);
usersRoutes.put("/",ensureAuthenticated, usersControllers.update);
usersRoutes.delete("/:id", ensureAuthenticated, usersControllers.delete);
userRoutes.patch('/avatar', ensureAuthenticated, upload.single('avatar'), userAvatarController.update)

module.exports = usersRoutes;
