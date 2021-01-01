import './App.css';
import Feed from './Feed';
import Header from './Header';
import Sidebar from './Sidebar';
import Wigets from './Wigets';
import {useDispatch, useSelector} from "react-redux";
import { login, logout, selectuser } from './features/userSlice';
import Login from './Login';
import { useEffect } from 'react';
import { auth } from './firebase';


function App() {

  const user = useSelector(selectuser);
  const dispatch = useDispatch();

  useEffect(() => {    
    auth.onAuthStateChanged(userAuth => {
      if (userAuth){
        dispatch(login({
          email:userAuth.email,
          uId: userAuth.uid,
          displayName: userAuth.displayName,
          photoUrl: userAuth.photoURL,
        }) )
      }else{
        dispatch(logout());
      }
    })
  }, [])

  return (
    <div className="app">  
      <Header/>
     {!user? (
       <Login /> 
     ):(
      <div className = "app__body">
          <Sidebar />
          <Feed />
          <Wigets/>
      </div>
     )}
    </div>
  );
}

export default App;
