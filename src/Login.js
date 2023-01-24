
import ReCAPTCHA from 'react-google-recaptcha';
import React,{createContext, useRef, useState} from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { render } from '@testing-library/react';
import { Dashboard } from './Dashboard';

import {startactionemail} from './actions/startactionemail';
import {startactionlocation} from './actions/startactionlocation';
import {startactionrole} from './actions/startactionrole';
import {startactionuser} from './actions/startactionuser';

import {stopactionemail} from './actions/stopactionemail';
import {stopactionlocation} from './actions/stopactionlocation';

import {stopactionrole} from './actions/stopactionrole';
import {stopactionuser} from './actions/stopactionuser';

export const loguser=createContext();

export function Login(props) {
  const {emailaddress,passsword}=props;

    const [role,setrole]=useState("Reviewer");
    const [user,setuser]=useState("user");
    const [country,setcountry]=useState("country");
    const [email,setemail]=useState(emailaddress || "");
    const [pass,setpass]=useState("");
    

    const mapStateToProps=state=>({
      ...state,email:email,uname:user,location:country,role:role
    }
    //https://api.paytripapp.com/user/J220701/login

    );
    const mapdispatchtoprops=dispatch=>({
      startActionEmail: dispatch(startactionemail),
      startactionlocation: dispatch(startactionlocation),
      startactionrole: dispatch(startactionrole),
      startactionuser: dispatch(startactionuser),
      stopactionlocation: dispatch(stopactionlocation),
      stopactionrole: dispatch(stopactionrole),
      stopactionuser: dispatch(stopactionuser),
      stopactionemail: dispatch(stopactionemail)

    });
    const updateuser=(event)=>{
      setuser(event.target.value);
    }
    const [type,settype]=useState("type");
    let {flag}=props;
  const login=async ()=>{ toast.success('Redirecting to Wallet...', {
    position: toast.POSITION.TOP_RIGHT
});
 await fetch('https://api.paytripapp.com/user/J220701/login',{
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type' : 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                'username': email,
                'password': pass
            })
        }).then(resp=>console.log(resp)).then(data=>{console.log(JSON.stringify(data));
            if(data.includes("fail")) {
                toast.error('Not able to log in...', {
                    position: toast.POSITION.TOP_RIGHT
                 });
            } else {
                toast.success('Logging in...', {
                    position: toast.POSITION.TOP_RIGHT
                 });
                 setTimeout(()=>{
                    return <Dashboard />;
                 },2000);
            }
        })
};
  const captchaval=useRef(null);
    return (
        <loguser.Provider value={user}>
        <>
        <div><ToastContainer/></div>
        <form className='form-group' action='/dashboard'  encType='application/x-www-form-urlencoded'>
        <input className='form-control text-primary' onChange={updateuser} required placeholder='Email Address' name='email' type='email'/>
        <input className='form-control text-primary' required onChange={setpass(event.target.value)} placeholder='Password' name='pass' type='password'/>
        
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