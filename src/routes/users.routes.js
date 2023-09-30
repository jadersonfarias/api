const {Router} = require("express");
const multer = require ("multer");
const uploadConfig = require("../configs/upload")
 
const UsersController = require("../controllers/usersController");
const UserAvatarController = require("../controllers/UserAvatarController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");


const usersRoutes= Router();
const upload = multer(uploadConfig.MULTER);


const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

usersRoutes.post("/", usersController.create);
usersRoutes.put("/", ensureAuthenticated,usersController.update);// /:id se o ensureAuthenticated não estiver colocado precisa
usersRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"), userAvatarController.update)

module.exports = usersRoutes;


