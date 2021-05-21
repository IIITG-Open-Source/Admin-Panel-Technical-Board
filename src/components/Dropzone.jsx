import React from 'react';
import ReactDropzone from 'react-dropzone';
import { Box, Typography, withStyles } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const styles = {
    container: {
        position: 'relative',
        height: '250px',
    },
    dropzone: {
        position: 'absolute',
        zIndex: 0,
        height: '100%',
        width: '100%',
    },
    preview: {
        position: 'absolute',
        pointerEvents: 'none',
        zIndex: 1,
        height: '100%',
        width: '100%',
    },
    image: {
        height: '100%',
        width: '100%',
    },
    text: {
        position: 'absolute',
        zIndex: 2,
        background: 'rgba(0, 0, 0, 0.4)',
        pointerEvents: 'none',
        height: '100%',
        width: '100%',
        textAlign: 'center',
        color: 'white',
        padding: '1vh',
        boxSizing: 'border-box',
    },
    icon: {
        fontSize: '60px',
    }
};

class Dropzone extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null
        };
        this.onDrop = this.onDrop.bind(this);
        this.callback = this.props.onDrop;
    }

    onDrop(files) {
        const image = files[0];
        const newState = {
            image: {
                data: image,
                preview: URL.createObjectURL(image),
            }
        }

        this.setState(newState);
        this.callback(newState);
    }

    componentWillUnmount() {
        if(this.state.image) {
            window.URL.revokeObjectURL(this.state.image.preview);
        }
    }

    render() {
        //TODO: Verify File Types before Uploading
        const { classes } = this.props;
        const image = this.state.image;

        return (
            <ReactDropzone
                accept="image/*"
                onDrop={this.onDrop}
                multiple={false}
            >
                {({ getRootProps, getInputProps }) => (
                    <Box component='div' className={classes.container}>
                        <Box
                            boxShadow={3}
                            component='div'
                            {...getRootProps({ className: classes.dropzone })}>
                            <input {...getInputProps()} />
                        </Box>
                        <Box
                            component='div'
                            className={classes.preview}>
                            {image &&
                                <img
                                    alt="Preview"
                                    key={image.preview}
                                    src={image.preview}
                                    className={classes.image}
                                />}
                        </Box>
                        <Box component='div' className={classes.text}>
                            <Typography variant='h5' component='h5'>Drag and drop or Click to select Images</Typography>
                            <CloudUploadIcon className={classes.icon} />
                        </Box>
                    </Box>
                )}
            </ReactDropzone>
        );
    }
}

export default withStyles(styles)(Dropzone);