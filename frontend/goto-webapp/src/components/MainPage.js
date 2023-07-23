import React, { useEffect, useState } from 'react';
import {storeSecret} from '../api'

const MainContent = () => {
    const [textValue,setTextValue] = useState('')
    const [send, setSend] = useState(false)


    const handleChange = (event) => {
        const {value} = event.target
        setTextValue(value)
    }


    const handleClick = () => {
        // call the api to encrypt the text
        // let it return an id
        // redirect to the page with the link
        const {encrypted,digest,password} = encryptText(textValue)
        
        setTextValue(encrypted)
        

        const exit = storeSecret(encrypted)
        
        if(!exit){
            console.error("Error in storeSecret...")
            return
        }
        
        createLink(digest)

        setSend(!send)
    }

    /**
     * Create a that you use to redirect to the page with the secret
     */
    const createLink = () => {

    }

    /**
     * 
     * @param {*} text 
     * @returns 
     */
    const encryptText = async (text) => {
        const digest = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
        const password = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

        return {text, password, digest} 
    }
 
    useEffect(() => {

    },[send])

  return (
    <main>
      <div>
        <div>
            <textarea onChange={handleChange} value={textValue} rows="10" cols="100" placeholder="Enter your text here"></textarea>
        </div>
        <button onClick={handleClick}>Submit</button> 
      </div>
    </main>
  );
};

export default MainContent;