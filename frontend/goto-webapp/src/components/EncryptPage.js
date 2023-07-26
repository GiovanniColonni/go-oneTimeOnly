import React, { useEffect, useRef, useState } from 'react';
import {storeSecret} from '../api'
import { encryptMessage } from '../utils/utils';
// TODO personalize the encryption params

const EncryptPage = () => {
    const [textValue,setTextValue] = useState('')
    const [send, setSend] = useState(false)
    const [link, setLink] = useState('')
    let password = useRef('')
    
    const handleChange = (event) => {
        const {value} = event.target
        //setTextValue(value)
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


    /**
     * 
     * @param {*} text 
     * @returns 
     */
    const encryptText = (text) => {
        const {encryptedObj,password} = encryptMessage(text)
        const encrypted = encryptedObj
        console.log("encrypted output :",encrypted)
        return {encrypted, password} 
    }
    
    useEffect(() => {
        if(!send){
            return
        }
        let encrypted 
        
        //({encrypted,password} = encryptText(textValue))
        //setTextValue(encrypted)

        console.log("encrypted:",encrypted)
        /*
        storeSecret(encrypted).then((id) => {
            if(id === undefined){
                // open a banner or somethng
                console.error("Error in storeSecret...")
                return
            }
            //setLink(createLink(id,password))
    
            setSend(!send)
    
        }).catch((error) => {

            console.error("Error in storeSecret...")
            console.error(error)
        })
        */
        
    },[send,link])
    // <h1><a href={link}>{link}</a></h1>
  return (
    <main>
      <div>
        
        <div>
            <textarea onChange={handleChange} value={textValue} rows="40" cols="100" placeholder="Enter your text here"></textarea>
        </div>
        <button onClick={handleClick}>Submit</button> 
        
      </div>
    </main>
  );

};

export default EncryptPage;