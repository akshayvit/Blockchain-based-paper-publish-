
import ReCAPTCHA from 'react-google-recaptcha';
import React,{createContext, useRef, useState} from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { render } from '@testing-library/react';
import { Dashboard } from './Dashboard';

export const loguser=createContext();

export function Login(props) {
    const [role,setrole]=useState("Reviewer");
    const [user,setuser]=useState("user");
    const updateuser=(event)=>{
      setuser(event.target.value);
    }
    const [type,settype]=useState("type");
    let {flag}=props;
  const login=()=>{ toast.success('Redirecting to Wallet...', {
    position: toast.POSITION.TOP_RIGHT
});
setTimeout(() => {
    return <Dashboard cuser={{name:'user', type:'Reviewer'}}/>;
    
}, 4000);
};
  const captchaval=useRef(null);
    return (
        <loguser.Provider value={user}>
        <>
        <div><ToastContainer/></div>
        <form className='form-group' action='/dashboard'  encType='application/x-www-form-urlencoded'>
        <input className='form-control text-primary' onChange={updateuser} required placeholder='Email Address [For 10 days: demo@demo.com]' name='email' type='email'/>
        <input className='form-control text-primary' required  placeholder='Password [For 10 days: demo]' name='pass' type='password'/>
        
        <ReCAPTCHA sitekey={process.env.REACT_APP_SITE_KEY} size="normal" theme="dark" ref={captchaval}/>

<br/><input className='form-check-input'  name='rem' id='flexCheckDefault' type='checkbox'/>
   <label class="form-check-label" for="flexCheckDefault">
    Remember Me 
  </label>
  <br/>
  <button onClick={login} disabled={!flag} className='btn btn-success'>LOGIN</button>
 
       </form>
       </>
       </loguser.Provider>
    );
}