import * as express from "express";
import ArticlesController from "../contollers/ArticlesController";

const routes = express.Router()

routes.post("/articles", ArticlesController.create)
routes.put("/articles/:id", ArticlesController.update)
routes.delete("/articles/:id", ArticlesController.delete)
routes.get("/articles", ArticlesController.getAll)
routes.get("/articles/:id", ArticlesController.getOne)
routes.get("/articles-card", ArticlesController.getAllArticlesCard)
routes.get("/articles-card/:id", ArticlesController.getOneArticlesCard)

export default routes;
