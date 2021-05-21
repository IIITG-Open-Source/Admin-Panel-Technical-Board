import React from 'react';
import Grid from '../../components/Grid';
import PictureUpload from '../../components/PictureUpload';

function Gallery(props) {
    return (
        <Grid
            heading='Gallery'
            itemTypeName={PictureUpload}
        />
    );
}

export default Gallery;