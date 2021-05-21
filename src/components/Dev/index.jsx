import React from 'react';
import axios from 'axios';
import { Container, Grid, Typography, withStyles } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Developer from './Developer';
import Skeleton from './Skeleton';

const styles = {
    container: {
        minHeight: '85vh',
        paddingTop: '5vh',
        paddingBottom: '10vh',
    },
    item: {
        padding: '0px',
        height: '500px',
    },
    heading: {
        marginBottom: '6vh',
    },
    alert: {
        marginBottom: '6vh',
    }
};

class DevTeam extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            developers: null,
        };

        //Property to cancel axios requests
        this.source = axios.CancelToken.source();
        this._ismounted = false;
    }

    async componentDidMount() {
        //TODO: Find a way around since this is an anti-pattern
        //Migrate to cancelable promises
        //TODO: Stop Updating the state when component unmounts
        this._ismounted = true;
        const url = 'https://api.github.com/repos/IIITG-Technical-Board/Admin-Panel-Technical-Board/contributors';
        const developers = [];

        let devs = (await axios.get(url)).data;

        for (let i in devs) {
            //RegExp to check for bots
            const userRegExp = /[\w]*bot[[\w\]]*/i;
            const contributions = devs[i].contributions;

            if (!userRegExp.test(devs[i].login)) {
                let data = (await axios.get(devs[i].url)).data;

                console.log(data);

                data = {
                    userName: data.login,
                    imageURL: data.avatar_url,
                    github: data.html_url,
                    url: data.url,
                    name: data.name,
                    bio: data.bio,
                    blog: data.blog,
                    contributions,
                    twitter_username: data.twitter_username,
                };

                developers.push(data);

                if (this._ismounted) {
                    this.setState({
                        developers,
                    });
                }
            }
        }
    }

    componentWillUnmount() {
        this._ismounted = false;
        if (this.source) {
            this.source.cancel("Landing Component got unmounted");
        }
    }

    render() {
        const { classes } = this.props;
        const { developers } = this.state;

        return (
            <Container maxWidth={false} className={classes.container}>
                {/* Heading */}
                <Typography variant='h1' align='center' className={classes.heading}>Developers</Typography>

                <Alert variant="filled" severity="info" className={classes.alert}>
                    To get added in the developers page, you just need to start contributing to project on github and the portal will fetch the new cotributors automatically.
                </Alert>

                {/* Grid containing cards */}
                <Grid container spacing={3} className={classes.grid}>
                    {
                        developers ? (
                            developers.map(dev => (
                                <Developer key={dev.userName}>
                                    {dev}
                                </Developer>
                            ))
                        ) : (
                            (() => {
                                const skeleton = [];
                                for (let i = 0; i < 4; i++) {
                                    skeleton.push(
                                        <Grid key={i} item xs={12} md={3} className={classes.item}>
                                            <Skeleton />
                                        </Grid>
                                    );
                                }
                                return skeleton;
                            })()
                        )
                    }
                </Grid>
            </Container>
        );
    }
}

export default withStyles(styles)(DevTeam);