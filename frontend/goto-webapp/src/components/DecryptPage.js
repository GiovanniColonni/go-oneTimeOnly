import React,{useEffect,useState} from 'react';
import { retrieveSecret } from '../api';
import { decryptMessage } from '../utils/utils';

function DecryptPage(){

    
    const queryParameters = new URLSearchParams(window.location.search)

    const [secretID, setSecretID] = useState("")
    const [retrieved,setRetrived] = useState(false)
    const [secretValue,setSecretValue] = useState("")
    
    
    
    const handleGet = () => {
        const id = queryParameters.get('code').split('.')[0]
        const password = queryParameters.get('code').split('.')[1]
        console.debug("id: ",id)
        setSecretID(id)
        
    }
        
    useEffect(() => {
        if(!retrieved && secretID !== ""){
            retrieveSecret(secretID).then((secret) => {
                console.debug("secret: ",secret)
                const decrypted = decryptMessage(secret,queryParameters.get('code').split('.')[1])
                setSecretValue(secret)

                setRetrived(true)    
            })
        }
        
    },[secretID,retrieved])

    return(
        <div>
            <h1>your secret: {secretID} is {secretValue}</h1>
            <button onClick={handleGet}>Get</button>
        </div>
    );
}

export default DecryptPage;