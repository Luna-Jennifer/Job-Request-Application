import { useEffect, useRef, useState } from 'react';
import axios from './api/axios';
import { TextField, Button } from '@mui/material';


function Login() {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // axios and global state

    }

    return (
        <>
            {success ? (
                <section>
                    <h1>Youa are logged in!</h1>
                    <br />
                    <p>
                        <a href="#">Go to Home</a>
                    </p>
                </section>
            ) : (
                < section >
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive"></p>
                    <h1>Sign In</h1>

                    <form onSubmit={handleSubmit}></form>
                    <TextField
                        type="text"
                        id='username'
                        label='Username'
                        variant='outlined'
                        margin="normal"
                        ref={userRef}
                        autoComplete='off'
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
                        required>
                    </TextField>
                    <TextField
                        type="password"
                        id='password'
                        label='password'
                        variant='outlined'
                        margin="normal"
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required>
                    </TextField>
                    <Button>Sign In</Button>
                    <p>
                        Need an Account?? <br />
                        <span className='line'>
                            {/* put a router link here */}
                            <a href="#">Sign Up</a>
                        </span>
                    </p>
                </section >
            )}
        </>
    )
}

export default Login
