const { saveUser, findUser, connection, disconnect } = require("./db");
const mongoose = require('mongoose');
const User = require('../api/model/user');

jest.mock("./db")

beforeEach(async () => {
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
    })

    test("Find a User", async () => {
        const find = findUser({ email: "branden@gmail.com"})
        console.log(find)
        //expect(find.email).toEqual("branden@gmail.com");
        //zexpect(find.password).toEqual("branden");
    })
})

afterEach(async () => {
    await disconnect();
})



