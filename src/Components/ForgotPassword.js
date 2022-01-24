import React,{useState} from "react"

import { auth} from "../firebase";
import {useHistory} from 'react-router-dom'

function ForgotPassword(props){

    let history=useHistory();

    const [data,setData]=useState({
        email:""
    })


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

            let email=data.email.trim()

            await auth.sendPasswordResetEmail(email)

            history.push("/login")

        }catch(e){
            console.log(e)
        }
        
    }



    return (
        <div className="container">
            <div className=" row">
                <div className="mt-5 col-sm-10 col-md-8 mx-auto border border-5 border-warning text-muted">
                    <h1 className="text-center mt-1 text-white">Sign Up Page</h1>
                    <form className="container">
                        <div className="mb-2 ">
                            <label htmlFor="email" className="form-label">Enter your email</label>
                            <input type="text" onChange={handleChange} className={`form-control`} name="email" id="email" aria-describedby="email" spellCheck={false} value={data.email}/>
                        </div>
                        <div className="mb-3 row mx-auto">
                            <button type="submit" onClick={clicked} className="btn  mt-3 btn-warning col-5 mx-auto">Reset Password</button>
                        </div>
                        <div className="mb-3 row mx-auto">
                            <button type="submit" onClick={(e)=> {e.preventDefault(); history.push("/login")}} className="btn  mt-3 btn-primary col-5 mx-auto">Back to login</button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default ForgotPassword