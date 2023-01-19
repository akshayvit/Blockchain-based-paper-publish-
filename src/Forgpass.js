import React,{useRef, useState} from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export function Forgpass(props) {

    let {flag}=props;

    const forpass=()=>{ toast.success('Sending you in e-mail reset steps if user found...', {
        position: toast.POSITION.TOP_RIGHT
    });};
    const captchaval=useRef(null);
    return (
        <>
        <ToastContainer/>
        <form className='form-group' action='#' method='POST' encType='application/x-www-form-urlencoded'>
        <input className='form-control text-primary' required placeholder='Email Address' name='email' type='email'/>
               
        <ReCAPTCHA sitekey={process.env.REACT_APP_SITE_KEY} size="normal" theme="dark" ref={captchaval}/>


  <br/>
  <button onClick={forpass} disabled={!flag} className='btn btn-success'>REST PASSWORD</button>
       </form>
       </>
    );
}