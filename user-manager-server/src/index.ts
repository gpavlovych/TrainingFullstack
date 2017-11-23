///<reference path="../node_modules/@types/node/index.d.ts"/>
import * as Koa from 'koa';
import * as Router from "koa-router";
import * as json from "koa-json";
import * as body from "koa-body";
import * as KoaJwt from "koa-jwt";
import * as JwtFunc from "jsonwebtoken";
import {init} from "./database";
import {ILoginModel} from "./models/login";
import cors = require("koa2-cors");
import fs = require("fs");
const app = new Koa();

const secretKey = "very secret key";
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
export const config = {
    "host": "mongodb://localhost:27017/test",
    "port": 4245
};
const database = init({host: config.host});

const router = new Router();
router
    .get('/api/v1/users/:id/photo',async (ctx: any)=>{
        let id = ctx.params.id;
        console.log(`Getting photo of the user ${id}`);
        let user = await database.userModel.findById(id);
        if (user !== null) {

            console.log(`Getting photo of the user ${user}`);
            ctx.response.type = user.userPhoto.contentType;
            ctx.body = user.userPhoto.data;
        }
    })
    .get('/api/v1/users/:id',jwt,async (ctx: any)=>{
        let id = ctx.params.id;
        console.log(`Getting details of the user ${id}`);
        ctx.body = await database.userModel.findById(id, '_id firstName lastName email position');
    })
    .get('/api/v1/users',  jwt,async (ctx: any)=>{
        console.log(`Getting all users`);
        ctx.body = await database.userModel.find({}, '_id firstName lastName email position');
    })
    .post('/api/v1/users', async (ctx: any)=>{
        if (ctx.request.header["content-type"].startsWith("multipart/form-data") ) {
            let model = ctx.request.body.fields;
            console.log(`Registering new user via multipart POST: ${JSON.stringify(model)}`);
            let user = new database.userModel(model);
            let files = ctx.request.body.files;
            if (files) {
                let file = files["userPhoto"];
                if (file) {
                    user.userPhoto.data = fs.readFileSync(file.path);
                    user.userPhoto.contentType = file.type;
                    console.log(`With photo: ${JSON.stringify(file)}`);
                }
            }
            await user.save();
            ctx.body = {...model, _id: user._id};
            ctx.response.status = 201;
        }
        else {
            let model = ctx.request.body;
            console.log(`Registering new user via json POST: ${JSON.stringify(model)}`);
            let user = new database.userModel(model);
            await user.save();
            ctx.body = {...model, _id: user._id};
            ctx.response.status = 201;
        }
    })
    .put('/api/v1/users/:id', jwt, async (ctx: any)=> {
        let id = ctx.params.id;
        let user = await database.userModel.findById(id);
        if (user === null){
            return;
        }
        if (ctx.request.header["content-type"].startsWith("multipart/form-data") ) {
            let model = ctx.request.body.fields;
            console.log(`Editing the user ${id} via multipart PUT: ${JSON.stringify(model)}`);
            let files = ctx.request.body.files;
            if (files) {
                let file = files["userPhoto"];
                if (file)
                {
                    user.userPhoto.data = fs.readFileSync(file.path);
                    user.userPhoto.contentType = file.type;
                    console.log(`With photo: ${JSON.stringify(file)}`);
                }
            }

            if (user !== null) {
                user.password = model.password;
                await user.save();
                ctx.body = model;
            }
        } else {
            let model = ctx.request.body;
            console.log(`Editing the user ${id} via json PUT: ${JSON.stringify(model)}`);
            if (user !== null) {
                user.password = model.password;
                await user.save();
                ctx.body = model;
            }
        }
    })
    .del('/api/v1/users/:id/photo', jwt, async (ctx: any)=>{
        let id = ctx.params.id;
        console.log(`Removing photo for the user ${id}`);
        let user = await database.userModel.findById(id);
        if (user !== null) {
            delete user.userPhoto;
            await user.save();
            ctx.body = user;
        }
    })
    .del('/api/v1/users/:id', jwt, async (ctx: any)=> {
        let id = ctx.params.id;
        console.log(`Removing the user ${id}`);
        let user = await database.userModel.findById(id);
        if (user !== null) {
            ctx.body = user;
            await user.remove();
            console.log(`Removed the user ${id}`);
        }
    });

router.post('/token', async (ctx: any)=> {
    let model: ILoginModel = ctx.request.body;
    console.log(`Issuing the token ${JSON.stringify(model)}`);
    let user = await database.userModel.findOne({email: model.username}, '_id firstName lastName email position password');
    if (user !== null && user.password === model.password) {
        let expiresInSeconds = 40;
        ctx.status = 200;
        let {firstName, lastName, position, _id} = user;
        let responseBody = {
            _id,
            firstName,
            lastName,
            position,
            token: JwtFunc.sign({userId: _id}, secretKey, {'expiresIn': expiresInSeconds}),
            expiresInSeconds: expiresInSeconds
        };
        ctx.body = responseBody;
        console.log(`Issued the token ${JSON.stringify(responseBody)}`);
    }
    else {
        ctx.status = 401;
        console.log(`Invalid username and/or password`);
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