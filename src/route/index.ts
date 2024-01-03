import * as express from "express";
import ArticlesController from "../contollers/ArticlesController";
import UploadFile from "../milddlewares/UploadFile";
import AuthController from "../contollers/AuthController";
import PartaiController from "../contollers/PartaiController";
import PaslonController from "../contollers/PaslonController";
import VoteController from "../contollers/VoteController";
import AuthMiddleware from "../milddlewares/AuthMiddleware";
import UserController from "../contollers/UserController";

const upload = require("multer")();
const routes = express.Router();

routes.get("/user", AuthMiddleware.Auth, UserController.getAll);
routes.get("/user/:id", AuthMiddleware.Auth, UserController.getOne);
routes.put(
  "/user/:id",
  upload.any(),
  AuthMiddleware.Auth,
  UserController.update
);
routes.delete("/user/:id", AuthMiddleware.Auth, AuthController.delete);
routes.post("/auth/register", upload.any(), AuthController.register);
routes.post("/auth/login", upload.any(), AuthController.login);

routes.get("/partai", PartaiController.getAll);
routes.get("/partai/:id", PartaiController.getOne);
routes.put(
  "/partai/:id",
  AuthMiddleware.Auth,
  UploadFile.upload("image"),
  PartaiController.update
);
routes.delete("/partai/:id", AuthMiddleware.Auth, PartaiController.delete);
routes.post(
  "/partai",
  AuthMiddleware.Auth,
  UploadFile.upload("image"),
  PartaiController.create
);

routes.get("/paslon", PaslonController.getAll);
routes.get("/paslon/:id", PaslonController.getOne);
routes.put(
  "/paslon/:id",
  AuthMiddleware.Auth,
  UploadFile.upload("image"),
  PaslonController.update
);
routes.delete("/paslon/:id", AuthMiddleware.Auth, PaslonController.delete);
routes.post(
  "/paslon",
  AuthMiddleware.Auth,
  UploadFile.upload("image"),
  PaslonController.create
);

routes.get("/vote", VoteController.getAll);
routes.get("/vote/:id", VoteController.getOne);
routes.put(
  "/vote/:id",
  AuthMiddleware.Auth,
  upload.any(),
  VoteController.update
);
routes.delete("/vote/:id", AuthMiddleware.Auth, VoteController.delete);
routes.post("/vote", AuthMiddleware.Auth, upload.any(), VoteController.create);

routes.post(
  "/articles",
  AuthMiddleware.Auth,
  UploadFile.upload("image"),
  ArticlesController.create
);
routes.put(
  "/articles/:id",
  AuthMiddleware.Auth,
  UploadFile.upload("image"),
  ArticlesController.update
);
routes.delete("/articles/:id", AuthMiddleware.Auth, ArticlesController.delete);
routes.get("/articles", ArticlesController.getAll);
routes.get("/articles/:id", ArticlesController.getOne);
routes.get("/articles-card", ArticlesController.getAllArticlesCard);
routes.get("/articles-card/:id", ArticlesController.getOneArticlesCard);

export default routes;
