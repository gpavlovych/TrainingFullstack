import {getUsers, login, register} from "../../middleware/api";

global['fetch'] = require('jest-fetch-mock');

describe("API test", () => {
    const verifyApiRequestFailed = async (callback: ()=>any)=>{
        fetch['mockReject']();
        try {
            await callback();
        }
        catch (err) {
            return;
        }
        throw new Error("should have thrown");
    };

    const verifyApiRequestSucceeded = async (callback: ()=>any, expectedResponse: any)=>{
        fetch['mockResponseOnce'](JSON.stringify(expectedResponse));
        const response = await callback();
        expect(expectedResponse).toEqual(response);
    };

    describe("login", () => {
        it("failed", async () => {
            await verifyApiRequestFailed(async () => await login({email: "someemail", password: "somepassword"}));
        });

        it("OK", async ()=>{
            await verifyApiRequestSucceeded(async ()=>await login({email: "someemail", password: "somepassword"}),  {someB:"some"});
        });
    });

    describe("register", () => {
        it("failed", async () => {
            await verifyApiRequestFailed(async () => await register({email:"someemail", password:"someemail", firstName:"someemail", lastName:"someemail", position:"someemail", userPhoto:"someemail"}));
        });

        it("OK", async ()=>{
            await verifyApiRequestSucceeded(async ()=>await register({email:"someemail", password:"someemail", firstName:"someemail", lastName:"someemail", position:"someemail", userPhoto:"someemail"}), {someB: "someA"});
        });
    });

    describe("getUsers", () => {
        it("failed", async () => {
            verifyApiRequestFailed(async () => await getUsers({token:"sometoken"}));
        });

        it("OK", async ()=>{
            await verifyApiRequestSucceeded(async ()=>await getUsers({token:"sometoken"}),{someA: "someB"});
        });
    });
});