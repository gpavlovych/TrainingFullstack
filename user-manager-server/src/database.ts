'use strict';
import * as mongoose from "mongoose";
import * as bluebird from "bluebird";
import { IUser } from './models/user';
import {UserSchema} from "./models/User";

export interface IDatabaseConfig {
    host: string,
    user ?: string,
    pwd ?: string
}

export interface IDatabase {
    userModel: mongoose.Model<IUser>;
}

export function init(config: IDatabaseConfig): IDatabase {
    (<any>mongoose).Promise = bluebird.Promise;
    let mongoDb = mongoose.createConnection(config.host);
    mongoDb.on('error', () => {
        console.log(`Unable to connect to database: ${config.host}`);
    });

    mongoDb.once('open', () => {
        console.log(`Connected to database: ${config.host}`);
    });

    return {
        userModel: mongoDb.model("User", UserSchema)
    }
}