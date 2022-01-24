import React,{useState,useEffect} from "react"

import { auth ,db} from "../firebase";
import {useHistory} from 'react-router-dom'

function Signup(props){

    let history=useHistory();

    const {setUser}=props;

    const [validUserName,setValidUserName]=useState(true)

    const [data,setData]=useState(
        {
            userName:"",
            name:"",
            email:"",
            password:""
        }
    )

    useEffect(() => {
        if(data.userName.length>3 && data.userName.length<30) {
            db.collection("userNames")
            .doc(data.userName)
            .onSnapshot((snapshot) =>{
                if(!snapshot.data()){
                    setValidUserName(true)
                }
                else{
                    setValidUserName(false)
                }
                }); 
        }
        else{
            setValidUserName(false)
        }
    
    }, [data.userName]);


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
            if(!validUserName){
                return;
            }
            let userName=data.userName.trim()
            let name=data.name.trim()
            let email=data.email.trim()
            let password=data.password.trim()
            let res=await auth.createUserWithEmailAndPassword(email,password);

            await db.collection('users').doc(res.user.uid).set({
                userName: userName
            });
            await db.collection('userNames').doc(userName).set({
                userID: res.user.uid,
                name:name,
                email:email
                // adding this so that by using this I can login with username
            });
            await res.user.updateProfile( {
                displayName: name})

            await res.user.sendEmailVerification();

            setUser({
                userName:userName,
                name:name,
                email:email,
                photoURL:res.user.photoURL,
                emailVerified:res.user.emailVerified,
                uid:res.user.uid
            })
            // comment above line is after verification login it is allowed.

            history.push("/")

        }catch(e){
            console.log(e)
        }
        
    }



    return (
        <div className="container">
            <div className=" row">
                <div className="mt-5 col-sm-10 col-md-8 mx-auto border border-5 border-warning text-muted">
                    <h1 className="text-center mt-1 text-white">Sign Up Page</h1>
                    <form className="container" autoComplete="off">
                        <div className="mb-2 ">
                            <label htmlFor="userName" className="form-label">Username</label>
                            {/* <input type="hidden" onChange={handleChange} className={`form-control`} name="userName" id="userNames" aria-describedby="userName" spellCheck={false} value={data.userName} />  this line was added so chrome doesn't autofills it but in password field by adding autoComplete="new-password" this issue is solved*/}
                            <input type="text" onChange={handleChange} className={`form-control ${data.userName.length && validUserName ? " text-success border-success":"text-danger" }`} name="userName" id="userName" aria-describedby="userName" spellCheck={false} value={data.userName} />
                        </div>
                        <div className="mb-2 ">
                            <label htmlFor="name" className="form-label">Full Name</label>
                            <input type="text" onChange={handleChange} className={`form-control `} name="name" id="name" aria-describedby="name" spellCheck={false} value={data.name}/>
                        </div>
                        <div className="mb-2">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" onChange={handleChange} className="form-control" id="email" name="email" aria-describedby="emailHelp" value={data.email}/>
                        </div>
                        <div className="mb-2">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" autoComplete="new-password" onChange={handleChange} className="form-control" id="password" name="password" value={data.password}/>
                        </div>
                        <div className="mb-3 row mx-auto">
                            <button type="submit" onClick={clicked} className="btn  mt-3 btn-warning col-5 mx-auto">Sign Up</button>
                        </div>
                        <div className="mb-3 row mx-auto">
                            <button type="submit" onClick={(e)=> {e.preventDefault(); history.push("/login")}} className="btn  mt-3 btn-primary col-5 mx-auto">Log In</button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default Signup