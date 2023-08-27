import { signOut } from 'firebase/auth'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { auth, logout } from '../firebase'
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material'
import { Menu } from '@mui/icons-material'

const Navbar = () => {
    const navigate = useNavigate()

    const handleLogout = () => {
        signOut(auth).then(() => {
            navigate('/login');
            console.log('signed out successfully')
        }).catch((error) => {
            console.log("something went worng")
        })
    }

    // useEffect(() => {
    //     onAuthStateChanged(auth, (user) => {
    //         if (user) {
    //             const uid = user.uid;
    //             console.log('uid', uid)
    //         } else {
    //             console.log('user is logged out')
    //         }
    //     });
    // }, [])

    const user = auth.currentUser

    return (
        <Box sx={{flexGrow: 1, mb:8}}>
            <AppBar position='fixed'>
                <Toolbar>
                    <IconButton
                        size='large'
                        edge="start"
                        color='inherit'
                        aria-label='menu'
                        sx={{mr:2}}
                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant='h6' component='div' sx={{flexGrow: 1}}>
                        Blog Platform
                    </Typography>
                    <Button color='inherit' onClick={logout}>Log out</Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Navbar
