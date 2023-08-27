import { AppRegistration } from '@mui/icons-material';
import { Avatar, Box, Button, Container, createStyles, TextField, Typography } from '@mui/material';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { auth, registerWithEmailAndPassword } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [passwordAlert, setPasswordAlert] = useState('');
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    // const onSignUp = async (e) => {
    //     e.preventDefault()
    //     // console.log(password, document.getElementById('check_password').value);
    //     if (password === document.getElementById('check_password').value) {
    //         await createUserWithEmailAndPassword(auth, email, password)
    //             .then((userCredential) => {
    //                 //Signed in
    //                 const user = userCredential.user;
    //                 user.displayName = username;
    //                 console.log("user data : ",user.displayName, user.email, user.emailVerified)
    //                 navigate('/login') 
    //             })
    //             .catch((error) => {
    //                 const errorCode = error.code;
    //                 const errorMessage = error.message;
    //                 alert(errorMessage)
    //                 console.log(errorCode, errorMessage);
    //             });
    //     }else{
    //         alert("something went wrong")
    //     }
    // }

    const register = () => {
        // if(!username) alert("please Enter username");
        if(username !== '' && password !== '' && password === document.getElementById("check_password").value){
            registerWithEmailAndPassword(username, email, password);
        }else{
            alert("something is wrong")
        }
    }

    useEffect(() => {
        if (loading) return;
        if (user) navigate("/home")
    } , [user, loading])

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
    //                                 label="Email address"
    //                                 value={email}
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
    //                                 label="Create password"
    //                                 value={password}
    //                                 onChange={(e) => setPassword(e.target.value)}
    //                                 required
    //                                 placeholder='Password'
    //                             />
    //                         </div>

    //                         <button type='submit' onClick={onSubmit}>
    //                             Sign up
    //                         </button>
    //                     </form>
    //                     <p>
    //                         Already have an account?{' '}
    //                         <NavLink to='/login'>
    //                             Sign in
    //                         </NavLink>
    //                     </p>
    //                 </div>
    //             </div>
    //         </section>
    //     </main>
    // )

    return (
        <Container component="main" maxWidth="xs">
            <Typography variant='h3' textAlign='center'>
                Blog Platform
            </Typography>
            <Box sx={Styles.container1}>
                <Avatar sx={{ m: 1, bgcolor: "primary.light" }}>
                    <AppRegistration />
                </Avatar>
                <Typography variant='h5'>
                    Sign Up
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        variant='standard'
                        margin='normal'
                        required
                        fullWidth
                        id='username'
                        label='User Name'
                        name='username'
                        type='text'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextField
                        variant='standard'
                        margin='normal'
                        required
                        fullWidth
                        id='check_password'
                        label='Confirm Password'
                        name='check_password'
                        type='password'
                        onChange={(e) => {
                            setPasswordAlert(
                                    (e.target.value === password) ?
                                    <Typography variant='caption' color="success.main">
                                        Password matched
                                    </Typography>
                                    :
                                    <Typography variant='caption' color="error.main">
                                        Password did not matched
                                    </Typography>
                            )
                        }}
                        helperText={passwordAlert}
                    />
                    <Button onClick={register} fullWidth variant='contained' sx={{ my: 2 }}>
                        Sign Up
                    </Button>
                </Box>
            </Box>
            <Box sx={{ my: 1 }}>
                <Typography variant='p'>
                    Already have an account?{' '}
                    <NavLink to='/login'>
                        Login
                    </NavLink>
                </Typography>
            </Box>
        </Container>
    )
}

export default Signup

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