import React, { useEffect,useState } from 'react';
import {storeSecret} from '../api'
import { encryptMessage } from '../utils/utils';
// TODO personalize the encryption params

const EncryptPage = () => {
    const [textValue,setTextValue] = useState('')
    const [send, setSend] = useState(false)
    const [link, setLink] = useState('')

    const handleChange = (event) => {
        const {value} = event.target
        setTextValue(value)
    }


    const handleClick = () => {
        setSend(!send)
    }

    /**
     * Create a that you use to redirect to the page with the secret
     */
    const createLink = (id,password) => {
        return "http://localhost:3000/retrieveSecret/?code="+id+"."+password
    }


    
    const encryptText = (text) => {
        const encryptionRes = encryptMessage(text)
        
        const encrypted = encryptionRes.msg
        const pwd = encryptionRes.pwd
        
        return {encrypted, pwd} 
    }
    
    useEffect(() => {
        if(!send){
            return
        }
        
        const {encrypted,pwd} = encryptText(textValue)
        
        storeSecret(encrypted.toString()).then((id) => {
            if(id === undefined){
                // open a banner or somethng
                console.error("Error in storeSecret...")
                return
            }
            setLink(createLink(id,pwd))
            setSend(!send)
            setTextValue(encrypted)
             
        }).catch((error) => {

            console.error("Error in storeSecret...")
            console.error(error)
        })
    
        
    },[send,link])

    const copyLink = () => {
        navigator.clipboard.writeText(link)
    }

  return (
    <main>
      <div>
      {link !== "" && <button className="cyberpunk green" onClick={copyLink}>Copy Link</button>}
        <div>
            <textarea  className="cyberpunk" onChange={handleChange} value={textValue} rows="20" cols="100" placeholder="Enter your text here"></textarea>
        </div>
        <button className="cyberpunk green" onClick={handleClick}>Submit</button> 
        
      </div>
    </main>
  );

};

export default EncryptPage;