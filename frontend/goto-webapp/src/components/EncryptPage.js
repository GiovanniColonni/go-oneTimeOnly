import React, { useEffect, useRef, useState } from 'react';
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
        // call the api to encrypt the text
        // let it return an id
        // redirect to the page with the link
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
    
  return (
    <main>
      <div>
      <h1><a href={link}>{link}</a></h1>
        <div>
            <textarea onChange={handleChange} value={textValue} rows="40" cols="100" placeholder="Enter your text here"></textarea>
        </div>
        <button onClick={handleClick}>Submit</button> 
        
      </div>
    </main>
  );

};

export default EncryptPage;