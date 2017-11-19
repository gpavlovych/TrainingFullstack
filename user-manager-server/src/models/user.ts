import * as mongoose from "mongoose";

export interface IUser extends mongoose.Document {
    username: string;
    email: string;
    password: string;
}

export const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    username: {
        type: String,
        unique: true,
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