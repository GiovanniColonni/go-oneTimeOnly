import axios from 'axios';

const url = 'http://localhost:8080'; // make this https 


/**
 * Store a secret in the backend database
 * @param {string} secret the encrypted secret to be stored 
 * @returns true is status == 200, false otherwise
 */
const storeSecret = async (secret) => {
    try {
        const resp = await axios.post(`${url}/storeSecret`, secret);
        if(resp.status === 200){
            console.log("Successfully stored secret")
            return true
        }
        console.error("Error in storeSecret, status code: ",resp.status)
        return false
    }catch(error){
        console.error("Error in storeSecret")
        console.error(error);
        return false
    }


}
/**
 * Retrieve a secret based on the id, taken from the url args
 * @param {string} id extracted from the URL
 * @returns the enmcrypted secret
 */
const retrieveSecret = async (id) => {
    try{    
        const resp = await axios.get(`${url}/retrieveSecret/${id}`);
        if(resp.status === 200){
            console.log("Successfully retrieved secret")
            return resp.data
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