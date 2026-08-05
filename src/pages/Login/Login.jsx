import React from 'react'
import './Login.css'
import logo from '../../assets/logo.png'

const Login = () => {
  const [signState,setSignState] = React.useState("Sign In")
  return (
    <div className='login'>
      <img src={logo} alt='Logo' className='login-logo' />
      <div className="login-form">
        <h1>{signState}</h1>
        <form>
          {signState==="Sign Up"?<input type="text" placeholder="Your Name" /> :<></>}
          
          <input type="email" placeholder="Email or phone number" />
          <input type="password" placeholder="Password" />
          <button type="submit">{signState}</button>
          <div className="form-help">
            <div className="remember-me">
              <input type="checkbox" />
              <label htmlFor="">Remember me</label>
            </div>
            <p>Need help?</p>
          </div>
          </form>
          <div className="form-switch">
            {signState==="Sign In" ? <p>New to Netflix? <span onClick={()=>setSignState("Sign Up")}>Sign Up Now</span></p> : <p>Already subscribed to Netflix?<span onClick={()=>setSignState("Sign In")}>Sign In</span></p>}
          </div>
      
      </div>
    </div>
  )
}

export default Login
