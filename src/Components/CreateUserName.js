import React,{useState,useEffect} from "react"

import { db} from "../firebase";
import {useHistory} from 'react-router-dom'

function CreateUserName(props){

    let history=useHistory();

    const {user,setUser}=props;
    if(!user){
        history.push("/login")
    }

    const [validUserName,setValidUserName]=useState(true)

    const [data,setData]=useState(
        {
            userName:"",
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
            await db.collection('users').doc(user.uid).set({
                userName: userName
            });
            await db.collection('userNames').doc(userName).set({
                userID: user.uid,
                email:user.email
            });

            setUser((prev)=>{
                return {
                userName:userName,
                ...prev
            }})

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
                    <form className="container">
                        <div className="mb-2 ">
                            <label htmlFor="userName" className="form-label">User name</label>
                            <input type="text" onChange={handleChange} className={`form-control ${data.userName.length && validUserName ? " text-success border-success":"text-danger" }`} name="userName" id="userName" aria-describedby="userName" spellCheck={false} value={data.userName}/>
                        </div>
                        <div className="mb-3 row mx-auto">
                            <button type="submit" onClick={clicked} className="btn  mt-3 btn-warning col-5 mx-auto">Set User name</button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default CreateUserName