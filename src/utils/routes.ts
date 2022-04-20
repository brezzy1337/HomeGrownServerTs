import { Express } from "express";
//import UserRouter from '../routes/user'
import router from '../routes/users'

function routes(app: Express) {

    //let userRouter = UserRouter.Router;

    //Sign Up
    //app.use("/users", new UserRouter().Router);

    app.use('/auth', router);
}

export default routes;