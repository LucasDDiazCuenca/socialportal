const { expect } = require("chai")
const { authenticateUser } = require("./authenticateUser")
const { writeFile } = require("fs")

describe("authenticateUser", () => {
    let id, name, email, password, avatar, savedPosts

    beforeEach(done => {
        id = `id-${Math.floor(Math.random() * 101)}`
        name = `name-${Math.floor(Math.random() * 101)}`
        email = `e-${Math.floor(Math.random() * 101)}@gmail.com`
        password = `abcD!!${Math.floor(Math.random() * 101)}eg`
        avatar = `https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512${Math.floor(Math.random() * 101)}.png`
        savedPosts = []

        writeFile("./data/users.json", "[]", "utf8", error => done(error))
    })

    it("should succed on authenticating user", done => {
        const user = {
            id,
            name,
            email,
            password,
            avatar,
            savedPosts
        }

        const json = JSON.stringify([user])
        //tenemos que escribir el archivo con un usuario 
        
        writeFile("./data/users.json", json, "utf8", error => {
            expect(error).to.be.null
            //tenemos que comprobar que la funcion authenticateUser lo haga ok buscando en BBDD 
            authenticateUser(user.email, user.password, (error, userId) => {
                expect(error).to.be.null
                expect(userId).to.equal(id)

                done();
            })
        })
    })
})