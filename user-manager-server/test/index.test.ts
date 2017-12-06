import * as chai from 'chai';
import chaiHttp = require('chai-http');
import server, {config} from '../src';
import {Database, init} from '../src/database';
import {User} from "../src/models/user-data-models";

chai.use(chaiHttp);

const expect = chai.expect;

describe('methods /api/v1/users', async () => {
    let database: Database = init({host: config.host});

    let verifyUser = (expectedUser: any, actualUser: any) => {
        if (actualUser!==null && expectedUser !== null) {
            expect(actualUser.firstName).to.be.equal(expectedUser.firstName);
            expect(actualUser.lastName).to.be.equal(expectedUser.lastName);
            expect(actualUser.position).to.be.equal(expectedUser.position);
            expect(actualUser.email).to.be.equal(expectedUser.email);
            if (typeof expectedUser._id !== 'undefined') {
                expect(actualUser._id).to.be.equal(expectedUser._id.toString());
            }
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
    let testUserFirstName: string = "test john";
    let testUserLastName: string = "test doe";
    let testUserPosition: string = "test position";
    let testUserPassword: string = "abcABC123";
    let testUserEmail : string= "test@example.com";
    beforeEach(async () => {
        if (await database.userModel.findOne({email: testUserEmail})===null) {
            testUser = new database.userModel({
                firstName: testUserFirstName,
                lastName: testUserLastName,
                position: testUserPosition,
                email: testUserEmail,
                password: testUserPassword
            });
            await testUser.save();
            token = await chai.request(server.listen()).post("/token").send({username:testUserEmail, password:testUserPassword});
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
            verifyUnauthorized(chai.request(server.listen()).get(`/api/v1/users/${testUser._id}`));
        });

        it('Not found', async () => {
            let result = await auth(chai.request(server.listen()).get('/api/v1/users/5a14444444444444441cc16f'));
            expect(result.status).to.equal(204);
        });

        it('OK', async () => {
            let result = await auth(chai.request(server.listen()).get(`/api/v1/users/${testUser._id}`));
            expect(result.status).to.equal(200);
            expect(result).to.be.json;
            expect(result.body).to.be.an('object');
            let actualUser = result.body;
            verifyUser(testUser, actualUser);
        });
    });

    describe("post new user", ()=> {
        it('OK', async () => {
            let expectedUser = {firstName: "test_3", lastName: "test_3", position: "test_3", email: "test_3@example.com", password: "test_3password"};
            let result = await chai.request(server.listen()).post('/api/v1/users').send(expectedUser);
            expect(result.status).to.equal(201);
            expect(result).to.be.json;
            expect(result.body).to.be.an('object');
            let responseUser = result.body;
            let actualUser = await database.userModel.findOne({email: expectedUser.email});
            if (actualUser !== null) {
                verifyUser(expectedUser, responseUser);
                verifyUser(expectedUser, actualUser);
                actualUser.remove();
            }
        });

        it('Same username already exists', () => {
            let expectedUser = {firstName: testUserFirstName, lastName: testUserLastName, position: testUserPosition, email: testUserEmail, password: testUserPassword};
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
        let payload = {firstName: testUserFirstName, lastName: testUserLastName, position: testUserPosition, email: testUserEmail, password: testUserPassword};

        it('Unauthorized', async () => {
            verifyUnauthorized(chai.request(server.listen()).put('/api/v1/users/5a14444444444444441cc16f').send(payload));
        });

        it('Not found', async () => {
            verifyNotFound(auth(chai.request(server.listen()).put('/api/v1/users/5a14444444444444441cc16f').send(payload)));
        });

        it('OK', async () => {
            let expectedPassword = "somepwd";
            payload.password = expectedPassword;
            let result = await auth(chai.request(server.listen()).put(`/api/v1/users/${testUser._id}`).send(payload));
            expect(result.status).to.equal(200);
            expect(result).to.be.json;
            expect(result.body).to.be.an('object');
            let remainingUser = await database.userModel.findById(testUser._id);
            if (remainingUser !== null) {
                expect(remainingUser.password).to.be.equal(expectedPassword);
            }
        });
    });

    describe("delete user by username", ()=> {
        it('Unauthorized', async () => {
            verifyUnauthorized(chai.request(server.listen()).del('/api/v1/users/5a14444444444444441cc16f'));
        });

        it('Not found', async () => {
            verifyNotFound(auth(chai.request(server.listen()).del('/api/v1/users/5a14444444444444441cc16f')));
        });

        it('OK', async () => {
            let result = await auth(chai.request(server.listen()).del(`/api/v1/users/${testUser._id}`));
            expect(result.status).to.equal(200);
            expect(result).to.be.json;
            expect(result.body).to.be.an('object');
            let remainingUser = await database.userModel.findById(testUser._id);
            expect(remainingUser).to.be.a('null');
        });
    });

    after(async () => {
        await database.userModel.findByIdAndRemove(testUser._id);
    });
});