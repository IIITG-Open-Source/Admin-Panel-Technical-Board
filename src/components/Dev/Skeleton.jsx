import React from 'react';
import { Card, CardContent } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

function SkeletonCard(props) {
    const animation = 'wave';

    return (
        <Card>
            <Skeleton animation="wave" variant="rect" height={250}/>
            <CardContent>
                <Skeleton animation={animation} height={50} style={{ marginBottom: 6 }} />
                <Skeleton animation={animation} height={20} width="80%" />
                <Skeleton animation={animation} height={20} width="90%" />
                <Skeleton animation={animation} height={20} width="80%" />
                <Skeleton animation={animation} height={50} />
            </CardContent>
        </Card>
    );
}

export default SkeletonCard;