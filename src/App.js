import './App.css';
import AuthScreen from "./pages/AuthScreen";
import HomeScreen from "./pages/HomeScreen";
import {useState} from "react";

function App() {
    const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('jwt'))

	return (
		<div className="App">
			{
				loggedIn ?
					<HomeScreen  setLoggedIn={setLoggedIn}/>
					: <AuthScreen setLoggedIn={setLoggedIn}/>
			}
		</div>
	);
}

export default App;
