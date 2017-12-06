///<reference path="../node_modules/@types/node/index.d.ts"/>
import * as dotenv from "dotenv";
import * as Koa from 'koa';
import * as Router from "koa-router";
import * as json from "koa-json";
import * as body from "koa-body";
import * as KoaJwt from "koa-jwt";
import {init} from "./database";
import cors = require("koa2-cors");
import {UserController} from "./controllers/user-controller";
import {TokenController} from "./controllers/token-controller";

const app = new Koa();

dotenv.config();
const secretKey: string = process.env.JWT_SECRET_KEY || "";
const jwt = KoaJwt({secret: secretKey});
app.use(body({
    formidable: {
        uploadDir: __dirname + '/public/uploads', // upload directory
        keepExtensions: true // keep file extensions
    },
    multipart: true,
    urlencoded: true,
}));

app.use(json());
app.use(cors());

export const dbUrl = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
const database = init({url: dbUrl});

const router = new Router();

new UserController(router, database, jwt).registerRoutes();

new TokenController(router, database).registerRoutes();

app
    .use(router.routes())
    .use(router.allowedMethods());

if (!module.parent) {
    const port = process.env.NODE_PORT || 8080;
    const host = process.env.NODE_HOST || "localhost";
    const protocol = process.env.NODE_PROTOCOL || "http";
    app.listen(port);
    console.log(`Node server started: ${protocol}://${host}:${port}/`);
}
else {
    console.log("Called from unit tests");
}

export default app;