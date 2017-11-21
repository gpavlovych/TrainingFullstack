///<reference path="../node_modules/@types/node/index.d.ts"/>
import * as Koa from 'koa';
import * as Router from "koa-router";
import * as json from "koa-json";
import * as body from "koa-body";
import * as KoaJwt from "koa-jwt";
import * as JwtFunc from "jsonwebtoken";
import {init} from "./database";
import {IUser} from "./models/User";
import {ILoginModel} from "./models/login";
import cors = require("koa2-cors");

const app = new Koa();
const secretKey = "very secret key";
const jwt = KoaJwt({secret: secretKey});

app.use(body({multipart: true, urlencoded:true, formLimit: 4243124312}));
app.use(json());
app.use(cors());
export const config = {
    "host": "mongodb://localhost:27017/test",
    "port": 4245
};

const database = init({host: config.host});

const router = new Router();
router
    .get('/api/v1/users/:id/photo', jwt,async (ctx: any)=>{
        let id = ctx.params.id;
        console.log(`Getting photo of the user ${id}`);
        let user = await database.userModel.findById(id);
        if (user !== null) {
            ctx.response.type = user.userPhoto.contentType;
            ctx.body = user.userPhoto.data;
        }
    })
    .get('/api/v1/users/:id', jwt,async (ctx: any)=>{
        let id = ctx.params.id;
        console.log(`Getting details of the user ${id}`);
        ctx.body = await database.userModel.findById(id);
    })
    .get('/api/v1/users', jwt,async (ctx: any)=>{
        console.log(`Getting all users`);
        ctx.body = await database.userModel.find({});
    })
    .post('/api/v1/users', async (ctx: any)=>{
        let model = ctx.request.body;
        console.log(`Registering new user: ${JSON.stringify(model)}`);
        let user = new database.userModel(model);
        await user.save();
        ctx.body = user;
        ctx.response.status = 201;
    })
    .put('/api/v1/users/:id', jwt, async (ctx: any)=> {
        let id = ctx.params.id;
        let model = ctx.request.body;
        console.log(`Editing the user ${id}: ${JSON.stringify(model)}`);
        let user = await database.userModel.findById(id);
        console.log(user);
        if (user !== null) {
            user.password = model.password;
            await user.save();
            ctx.body = user;
        }
    })
    .post('/api/v1/users/:id/photo', async (ctx: any)=>{
        let id = ctx.params.id;
        let model = ctx.request.body;
        console.log(`Uploading photo for the user ${ctx.params.id}: ${JSON.stringify(model)}`);
        console.log("Files: ", ctx.request.body.files);
        console.log("Fields: ", ctx.request.body.fields);
    })
    .del('/api/v1/users/:id', jwt, async (ctx: any)=> {
        console.log(`Removing the user ${ctx.params.id}`);
        let user = await database.userModel.findById(ctx.params.id);
        if (user !== null) {
            ctx.body = user;
            await user.remove();
        }
    });

router.post('/token', async (ctx: any)=> {
    let model: ILoginModel = ctx.request.body;
    let user = await database.userModel.findOne({email: model.username});
    if (user !== null && user.password === model.password) {
        let expiresInSeconds = 40;
        ctx.status = 200;
        ctx.body = {
            id: user._id,
            token: JwtFunc.sign({userId: user._id}, secretKey, {'expiresIn': expiresInSeconds}),
            expiresInSeconds: expiresInSeconds
        };
    }
    else {
        ctx.status = 401;
    }
});

app
    .use(router.routes())
    .use(router.allowedMethods());

if (!module.parent) {
    app.listen(config.port);
    console.log("Listening on port " + config.port);
}
else {
    console.log("Called from unit tests");
}

export default app;