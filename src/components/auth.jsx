import React, { useState } from 'react'
import supabase from '../supabase-client';

const Auth = () => {
    const [isSignUp, setIsSignUp] =useState(false);
    const[email, setEmail] = useState('');
    const [password,setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(isSignUp === true){
            const {error: signUpError}= await supabase.auth.signUp({
                email,password,
            });

            if(signUpError){
                console.log('Error signing up:', signUpError.message);
                return;
            }else{
                const {error: signInError} = await supabase.auth.signInWithPassword({
                    email,password,
            });
            if(signInError){
                console.log('Error signing in after sign up:', signInError.message);
                return;
            }
        }
    }
}
  return (
    <div style={{maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px'}}>
        <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>

        <form onSubmit={handleSubmit}>
            <input 
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
             style={{
            width: "75%",
            marginBottom: "0.5rem",
            padding: "0.5rem",
          }}
          />

          <input
            type="password"
            placeholder='Password'
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
             style={{
            width: "75%",
            marginBottom: "0.5rem",
            padding: "0.5rem",
          }}
          />

          <button 
          type='submit'
          style={{ padding: "0.5rem 1rem", marginRight: "0.5rem" }}
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>

        <button
            onClick={() => setIsSignUp(!isSignUp)}
            style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}
            >
             {isSignUp ? "Switch to Sign In" : "Switch to Sign Up"}   
            </button>


    </div>
  )
}

export default Auth;