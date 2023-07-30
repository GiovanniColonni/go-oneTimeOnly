import React,{useEffect,useState,useRef} from 'react';
import { retrieveSecret } from '../api';
import { decryptMessage } from '../utils/utils';

function DecryptPage(){

    
    const queryParameters = new URLSearchParams(window.location.search)

    const [secretID, setSecretID] = useState("")
    const [retrieved,setRetrived] = useState(false)
    const [secretValue,setSecretValue] = useState("")
    const password = queryParameters.get('code').split('.')[1]
    
    
    const handleGet = () => {
        const id = queryParameters.get('code').split('.')[0]
        const password = queryParameters.get('code').split('.')[1]
        console.debug("id: ",id)
        setSecretID(id) 
    }
        
    useEffect(() => {
        if(secretValue === "" && secretID !== ""){
            retrieveSecret(secretID).then((secret) => {
                console.debug("secret: ",secret)
                console.debug("queryParameters: ",queryParameters.get('code')) 
                //var decrypted = ""
                if(secret !== undefined){
                    const decrypted = decryptMessage(secret,password)
                    console.debug("decrypted: ",decrypted)
                    setSecretValue(decrypted ? decrypted : '')
                }
            })
        }
        
    },[secretID])
            
    return(
        <main>
            <div className='cyberpunk'>
                {secretValue !== "" && <p className="cyberpunk">
                    <h1>Secret Value</h1>
                {secretValue}
            </p>}
            
            </div>
            
            {secretValue === "" && <section  width={"50%"} height={"30%"}  className="cyberpunk black both"><button className="cyberpunk green" onClick={handleGet}>Get</button></section>}
        </main>
    );
}

export default DecryptPage;