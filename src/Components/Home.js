import React from 'react';
import {useHistory} from "react-router-dom"


function Home(props) {

    const history=useHistory()

    const {user}=props

    if(!user){
        history.push("/login")
    }
    else if(!user.userName){
        history.push("/createusername")
    }

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
