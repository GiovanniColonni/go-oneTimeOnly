import axios from 'axios';

const url = 'http://localhost:8080'; // make this https 


/**
 * Store a secret in the backend database
 * @param {string} secret the encrypted secret to be stored 
 * @returns resp.data if status == 200, undefined otherwise
 */
const storeSecret = async (secret) => {
    try {
        const payload = {payload:secret}
        
        const header = {headers: {
            "Content-Type": "application/json"
        }}
        
        const resp = await axios.post(`${url}/secret`,payload,header);
        if(resp.status === 200){
            console.log("Successfully stored secret")
            console.debug("resp data:",resp.data)
            return resp.data
        }
        console.error("Error in storeSecret, status code: ",resp.status)
        return undefined
    }catch(error){
        console.error("Error in storeSecret")
        console.error(error);
        return undefined
    }


}
/**
 * Retrieve a secret based on the id, taken from the url args
 * @param {string} id extracted from the URL
 * @returns the enmcrypted secret
 */
const retrieveSecret = async (id) => {
    try{    
        const resp = await axios.get(`${url}/secret/${id}`);
        if(resp.status === 200){
            console.log("Successfully retrieved secret")
            return resp.data
        }
        if(resp.status === 404){
            console.log("Secret not found")
            return undefined
        }
        console.error("Error in retrieveSecret, status code: ",resp.status)
        return undefined

    }catch(error){
        console.error("Error in retrieveSecret")
        console.error(error);
        return undefined
    }
}


export  {
    storeSecret,
    retrieveSecret
}