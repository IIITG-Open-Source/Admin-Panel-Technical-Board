import React from 'react';
import {
    Grid,
    Card,
    CardMedia,
    CardContent,
    CardActionArea,
    CardActions,
    Typography,
    IconButton,
    Avatar,
    CardHeader,
    withStyles
} from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import LanguageIcon from '@material-ui/icons/Language';
import PersonIcon from '@material-ui/icons/Person';
import TwitterIcon from '@material-ui/icons/Twitter';

const styles = {
    container: {
        minHeight: '85vh',
        paddingTop: '5vh',
        paddingBottom: '10vh',
    },
    item: {
        minHeight: '100%',
    },
    card: {
        height: '100%',
    },
    image: {
        height: '350px',
    },
    heading: {
        marginBottom: '6vh',
    },
    buttonWrapper: {
        width: '100%',
        justifyContent: 'center',
    },
};

function Developer(props) {
    const { classes, children: dev } = props;
    const { userName, imageURL, github, name, blog, twitter_username, contributions, bio } = dev;

    return (
        <Grid item xs={12} md={3} className={classes.item}>
            <Card className={classes.card} raised>

                <CardHeader
                    avatar={
                        <Avatar>
                            <PersonIcon />
                        </Avatar>
                    }
                    title={userName}
                    subheader={`Contributions: ${contributions}`}
                />

                <CardActionArea href={github} target='_blank'>
                    {/* Developer Image */}
                    <CardMedia
                        src={imageURL}
                        title={name}
                        height="140"
                        component='img'
                        className={classes.image}
                    />

                    {/* Developer Data */}
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {name}
                        </Typography>
                        {
                            bio === '' ? null : (
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {bio}
                                </Typography>
                            )
                        }
                    </CardContent>
                </CardActionArea>

                {/* Links */}
                <CardActions className={classes.buttonWrapper}>
                    <IconButton color="primary" href={github} target='_blank'>
                        <GitHubIcon fontSize="large" />
                    </IconButton>
                    {
                        blog === '' ? null : (
                            <IconButton href={blog} color="primary" target='_blank'>
                                <LanguageIcon fontSize="large" />
                            </IconButton>
                        )
                    }
                    {
                        twitter_username ? (
                            <IconButton color="primary" href={`https://twitter.com/${twitter_username}`} target='_blank'>
                                <TwitterIcon fontSize="large" />
                            </IconButton>
                        ) : null
                    }
                </CardActions>

            </Card>
        </Grid>
    );
}

export default withStyles(styles)(Developer);