import express from "express";
import homeController from "../controller/homeController";
let router = express.Router();

const initWebRouter = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/detail/user/:userId', homeController.getUserPage);
    router.post(('/create-new-user'), homeController.createNewUser);
    return app.use('/', router);
};

export default initWebRouter;