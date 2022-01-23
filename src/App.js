import "./App.css";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import CreateUserName from "./Components/CreateUserName"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {useState} from "react"

function App() {

	const [user,setUser]=useState(null)


	return (
		<div className="app h-100">
			<Router>
				<Navbar user={user} setUser={setUser}/>
				<Switch>
					<Route exact path="/">
						<Home user={user} setUser={setUser}/>
					</Route>
					<Route exact path="/login">
						<Login user={user} setUser={setUser}/>
					</Route>
					<Route exact path="/signup">
						<Signup user={user} setUser={setUser}/>
					</Route>
					<Route exact path="/createusername">
						<CreateUserName user={user} setUser={setUser}/>
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
