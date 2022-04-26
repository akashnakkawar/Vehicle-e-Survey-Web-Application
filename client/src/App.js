import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import { BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import Login from './Components/Login';
import Signup from './Components/Signup';
import CouncilDashboard from './Components/CouncilDashboard';
import "bootstrap/js/src/collapse.js";
import {useState} from 'react'
import UserDashboard from './Components/userDashboard';


function App() {
 
  const [isLogin, setIsLogin] = useState(false)
  const [info,setInfo] = useState(null)

  const checkLogin=(value,info)=>{
    setIsLogin(value)
    setInfo(info)
  }

  return (
    <Router>
      <Navbar isLogin={isLogin} checkLogin={checkLogin}/>
    <div className='content'>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login">
          <Login checkLogin={checkLogin} />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/councilDashboard">
          <CouncilDashboard isLogin={isLogin} />
        </Route>
        <Route path="/userdashboard">
          <UserDashboard isLogin={isLogin} info={info}/>
        </Route>
        
      </Switch>
    </div>
  </Router>
  );
}

export default App;
