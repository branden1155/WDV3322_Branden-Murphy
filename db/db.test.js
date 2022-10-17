const { saveUser, findUser, connection, disconnect } = require("./db");
const mongoose = require('mongoose');
const User = require('../api/model/user');

jest.mock("./db")

beforeAll(async () => {
    await connection();
})
describe("DataBase Functions",() => {
    test("Post a user to DataBase", async () => {
        const user = new User({
            _id: mongoose.Types.ObjectId(),
            firstName: "branden",
            email: "branden@gmail.com",
            password: "branden",
        });
        const newUser = await saveUser(user);
        expect(newUser.firstName).toEqual('branden');
        expect(newUser.email).toEqual('branden@gmail.com');
        expect(newUser.password).toEqual('branden');
    });

    test("Find a User", async () => {
        findUser({email: "branden@gmail.com"}).then(res =>{
            expect(res.email).toEqual("branden@gmail.com");
            expect(res.firstName).toEqual("branden");
            expect(res.password).toEqual("branden");
        });
    });
});

afterAll(async () => {
    await disconnect();
});



