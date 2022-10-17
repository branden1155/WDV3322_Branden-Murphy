const connection = async() => {
    console.log("Mock Connection");
}

const saveUser = async () => {
    console.log("Mocked user Saved!")
    return Promise.resolve({
        firstName: "branden",
        email: "branden@gmail.com",
        password: "branden",
    })
};

const findUser = async () => {
    console.log("Mocked find User")
    return await Promise.resolve({
        email: "branden@gmail.com",
        firstName: 'branden',
        password: 'branden',
    })
};

const disconnect = async() => {
    console.log("Mocked Disconnected");
}

module.exports = { saveUser, findUser, connection, disconnect };