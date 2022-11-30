import express from "express";
import homeController from "../controller/homeController";
let router = express.Router();

const initWebRouter = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/detail/user/:userId', homeController.getUserPage);
    router.post(('/create-new-user'), homeController.createNewUser);
    router.post(('/delete-user'), homeController.deleteUser);
    router.get(('/update-user/:userId'), homeController.getUpdateUser);
    router.post(('/edit-user'), homeController.getEditUser);
    return app.use('/', router);
};

export default initWebRouter;