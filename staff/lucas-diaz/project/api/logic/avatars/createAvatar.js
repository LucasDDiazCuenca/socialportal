require("dotenv").config()
const {
    validators: { validateText, validateId },
    errors: { DuplicityError, UnknownError }
} = require("com")

const { User, Avatar } = require("../../data/models")


module.exports = function createAvatar(userId, name, personality, age, state, hair, skin, shirt, trousers, shoes, emotions = []) {
    validateId(userId)
    validateText(name)
    validateText(personality)
    validateText(age)
    validateText(state)
    validateText(skin)
    validateText(shirt)
    validateText(trousers)
    validateText(shoes)
    //Pending validation of [emotions]

    return(async() => {
        const user = await User.findById(userId)
        if (!user) throw new ExistenceError("user not found")



        await Avatar.create({
            author: userId,
            name,
            personality,
            age,
            state,
            hair,
            skin,
            shirt,
            trousers,
            shoes,
            emotions
        })
    })()
}