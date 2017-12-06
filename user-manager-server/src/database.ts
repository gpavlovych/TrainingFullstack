'use strict';
import * as mongoose from "mongoose";
import * as bluebird from "bluebird";
import { User } from './models/user-data-models';
import {UserSchema} from "./models/user-data-models";

export interface DatabaseConfig {
    url: string,
    user ?: string,
    pwd ?: string
}

export interface Database {
    userModel: mongoose.Model<User>;
}

export function init(config: DatabaseConfig): Database {
    (<any>mongoose).Promise = bluebird.Promise;
    let mongoDb = mongoose.createConnection(config.url);
    mongoDb.on('error', () => {
        console.log(`Unable to connect to database: ${config.url}`);
    });

    mongoDb.once('open', () => {
        console.log(`Connected to database: ${config.url}`);
    });

    return {
        userModel: mongoDb.model("User", UserSchema)
    }
}