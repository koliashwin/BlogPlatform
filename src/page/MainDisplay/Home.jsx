import { onAuthStateChanged, signOut } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import Navbar from '../../components/Navbar';
import Todo from '../../components/TestComponents/Todo';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db, logout } from '../../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import Feed from '../../components/Feed';

const Home = () => {
    const [name, setName] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    const fetchUserData = async () => {
        try {
            const q = query(collection(db, 'users'), where("uid", "==", user?.uid));
            const doc = await getDocs(q);

            const data = doc.docs[0].data();
            // test
            console.log(doc.docs, data);

            setName(data.name);
        } catch (error) {
            console.log(error);
            alert("an error occured while fetching user data");
        }
    };

    useEffect(() => {
        if (loading) return;
        if (!user) return navigate('/login');
        fetchUserData();
    }, [user, loading]);

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

    // const user = auth.currentUser

    return (
        <>
            <Navbar />
            {/* <Box>
            <Typography sx={{my: 5}}>
                welcom {name}
                email : {user?.email}
                <button onClick={logout}>
                    Logout
                </button>
            </Typography>
            </Box> */}
            <Feed user={user} />
        </>



    )
}

export default Home
