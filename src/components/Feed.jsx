import { Box, Card, CardActionArea, CardContent, CardMedia, Chip, Container, Grid, Typography } from '@mui/material'
import React from 'react'

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
            ]
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
            ]
        },
        {
            "id": 3,
            "img": "https://nationaltoday.com/wp-content/uploads/2022/06/World-Lizard-Day-1200x834.jpg",
            "title": "Blog post title 1",
            "auther": "ashwin",
            "tags": [
                'tag1',
                'tag2',
            ]
        },
    ]
}
const BlogCard = (props) => {
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

const Feed = () => {
    return (
        <Box mx={[1, 1, "10%"]}>
            <Grid container >
                {
                    testData.Articals.map((artical, i) => (
                        <Grid key={i} item sm={6} md={4}>
                            <Box key={artical.id}>
                                <BlogCard data={artical} />
                            </Box>
                        </Grid>
                    ))
                }
            </Grid>
        </Box>
    )
}

export default Feed
