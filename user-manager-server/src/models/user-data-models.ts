import * as mongoose from "mongoose";

export interface User extends mongoose.Document {
    firstName: string;
    lastName: string;
    position: string;
    email: string;
    password: string;
    userPhoto: any;
}

export const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    userPhoto: {
        data: Buffer,
        contentType: String,
        required: false,
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createTime: {
        type: Date,
        'default': Date.now
    },
    updateTime: {
        type: Date,
        'default': Date.now
    }
},{
    versionKey: false,
    timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
});