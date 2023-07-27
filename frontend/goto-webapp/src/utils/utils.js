import CryptoJS from 'crypto-js'   
// https://cryptojs.gitbook.io/docs/

CryptoJS.AES.encrypt("Message", "Secret Passphrase");



const createPassword = () => {
    //var bits = sjcl.random.randomWords(10, 0);
    //var b64 = sjcl.codec.base64.fromBits(bits);
    return Math.random().toString(36).slice(-8);

    //return b64.replace(/[+=\/]/g, '').substr(0, 25);
}

function encryptMessage(msg){
    //TODO entropy  !! -> sjlc.random.addEntropy()
    //params.iv = sjcl.random.randomWords(4,0)
    //params.salt = sjcl.random.randomWords(2,0)
    
    const password = createPassword()
    const encryptedMessage = CryptoJS.AES.encrypt(msg,password).toString();
 
    console.log("encrypted message: ",encryptedMessage.toString())

    return {msg:encryptedMessage,
            pwd:password}

}

function decryptMessage(msg,password){
    try {
        return CryptoJS.AES.decrypt(msg,password).toString(CryptoJS.enc.Utf8)   
    } catch (error) {
        console.error("Error in decryptMessage")
        console.error(error)
        return ""        
    }
}

export {
    encryptMessage,
    decryptMessage
}