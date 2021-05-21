import React from 'react';
import { Container, Grid, TextField, CircularProgress, Typography, withStyles } from '@material-ui/core';
import Dropzone from './Dropzone';
import { Context } from '../components/Context'; 

const styles = {
    container: {
        textAlign: 'center',
        position: 'relative',
        cursor: 'pointer',
        padding: '0px',
        height: '100%',
    },
    loaderContainer: {
        height: '100%',
        border: '1px solid black',
    },
};

class PictureUpload extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            item: null,
            title: "",
            uploading: false,
        };

        //Functions to Update The States
        this.onDrop = this.onDrop.bind(this);
        this.handleName = this.handleName.bind(this);

        //Functions to Interact with the Database
        this.upload = this.upload.bind(this);

        //Buttons - Will be passed by the Grid Item
        this.delete = this.delete.bind(this);
        this.identifier = this.props.identifier;

        //Upload Functionality
        this.addRefToFirestore = this.addRefToFirestore.bind(this);
        this.convertURLtoFile = this.convertURLtoFile.bind(this);
        this.readFile = this.readFile.bind(this);
    }

    static contextType = Context;

    onDrop(file) {
        this.setState({
            item: file,
        });
    }

    handleName(event) {
        this.setState({ title: event.target.value });
    }

    async upload() {
        //TODO: Handle Deviations in Base64 Strings
        const firebase = this.context;

        this.setState({
            uploading: true,
        });

        const { title } = this.state;
        let { item: file } = this.state;
        const { name } = file.image.data;

        file = file.image.preview;

        file = await this.convertURLtoFile(file);
        file = await this.readFile(file);

        //TODO: Change as per the updated Blob
        //Get a reference to the storage service, which is used to create references in your storage bucket
        //Create a storage reference from storage service
        const storageRef = firebase.storage().ref('/gallery/');
        const imagesRef = storageRef.child(name);

        let data = this.base64Parser(file);

        imagesRef.putString(data, 'base64').then((snapshot) => {
            //console.log('Uploaded a blob or file!');
            this.addRefToFirestore(name, title);
            this.setState({
                uploadSuccess: true,
                items: null,
                title: null
            });

            this.delete();
        });
    }

    readFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                resolve(event?.target?.result);
            };
            reader.onerror = (event) => {
                reader.abort();
                reject(event);
            };
            reader.readAsDataURL(file);
        });
    }

    async convertURLtoFile(url) {
        const response = await fetch(url);
        const data = await response.blob();
        const metadata = { type: data.type };
        const filename = url.replace(/\?.+/, '').split('/').pop();
        return new File([data], filename, metadata);
    }

    base64Parser(encodedStr) {
        //TODO: Change as per the updated Blob
        return encodedStr.replace(/^data:image\/[a-z+]+;base64,/, "");
    }

    async addRefToFirestore(fileName, title) {
        const firebase = this.context;
        //TODO: Change as per the updated Blob
        const db = firebase.firestore();
        const ref = db.collection('gallery');

        await ref.add({
            ref: `/gallery/${fileName}`,
            title
        })
    }

    delete() {
        this.props.delete(this.identifier);
    }

    render() {
        const { classes } = this.props;

        return (
            <Container maxWidth={false} className={classes.container}>
                {
                    this.state.uploading ? (
                        <Grid
                            container
                            spacing={0}
                            direction="column"
                            alignItems="center"
                            justify="center"
                            className={classes.loaderContainer}
                        >
                            <CircularProgress size={60} color="secondary" />
                            <Typography className={classes.text}>Please wait while the image uploads...</Typography>
                        </Grid>
                    ) : (
                        <React.Fragment>
                            <Dropzone
                                onDrop={this.onDrop}
                            />
                            <form noValidate autoComplete="off">
                                <TextField id="standard-basic" label="Caption for the Image" required onChange={this.handleName} />
                            </form>
                        </React.Fragment>
                    )
                }
            </Container>
        );
    }
}

export default withStyles(styles)(PictureUpload);