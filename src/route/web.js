import express from "express";
import homeController from "../controller/homeController";
let router = express.Router();
import multer from 'multer';
import path from 'path';
var appRoot = require('app-root-path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, appRoot + "/src/public/image/");
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const imageFilter = function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

let upload = multer({ storage: storage, fileFilter: imageFilter });

const initWebRouter = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/detail/user/:userId', homeController.getUserPage);
    router.post(('/create-new-user'), homeController.createNewUser);
    router.post(('/delete-user'), homeController.deleteUser);
    router.get(('/update-user/:userId'), homeController.getUpdateUser);
    router.post(('/edit-user'), homeController.getEditUser);
    router.get('/upload', homeController.getUploadFile);
    router.post('/upload-profile-pic', upload.single('profile_pic'), homeController.getUploadHandle);



    return app.use('/', router);
};

export default initWebRouter;