const { expect } = require("chai")
const registerUser = require("./registerUser")
const { readFile, writeFile } = require("fs")


describe("registerUser", () => {
    // antes de todos los test para limpiar el array a "[]"
    beforeEach(done => {
        writeFile("./data/users.json", "[]", "utf8", error => {
            done(error)
        })
    })

    it("should succed on new user", done => {

        //son randoms 
        const name = `name-${Math.floor(Math.random() * 101)}`
        const email = `e-${Math.floor(Math.random() * 101)}@gmail.com`
        const password = `abcD!!${Math.floor(Math.random() * 101)}eg`


        registerUser(name, email, password, error => {
            //Esperamos que el error sea nulo
            expect(error).to.be.null

            //esperamos que el usuario se haya registrado, pa eso tenemos
            //Que leer el users.json y buscarlo 
            readFile("./data/users.json", "utf8", (error, json) => {
                //Esperamos que el error sea nulo
                expect(error).to.be.null

                const users = JSON.parse(json)

                const user = users.find(user => user.email === email)

                expect(user).to.exist
                expect(user.id).to.be.a("string")
                expect(user.name).to.equal(name)
                expect(user.email).to.equal(email)
                expect(user.password).to.equal(password)
                expect(user.avatar).to.equal("https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png")
                expect(user.savedPosts).to.have.lengthOf(0)

                done();
            })
        })
    })

    it("should fail on existing user", done => {
        debugger;
        //creamos un user 
        const id = `id-${Math.floor(Math.random() * 101)}`
        const name = `name-${Math.floor(Math.random() * 101)}`
        const email = `e-${Math.floor(Math.random() * 101)}@gmail.com`
        const password = `abcD!!${Math.floor(Math.random() * 101)}eg`
        const avatar = `https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512${Math.floor(Math.random() * 101)}.png`
        const savedPosts = []

        const user = { id, name, email, password, avatar, savedPosts }
        const json = JSON.stringify([user], null, 4)
        //metemos un user 
        writeFile("./data/users.json", json, "utf8", error => {
            expect(error).to.be.null

            registerUser(name, email, password, error => {
                //volvemos a meter el mismo user 
                // meter los expect 
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`User with email ${email} already exist`)

                done()
            })
        })
    })

    // Se ejecuta 1 vez luego de todos los test para limpiar 
    after(done => writeFile("./data/users.json", "[]", "utf8", error => done(error)))  
})


