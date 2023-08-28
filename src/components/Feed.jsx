import { Box, Card, CardActionArea, CardContent, CardMedia, Chip, Container, Grid, Link, Typography, createStyles } from '@mui/material'
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase'

const testData = {
    "Articals": [
        {
            "id": 1,
            "img": "https://nationaltoday.com/wp-content/uploads/2022/06/World-Lizard-Day-1200x834.jpg",
            "title": "Blog post title 1",
            "auther": "ashwin",
            "tags": [
                'tag1',
                'tag2',
            ],
            "artical": "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus itaque reiciendis dolor eveniet? Quo optio doloribus mollitia. Deleniti vero perspiciatis deserunt quaerat excepturi quisquam ducimus earum dolor dolores, iste sunt?",
        },
        {
            "id": 2,
            "img": "https://nationaltoday.com/wp-content/uploads/2022/06/World-Lizard-Day-1200x834.jpg",
            "title": "Blog post title 1",
            "auther": "ashwin",
            "tags": [
                'abc',
                'bas kar',
                'chhod'
            ],
            "artical": "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus itaque reiciendis dolor eveniet? Quo optio doloribus mollitia. Deleniti vero perspiciatis deserunt quaerat excepturi quisquam ducimus earum dolor dolores, iste sunt?",
        },
        {
            "id": 3,
            "img": "https://nationaltoday.com/wp-content/uploads/2022/06/World-Lizard-Day-1200x834.jpg",
            "title": "Blog post title 1",
            "auther": "ashwin",
            "tags": [
                'tag1',
                'tag2',
            ],
            "artical": "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus itaque reiciendis dolor eveniet? Quo optio doloribus mollitia. Deleniti vero perspiciatis deserunt quaerat excepturi quisquam ducimus earum dolor dolores, iste sunt?",
        },
    ]
}

const BlogCards1 = (props) => {
    return (
        <Box>
            <Card sx={{ m: 1 }}>
                <CardActionArea>
                    <CardMedia
                        component='img'
                        image={props.data.img}
                        title='green iguana'
                    />
                    <CardContent sx={{ mb: -1 }}>
                        <Typography>
                            By {props.data.auther}
                        </Typography>
                        <Typography gutterBottom variant='h5' component='div'>
                            {props.data.title}
                        </Typography>
                        {/* <Chip label='tags' color='info' /> */}
                        {props.data.tags.map((tag, i) => (
                            <Chip key={i} label={tag} color='info' sx={{ mr: 1 }} />
                        ))}
                    </CardContent>
                </CardActionArea>
            </Card>
        </Box>
    )
}

const BlogCards2 = (props) => {
    return (
        <Box>
            <Card sx={{ m: 1 }}>
                <CardActionArea>
                    <Grid container>
                        <Grid item md={4} display={['none', 'none', 'block']}>
                            <CardMedia
                                component='img'
                                image={props.data.photo}
                                title='green iguana'

                            />
                        </Grid>
                        <Grid item xs={8}>
                            <CardContent sx={{ mb: -1 }}>
                                <Typography>
                                    By {props.data.auther}
                                </Typography>
                                <Typography variant='h5' component='div'
                                    sx={styles.SingleLineOverflow}
                                >
                                    {props.data.title}
                                </Typography>
                                <Typography variant='subtitle1'
                                    sx={styles.SingleLineOverflow}
                                >
                                    {props.data.article}
                                </Typography>
                                <Typography variant='body2' gutterBottom>
                                    <Link>
                                        Read More
                                    </Link>
                                </Typography>
                                {/* <Chip label='tags' color='info' /> */}
                                {props.data.tags.map((tag, i) => (
                                    <Chip key={i} label={tag} color='info' sx={{ mr: 1, height: 20 }} />
                                ))}
                            </CardContent>
                        </Grid>
                    </Grid>
                </CardActionArea>
            </Card>
        </Box>
    )
}

const Feed = () => {

    const [feedData, setFeedData] = useState([])
    // fetch data form backend(firebase)

    const fetchBlogArticles = async () => {
        try {
            const q = query(collection(db, 'blogs'), orderBy('createdAt'), limit(25));
            const doc = await getDocs(q);
            const data = doc.docs.map((blogs) => blogs.data());
            console.log(data)
            setFeedData(data)
        } catch (error) {
            console.log(error);
            alert("something went wrong")
        }
    }

    useEffect(() => {
        fetchBlogArticles();
        console.log("something happened")
    },[setFeedData]);

    // ------------------

    const handleClick =() =>{
        alert("you'll be redirect to details page")
    }

    return (
        <Box>
            <Grid container justifyContent="center">
                {
                    feedData.map((blog, i) => (
                        <Grid key={i} item xs={12} md={7}>
                            <Box key={blog.b_id}>
                                <BlogCards2 data={blog} />
                            </Box>
                        </Grid>
                    ))
                }
            </Grid>
        </Box>
    )
}

export default Feed

const styles = createStyles({
    SingleLineOverflow: {
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
    }
})