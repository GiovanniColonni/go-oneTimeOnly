import React, { useEffect,useState } from 'react';
import {storeSecret} from '../api'
import { encryptMessage } from '../utils/utils';
import CryptoJS from 'crypto-js';

const EncryptPage = () => {
    const [textValue,setTextValue] = useState('')
    const [send, setSend] = useState(false)
    const [link, setLink] = useState('')
    const [error,setError] = useState(false)

    var encryptionParams = { // default params
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    }

    const modes = {
                   CBC:CryptoJS.mode.CBC,
                   CFBN:CryptoJS.mode.CFB,
                   CTR:CryptoJS.mode.CTR,
                   ECB:CryptoJS.mode.ECB,
                   OFB:CryptoJS.mode.OFB
        }

    const padding = {
        Pkcs7:CryptoJS.pad.Pkcs7,
        Iso10126:CryptoJS.pad.Iso10126,
        Iso97971:CryptoJS.pad.Iso97971,
        AnsiX923:CryptoJS.pad.AnsiX923,
        CryptoJSZeroPadding:CryptoJS.pad.ZeroPadding,
        NoPadding:CryptoJS.pad.NoPadding
    }

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


    
    const encryptText = (text,encrypionParam) => {
        const encryptionRes = encryptMessage(text,encrypionParam)
        
        const encrypted = encryptionRes.msg
        const pwd = encryptionRes.pwd
        
        return {encrypted, pwd} 
    }
    
    useEffect(() => {
        if(!send){
            return
        }
        
        const {encrypted,pwd} = encryptText(textValue,encryptionParams)
        
        storeSecret(encrypted.toString()).then((id) => {
            if(id === undefined){
                setError(true)
                return
            }
            setLink(createLink(id,pwd))
            setSend(!send)
            setTextValue(encrypted)
            return(
                navigator.clipboard.writeText(link)
            )
        }).catch((error) => {

            console.error("Error in storeSecret...")
            console.error(error)
        })
    
        
    },[send,link])

    const copyLink = () => {
        navigator.clipboard.writeText(link)
    }


    const onChangeMode = () => {
        const selector = document.getElementById("encryptionModeParam")
        const mode = selector.options[selector.selectedIndex].value
        encryptionParams.mode = modes[mode]
        console.log("encryptionParams: ",encryptionParams)

    }

    const onChangePadding = () => {
        const selector = document.getElementById("encryptionPaddingParam")
        const pad = selector.options[selector.selectedIndex].value
        encryptionParams.padding = padding[pad]
        console.log("encryptionParams: ",encryptionParams)
    }

    const formParams = () => {
        return (
        <div className='cyberpunk'>
            <div className='cyberpunk' style={{width: "47%",float:"left"}}>
                <label className="cyberpunk" style={{float:'left'}} htmlFor="mode"><h1>Encryption Mode</h1></label>
                <select onChange={onChangeMode} className="cyberpunk" style={{float:'right'}} name="encryptionMode" id="encryptionModeParam">
                        {Object.keys(modes).map((valueOption) => {
                            return(
                                <option key={valueOption} value={valueOption}>{valueOption}</option>
                            )
                        })}
                    </select>
            </div>
            <div className='cyberpunk' style={{width: "47%",float:"right"}}>
            <label className="cyberpunk" style={{float:'left'}} htmlFor="mode"><h1>Padding</h1></label>
                <select onChange={onChangePadding}  className="cyberpunk" style={{float:'right'}} name="encryptionMode" id="encryptionPaddingParam">
                {Object.keys(padding).map((valueOption) => {
                            return(
                                <option key={valueOption} value={valueOption}>{valueOption}</option>
                            )
                        })}
                    </select>
            </div>
        </div>
        )
        
    }

  return (
    <main>
        <h1 className="cyberpunk">Choose your parameters</h1>
        <div className='cyberpunk'>
                {formParams()}
        </div>
      <div>
      {link !== "" && <button className="cyberpunk green" onClick={copyLink}>Copy Link</button>}
        <div>
            <h1 className="cyberpunk">Enter your secret</h1>
            <textarea  className="cyberpunk" onChange={handleChange} value={textValue} rows="20" cols="100" placeholder="Enter your text here"></textarea>
        </div>
        <button className="cyberpunk green" onClick={handleClick}>Submit</button> 
        {error && <p className="cyberpunk red">Error in storing secret</p>}
      </div>
    </main>
  );

};

export default EncryptPage;