import React,{useRef, useState} from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export function Forgpass(props) {

    let {flag}=props;
    const [email,setemail]=useState("");

    const forpass=async ()=>{ 
        //https://api.paytripapp.com/user/J220701/forgot-password
        await fetch('https://api.paytripapp.com/user/J220701/forgot-password',{
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Content-Type' : 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                'username': email
            })
        }).then(resp=>console.log(resp)).then(data=>{console.log(JSON.stringify(data));
            if(data.includes("fail")) {
                toast.error('Not able to find your email...', {
                    position: toast.POSITION.TOP_RIGHT
                 });
            } else {
                toast.success('Sending password in email...', {
                    position: toast.POSITION.TOP_RIGHT
                 });
                 setTimeout(()=>{
                    return <Login emailaddress={email} />;
                 },2000);
            }
        })
        };
    const captchaval=useRef(null);
    return (
        <>
        <ToastContainer/>
        <form className='form-group' action='#' method='POST' encType='application/x-www-form-urlencoded'>
        <input className='form-control text-primary' onKeyUp={setemail(event.target.value)} required placeholder='Email Address' name='email' type='email'/>
               
        <ReCAPTCHA sitekey={process.env.REACT_APP_SITE_KEY} size="normal" theme="dark" ref={captchaval}/>


  <br/>
  <button onClick={forpass} disabled={!flag} className='btn btn-success'>REST PASSWORD</button>
       </form>
       </>
    );
}