import * as chai from 'chai';
import chaiHttp = require('chai-http');
import server, {config} from '../src';
import {IDatabase, init} from '../src/database';
import {IUser} from "../src/models/User";

chai.use(chaiHttp);

const expect = chai.expect;

describe('methods /api/v1/users', async () => {
    let database: IDatabase = init({host: config.host});

    let verifyUser = (expectedUser: any, actualUser: any) => {
        if (actualUser!==null && expectedUser !== null) {
            expect(actualUser.username).to.be.equal(expectedUser.username);
            expect(actualUser.email).to.be.equal(expectedUser.email);
            if (typeof expectedUser._id !== 'undefined') {
                expect(actualUser._id).to.be.equal(expectedUser._id.toString());
            }
            expect(actualUser.password).to.be.equal(expectedUser.password);
        }
    };

    let verifyNotFound = (res: ChaiHttp.Request) => {
        res.catch((result) => {
            expect(result.status).to.be.equal(404);
        });
    };

    let verifyUnauthorized = (res: ChaiHttp.Request) => {
        res.catch((result) => {
            expect(result.status).to.be.equal(401);
        });
    };

    let auth = (res: ChaiHttp.Request): ChaiHttp.Request=>{
        return res.set('Authorization', `Bearer ${token.body.token}`);
    };
    let testUser: any;
    let token: any;
    let testUserName: string = "test";
    let testUserPassword: string = "abcABC123";
    let testUserEmail : string= "test@example.com";
    beforeEach(async () => {
        if (await database.userModel.findOne({username: testUserName})===null) {
            testUser = new database.userModel({
                username: testUserName,
                email: testUserEmail,
                password: testUserPassword
            });
            await testUser.save();
            token = await chai.request(server.listen()).post("/token").send({username:testUserName, password:testUserPassword});
        }
    });

    describe("get all users", ()=> {
        it('Unauthorized', async () => {
            verifyUnauthorized(chai.request(server.listen()).get('/api/v1/users'));
        });

        it('OK', async () => {
            let res = await auth(chai.request(server.listen()).get('/api/v1/users'));
            expect(res.status).to.equal(200);
            expect(res).to.be.json;
            expect(res.body).to.be.an('array');
            expect(res.body).to.have.length(await database.userModel.count({}));
        });
    });

    describe("get user by username", ()=> {
        it('Unauthorized', async () => {
            verifyUnauthorized(chai.request(server.listen()).get('/api/v1/users/test-non-existing'));
        });

        it('Not found', async () => {
            let result = await auth(chai.request(server.listen()).get('/api/v1/users/test-non-existing'));
            expect(result.status).to.equal(204);
        });

        it('OK', async () => {
            let result = await auth(chai.request(server.listen()).get(`/api/v1/users/${testUserName}`));
            expect(result.status).to.equal(200);
            expect(result).to.be.json;
            expect(result.body).to.be.an('object');
            let actualUser = result.body;
            verifyUser(testUser, actualUser);
        });
    });

    describe("post new user", ()=> {
        it('OK', async () => {
            let expectedUser = {username: "test_3", email: "test_3@example.com", password: "test_3password"};
            let result = await chai.request(server.listen()).post('/api/v1/users').send(expectedUser);
            expect(result.status).to.equal(201);
            expect(result).to.be.json;
            expect(result.body).to.be.an('object');
            let responseUser = result.body;
            let actualUser = await database.userModel.findOne({username: expectedUser.username});
            if (actualUser !== null) {
                verifyUser(expectedUser, responseUser);
                verifyUser(expectedUser, actualUser);
                actualUser.remove();
            }
        });

        it('Same username already exists', () => {
            let expectedUser = {username: testUser.username, email: testUserEmail, password: testUserPassword};
            chai.request(server.listen()).post('/api/v1/users').send(expectedUser).catch((result) => {
                expect(result.status).to.be.equal(500);
            });
        });

        it('Empty request', () => {
            chai.request(server.listen()).post('/api/v1/users').send({}).catch((result) => {
                expect(result.status).to.be.equal(500);
            });
        });

        it('Null request', () => {
            chai.request(server.listen()).post('/api/v1/users').send(null).catch((result) => {
                expect(result.status).to.be.equal(500);
            });
        });
    });

    describe("put user by username", ()=> {
        let payload = {username: testUserName, password: testUserPassword, email: testUserEmail};

        it('Unauthorized', async () => {
            verifyUnauthorized(chai.request(server.listen()).put('/api/v1/users/test-non-existing').send(payload));
        });

        it('Not found', async () => {
            verifyNotFound(auth(chai.request(server.listen()).put('/api/v1/users/test-non-existing').send(payload)));
        });

        it('OK', async () => {
            let expectedPassword = "somepwd";
            payload.password = expectedPassword;
            let result = await auth(chai.request(server.listen()).put(`/api/v1/users/${testUserName}`).send(payload));
            expect(result.status).to.equal(200);
            expect(result).to.be.json;
            expect(result.body).to.be.an('object');
            let remainingUser = await database.userModel.findOne({username: testUserName});
            if (remainingUser !== null) {
                expect(remainingUser.password).to.be.equal(expectedPassword);
            }
        });
    });

    describe("delete user by username", ()=> {
        it('Unauthorized', async () => {
            verifyUnauthorized(chai.request(server.listen()).del('/api/v1/users/test-non-existing'));
        });

        it('Not found', async () => {
            verifyNotFound(auth(chai.request(server.listen()).del('/api/v1/users/test-non-existing')));
        });

        it('OK', async () => {
            let result = await auth(chai.request(server.listen()).del(`/api/v1/users/${testUserName}`));
            expect(result.status).to.equal(200);
            expect(result).to.be.json;
            expect(result.body).to.be.an('object');
            let remainingUser = await database.userModel.findOne({username: testUserName});
            expect(remainingUser).to.be.a('null');
        });
    });

    after(async () => {
        await database.userModel.findOneAndRemove({username: testUserName});
    });
});