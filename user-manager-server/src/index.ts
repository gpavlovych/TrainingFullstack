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
    .get('/api/v1/users/:username/photo', jwt,async ctx=>{
        let user = await database.userModel.findOne({username: ctx.params.username});
        if (user !== null) {
            ctx.response.type = user.userphoto.contentType;
            ctx.body = user.userphoto.data;
        }
    })
    .get('/api/v1/users/:username', jwt,async ctx=>{
        ctx.body = await database.userModel.findOne({username: ctx.params.username});
    })
    .get('/api/v1/users', jwt,async ctx=>{
        ctx.body = await database.userModel.find({});
    })
    .post('/api/v1/users', async ctx=>{
        let user = new database.userModel(ctx.request.body);
        await user.save();
        ctx.body = user;
        ctx.response.status = 201;
    })
    .put('/api/v1/users/:username', jwt, async ctx=> {
        let model = ctx.request.body;
        let user = await database.userModel.findOne({username: ctx.params.username});
        console.log(user);
        if (user !== null) {
            user.password = model.password;
            await user.save();
            ctx.body = user;
        }
    })
    .post('/api/v1/users/:username/photo', async ctx=>{
        console.log("here ami");
        const file = ctx.request.body;
        console.log(file);
    })
    .del('/api/v1/users/:username', jwt, async ctx=> {
        let user = await database.userModel.findOne({username: ctx.params.username});
        if (user !== null) {
            ctx.body = user;
            await user.remove();
        }
    });

router.post('/token', async (ctx)=> {
    let model: ILoginModel = ctx.request.body;
    console.log(model);
    let user = await database.userModel.findOne({username: model.username});
    console.log(user);
    if (user === null) {
        user = await database.userModel.findOne({email: model.username});
    }

    console.log(user);
    if (user !== null && user.password === model.password) {
        let expiresInSeconds = 40;
        ctx.status = 200;
        ctx.body = {
            username: user.username,
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