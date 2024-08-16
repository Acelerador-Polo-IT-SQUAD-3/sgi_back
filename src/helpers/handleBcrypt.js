const bcrypt = require('bcryptjs')

const encrypt = async (textPplain) => {
    const hash = await bcrypt.hash(textPplain, 10)
    return hash
}

const compare = async (paswordPlain, hashPasword) => {
    return await bcrypt.compare(paswordPlain, hashPasword)
}


export default {encrypt, compare}