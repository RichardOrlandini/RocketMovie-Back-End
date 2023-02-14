const UserCreateServices = require("./UserCreateServices");

it("user should be create", () => {
    const user = {
        name: "User Test",
        email: "user@test.com",
        password: "123"
    };

    const userCreateServices = new UserCreateServices;
    const userCreated = userCreateServices.execute(user);

    expect(userCreated).toHaveProperty("id");
});