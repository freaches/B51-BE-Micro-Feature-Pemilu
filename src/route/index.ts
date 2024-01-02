import * as express from "express";
import ArticlesController from "../contollers/ArticlesController";
import UploadFile from "../milddlewares/UploadFile";
import UserController from "../contollers/UserController";
import PartaiController from "../contollers/PartaiController";
import PaslonController from "../contollers/PaslonController";
import VoteController from "../contollers/VoteController";

const upload = require('multer')();
const routes = express.Router();

routes.get("/user",UserController.getAll)
routes.get("/user/:id",UserController.getOne)
routes.put("/user/:id",upload.any(),UserController.update)
routes.delete("/user/:id",UserController.delete)
routes.post("/register",upload.any(),UserController.register)
routes.post("/login",upload.any(),UserController.login)

routes.get("/partai",PartaiController.getAll)
routes.get("/partai/:id",PartaiController.getOne)
routes.put("/partai/:id",UploadFile.upload("image"),PartaiController.update)
routes.delete("/partai/:id",PartaiController.delete)
routes.post("/partai",UploadFile.upload("image"),PartaiController.create)

routes.get("/paslon",PaslonController.getAll)
routes.get("/paslon/:id",PaslonController.getOne)
routes.put("/paslon/:id",UploadFile.upload("image"),PaslonController.update)
routes.delete("/paslon/:id",PaslonController.delete)
routes.post("/paslon",UploadFile.upload("image"),PaslonController.create)

routes.get("/vote",VoteController.getAll)
routes.get("/vote/:id",VoteController.getOne)
routes.put("/vote/:id",upload.any(),VoteController.update)
routes.delete("/vote/:id",VoteController.delete)
routes.post("/vote",upload.any(),VoteController.create)

routes.post("/articles", UploadFile.upload("image"), ArticlesController.create);
routes.put("/articles/:id",UploadFile.upload("image"), ArticlesController.update);
routes.delete("/articles/:id", ArticlesController.delete);
routes.get("/articles", ArticlesController.getAll);
routes.get("/articles/:id", ArticlesController.getOne);
routes.get("/articles-card", ArticlesController.getAllArticlesCard);
routes.get("/articles-card/:id", ArticlesController.getOneArticlesCard);

export default routes;
