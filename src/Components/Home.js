import React, { useEffect } from 'react';
import {useHistory} from "react-router-dom"
import { auth ,db} from '../firebase';

const ReAuth=(setUser,history)=>{
    
    let unsubscribe = auth.onAuthStateChanged(async usr=> {
        try{
            if(usr && usr.uid){
                let userName=(await db.collection('users').doc(usr.uid).get()).data().userName
                if(!userName){
                    history.push("/createusername")
                }
                let dataFromUsername=(await db.collection("userNames").doc(userName).get()).data()
                let email=dataFromUsername.email
                let name=dataFromUsername.name
                setUser({
                    name:name,
                    userName:userName,
                    uid:usr.uid,
                    email:email,
                    photoURL:usr.photoURL,
                    emailVerified:usr.emailVerified
                })
            }
            else{
                console.error('Login required');
                history.push('/login');
            }
        }
        catch(e){
            console.log(e)
        }
    });
    unsubscribe()
}

function Home(props) {

    const history=useHistory()

    const {user,setUser}=props

    useEffect(()=>{
        if(!user){
            ReAuth(setUser,history)

        }
    })

    return <div className='container w-100 d-block text-center d-flex flex-column border border-4 border-warning justify-content-center text-muted fs-2 ' style={{height:"80vh"}}>
        <div>
            {user?.userName}
        </div>
        <div>
            {user?.emailVerified ? "verified email":"Not verified email"}
        </div>
        <div>
            {user?.email}
        </div>
        <div>
            {user?.name}
        </div>
    </div>;
}

export default Home;
