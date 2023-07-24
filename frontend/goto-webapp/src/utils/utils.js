import sjcl from 'sjcl'

const params = {
    iter:   1500,   // iterations for PBKDF2
    cipher: "aes",  // symmetric cipher for encryption
    ks:     128,    // key length in bits
    mode:   "gcm",  // block mode of the symmetric cipher
    ts:     64      // tag length in bits
};

function encryptMessage(msg,password){
    //TODO entropy -> sjlc.random.addEntropy()
    params.iv = sjcl.random.randomWords(4,0)
    params.salt = sjcl.random.randomWords(2,0)
    const encryptMessage = sjcl.encrypt(password,msg,params)
    return JSON.parse(encryptMessage)
}

function decryptMessage(msg,password){
    return sjcl.decrypt(password,msg)
}

export {
    encryptMessage,
    decryptMessage
}