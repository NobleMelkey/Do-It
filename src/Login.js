import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { auth } from './firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import './css/login.css';
import PhoneIcon from '@mui/icons-material/Phone';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [phone, setPhone] = useState('+91');
  const [hasFilled, setHasFilled] = useState(false);
  const [otp, setOtp] = useState('');
  const [confirmationResult] = useState(null);
  const navigate=useNavigate();
   const handleClick=()=>
   {navigate('/dashboard')
   }
  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        // ...
      }
    }, auth);
  }

  const handleSend = () => {
    if (phone.trim().length !== 13) {
      alert('Please enter a valid phone number');
      return;
    }
    setHasFilled(true);
    generateRecaptcha();
    let appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phone, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
      }).catch((error) => {
        // Error; SMS not sent
        console.log(error);
      });
  }

  const verifyOtp = (event) => {
    let otp = event.target.value;
    setOtp(otp);

    if (otp.length === 6) {
      let confirmationResult = window.confirmationResult;
      confirmationResult.confirm(otp).then((result) => {
        let user = result.user;
        localStorage.setItem('token', user.accessToken);
        localStorage.setItem('phone', user.phoneNumber);
        localStorage.setItem('uid', user.uid);

        console.log(user);
        alert('User signed in successfully');
      }).catch((error) => {
        alert('User couldn\'t sign in (bad verification code?)');
      });
    }
  }
  const handleVerify = () => {
    if (confirmationResult) {
      confirmationResult.confirm(otp)
        .then((result) => {
          let user = result.user;
          console.log(user); 
          alert('User signed in successfully');
          // Move the navigation logic here, only when OTP is correct
          handleClick(); // This line navigates to the next page
        })
        .catch((error) => {
      alert('User couldn\'t sign in (bad verification code?)');
    });
  }
  }
  const handlecombineClick=()=>{
    handleVerify();
    handleClick();
  }
  return (
    <div className='log'>
    <div className='app__container'>
       <center> <div id='your-image-container'>
  </div></center>
      {hasFilled ? (
        <>
        <div id='sign_in'>
        <h2 className='Enterotp' >Enter the OTP</h2>
      </div>
<TextField
          sx={{ width: '240px' }}
          variant='outlined'
          label='OTP'
          value={otp}
          onChange={verifyOtp}
        />
         <button className='butt'
            onClick={handlecombineClick}
            variant='contained'
           
          >
            {'Verify OTP'}
          </button>
        </>
        
      ) : (
        <>
        <div id='sign_in'>
        <h1>DoIt</h1>
      <h2>Sign in to your account</h2>
    </div>
         <div><PhoneIcon fontSize='large' /></div>
      
          <TextField
            variant='outlined'
            autoComplete='off'
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
          <button className='butt'
            onClick={handleSend}
            variant='contained'
            sx={{ width: '240px', marginTop: '20px' }}
          >
            {'Get OTP'}
          </button>
        </>
      )}

      <div id="recaptcha"></div>
      
    </div></div>
  );
}

export default Login;