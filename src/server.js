import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRouter from "./route/web";
import connection from './configs/connectDB';
require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

//set up view engine
configViewEngine(app);

//init web route
initWebRouter(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});