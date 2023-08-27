import { LoginOutlined } from '@mui/icons-material';
import { Avatar, Box, Button, Container, createStyles, Divider, TextField, Typography } from '@mui/material';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { auth, logInWithEmailAndPassword, signInWithGoogle } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, loading, error] = useAuthState(auth);

    const navigate = useNavigate()

    useEffect(() => {
        if(loading) {
            // trigger loading screen or somthing
            return;
        }
        if(user) navigate("/home");
    } , [user, loading]);

    // return (
    //     <main>
    //         <section>
    //             <div>
    //                 <div>
    //                     <h1>Blog platform</h1>
    //                     <form>
    //                         <div>
    //                             <label htmlFor="email-address">
    //                                 Email address
    //                             </label>
    //                             <input
    //                                 type="email"
    //                                 name='email'
    //                                 id="email-address"
    //                                 onChange={(e) => setEmail(e.target.value)}
    //                                 required
    //                                 placeholder='Email address'
    //                             />
    //                         </div>

    //                         <div>
    //                             <label htmlFor="password">
    //                                 Passowrd
    //                             </label>
    //                             <input
    //                                 type="password"
    //                                 name='password'
    //                                 id="password"
    //                                 onChange={(e) => setPassword(e.target.value)}
    //                                 required
    //                                 placeholder='Password'
    //                             />
    //                         </div>

    //                         <button onClick={onLogin}>
    //                             Log in
    //                         </button>
    //                     </form>
    //                     <p className='text-sm text-white text-center'>
    //                         No account yet?{' '}
    //                         <NavLink to='/signup'>
    //                             Sign up
    //                         </NavLink>
    //                     </p>
    //                 </div>
    //             </div>
    //         </section>
    //     </main>
    // )
    return (
        <Container component="main" maxWidth="xs">
            <Typography variant='h3' textAlign="center">
                Blog Platform
            </Typography>
            <Box sx={Styles.container1}>
                <Avatar sx={{ m: 1, bgcolor: "primary.light" }}>
                    <LoginOutlined />
                </Avatar>
                <Typography variant='h5'>
                    Log In
                </Typography>
                <Box component='form' sx={{ mx: 2 }}>
                    <TextField
                        variant='standard'
                        margin='normal'
                        required
                        fullWidth
                        id='email'
                        label='Email Address'
                        name='email'
                        type='email'
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        variant='standard'
                        margin='normal'
                        required
                        fullWidth
                        id='password'
                        label='Password'
                        name='password'
                        type='password'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Typography variant='subtitle2' textAlign="end">
                    <Link to="/reset">Forgot Password</Link>
                    </Typography>
                    <Button 
                        onClick={() => logInWithEmailAndPassword(email, password)} 
                        fullWidth 
                        variant='contained' sx={{ my: 1 }}
                    >
                        Login
                    </Button>
                    <Divider>or</Divider>
                    <Button 
                        onClick={signInWithGoogle} 
                        fullWidth 
                        variant='contained' sx={{ my: 1 }}
                        color='error'
                    >
                        Login with google
                    </Button>
                </Box>
            </Box>
            <Box sx={{my: 1}}>
                <Typography variant='p'>
                    Don't have an account?{' '}
                    <NavLink to='/signup'>
                        Sign up
                    </NavLink>
                </Typography>
            </Box>
        </Container>
    )

}

export default Login

const Styles = createStyles({
    container1: {
        display: "flex",
        // bgcolor: "wheat",
        marginTop: 5,
        flexDirection: "column",
        alignItems: "center",
        borderRadius: "20px",
        boxShadow: "2px 5px 10px",
    },
    container2: {
        display: "flex",
        bgcolor: "wheat",
        my: 2,
        pt: 1,
        flexDirection: "column",
        alignItems: "center",
        borderRadius: "10px",
        boxShadow: "2px 2px 2px",
    },
});
