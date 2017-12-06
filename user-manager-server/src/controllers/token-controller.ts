import * as Router from "koa-router";
import {PostTokenRequest} from "../models/token-controller-models";
import {Context} from "koa";
import {Database} from "../database";
import * as JwtFunc from "jsonwebtoken";

export class TokenController {
    constructor(private router: Router, private database: Database) {}

    registerRoutes() {
        this.router.post("/token", async (ctx: Context) => await this.postToken(ctx));
    }

    private async postToken(ctx: Context) {
        const model: PostTokenRequest = ctx.request.body;
        const user = await this.database.userModel.findOne({email: model.username}, '_id firstName lastName email position password');
        if (user !== null && user.password === model.password) {
            const expiresInSeconds = process.env.JWT_EXPIRATION_SECONDS || 10;
            ctx.status = 200;
            const {firstName, lastName, position, _id} = user;
            const secretKey: string = process.env.JWT_SECRET_KEY || "";
            const responseBody = {
                _id,
                firstName,
                lastName,
                position,
                token: JwtFunc.sign({userId: _id}, secretKey, {'expiresIn': expiresInSeconds}),
                expiresInSeconds: expiresInSeconds
            };
            ctx.body = responseBody;
        }
        else {
            ctx.status = 401;
        }
    }
}