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
        registerUser("Carmen Diaz", "carmen@diaz.com", "CarmenDiaz22!", error => {
            //Esperamos que el error sea nulo
            expect(error).to.be.null


            //esperamos que el usuario se haya registrado, pa eso tenemos
            //Que leer el users.json y buscarlo 
            readFile("./data/users.json", "utf8", (error, json) => {
                //Esperamos que el error sea nulo
                expect(error).to.be.null

                const users = JSON.parse(json)

                const user = users.find(user => user.email === "carmen@diaz.com")

                expect(user).to.exist
                expect(user.id).to.be.a("string")
                expect(user.name).to.equal("Carmen Diaz")
                expect(user.email).to.equal("carmen@diaz.com")
                expect(user.password).to.equal("CarmenDiaz22!")
                expect(user.avatar).to.equal("https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png")
                expect(user.savedPosts).to.have.lengthOf(0)

                done();
            })
        })
    })

    // Se ejecuta 1 vez luego de todos los test para limpiar 
    after(done => {
        writeFile("./data/users.json", "[]", "utf8", error => {
            done(error)
        })
    }) 
})

