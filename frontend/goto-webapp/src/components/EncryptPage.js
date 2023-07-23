import React, { useEffect, useState } from 'react';
import {storeSecret} from '../api'

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


    /**
     * 
     * @param {*} text 
     * @returns 
     */
    const encryptText = (text) => {
        const password = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

        return {text, password} 
    }
 
    useEffect(() => {
        if(!send){
            return
        }

        const {encrypted,password} = encryptText(textValue)

        //setTextValue(encrypted)
        
        storeSecret(encrypted).then((id) => {
            if(id === undefined){
                // open a banner or somethng
                console.error("Error in storeSecret...")
                return
            }
            console.debug("id: ",id)
            setLink(createLink(id,password))
    
            setSend(!send)
    
        }).catch((error) => {

            console.error("Error in storeSecret...")
            console.error(error)
        })
        
        
    },[send,link])

  return (
    <main>
      <div>
        <h1><url>{link}</url></h1>
        <div>
            <textarea onChange={handleChange} value={textValue} rows="40" cols="100" placeholder="Enter your text here"></textarea>
        </div>
        <button onClick={handleClick}>Submit</button> 
        
      </div>
    </main>
  );

};

export default EncryptPage;