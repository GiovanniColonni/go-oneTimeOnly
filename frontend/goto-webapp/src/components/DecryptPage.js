import React,{useEffect,useState} from 'react';
import { retrieveSecret } from '../api';
import { decryptMessage } from '../utils/utils';

function DecryptPage(){

    
    const queryParameters = new URLSearchParams(window.location.search)

    const [secretID, setSecretID] = useState("")
    const [secretValue,setSecretValue] = useState("")
    const password = queryParameters.get('code').split('.')[1]
    
    const copySecret = () => {
        navigator.clipboard.writeText(secretValue)
    }
    const handleGet = () => {
        const id = queryParameters.get('code').split('.')[0]
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
                }else{
                    const msg_err_banner = document.getElementById("msg_err_banner")
                    msg_err_banner.classList.remove('hidden')
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
            <p id="msg_err_banner" className='hidden'>Error in retrieving secret, it can be a server error or the secret has already been retrieved</p>
            </div>
            
            {secretValue === "" && <section  width={"50%"} height={"30%"}  className="cyberpunk black both"><button className="cyberpunk green" onClick={handleGet}>Get</button></section>}
            {secretValue !== "" && <button className="cyberpunk red" onClick={copySecret}>Copy</button>}
        </main>
    );
}

export default DecryptPage;