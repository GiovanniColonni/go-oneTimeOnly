import CryptoJS from 'crypto-js'   

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
    const encryptMessage = CryptoJS.AES.encrypt(msg,password);
 
    console.log("encrypted message: ",encryptMessage)
    
    return {encryptMessage,password}

}

function decryptMessage(msg,password){
    try {
        return CryptoJS.AES.decrypt(msg,password)    
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