import React,{ useState} from "react"
import { auth ,db, googleProvider} from "../firebase";
import {useHistory} from 'react-router-dom'

function Login(props){

    let history=useHistory();

    const {setUser}=props;

    const [data,setData]=useState(
        {
            userName:"",
            password:""
        }
    )

    // login with userName is hard part so doing this login with email is easy one.
    
    function handleChange(event){
        const {name,value}=event.target
        setData((prev)=>{
            return {
                ...prev,
                [name]:value
            }

        })
    }

    const clicked=async (event)=>{
        try{
            event.preventDefault()
            let userName=data.userName.trim()
            let password=data.password.trim()

            let dataFromUsername=(await db.collection("userNames").doc(userName).get()).data()
            let email=dataFromUsername.email
            let name=dataFromUsername.name
            
            let res=await auth.signInWithEmailAndPassword(email,password)
            setUser({
                userName:userName,
                name:name,
                email:res.user.email,
                photoURL:res.user.photoURL,
                emailVerified:res.user.emailVerified
            })
            history.push("/")

        }catch(e){
            console.log(e)
        }
        
    }

    const loginWithGoogle=async(e)=>{
        e.preventDefault()
        try{
            let userName=null
            let res= await auth.signInWithPopup(googleProvider)
            try{
                userName=(await db.collection('users').doc(res.user.uid).get()).data().userName
            }
            catch(e){
                // let userName=null
            }

            let dataFromUsername=(await db.collection("userNames").doc(userName).get()).data()
            let name=dataFromUsername.name

            if(!userName){
                await setUser({
                    name:name,
                    email:res.user.email,
                    photoURL:res.user.photoURL,
                    emailVerified:res.user.emailVerified,
                    uid:res.user.uid
                })
                history.push("/createusername")
            }
            else{
                await setUser({
                    userName:userName,
                    name:name,
                    email:res.user.email,
                    photoURL:res.user.photoURL,
                    emailVerified:res.user.emailVerified,
                    uid:res.user.uid
                })
                history.push("/")
            }
        }
        catch(e){
            console.log(e)
        }
            
        
    }


    return (
        <div className="container">
            <div className=" row">
                <div className="mt-5 col-sm-10 col-md-8 mx-auto border border-5 border-warning text-muted">
                    <h1 className="text-center mt-1 text-white">Login</h1>
                    <form className="container">
                        <div className="mb-2">
                            <label htmlFor="userName" className="form-label">User name</label>
                            <input type="text" onChange={handleChange} className="form-control" name="userName" id="userName" aria-describedby="fullName" value={data.userName}/>
                        </div>
                        <div className="mb-2">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" onChange={handleChange} className="form-control" id="password" name="password" value={data.password}/>
                        </div>
                        <div className="mb-3 row mx-auto">
                            <button type="submit" onClick={clicked} className="btn  mt-3 btn-warning col-5 mx-auto">Log In</button>
                        </div>
                        <div className="mb-3 row mx-auto">
                            <button type="submit" onClick={loginWithGoogle} className="btn  mt-3 btn-primary col-5 mx-auto">Sign In with Google</button>
                        </div>
                        <div className="mb-3 row mx-auto">
                            <button type="submit" onClick={(e)=>{e.preventDefault();history.push("/forgotpassword")}} className="btn  mt-3 btn-danger col-5 mx-auto">Forgot Password</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login