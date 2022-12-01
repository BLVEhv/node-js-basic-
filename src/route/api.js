import express from "express";
import APIController from "../controller/APIController";
let router = express.Router();

const initAPIRouter = (app) => {
    router.get('/user', APIController.getAllUser);
    router.post('/create-user', APIController.getCreateUser);
    router.put('/update-user', APIController.getUpdateUser);
    router.delete('/delete-user/:userId', APIController.getDeleteUser);
    return app.use('/api/v1/', router);
};

export default initAPIRouter;