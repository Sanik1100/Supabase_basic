import { useEffect, useState } from "react";
import Auth from "./components/auth.jsx";
import TaskManager from "./components/task_manager.jsx";
import "./index.css";
import supabase from "./supabase-client.jsx";

// A session represents a logged-in user and their authentication tokens.
{/*Supabase returns this object when:
User logs in
Page refreshes and user is still logged in
supabase.auth.getSession() is called
If the user is not logged in, session = null. */}
 
function App(){
  const [session, setSession]=useState(null); //null means user is not logged in
  // when user logs in then supabase gives a session object


  const fetchSession=async () => {
    const currentSession= await supabase.auth.getSession(); // asks supabase is there already a logged-in user
    console.log(currentSession);
    setSession(currentSession.data.session);
  };

  useEffect(()=>{  // runs once when app starts
    fetchSession();

    const {data: authListener}= supabase.auth.onAuthStateChange(  // no manual refresh needed ,automatically updates session when user logs in ,logs out or session expires
      (_event, session)=>{
        setSession(session);
      }
    );
    return ()=>{
      authListener.subscription.unsubscribe();  // removes the auth listener when component unmounts
    };
  },[]);
  const logout=async () => {
    await supabase.auth.signOut();   // triggers onAuthStateChange and session becomes null
  }
  return(
    <>
    {session ? (   // if session exists user is logged in 
      <>
      <button onClick={logout}>Logout</button>
      <TaskManager session={session}/>
      </>
    ):(
   <Auth/>
    )
  }
    </>
  )
}
export default App;