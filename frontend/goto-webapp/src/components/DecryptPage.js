import React,{useEffect,useState} from 'react';
import { retrieveSecret } from '../api';

function DecryptPage(){

    const queryParameters = new URLSearchParams(window.location.search)

    const id = queryParameters.get('code').split('.')[0]
    const password = queryParameters.get('code').split('.')[1]
    
    const [secretID,setsecretID] = useState(id)


    useEffect(() => {
        retrieveSecret(id).then((secret) => {
            console.debug("secret: ",secret)
        })

    },[secretID])

    return(
        <div>
            <h1>your secret, params: {secretID}</h1>
        </div>
    );
}

export default DecryptPage;