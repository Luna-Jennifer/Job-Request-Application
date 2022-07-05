import { Info, Schedule, Done } from '@mui/icons-material';
import { TextField, Button } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import axios from './api/axios';
import ReactIsCapsLockActive from '@matsun/reactiscapslockactive'

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;



const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);


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
        const result = PWD_REGEX.test(pwd);
        console.log(result);
        console.log(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])


    const handleSubmit = async (e) => {
        e.preventDefault();
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
                            value={user}
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
                            <Done className={validPwd ? 'valid' : 'hide'} />
                            <Schedule className={validPwd || !pwd ? 'hide' : "invalid"} />
                        </label>
                        <TextField
                            type='password'
                            id='password'
                            variant='outlined'
                            margin="normal"
                            label='password'
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                            aria-describedby='passnote'
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />
                        <p id='passnote' className={pwdFocus && !validPwd ? 'instructions' : 'offscreen'}>
                            <Info />
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>
                        <label htmlFor="confirm-pass">
                            <Done className={validMatch && matchPwd ? 'valid' : 'hide'} />
                            <Schedule className={validMatch || !matchPwd ? 'hide' : "invalid"} />
                        </label>
                        <TextField
                            type='password'
                            id='confirm_pass'
                            margin="normal"
                            variant='outlined'
                            label='confirm password'
                            onChange={(e) => setMatchPwd(e.target.value)}
                            value={matchPwd}
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
                    <Button variant="contained" color="success" disabled={!validName || !validPwd || !validMatch ? true : false}>
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