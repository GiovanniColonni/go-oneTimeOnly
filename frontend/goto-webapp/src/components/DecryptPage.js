import React,{useEffect,useState} from 'react';
import { retrieveSecret } from '../api';
import { decryptMessage } from '../utils/utils';

function DecryptPage(){

    
    const queryParameters = new URLSearchParams(window.location.search)

    const [secretID, setSecretID] = useState("")
    const [secretValue,setSecretValue] = useState("")
    const password = queryParameters.get('code').split('.')[1]
    const [error,setError] = useState(false)

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
                console.debug("secret: ",secret,secret !== undefined)
                console.debug("queryParameters: ",queryParameters.get('code')) 
                //var decrypted = ""
                setError(secret === undefined)
                if(secret !== undefined){
                    const decrypted = decryptMessage(secret,password)
                    console.debug("decrypted: ",decrypted)
                    setSecretValue(decrypted ? decrypted : '')
                }else{
                    console.log("Error in retrieving secret")
                }
            })
        }
        
    },[secretID,error])

    const goToHome = () => {
        window.location.href = "http://localhost:3000/"
    }

    return(
        <main>
            {secretValue !== "" && 
            <div className="cyberpunk black both">
                
            <section className='cyberpunk'>
                 <p className="cyberpunk">
                    <h1>Secret Value</h1>
                {secretValue}
            </p>
            </section>
            </div>}
            {
                error && <section className='cyberpunk'>
                <p id="msg_err_banner" ><h1>Error in retrieving secret</h1> it can be a server error or the secret has already been retrieved</p>
            </section>
            
            }
            
            {secretValue === "" && <section  width={"50%"} height={"30%"}  className="cyberpunk black both"><button className="cyberpunk green" onClick={handleGet}>Get</button></section>}
            <div className="cyberpunk black both">
                {secretValue !== "" && <button className="cyberpunk red" onClick={copySecret}>Copy</button>}
                {secretValue !== "" && <button className="cyberpunk purple" onClick={goToHome}>Go to encryption</button>}
            </div>
        </main>
    );
}

export default DecryptPage;