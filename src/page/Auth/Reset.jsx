import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { NavLink, useNavigate } from 'react-router-dom';
import { auth, sendPasswordReset } from '../../firebase';
import { Box, Button, Container, TextField, Typography } from '@mui/material';

const Reset = () => {
    const [email, setEmail] = useState('');
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) return;
        if (user) navigate("/home");
    }, [user, loading]);

    return (
        <Container maxWidth="xs">
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
                <Button
                    onClick={() => sendPasswordReset(email)}
                    fullWidth variant='contained' sx={{ my: 2 }}
                >
                    Send Email
                </Button>

                <Box sx={{ my: 1 }}>
                    <Typography variant='p'>
                        Don't have an account?{' '}
                        <NavLink to='/signup'>
                            Sign up
                        </NavLink>
                    </Typography>
                </Box>
            </Box>
        </Container>
    )
}

export default Reset
