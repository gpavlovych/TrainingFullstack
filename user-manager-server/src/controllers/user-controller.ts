import * as Router from "koa-router";
import * as jwt from "koa-jwt";
import {Context} from "koa";
import * as fs from "fs";
import {Database} from "../database";
import {User} from "../models/user-data-models";
import {IMiddleware} from "koa-router";

export class UserController {
    constructor(private router: Router, private database: Database, private authMiddleware: IMiddleware) {}

    registerRoutes() {
        this.router.get('/api/v1/users/:id/photo', async (ctx: Context) => await this.getPhotoById(ctx))
            .get('/api/v1/users/:id', this.authMiddleware, async (ctx: Context) => await this.getById(ctx))
            .get('/api/v1/users', this.authMiddleware, async (ctx: Context) => await this.getAll(ctx))
            .post('/api/v1/users', async (ctx: Context) => await this.post(ctx))
            .put('/api/v1/users/:id', this.authMiddleware, async (ctx: Context) => await this.putById(ctx))
            .del('/api/v1/users/:id/photo', this.authMiddleware, async (ctx: Context) => await this.deletePhotoById(ctx))
            .del('/api/v1/users/:id', this.authMiddleware, async (ctx: Context) => await this.deleteUserById(ctx));
    }

    private async deleteUserById(ctx: Context) {
        const id = ctx.params.id;
        const user = await this.database.userModel.findById(id);
        if (user !== null) {
            ctx.body = user;
            await user.remove();
        }
    }

    private async deletePhotoById(ctx: Context) {
        const id = ctx.params.id;
        const user = await this.database.userModel.findById(id);
        if (user !== null) {
            delete user.userPhoto;
            await user.save();
            ctx.body = user;
        }
    }

    private async post(ctx: Context) {
        if (ctx.request.header["content-type"].startsWith("multipart/form-data")) {
            await this.postUserWithPhoto(ctx);
        }
        else {
            await this.postUser(ctx);
        }
    }

    private async postUser(ctx: Context) {
        const model = ctx.request.body;
        const user = new this.database.userModel(model);
        await user.save();
        ctx.body = {...model, _id: user._id};
        ctx.response.status = 201;
    }

    private async postUserWithPhoto(ctx: Context) {
        const model = ctx.request.body.fields;
        const user = new this.database.userModel(model);
        const files = ctx.request.body.files;
        if (files) {
            const file = files["userPhoto"];
            if (file) {
                user.userPhoto.data = fs.readFileSync(file.path);
                user.userPhoto.contentType = file.type;
            }
        }
        await user.save();
        ctx.body = {...model, _id: user._id};
        ctx.response.status = 201;
    }

    private async putById(ctx: Context) {
        const id = ctx.params.id;
        const user = await this.database.userModel.findById(id);
        if (!user) {
            ctx.status = 404;
        } else if (ctx.request.header["content-type"].startsWith("multipart/form-data")) {
            await this.putFieldsWithPhotoById(ctx, user);
        } else {
            await this.putFieldsById(ctx, user);
        }
    }

    private async putFieldsById(ctx: Context, user: User) {
        const model = ctx.request.body;
        if (user !== null) {
            user.password = model.password;
            await user.save();
            ctx.body = model;
        }
    }

    private async putFieldsWithPhotoById(ctx: Context, user: User) {
        const model = ctx.request.body.fields;
        const files = ctx.request.body.files;
        if (files) {
            const file = files.userPhoto;
            if (file) {
                user.userPhoto.data = fs.readFileSync(file.path);
                user.userPhoto.contentType = file.type;
            }
        }
        if (user !== null) {
            user.password = model.password;
            await user.save();
            ctx.body = model;
        }
    }

    private async getAll(ctx: any) {
        ctx.body = await this.database.userModel.find({}, '_id firstName lastName email position');
    }

    private async getById(ctx: Context) {
        const id = ctx.params.id;
        ctx.body = await this.database.userModel.findById(id, '_id firstName lastName email position');
    }

    private async getPhotoById(ctx: Context) {
        const id = ctx.params.id;
        const user = await this.database.userModel.findById(id);
        if (user !== null) {
            ctx.response.type = user.userPhoto.contentType;
            ctx.body = user.userPhoto.data;
        }
    }
}