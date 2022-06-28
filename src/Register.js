import { Info, Schedule, Done } from '@mui/icons-material';
import { TextField, Button } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import axios from './api/axios';
import ReactIsCapsLockActive from '@matsun/reactiscapslockactive'

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register';



const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('')
    const [validName, setValidName] = useState(false) //name validation
    const [userFocus, setUserFocus] = useState(false) // focus tab

    const [pass, setPass] = useState('')
    const [validPass, setValidPass] = useState(false) //password validation
    const [passFocus, setPassFocus] = useState(false)

    const [matchPass, setMatchPass] = useState('')
    const [validMatch, setValidMatch] = useState(false)
    const [matchFocus, setMatchFocus] = useState(false)

    const [errMsg, setErrMsg] = useState('')
    const [success, setSuccess] = useState(false)


    useEffect(() => {
        userRef.current.focus();
    }, [])

    //uservalidation
    useEffect(() => {
        const result = USER_REGEX.test(user);
        console.log(result);
        console.log(user);
        setValidName(result);
    }, [user])

    useEffect(() => {
        const result = PWD_REGEX.test(pass);
        console.log(result);
        console.log(pass);
        setValidPass(result);
        const match = pass === matchPass;
        setValidMatch(match);
    }, [pass, matchPass])

    useEffect(() => {
        setErrMsg('');
    }, [user, pass, matchPass])


    // needed a backend to try... Nodejs I guess
    const handleSubmit = async (e) => {
        e.preventDefault();
        //if button is enable with JS hack
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pass);
        if (!v1 || !v2) {
            setErrMsg('Invalid Entry');
            return
        }
        //     try {
        //         const response = await axios.post(REGISTER_URL, JSON.stringify({ user, pass }), {
        //             headers: { 'Content-Type': 'application/json' },
        //             withCredentials: true
        //         }
        //         );
        //         console.log(response.data);
        //         console.log(response.accessToken);
        //         console.log(JSON.stringify(response))
        //         setSuccess(true);
        //         //clear input fields
        //     } catch (err) {
        //         if (!err?.response) {
        //             setErrMsg('No Server Response');
        //         } elseif(err.response?.status === 409); {
        //             setErrMsg('Username Taken');
        //          } else {
        //         //     setErrMsg('Registration Failed');
        //         // }
        //         errRef.current.focus();
        //     }
    }

    return (
        <>
            {success ? (
                <section className='success'>
                    <h1>Success!</h1>
                    <p>
                        <a href="#">Sign In</a>
                    </p>
                </section>
            ) : (
                <section className='register'>
                    <h1>Register</h1>
                    <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live='assertive'>{errMsg}</p>
                    <form onSubmit={handleSubmit}>


                        {/* some fix in styling --- will settle for now */} {/*Dependency is life */}
                        <ReactIsCapsLockActive>
                            {active => <span>Caps lock is {active ? 'active' : 'inactive'}</span>}
                        </ReactIsCapsLockActive>




                        <label htmlFor="username">
                            <Done className={validName ? 'valid' : 'hide'} />
                            <Schedule className={validName || !user ? 'hide' : "invalid"} />
                        </label>
                        <TextField id='username' label='Username' variant='outlined'
                            margin="normal"
                            ref={userRef}
                            autoComplete='off'
                            onChange={(e) => setUser(e.target.value)}
                            required
                            aria-invalid={validName ? 'false' : 'true'}
                            aria-describedby='uidnote'
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />
                        <p id='uidnote' className={userFocus && user && !validName ? 'instructions' : 'offscreen'}>
                            <Info />
                            4 to 24 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>
                        <label htmlFor="password">
                            <Done className={validPass ? 'valid' : 'hide'} />
                            <Schedule className={validPass || !pass ? 'hide' : "invalid"} />
                        </label>
                        <TextField
                            type='password'
                            id='password'
                            variant='outlined'
                            margin="normal"
                            label='password'
                            onChange={(e) => setPass(e.target.value)}
                            required
                            aria-describedby='passnote'
                            onFocus={() => setPassFocus(true)}
                            onBlur={() => setPassFocus(false)}
                        />
                        <p id='passnote' className={passFocus && !validPass ? 'instructions' : 'offscreen'}>
                            <Info />
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>
                        <label htmlFor="confirm-pass">
                            <Done className={validMatch && matchPass ? 'valid' : 'hide'} />
                            <Schedule className={validMatch || !matchPass ? 'hide' : "invalid"} />
                        </label>
                        <TextField
                            type='password'
                            id='confirm_pass'
                            margin="normal"
                            variant='outlined'
                            label='confirm password'
                            onChange={(e) => setMatchPass(e.target.value)}
                            required
                            aria-invalid={validMatch ? 'false' : 'true'}
                            aria-describedby='confirmnote'
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p id='confirmnote' className={matchFocus && !validMatch ? 'instructions' : 'offscreen'}>
                            <Info />
                            Password and confirm password must match.
                        </p>
                    </form>
                    <Button variant="contained" color="success" disabled={!validName || !validPass || !validMatch ? true : false}>
                        Sign Up
                    </Button>
                    <p>
                        Already registered?<br />
                        <span className='line'>
                            {/*router link*/}
                            <a href="#">Sign In</a>
                        </span>
                    </p>
                </section>
            )}
        </>
    )
}

export default Register